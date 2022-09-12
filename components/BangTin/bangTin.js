import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function BangTin() {
    return (
        <View className="bg-white mt-2">
            <View className=" flex flex-row p-4 items-center">
                <View className="rounded-full overflow-hidden">
                    <Image
                        className="w-12 h-12 rounded-full"
                        source={{
                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                        }}
                    ></Image>
                </View>
                <View className="w-9/12">
                    <Text className="text-lcn-blue-5 text-xl font-semibold ml-1 pl-2">Văn Đúng</Text>
                </View>
                <View>
                    <Feather name="more-vertical" size={30} color="#47A9FF" />
                </View>
            </View>
            <View className="p-4">
                <Text className="break-words text-sm">
                    hjfhh hjdfhdf ydgdygd dygdygd yegyfgd wuqhusd ysgdhs sgadhjsd hsgdhjsd ysgdhs sgadhgs shdghs
                    jsgadhsg hsgdgs hshgdghjsgd shgdhsd hgsda sadggsafd gvdgsa gsfdghsd sadg
                </Text>
            </View>
            <View className="w-full h-60 flex justify-between pl-4 pr-4">
                <Image
                    className="h-60 w-full"
                    source={{
                        uri: 'https://i.pinimg.com/736x/52/55/44/5255445017cd98fd66d7d589e6c10f58.jpg',
                    }}
                ></Image>
            </View>
            <View className="p-4 flex flex-row max-w-[55%] justify-between">
                <View className="flex flex-row items-center">
                    <Feather name="heart" size={30} color="#FF0000" />
                    <Text className="pl-2 ">3K</Text>
                </View>
                <View className="flex flex-row items-center">
                    <FontAwesome name="commenting-o" size={30} color="#47A9FF" />
                    <Text className="pl-2 ">Bình luận</Text>
                </View>
            </View>
        </View>
    );
}
