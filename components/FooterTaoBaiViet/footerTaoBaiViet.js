import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../Button/button';

export default function FooterTaoBaiViet() {
    return (
        <View className="flex flex-row justify-between pl-4 pr-4 pt-2 pb-2 items-center bg-lcn-blue-3 ">
            <View className="ml-2">
                <FontAwesome name="file-image-o" size={30} color="#47A9FF" />
            </View>
            <View className="">
                <MaterialIcons name="tag-faces" size={35} color="#47A9FF" />
            </View>
            <Button huy>
                <Text className="text-white font-semibold text-lg">Hủy</Text>
            </Button>
            <TouchableOpacity className="rounded-3xl">
                <View className="bg-lcn-blue-4 h-10 w-44 rounded-3xl items-center justify-center flex flex-row">
                    <View className="ml-2">
                        <FontAwesome name="send" size={20} color="#ffffff" />
                    </View>
                    <Text className="text-white font-semibold text-lg pl-4">Tạo bài viết</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
