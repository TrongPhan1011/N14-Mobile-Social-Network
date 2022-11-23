import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageById } from '../../services/messageService';
import { addUserSeenToMess } from '../../services/messageService';
import { getUserById } from '../../services/userService';
import { formatTimeAuto, getLastName } from '../../lib/formatString';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import avatarDefault from '../../assets/avatarDefault.png';
import socket from '../../utils/getSocketIO';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';
import Avatar from '../Avatar/Avatar';

export default memo(function itemChat({ groupChat, userLoginData }) {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const [messageLast, setMessageLast] = useState('');
    const currAuth = useSelector((state) => state.auth.currentUser);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    const [itemDataChat, setItemDataChat] = useState();
    const [seenState, setSeenState] = useState(false);
    const [currentInbox, setCurrentInbox] = useState();
    const [memberFetch, setMemberFetch] = useState();
    const [onlineValue, setOnlineValue] = useState('hidden');
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    var arrIdMessage = groupChat.message;
    var bgSeen = 'bg-lcn-blue-4';
    var textSeen = 'text-gray-900';

    useEffect(() => {
        const getMessageLast = async () => {
            var idLastMessage = arrIdMessage[arrIdMessage.length - 1];

            if (!!idLastMessage) {
                var message = await getMessageById(idLastMessage, accessToken, AxiosJWT);
                setMessageLast(message);
            }
        };
        getMessageLast();

        var userChatOther = null;
        const checkOnlineChat = async () => {
            if (groupChat.typeChat === 'inbox') {
                if (groupChat.member[0] !== userLoginData.id) {
                    userChatOther = await getUserById(groupChat.member[0], accessToken, AxiosJWT);
                } else userChatOther = await getUserById(groupChat.member[1], accessToken, AxiosJWT);

                setCurrentInbox(userChatOther);
                if (userChatOther.statusOnline) {
                    setOnlineValue('');
                } else setOnlineValue('hidden');
            }
        };
        checkOnlineChat();
    }, []);

    useEffect(() => {
        var getClassSeen = () => {
            var arrUserSeen = messageLast?.seen;

            var seen = checkSeen(arrUserSeen, userLoginData.id);

            if (!seen && curSignIn.id !== messageLast.authorID.id && messageLast.idChat === groupChat?.id) {
                setSeenState({
                    textName: ' font-semibold ',
                    textChatTitle: ' text-gray-900 ',
                    circleSeen: '  ',
                });
            } else {
                setSeenState({
                    textName: ' font-medium ',
                    textChatTitle: ' text-gray-500 ',
                    circleSeen: ' hidden ',
                });
            }
        };

        const getInforMessageLast = () => {
            var titleMess = '',
                messCreatedAt = '',
                lastNameAuthor = '';
            if (!!messageLast && messageLast.idChat === groupChat?.id) {
                titleMess = messageLast.title || 'Đã gửi file';
                messCreatedAt = formatTimeAuto(messageLast.createdAt) || '';
                var fullNameAuthor = messageLast.authorID.fullName || '';
                if (messageLast.authorID.id === curSignIn.id && messageLast.type_mess !== 'system') {
                    lastNameAuthor = 'Bạn:';
                } else {
                    lastNameAuthor = getLastName(fullNameAuthor) + ':';
                }
                if (messageLast.type_mess === 'system') {
                    lastNameAuthor = '';
                }
                getClassSeen();
            }

            return {
                authorName: lastNameAuthor || '',
                title: titleMess,
                messCreatedAt,
            };
        };
        var itemData = getInforMessageLast();
        setItemDataChat(itemData);
    }, [messageLast]);

    useEffect(() => {
        socket.on('getMessage', (data) => {
            if (!!data) {
                var getNewMess = {
                    id: data.id,
                    title: data.title,
                    authorID: data.authorID,
                    seen: data.seen,
                    type_mess: data.type,
                    idChat: data.idChat,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    file: data.file,
                };
                if (getNewMess.idChat === groupChat.id) setMessageLast(getNewMess);
            }
        });
    }, [socket]);

    //console.log(messageLast);

    const checkSeen = (arrSeen, userId) => {
        if (!!arrSeen) {
            for (var user of arrSeen) {
                if (user.id === userId) {
                    return true;
                }
            }
        }
        return false;
    };

    var img = avatarDefault;
    if (!!groupChat.avatar) {
        img = { uri: `${groupChat.avatar}` };
    }

    const putUserSeen = async (idMess, dataSeen) => {
        await addUserSeenToMess(idMess, dataSeen, accessToken, AxiosJWT);
    };

    const handleChiTietTinNhan = () => {
        var currentDate = new Date();
        var userClickSeen = {
            id: userLoginData.id,
            seenAt: currentDate,
        };

        var seen = checkSeen(messageLast?.seen, userClickSeen.id);
        if (!seen) {
            putUserSeen(messageLast?.id, userClickSeen);
        }
        //add id cua group chat duoc chon vao store
        //console.log(groupChat);

        var groupName = '';
        if (groupChat.typeChat === 'group') groupName = groupChat.name;
        else groupName = currentInbox?.fullName;
        //console.log(groupName);
        if (!!groupChat) dispatch(selectGroup(groupChat));
        navigation.navigate('ChiTietTinNhan', { groupName });
    };
    return (
        <>
            {!!itemDataChat ? (
                <View>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF" onPress={handleChiTietTinNhan}>
                        <View className=" mt-1 rounded-xl p-4 pl-6 pr-6 flex flex-row items-center">
                            <View className="overflow-hidden">
                                {/* <Image
                                    style={{ width: 60, height: 60, resizeMode: 'contain' }}
                                    className="rounded-full"
                                    source={img}
                                ></Image> */}
                                <Avatar
                                    src={
                                        groupChat.typeChat === 'group'
                                            ? groupChat.avatar
                                            : currentInbox?.profile?.urlAvartar
                                    }
                                    typeAvatar={groupChat.typeChat === 'group' ? 'group' : 'inbox'}
                                    idGroup={groupChat.id}
                                />
                                <View
                                    className={
                                        'w-3 h-3 bg-lcn-green-1 rounded-full absolute right-1 bottom-0 ' + onlineValue
                                    }
                                ></View>
                            </View>
                            <View className="ml-4 w-7/12">
                                <Text className="font-semibold text-xl text-lcn-blue-5">
                                    {groupChat.typeChat === 'group' ? groupChat.name : currentInbox?.fullName}
                                </Text>
                                <View className="flex flex-row">
                                    <Text className={'text-sm ' + seenState.textChatTitle}>
                                        {itemDataChat.authorName}
                                    </Text>
                                    <Text className={'text-sm ml-1 ' + seenState.textChatTitle}>
                                        {itemDataChat.title}
                                    </Text>
                                </View>
                            </View>
                            <View className="absolute right-6">
                                <Text className="mt-3"></Text>
                                <View>
                                    <View
                                        className={
                                            'w-4 h-4 rounded-full bg-lcn-blue-4 absolute right-0 -top-4 ' +
                                            seenState?.circleSeen
                                        }
                                    ></View>
                                    <Text className={'text-sm ' + seenState?.textChatTitle}>
                                        {itemDataChat.messCreatedAt}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            ) : (
                <></>
            )}
        </>
    );
});
