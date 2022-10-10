import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../components/TextInputDN';
import Button from '../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import { useState, useRef } from 'react';
import { loginUser } from '../../services/authService';

import { useDispatch } from 'react-redux';

export default function DangNhapScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);

    // const [validEmail, setValidEmail] = useState('opacity-0');
    // const [validPassword, setValidPassword] = useState('opacity-0');
    // const [failLogin, setFailLogin] = useState('hidden');

    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const handleLogin = () => {
    //     var valueEmail = checkValidEmail();
    //     var valuePassword = checkValidPassword();

    //     if (!!valueEmail && !!validPassword) {
    //         var user = { userName: valueEmail, password: valuePassword };
    //         // đăng nhập thành công -->
    //         var login = loginUser(user, dispatch, navigation);
    //         if (!!login) {
    //             setFailLogin('');
    //         }
    //     } else return false;
    // };

    // const checkValidEmail = () => {
    //     var valueEmail = emailRef.current.value.trim();
    //     if (valueEmail.length === 0 || !valueEmail.match(/^[a-zA-Z._0-9]+@[a-z]+\.[a-z]+$/)) {
    //         setValidEmail('opacity-1');
    //         return '';
    //     } else {
    //         setValidEmail('opacity-0');
    //         return valueEmail;
    //     }
    // };
    // const checkValidPassword = () => {
    //     var valuePassword = passwordRef.current.value.trim();
    //     if (valuePassword.length === 0 || !valuePassword.match(/^[a-zA-Z0-9\.@ ]{6,}$/)) {
    //         setValidPassword('opacity-1');
    //         return '';
    //     } else {
    //         setValidPassword('opacity-0');
    //         return valuePassword;
    //     }
    // };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <ScrollView>
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
                            // ref={emailRef}
                        ></TextInputDN>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu</Text>
                        <TextInputDN
                            secureTextEntry={hidePass ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu"
                            // onChange={checkValidPassword}
                            // ref={passwordRef}
                            Icon2={
                                <Ionicons
                                    name="eye-outline"
                                    size={20}
                                    color="#47A9FF"
                                    onPress={() => setHidePass(!hidePass)}
                                />
                            }
                        ></TextInputDN>
                    </View>

                    <View className={'mr-4 justify-center items-end'}>
                        <Text
                            className={'text-lcn-blue-5 font-semibold text-base'}
                            onPress={() => {
                                navigation.navigate('QuenMatKhau');
                            }}
                        >
                            Quên mật khẩu?
                        </Text>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            // onPress={handleLogin}
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
            </ScrollView>
        </SafeAreaView>
    );
}
