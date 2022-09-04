import { View, Text, SafeAreaView, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default function header() {
    return (
        <>
            <SafeAreaView>
                <View className="bg-blue-300 mt-9 h-14 flex flex-row w-full items-center align-middle justify-items-center">
                    <Ionicons name="search" size={20} />
                    <TextInput className="w-72" placeholder="Tìm kiếm"></TextInput>
                    <Ionicons className="right-0" name="person-add" size={20} />
                </View>
            </SafeAreaView>
        </>
    );
}
