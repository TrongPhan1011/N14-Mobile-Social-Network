import { View, Text, Image, TouchableHighlight } from 'react-native';
import React from 'react';

export default function itemChat() {
    return (
        <View>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF">
                <View className=" mt-1 rounded-xl p-4 pl-6 pr-6 flex flex-row items-center">
                    <View className="overflow-hidden">
                        <Image
                            style={{ width: 60, height: 60, resizeMode: 'contain' }}
                            className="rounded-full"
                            source={{
                                uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                            }}
                        ></Image>
                        <View className="w-3 h-3 bg-lcn-green-1 rounded-full absolute right-1 bottom-0 "></View>
                    </View>
                    <View className="ml-4 w-4/6">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Nguyễn Văn Đúng</Text>
                        <View className="flex flex-row">
                            <Text className="text-sm text-gray-700">Bạn:</Text>
                            <Text className="text-sm text-gray-700 ml-1">Xin chào</Text>
                        </View>
                    </View>
                    <View className="">
                        <Text></Text>
                        <View>
                            <View className="w-4 h-4 bg-lcn-blue-4 rounded-full ml-5"></View>
                            <Text className="text-sm text-gray-700">22:00</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
