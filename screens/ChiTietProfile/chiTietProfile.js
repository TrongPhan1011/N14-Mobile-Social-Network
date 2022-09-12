import { View, Text, Image } from 'react-native';
import React from 'react';

export default function ChiTietProfile() {
    return (
        <View className=" bg-white pb-3">
            <View className=" w-full items-center">
                <View className="w-full h-40 ">
                    <Image
                        className="h-full w-full"
                        source={{
                            uri: 'https://i.pinimg.com/736x/52/55/44/5255445017cd98fd66d7d589e6c10f58.jpg',
                        }}
                    ></Image>
                </View>
                <View className="overflow-hidden absolute top-24 rounded-full">
                    <Image
                        className="h-32 w-32  "
                        source={{
                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                        }}
                    ></Image>
                </View>
            </View>
            <View className="pt-20 w-full items-center">
                <Text className="font-semibold text-xl text-lcn-blue-5">Nguyen Van A</Text>
            </View>
        </View>
    );
}
