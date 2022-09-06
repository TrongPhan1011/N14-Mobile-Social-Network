import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '../../components/HeaderSearch';

export default function ThongBaoScreen() {
    return (
        <>
            <SafeAreaView />
            <Header />
            <View className="bg-blue-200 w-full h-full">
                <Text className="pt-80 text-center">Thông báo Screen</Text>
            </View>
        </>
    );
}
