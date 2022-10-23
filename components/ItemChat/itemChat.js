import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageById } from '../../services/messageService';
import { addUserSeenToMess } from '../../services/messageService';
import { formatTime } from '../../lib/formatString';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';

export default memo(function itemChat({ groupChat, userLoginData }) {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const [messageLast, setMessageLast] = useState('');
    const currAuth = useSelector((state) => state.auth.currentUser);
    const idGroupChatSelect = useSelector((state) => state.sidebarChatSlice.idGroupChatSelect);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);

    var arrIdMessage = groupChat.message;

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

    var bgSeen = 'bg-lcn-blue-4';
    var textSeen = 'text-gray-900';

    const getInforMessageLast = () => {
        var titleMess = '',
            messCreatedAt = '',
            fullNameAuthor = '',
            arrAuthorName = [];
        if (!!messageLast) {
            titleMess = messageLast.title || '';
            messCreatedAt = formatTime(messageLast.createdAt, 'hh:mm') || '';
            fullNameAuthor = messageLast.authorID.fullName || '';

            arrAuthorName = fullNameAuthor.split(' ');
        }

        var arrUserSeen = messageLast.seen;
        var seen = checkSeen(arrUserSeen, userLoginData.id);
        //css đã xem
        if (seen) {
            bgSeen = 'hidden';
            textSeen = 'text-gray-700';
        }

        return {
            authorName: arrAuthorName[arrAuthorName.length - 1] || '',
            title: titleMess,
            messCreatedAt,
        };
    };
    var itemDataChat = getInforMessageLast();

    const putUserSeen = async (idMess, dataSeen) => {
        await addUserSeenToMess(idMess, dataSeen, accessToken, AxiosJWT);
    };

    const handleChiTietTinNhan = () => {
        var currentDate = new Date();
        var userClickSeen = {
            id: userLoginData.id,
            seenAt: currentDate,
        };

        var seen = checkSeen(messageLast.seen, userClickSeen.id);
        if (!seen) {
            putUserSeen(messageLast.id, userClickSeen);
        }
        //add id cua group chat duoc chon vao store
        if (!!groupChat) dispatch(selectGroup(groupChat.id));
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
                                    <Text className={'text-sm ' + textSeen}>{itemDataChat.authorName}:</Text>
                                    <Text className={'text-sm ml-1 ' + textSeen}>{itemDataChat.title}</Text>
                                </View>
                            </View>
                            <View className="">
                                <Text></Text>
                                <View>
                                    <View className={'w-4 h-4 rounded-full ml-5 ' + bgSeen}></View>
                                    <Text className={'text-sm ' + textSeen}> {itemDataChat.messCreatedAt}</Text>
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
