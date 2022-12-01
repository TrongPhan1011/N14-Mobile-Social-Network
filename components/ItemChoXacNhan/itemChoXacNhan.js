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

import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../Button/button';
import { useState, memo } from 'react';
import { acceptFriend, declineFriend } from '../../services/userService';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import avtDefault from '../../assets/avatarDefault.png';
import { addGroupChat } from '../../services/chatService';
function ItemChoXacNhan({ friendName, friendId, avt }) {
    const dispatch = useDispatch();

    const [xacNhan, setXacNhan] = useState(true);
    const [dongY, setDongY] = useState(true);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var img = avtDefault;
    if (avt) {
        img = {
            uri: `${avt}`,
        };
    }
    const handleDongY = async () => {
        await acceptFriend(curUser.id, friendId, accessToken, axiosJWT, dispatch);
        var newGroup = {
            name: ' ',
            userCreate: curUser.id,
            avatar: avt,

            typeChat: 'inbox',
            member: [curUser.id, friendId],
        };
        var newGroupFetch = await addGroupChat(newGroup, accessToken, axiosJWT);
        if (!!newGroupFetch) {
            dispatch(userLogin(newGroupFetch.userLogin));
            dispatch(currentChat(newGroupFetch.newChat));
            Alert.alert('Bạn đã có thể nhắn tin với người này');
        }
    };
    const handleTuchoi = async () => {
        await declineFriend(curUser.id, friendId, accessToken, axiosJWT);
    };
    const handleXacNhan = () => {
        if (dongY) {
            handleDongY();
            return (
                <View className=" flex flex-row items-end  justify-start ml-3 mb-1 ">
                    <Button
                        classNames={
                            ' w-40 text-gray-500 border-gray-500 m-0 rounded-2xl border h-7 bg-white flex items-center justify-center'
                        }
                        disabled
                    >
                        <Text>Đã đồng ý</Text>
                    </Button>
                </View>
            );
        } else {
            handleTuchoi();
            return (
                <View className=" flex flex-row items-end  justify-start ml-3 mb-1 ">
                    <Button
                        classNames={
                            ' w-40 text-gray-500 border-gray-500 m-0 rounded-2xl border h-7 bg-white flex items-center justify-center'
                        }
                        disabled
                    >
                        <Text>Đã xóa yêu cầu</Text>
                    </Button>
                </View>
            );
        }
    };

    return (
        <View>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF">
                <View className="flex flex-row bg-white mt-2 p-2 rounded-b-2xl rounded-t-2xl">
                    <View className="flex flex-row ">
                        <View>
                            <Image
                                style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                className="rounded-full ml-4"
                                source={img}
                            ></Image>
                        </View>
                    </View>
                    <View className={'ml-2'}>
                        <Text className="ml-3 mb-2 text-lg font-semibold text-lcn-blue-5 justify-start items-start mt-0">
                            {friendName}
                        </Text>
                        {xacNhan ? (
                            <View className=" flex flex-row items-center justify-start ml-2 mb-1 ">
                                <View className={'mr-16'}>
                                    <Button
                                        xacnhan
                                        onPress={() => {
                                            setXacNhan(false);
                                            setDongY(true);
                                        }}
                                    >
                                        <Text className={'text-white'}>Đồng ý</Text>
                                    </Button>
                                </View>
                                <View>
                                    <Button
                                        xoa
                                        onPress={() => {
                                            setXacNhan(false);
                                            setDongY(false);
                                        }}
                                    >
                                        <Text className={'text-white'}>Xóa</Text>
                                    </Button>
                                </View>
                            </View>
                        ) : (
                            handleXacNhan()
                        )}
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
export default memo(ItemChoXacNhan);
