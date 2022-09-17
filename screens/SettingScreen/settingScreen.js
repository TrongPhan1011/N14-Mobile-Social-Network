import { View, Text, SafeAreaView, TouchableHighlight, Image } from 'react-native';
import React from 'react';
import logo from '../../assets/logo.png';
import ItemSetting from '../../components/itemSetting';
export default function SettingScreen() {
    return (
        <>
            <SafeAreaView />
            <View className="bg-white w-full h-full">
                <View className={'mt-10 h-15 w-full flex justify-center items-center'}>
                    <Image source={logo} />
                </View>
                <TouchableHighlight>
                    <ItemSetting />
                </TouchableHighlight>
            </View>
        </>
    );
}
