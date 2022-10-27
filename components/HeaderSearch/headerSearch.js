import { View, Text, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ContentBanBe from '../../screens/FriendScreen/ContentBanBe';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function HeaderSearch() {
    const navigation = useNavigation();
    return (
        <>
            <SafeAreaView
                style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
                className="bg-white"
            >
                <View className="h-14 flex flex-row w-full items-center bg-white">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className="w-5/6 ml-2"
                        placeholder="Tìm kiếm"
                        placeholderTextColor={'#47A9FF'}
                    ></TextInput>
                    <View className="right-0">
                        <Feather
                            name="plus"
                            size={20}
                            color="#47A9FF"
                            onPress={() => navigation.navigate('ThemBanBe')}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
