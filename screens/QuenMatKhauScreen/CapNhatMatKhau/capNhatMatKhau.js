import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../../components/TextInputDN';
import Button from '../../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export default function CapNhatMatKhau() {
    const navigation = useNavigation();
    const [hidePassMK, setHidePassMK] = useState(true);
    const [hidePassXN, setHidePassXN] = useState(true);
    const showPassword = () => {
        secureTextEntry = 'false';
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
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Cập nhật mật khẩu</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu mới</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={hidePassMK ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu mới"
                            Icon2={
                                <Ionicons
                                    name="eye-outline"
                                    size={20}
                                    color="#47A9FF"
                                    onPress={() => setHidePassMK(!hidePassMK)}
                                />
                            }
                        ></TextInputDN>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Xác nhận lại mật khẩu</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={hidePassXN ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Xác nhận lại mật khẩu"
                            Icon2={
                                <Ionicons
                                    name="eye-outline"
                                    size={20}
                                    color="#47A9FF"
                                    onPress={() => setHidePassXN(!hidePassXN)}
                                />
                            }
                        ></TextInputDN>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={() => {
                                Alert.alert('Cập nhật thành công'), navigation.navigate('DangNhapScreen');
                            }}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Cập nhật</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
