import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderThemBan from '../../components/HeaderThemBan/headerThemBan';

export default function themBan() {
    return (
        <>
            <SafeAreaView>
                <HeaderThemBan />
                <View className="bg-white h-full w-full">
                    <Text>aaa</Text>
                </View>
            </SafeAreaView>
        </>
    );
}
