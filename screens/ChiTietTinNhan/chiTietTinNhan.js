import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
} from 'react-native';
import React, { useState, useEffect, memo, useRef } from 'react';
import HeaderTinNhan from '../../components/HeaderTinNhan';
import ItemTinNhan from '../../components/ItemTinNhan';
import FooterTinNhan from '../../components/FooterTinNhan';
import { useNavigation } from '@react-navigation/native';
import { messageType } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemAddMember from '../../components/ItemAddMember/itemAddMember';
import { getMessageByIdChat } from '../../services/messageService';
import socket from '../../utils/getSocketIO';
import { getChatById } from '../../services/chatService';

export default memo(function ChiTietTinNhan() {
    const dispatch = useDispatch();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const [chatResult, setChatResult] = useState([]);
    const [limitMessage, setLimitMessage] = useState(20);
    const [arrMessage, setArrMessage] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const bottomRef = useRef();

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
                };
                setArrivalMessage(getNewMess);
            }
        });
    }, []);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatById(groupChatSelect?.id, accessToken, AxiosJWT);

            setChatResult(arrChat);
        };
        fetchChat();
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(groupChatSelect?.id, limitMessage, accessToken, AxiosJWT);
            setArrMessage(listMess);
        };
        getListMessage();
    }, [groupChatSelect]);

    // useEffect(() => {
    //     const scrollToBottom = () => {
    //         if (arrMessage.length > 0) {
    //             bottomRef.current?.scrollToBottom({ behavior: 'smooth' });
    //         }
    //     };
    //     scrollToBottom();
    // }, [arrMessage]);

    //console.log(arrivalMessage);

    useEffect(() => {
        arrivalMessage &&
            groupChatSelect?.member.includes(arrivalMessage.authorID.id) &&
            setArrMessage((prev) => [...prev, arrivalMessage]);
    }, [groupChatSelect, arrivalMessage]);

    const handleChiTietTinNhan = () => {
        if (arrMessage.length > 0) {
            return arrMessage.map((item, index) => {
                // var isLastMess = false;
                // var indexLast = arrMessage.length - 1;
                // if (index === indexLast) isLastMess = true;

                if (item.authorID.id === currSignIn.id) {
                    return (
                        <ItemTinNhan from="me" key={index + item.authorID.id} messageData={item}>
                            {item.title}
                        </ItemTinNhan>
                    );
                } else
                    return (
                        <ItemTinNhan key={index + item.authorID.id} messageData={item}>
                            {item.title}
                        </ItemTinNhan>
                    );
            });
        }
    };

    const navigation = useNavigation();
    return (
        <View className="w-full h-full flex-1">
            <HeaderTinNhan
                onPressChiTiet={() => {
                    navigation.goBack();
                }}
                onPressCallVideo={() => {
                    navigation.navigate('VideoCall');
                }}
                onPressOpenMenu={() => navigation.navigate('GroupChatScreen')}
                name={chatResult.name}
            />

            <ScrollView
                className="overflow-y-auto max-h-[83%] bg-white"
                ref={bottomRef}
                onContentSizeChange={() => bottomRef.current.scrollToEnd({ animated: true })}
            >
                <View className="">
                    {/* <ScrollView className="overflow-y-auto "> */}
                    <View className="h-32 w-full items-center p-2">
                        <Image
                            style={{ width: 80, height: 80, resizeMode: 'contain' }}
                            className="rounded-full"
                            source={{
                                uri: `${chatResult.avatar}`,
                            }}
                        ></Image>
                        <View className="flex flex-row mt-2 items-center pt-2">
                            <Text className="font-semibold ">Bạn đã kết nối với</Text>
                            <Text className="text-lcn-blue-5 font-semibold ml-1">{chatResult.name}</Text>
                        </View>
                    </View>
                    <View className=" w-full">{handleChiTietTinNhan()}</View>
                    {/* </ScrollView> */}
                </View>
            </ScrollView>
            <View className="w-full absolute bottom-0">
                <FooterTinNhan />
            </View>
        </View>
    );
});
