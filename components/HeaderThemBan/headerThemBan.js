import { View, Text, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Button/button';
import { useNavigation } from '@react-navigation/native';

export default function HeaderThemBan() {
    const navigation = useNavigation();
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View className="h-14 flex flex-row items-center justify-between">
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
                        <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Thêm bạn bè</Text>
                    </View>
                    <View className={'w-1/4'}></View>
                </View>
                <View className={'flex flex-row  p-2 border border-b-2 border-t-0  border-lcn-blue-2'}>
                    <View className={'w-4/6'}>
                        <TextInput
                            className=" h-10 border  border-blue-400 rounded-3xl"
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor={'black'}
                            style={{ paddingLeft: 10 }}
                        ></TextInput>
                    </View>
                    <View className={'w-2/6 justify-center items-end'}>
                        <Button xacnhan>
                            <Text className={'text-white text-lg'}>Tìm</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
