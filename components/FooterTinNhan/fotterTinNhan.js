import { View, Text, TextInput } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function fotterTinNhan() {
    return (
        <View className="h-2/6 flex flex-row items-center bg-white justify-center">
            <View className="ml-3">
                <AntDesign name="pluscircle" size={30} color="#47A9FF" />
            </View>
            <View className="ml-3">
                <FontAwesome name="file-image-o" size={30} color="#47A9FF" />
            </View>
            <View className=" ml-3 w-4/6 rounded-2xl p-1 border border-lcn-blue-4 bg-white">
                <TextInput placeholder="Tin nhắn"></TextInput>
            </View>
            <View className="ml-2">
                <FontAwesome name="send" size={30} color="#47A9FF" />
            </View>
        </View>
    );
}
