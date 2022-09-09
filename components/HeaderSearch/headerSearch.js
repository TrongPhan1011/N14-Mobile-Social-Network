import { View, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ContentBanBe from '../../screens/FriendScreen/ContentBanBe';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
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
