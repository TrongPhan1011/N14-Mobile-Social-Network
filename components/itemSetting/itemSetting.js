import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { logOutSuccess } from '../../redux/Slice/authSlice';
import { userLogin } from '../../redux/Slice/signInSlice';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const handleLogOut = async () => {
    await logout(dispatch, currAccount.accessToken, axiosJWT);
    dispatch(logOutSuccess());
    dispatch(userLogin(null));
    // navigate(config.routeConfig.signIn);
};

export default function ItemSetting() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View>
                <TouchableHighlight
                    className="rounded-3xl ml-3 mr-3 mb-3"
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={() => navigation.navigate('SettingScreenTaiKhoan')}
                >
                    <View className=" rounded-3xl p-3 flex-row items-center bg-lcn-blue-1">
                        <View>
                            <FontAwesome name="user" size={35} color="#47A9FF" />
                        </View>
                        <View className="ml-5 w-4/6">
                            <Text className="font-semibold text-xl text-lcn-blue-5">Tài Khoản</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    className="rounded-3xl ml-3 mr-3 mb-3"
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={() => navigation.navigate('')}
                >
                    <View className=" rounded-3xl p-3 flex-row items-center bg-lcn-blue-1">
                        <View>
                            <FontAwesome name="qrcode" size={35} color="#47A9FF" />
                        </View>
                        <View className="ml-4 w-4/6">
                            <Text className="font-semibold text-xl text-lcn-blue-5">QR code của bạn</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    className="rounded-3xl ml-3 mr-3 mb-3"
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={() => navigation.navigate('UpdatePassWord')}
                >
                    <View className="rounded-3xl p-3 flex-row items-center bg-lcn-blue-1">
                        <View>
                            <FontAwesome name="lock" size={35} color="#47A9FF" />
                        </View>
                        <View className="ml-4 w-4/6">
                            <Text className="font-semibold text-xl text-lcn-blue-5">Đổi mật khẩu</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    className="rounded-3xl ml-3 mr-3 mb-3"
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={() => navigation.navigate('')}
                >
                    <View className="rounded-3xl p-3 flex-row items-center bg-lcn-blue-1">
                        <View>
                            <FontAwesome name="ban" size={35} color="#47A9FF" />
                        </View>
                        <View className="ml-4 w-4/6">
                            <Text className="font-semibold text-xl text-red-700">Chặn</Text>
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    className="rounded-3xl ml-3 mr-3"
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={handleLogOut}
                >
                    <View className="rounded-3xl p-3 flex-row items-center bg-lcn-blue-1">
                        <View>
                            <FontAwesome name="sign-out" size={35} color="#47A9FF" />
                        </View>
                        <View className="ml-4 w-4/6">
                            <Text className="font-semibold text-xl text-red-700">Đăng xuất</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}
