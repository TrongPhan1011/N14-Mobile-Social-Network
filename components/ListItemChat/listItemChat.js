import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, memo } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/Slice/signInSlice';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { getChatByIdMember, getChatById } from '../../services/chatService';
import socket from '../../utils/getSocketIO';
import ItemChat from '../ItemChat';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';

export default memo(function ListItemChat() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [reRender, setReRender] = useState(true);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const userLoginData = useSelector((state) => state.signIn.userLogin);
    const currAuth = useSelector((state) => state.auth.currentUser);
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);

    const [chatResult, setChatResult] = useState([]);

    //new
    useEffect(() => {
        const resetGroupChat = async () => {
            var newCurChat = await getChatById(groupChatSelect?.id, currAuth.accessToken, AxiosJWT);
            if (newCurChat) dispatch(selectGroup(newCurChat));
        };

        socket.on('getMessage', (data) => {
            if (!!data) {
                console.log(data);
                if (data.type_mess === 'system') {
                    resetGroupChat();
                }
                setReRender(true);
            }
        });
    }, [socket]);

    // useEffect(() => {
    //     const fetchChat = async () => {
    //         const arrChat = await getChatByIdMember(userLoginData.id, currAuth.accessToken, AxiosJWT);

    //         setChatResult(arrChat);
    //     };
    //     fetchChat();
    // }, [userLogin]);
    useEffect(() => {
        const fetchChat = async () => {
            if (reRender) {
                const arrChat = await getChatByIdMember(userLoginData.id, currAuth.accessToken, AxiosJWT);

                if (!!arrChat) {
                    setChatResult(arrChat);

                    setReRender(false);
                }
            }
        };
        fetchChat();
    }, [userLoginData, reRender]);

    const handdleConnectSocket = (item) => {
        socket.emit('sendMessage', { receiverId: item.id, contentMessage: null });
    };

    const handleRenderChat = () => {
        if (chatResult.length > 0) {
            chatResult.sort((item1, item2) => item2.updatedAt.localeCompare(item1.updatedAt));
            if (groupChatSelect === null) {
                dispatch(selectGroup(chatResult[0]));
            }
            return chatResult.map((item) => {
                handdleConnectSocket(item);
                return <ItemChat key={item.id} groupChat={item} userLoginData={userLoginData} />;
            });
        } else return <></>;
    };

    return <ScrollView className="flex-1 overflow-y-auto max-h-[98%]">{handleRenderChat()}</ScrollView>;
});
