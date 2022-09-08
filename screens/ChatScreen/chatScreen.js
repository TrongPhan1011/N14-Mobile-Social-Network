import { View, Text, SafeAreaView, TouchableHighlight, Platform, StatusBar } from 'react-native';
import React from 'react';

import HeaderSearch from '../../components/HeaderSearch';
import ListItemChat from '../../components/ListItemChat';
import ChiTietTinNhan from '../ChiTietTinNhan';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ChatScreen() {
    return (
        <>
            <SafeAreaView>
                {/* phan trang chu tin nhan */}
                <HeaderSearch />
                <View className="bg-white h-full w-full">
                    <TouchableHighlight>
                        <ListItemChat />
                    </TouchableHighlight>
                </View>

                {/* phan chi tiet tin nhan */}
                {/* <ChiTietTinNhan /> */}
            </SafeAreaView>
        </>
    );
}
