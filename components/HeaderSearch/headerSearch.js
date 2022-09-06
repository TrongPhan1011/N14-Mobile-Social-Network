import { View, Text, SafeAreaView, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function header() {
    return (
        <>
            <SafeAreaView>
                <View className="h-14 flex flex-row w-full items-center">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className="w-5/6 ml-2"
                        placeholder="Tìm kiếm"
                        placeholderTextColor={'#47A9FF'}
                    ></TextInput>
                    <View className="right-0">
                        <Feather name="plus" size={20} color="#47A9FF" />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
