import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderProfile from '../../components/HeaderProfile';
import ItemGroupChat from '../../components/ItemGroupChat/itemGroupChat';
import ItemAvatarGroupChat from '../../components/ItemAvatarGroupChat';

export default function GroupChatScreen() {
    return (
        <SafeAreaView>
            <View className="bg-white h-full">
                <HeaderProfile>Tạo nhóm chat</HeaderProfile>
                <View className="h-10 flex flex-row items-center bg-white rounded-3xl m-2 pl-2 pr-2 border border-lcn-blue-4">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className="w-5/6 ml-2"
                        placeholder="Tìm tên hoặc số điện thoại"
                        placeholderTextColor={'#47A9FF'}
                    ></TextInput>
                </View>
                <View className="border-b border-gray-400"></View>
                <ScrollView className="">
                    <ItemGroupChat />
                    <ItemGroupChat />
                    <ItemGroupChat />
                    <ItemGroupChat />
                    <ItemGroupChat />
                    <ItemGroupChat />
                </ScrollView>
                <View className=" w-full h-16 border-t border-gray-400 flex flex-row items-center">
                    <View className="max-w-[80%]">
                        <ScrollView className="" horizontal={true}>
                            <View className="items-center flex flex-row">
                                <ItemAvatarGroupChat />
                                <ItemAvatarGroupChat />
                                <ItemAvatarGroupChat />
                                <ItemAvatarGroupChat />
                                <ItemAvatarGroupChat />
                                <ItemAvatarGroupChat />
                            </View>
                        </ScrollView>
                    </View>
                    <View className="absolute right-0 w-10">
                        <FontAwesome name="arrow-right" size={30} color="#47A9FF" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
