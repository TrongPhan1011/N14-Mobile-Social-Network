import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../../components/TextInputDN';
import Button from '../../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { sendOTP } from '../../../services/authService';
import { getAuthByMail } from '../../../services/authService';
export default function QuenMatKhau() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [checkMail, setCheckMail] = useState('opacity-0');
    const [emailValue, setEmailValue] = useState('');
    const handleCheckMail = async () => {
        const email = emailValue.trim();

        var userGeted = await getAuthByMail(email);

        if (!userGeted) {
            setCheckMail('opacity-1');
        } else {
            setCheckMail('opacity-0');
            sendOTP(userGeted, dispatch);
            navigation.navigate('Otp');
        }
    };
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View className={' h-full bg-white'}>
                    <View className="h-14 flex flex-row items-center justify-between border border-b-2 border-t-0  border-blue-400">
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
                        <View className=" text-center items-center  ">
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Quên mật khẩu</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập email để nhận mã xác nhận</Text>
                        <TextInputDN
                            className={'w-full'}
                            Icon={<Ionicons name="mail" size={20} color="#47A9FF" />}
                            placeholder="Nhập email"
                            onChangeText={(emailValue) => {
                                setEmailValue(emailValue);
                            }}
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm w-full pt-0 ' + checkMail}>
                                Không tìm thấy email
                            </Text>
                        </View>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={handleCheckMail}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Tiếp tục</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
