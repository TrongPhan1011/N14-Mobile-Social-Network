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
        await acceptFriend(curUser.id, friendId, accessToken, axiosJWT);
    };
    const handleTuchoi = async () => {
        await declineFriend(curUser.id, friendId, accessToken, axiosJWT);
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

                        <View className=" flex flex-row items-end  justify-start ml-3 mb-1 ">
                            <View className={'mr-16'}>
                                <Button xacnhan onPress={() => Alert.alert('ggg')}>
                                    <Text className={'text-white'}>Xác nhận</Text>
                                </Button>
                            </View>
                            <View>
                                <Button xoa onPress={() => Alert.alert('oo')}>
                                    <Text className={'text-white'}>Xóa</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
export default memo(ItemChoXacNhan);
