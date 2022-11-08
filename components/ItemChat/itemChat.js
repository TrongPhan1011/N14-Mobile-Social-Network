import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageById } from '../../services/messageService';
import { addUserSeenToMess } from '../../services/messageService';
import { formatTimeAuto, getLastName } from '../../lib/formatString';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import socket from '../../utils/getSocketIO';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';

export default memo(function itemChat({ groupChat, userLoginData }) {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const [messageLast, setMessageLast] = useState('');
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    const [itemDataChat, setItemDataChat] = useState();
    const [seenState, setSeenState] = useState(false);
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
    }, []);

    useEffect(() => {
        var getClassSeen = () => {
            var arrUserSeen = messageLast?.seen;

            var seen = checkSeen(arrUserSeen, userLoginData.id);

            if (!seen && curSignIn.id !== messageLast.authorID.id && messageLast.idChat === groupChatSelect?.id) {
                setSeenState({
                    textName: ' font-semibold ',
                    textChatTitle: ' text-gray-900 ',
                    circleSeen: '',
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
                lastNameAuthor = 'Bạn';
            if (!!messageLast && messageLast.idChat === groupChatSelect?.id) {
                titleMess = messageLast.title || 'Đã gửi file';
                messCreatedAt = formatTimeAuto(messageLast.createdAt) || '';
                var fullNameAuthor = messageLast.authorID.fullName || '';
                if (messageLast.authorID.id === curSignIn.id) {
                    lastNameAuthor = 'Bạn';
                } else {
                    lastNameAuthor = getLastName(fullNameAuthor);
                }
                getClassSeen();
            }
            // var arrUserSeen = messageLast?.seen;
            // var seen = checkSeen(arrUserSeen, userLoginData.id);
            //css đã xem
            // if (seen) {
            //     setSeenState({
            //         bgSeen: 'hidden',
            //         textSeen: 'text-gray-900',
            //     });
            // }

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
                setMessageLast(getNewMess);
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
        if (!!groupChat) dispatch(selectGroup(groupChat));
        navigation.navigate('ChiTietTinNhan');
    };
    return (
        <>
            {!!itemDataChat ? (
                <View>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF" onPress={handleChiTietTinNhan}>
                        <View className=" mt-1 rounded-xl p-4 pl-6 pr-6 flex flex-row items-center">
                            <View className="overflow-hidden">
                                <Image
                                    style={{ width: 60, height: 60, resizeMode: 'contain' }}
                                    className="rounded-full"
                                    source={{
                                        uri: `${groupChat.avatar}`,
                                    }}
                                ></Image>
                                <View className="w-3 h-3 bg-lcn-green-1 rounded-full absolute right-1 bottom-0 "></View>
                            </View>
                            <View className="ml-4 w-4/6">
                                <Text className="font-semibold text-xl text-lcn-blue-5">{groupChat.name}</Text>
                                <View className="flex flex-row">
                                    <Text className={'text-sm ' + seenState.textChatTitle}>
                                        {itemDataChat.authorName}:
                                    </Text>
                                    <Text className={'text-sm ml-1 ' + seenState.textChatTitle}>
                                        {itemDataChat.title}
                                    </Text>
                                </View>
                            </View>
                            <View className="">
                                <Text></Text>
                                <View>
                                    <View className={'w-4 h-4 rounded-full ml-5 ' + seenState?.circleSeen}></View>
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
