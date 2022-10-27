import { View, Text, Image } from 'react-native';
import React from 'react';

export default function ItemAddMember({ children }) {
    return (
        <View className="w-full items-center m-2">
            <View className="bg-slate-200 items-center w-full rounded-3xl flex flex-row max-w-[70%] p-2">
                <Image
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                    className="rounded-full"
                    source={{
                        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                    }}
                ></Image>
                <View className="flex flex-row ml-2">
                    <Text className="font-semibold">Nguyễn Văn Đúng</Text>
                    {children}
                </View>
            </View>
        </View>
    );
}
