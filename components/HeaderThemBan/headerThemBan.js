import { View, Text, SafeAreaView, TextInput } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Button/button';
export default function HeaderThemBan() {
    return (
        <>
            <SafeAreaView>
                <View className="h-14 flex flex-row items-center justify-between">
                    <View className=" ml-2 w-1/4">
                        <Ionicons name="arrow-back" size={30} color="#47A9FF" />
                    </View>
                    <View className=" text-center items-center  ">
                        <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Thêm bạn bè</Text>
                    </View>
                    <View className={'w-1/4'}></View>
                </View>
                <View className={'flex flex-row p-2'}>
                    <View className={'w-4/6'}>
                        <TextInput
                            className="ml-2 h-10 border border-blue-400 rounded-2xl"
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor={'#47A9FF'}
                        ></TextInput>
                    </View>
                    <View className={'w-2/6 justify-center items-center'}>
                        <Button xacnhan>
                            <Text className={'text-white'}>Tìm</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
