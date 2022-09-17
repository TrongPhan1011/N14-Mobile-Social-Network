import { View, Text, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import MenuTinNhan from '../MenuTinNhan';

export default function HeaderTinNhan({ onPressChiTiet, onPressCallVideo, onPressOpenMenu }) {
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className="w-full h-14 flex flex-row items-center bg-lcn-blue-2 p-2">
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="#47A9FF" onPress={onPressChiTiet} />
                </View>
                <View className="w-7/12 ml-4">
                    <View>
                        <Text className="font-semibold text-xl text-lcn-blue-5">Nguyễn Văn A</Text>
                        <View className="w-3 h-3 bg-lcn-green-1 rounded-full absolute left-32 bottom-2 ml-1"></View>
                    </View>
                    <Text className="text-sm text-gray-700">Online</Text>
                </View>
                <View>
                    <FontAwesome name="phone" size={30} color="#47A9FF" />
                </View>
                <View className="ml-5">
                    <FontAwesome name="video-camera" size={30} color="#47A9FF" onPress={onPressCallVideo} />
                </View>
                <View className="ml-3 relative">
                    <Feather name="more-vertical" size={30} color="#47A9FF" onPress={onPressOpenMenu} />

                    {/* <MenuTinNhan /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}
