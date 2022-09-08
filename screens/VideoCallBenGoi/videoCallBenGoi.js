import { View, Text, SafeAreaView, Platform, StatusBar, Image } from 'react-native';
import React from 'react';

export default function VideoCallBenGoi() {
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className="flex flex-col bg-lcn-blue-2 w-full h-full">
                <View className="flex flex-row pt-4">
                    <View className="w-3/5">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Nguyễn Văn B</Text>
                    </View>
                    <View className="border border-lcn-blue-4 rounded-xl h-44 w-36 bg-white"></View>
                </View>
                <View className="mt-20">
                    <Text className="font-semibold text-2xl text-lcn-blue-5 text-center">Video</Text>
                    <Text className="text-xl text-lcn-blue-4 text-center mt-4">1:33</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
