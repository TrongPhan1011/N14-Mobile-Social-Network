import { View, Text, SafeAreaView, StatusBar, TextInput } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import TextInputDN from '../../../components/TextInputDN';
export default function MaXacThuc() {
    const navigation = useNavigation();
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
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Nhập mã xác thực</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>
                    <View className={'p-4 items-center'}>
                        <View>
                            <Ionicons name="mail-outline" size={30} color="#47A9FF" />
                        </View>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>
                            Mã xác thực đã được gửi đến Gmail
                        </Text>
                        <Text className={'text-base'}>09******78</Text>
                    </View>
                    <View className="text-center items-center justify-center flex flex-row">
                        <View className={'p-2 items-center justify-center'}>
                            <TextInputDN maxLength={6}></TextInputDN>
                        </View>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={() => {
                                navigation.navigate('CapNhatMatKhau');
                            }}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Xác nhận</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
