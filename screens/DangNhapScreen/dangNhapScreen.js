import { View, Text, SafeAreaView, StatusBar, Image, TextInput } from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../components/TextInputDN';
import Button from '../../components/Button/button';
import { useNavigation } from '@react-navigation/native';

export default function DangNhapScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className={'bg-white h-full'}>
                <View className=" p-2 w-1/4">
                    <Ionicons
                        name="arrow-back"
                        size={30}
                        color="#47A9FF"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
                <View className={'h-15 w-full flex justify-center items-center'}>
                    <Image source={logo} />
                </View>
                <View className={' mt-2 mb-6 items-center justify-center'}>
                    <Text className={'text-3xl font-semibold text-lcn-blue-5'}>Đăng nhập</Text>
                </View>
                <View className={'p-4'}>
                    <Text className={'text-lg font-semibold text-lcn-blue-5'}>Số điện thoại</Text>
                    <TextInputDN
                        Icon={<Ionicons name="call" size={20} color="#47A9FF" />}
                        placeholder="Nhập số điện thoại"
                    ></TextInputDN>
                </View>
                <View className={'p-4'}>
                    <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu</Text>
                    <TextInputDN
                        secureTextEntry={true}
                        Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                        placeholder="Nhập mật khẩu"
                    ></TextInputDN>
                </View>

                <View className={'mr-4 justify-center items-end'}>
                    <Text className={'text-lcn-blue-5 font-semibold text-base'}>Quên mật khẩu?</Text>
                </View>
                <View className={'p-3 items-center justify-center'}>
                    <Button
                        classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                        onPress={() => {
                            navigation.navigate('HomeTabBar');
                        }}
                    >
                        <Text className={'text-white font-semibold text-2xl'}>Đăng nhập</Text>
                    </Button>
                </View>

                <View className={' flex flex-row p-5 items-center justify-center'}>
                    <Text className={'text-lcn-blue-5 font-semibold text-base'}>Bạn chưa có tài khoản ? </Text>
                    <Text
                        className={'text-lcn-blue-4 font-semibold text-base'}
                        onPress={() => {
                            navigation.navigate('DangKyScreen');
                        }}
                    >
                        Đăng ký ngay
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
