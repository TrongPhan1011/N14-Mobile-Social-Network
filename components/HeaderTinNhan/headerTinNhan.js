import { View, Text, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { getLastName } from '../../lib/formatString';
// import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import MenuTinNhan from '../MenuTinNhan';

export default function HeaderTinNhan({ onPressChiTiet, onPressCallVideo, onPressOpenMenu, name }) {
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
                        <Text className="font-semibold text-xl text-lcn-blue-5 ">{getLastName(name)}</Text>
                        <View className="w-3 h-3 bg-lcn-green-1 rounded-full ml-2 items-center mt-2"></View>
                    </View>
                    <Text className="text-sm text-gray-700">Online</Text>
                </View>
                <View className="ml-4">
                    <FontAwesome name="phone" size={30} color="#47A9FF" />
                </View>
                <View className="ml-4">
                    <FontAwesome name="video-camera" size={30} color="#47A9FF" onPress={onPressCallVideo} />
                </View>
                <View className="ml-4 relative">
                    <Feather name="info" size={30} color="#47A9FF" onPress={onPressOpenMenu} />

                    {/* <MenuTinNhan /> */}
                </View>
            </View>
        </SafeAreaView>
    );
}
