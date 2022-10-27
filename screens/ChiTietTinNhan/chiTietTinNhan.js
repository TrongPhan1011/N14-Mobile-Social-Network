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
import React, { useState, useEffect, memo } from 'react';
import HeaderTinNhan from '../../components/HeaderTinNhan';
import ItemTinNhan from '../../components/ItemTinNhan';
import FooterTinNhan from '../../components/FooterTinNhan';
import { useNavigation } from '@react-navigation/native';
import { messageType } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemAddMember from '../../components/ItemAddMember/itemAddMember';
import { getMessageByIdChat } from '../../services/messageService';
import { getChatById } from '../../services/chatService';

export default memo(function ChiTietTinNhan() {
    const dispatch = useDispatch();
    const idGroupChatSelect = useSelector((state) => state.sidebarChatSlice.idGroupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const [chatResult, setChatResult] = useState([]);
    const [limitMessage, setLimitMessage] = useState(10);
    const [arrMessage, setArrMessage] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatById(idGroupChatSelect, accessToken, AxiosJWT);

            setChatResult(arrChat);
        };
        fetchChat();

        // if (!!arrMessageId.length > 0) {
        //     arrMessageId.map((id) => {
        //         const getMessage = async () => {
        //             const arr = await getMessageById(id, accessToken, AxiosJWT);

        //             setArrMessage(arr);
        //         };
        //         getMessage();
        //     });
        // }
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(idGroupChatSelect, limitMessage, accessToken, AxiosJWT);
            setArrMessage(listMess);
        };
        getListMessage();
    }, [idGroupChatSelect]);

    // var arrMessageId = [];

    // if (!!chatResult.message) {
    //     arrMessageId = chatResult.message;
    // }

    // if (arrMessageId.length > 0) {
    //     console.log(arrMessageId);
    // }

    //console.log(arrMessage);

    const handleChiTietTinNhan = () => {
        if (arrMessage.length > 0) {
            return arrMessage.map((item) => {
                if (item.authorID.id === currAuth._id) {
                    return (
                        <ItemTinNhan from="me" key={item.id} messageData={item} type={messageType.ALL}>
                            {item.title}
                        </ItemTinNhan>
                    );
                } else
                    return (
                        <ItemTinNhan key={item.id} messageData={item} type={messageType.ALL}>
                            {item.title}
                        </ItemTinNhan>
                    );
            });
        }
    };

    const navigation = useNavigation();
    return (
        // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="h-full flex-1">
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
            <ScrollView className="overflow-y-auto max-h-[83%] bg-white">
                <View className="">
                    {/* <ScrollView className="overflow-y-auto "> */}
                    <View className="h-32 w-full bg-white items-center p-2">
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
                    <View className="bg-white w-full">
                        {/* <ItemTinNhan from type={messageType.ALL}>
                            xin chào
                        </ItemTinNhan>
                        <ItemTinNhan type={messageType.GROUPCHAT}>ai đó</ItemTinNhan>
                        <ItemTinNhan from type={messageType.GROUPCHAT}>
                            ydhhdh dhhhh đhhdhdhdh đhdhdhhdh dhdhdhdhhdh dhdhdhdhhdh đjđ dhdhdhdh hdhdhdhd hdhđhhd
                            hdhđhhd hdhđhhd fjfffhhf hffhhffh fhfhfhh hfhfjgjghgh hfhf
                        </ItemTinNhan>
                        <ItemTinNhan type={messageType.ALL}>bye</ItemTinNhan>
                        <ItemTinNhan from>
                            ydhhdh dhhhh đhhdhdhdh đhdhdhhdh dhdhdhdhhdh dhdhdhdhhdh đjđ dhdhdhdh hdhdhdhd hdhđhhd
                            hdhđhhd hdhđhhd fjfffhhf hffhhffh fhfhfhh hfhfjgjghgh hfhf
                        </ItemTinNhan>
                        <ItemTinNhan from>
                            ydhhdh dhhhh đhhdhdhdh đhdhdhhdh dhdhdhdhhdh dhdhdhdhhdh đjđ dhdhdhdh hdhdhdhd hdhđhhd
                            hdhđhhd hdhđhhd fjfffhhf hffhhffh fhfhfhh hfhfjgjghgh hfhf
                        </ItemTinNhan>
                        <ItemAddMember>
                            <Text> đã rời nhóm</Text>
                        </ItemAddMember>
                        <ItemTinNhan from>
                            ydhhdh dhhhh đhhdhdhdh đhdhdhhdh dhdhdhdhhdh dhdhdhdhhdh đjđ dhdhdhdh hdhdhdhd hdhđhhd
                            hdhđhhd hdhđhhd fjfffhhf hffhhffh fhfhfhh hfhfjgjghgh hfhf
                        </ItemTinNhan>
                        <ItemAddMember>
                            <Text> đã tham gia nhóm</Text>
                        </ItemAddMember>
                        <ItemTinNhan>xin chào</ItemTinNhan> */}
                        {handleChiTietTinNhan()}
                    </View>
                    {/* </ScrollView> */}
                </View>
            </ScrollView>
            <View className="w-full absolute bottom-0">
                <FooterTinNhan />
            </View>
        </View>
        // </KeyboardAvoidingView>
    );
});
