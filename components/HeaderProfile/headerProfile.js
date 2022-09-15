import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { Children } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function HeaderProfile({ children }) {
    const navigation = useNavigation();
    return (
        <SafeAreaView
            className="bg-lcn-blue-2"
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
            <View className="h-14 flex flex-row w-full items-center justify-between bg-lcn-blue-2">
                <View className="ml-2 w-10">
                    <Ionicons
                        name="arrow-back-outline"
                        size={30}
                        color="#47A9FF"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
                <View className="">
                    <Text className="font-semibold text-xl text-lcn-blue-5">{children}</Text>
                </View>
                <View className="ml-2 w-10"></View>
            </View>
        </SafeAreaView>
    );
}
