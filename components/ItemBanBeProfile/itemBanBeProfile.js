import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button,
    Alert,
    TouchableHighlight,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import avatarDefault from '../../assets/avatarDefault.png';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getAllFriend } from '../../services/userService';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
export default function ItemBanBeProfile({}) {
    const navigation = useNavigation();

    const profile = useSelector((state) => state.friendSlice.friend);

    const userId = profile?.id;

    // console.log(userId);

    const dispatch = useDispatch();
    const [userFriend, setUserFriend] = useState([]);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(userId, accessToken, axiosJWT);

            setUserFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, [userId]);
    // console.log(userFriend);

    // var img = avatarDefault;
    // if () {
    //     img = {
    //         uri: `${avt}`,
    //     };
    // }

    const renderFriendItem = () => {
        if (userFriend.length > 0) {
            var img = avatarDefault;
            return userFriend.map((item) => {
                if (item?.profile?.urlAvartar) {
                    // img = item?.profile.urlAvartar;
                    img = {
                        uri: `${item?.profile.urlAvartar}`,
                    };
                }
                if (!item?.profile?.urlAvartar) {
                    img = avatarDefault;
                }
                if (!!item._id) {
                    var userId = '';
                    userId = item._id;
                }
                return (
                    <View key={item._id} className=" justify-between items-center ml-3 p-5 w-50 h-50 rounded-t-2xl">
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="#C6E4FF"
                            onPress={() =>
                                navigation.navigate('ProfileScreen', {
                                    userId,
                                })
                            }
                            // onPress={() => {
                            //     Alert.alert('oo');
                            //     console.log(user);
                            // }}
                        >
                            <View className="flex flex-col w-full bg-white rounded-b-2xl rounded-t-2xl">
                                <View className="justify-center items-center w-full">
                                    <View>
                                        <Image style={{ height: 100, width: 120 }} source={img}></Image>
                                    </View>
                                    <Text className=" text-xs  overflow-x-hidden font-semibold text-lcn-blue-5">
                                        {item.fullName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            });
        }
    };
    return <>{renderFriendItem()}</>;
}
