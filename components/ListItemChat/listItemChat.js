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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/Slice/signInSlice';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { getChatByIdMember } from '../../services/chatService';
import ItemChat from '../ItemChat';

export default memo(function ListItemChat() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const userLoginData = useSelector((state) => state.signIn.userLogin);
    const currAuth = useSelector((state) => state.auth.currentUser);
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);

    const [chatResult, setChatResult] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatByIdMember(userLoginData.id, currAuth.accessToken, AxiosJWT);

            setChatResult(arrChat);
        };
        fetchChat();
    }, []);

    const handleRenderChat = () => {
        if (chatResult.length > 0)
            return chatResult.map((item) => <ItemChat key={item.id} groupChat={item} userLoginData={userLoginData} />);
        else return <></>;
    };

    return (
        <SafeAreaView>
            {/* <ItemChat />
            <ItemChat />
            <ItemChat /> */}
            {handleRenderChat()}
        </SafeAreaView>
    );
});
