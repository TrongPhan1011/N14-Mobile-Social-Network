import { View, Text, SafeAreaView, Platform, StatusBar, Alert, Pressable } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
// import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import MenuTinNhan from '../MenuTinNhan';

export default function HeaderTinNhan({ onPressChiTiet, onPressCallVideo, onPressOpenMenu, name }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            className="bg-lcn-blue-2"
        >
            <View className="w-full h-14 flex flex-row items-center bg-lcn-blue-2 p-2">
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="#47A9FF" onPress={onPressChiTiet} />
                </View>
                <View className="w-6/12 ml-4">
                    <View className="flex flex-row">
                        <Text className="font-semibold text-xl text-lcn-blue-5 ">{name}</Text>
                        <View className="w-3 h-3 bg-lcn-green-1 rounded-full ml-2 items-center mt-2 hidden"></View>
                    </View>
                    <Text className="text-sm text-gray-700">Online</Text>
                </View>
                <View>
                    <Pressable onPress={() => navigation.navigate('ThemThanhVien')}>
                        <AntDesign name="addusergroup" size={30} color="#47A9FF" />
                    </Pressable>
                </View>
                <View className="ml-5">
                    <Feather name="search" size={30} color="#47A9FF" onPress={onPressCallVideo} />
                </View>
                <View className="ml-3 relative">
                    <AntDesign name="bars" size={30} color="#47A9FF" onPress={onPressOpenMenu} />

                    {/* <MenuTinNhan /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}
