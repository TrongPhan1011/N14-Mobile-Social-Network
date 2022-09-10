import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import HeaderSearch from '../../components/HeaderSearch';

export default function BangTinScreen() {
    return (
        <ScrollView className="">
            <HeaderSearch />
            <View className="bg-white flex flex-row p-4 items-center">
                <View className="rounded-full overflow-hidden">
                    <Image
                        className="w-14 h-14 rounded-full"
                        source={{
                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                        }}
                    ></Image>
                </View>
                <Text className="text-lcn-blue-5 text-xl font-semibold ml-1 pl-2">Van Dung</Text>
            </View>
        </ScrollView>
    );
}
