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
    FlatList,
} from 'react-native';
import React, { useState, useEffect, memo, useRef } from 'react';
import HeaderTinNhan from '../../components/HeaderTinNhan';
import HeaderTinNhanGroup from '../../components/HeaderTinNhanGroup';
import ItemTinNhan from '../../components/ItemTinNhan';
import FooterTinNhan from '../../components/FooterTinNhan';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemAddMember from '../../components/ItemAddMember/itemAddMember';
import { getMessageFileByIdChat, getMessageByIdChat } from '../../services/messageService';
import socket from '../../utils/getSocketIO';
import avatarDefault from '../../assets/avatarDefault.png';
import { getChatById } from '../../services/chatService';
import HeaderProfile from '../../components/HeaderProfile';
import MessageFile from '../../components/MessageFile/messageFile';
import { formatTimeAuto } from '../../lib/formatString';

export default memo(function FileGroup() {
    const dispatch = useDispatch();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [chatResult, setChatResult] = useState([]);
    const [limitMessage, setLimitMessage] = useState(60);
    const [arrMessage, setArrMessage] = useState([]);

    useEffect(() => {
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(groupChatSelect?.id, limitMessage, accessToken, axiosJWT);
            listMess.reverse();
            setArrMessage(listMess);
        };
        getListMessage();
    }, [groupChatSelect]);

    //console.log(arrMessage);

    const handleChiTietTinNhan = () => {
        if (arrMessage.length > 0) {
            return arrMessage.map((item, index) => {
                const files = item.file;
                if (!!files && files.length > 0) {
                    //console.log(item.createdAt);
                    var date = formatTimeAuto(item.createdAt);
                    return (
                        <View key={item.id + item.createdAt + index}>
                            <Text key={item.id + item.createdAt} className="m-2">
                                {date}
                            </Text>
                            <MessageFile key={item.id} data={files} />
                        </View>
                    );
                } else return <></>;
            });
        } else {
            return (
                <View>
                    <Text>Chưa có file hoặc ảnh lưu trữ nào</Text>
                </View>
            );
        }
    };

    const navigation = useNavigation();

    var img = avatarDefault;
    if (!!chatResult.avatar) {
        img = { uri: `${chatResult.avatar}` };
    }
    return (
        <View className="w-full h-full">
            <HeaderProfile userName={'Kho lưu trữ'}></HeaderProfile>
            <ScrollView
                className="overflow-y-auto h-full bg-white"
                // ref={bottomRef}
                // onContentSizeChange={() => bottomRef.current.scrollToEnd({ animated: true })}
            >
                <View className="">
                    <View className=" w-full flex justify-between h-full overflow-hidden p-3">
                        {handleChiTietTinNhan()}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});
