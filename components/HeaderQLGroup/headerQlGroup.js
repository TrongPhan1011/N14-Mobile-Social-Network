import { View, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import React, { Children } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function HeaderQlGroup({ children, btnName, onPress, remove }) {
    var bgRed = '';
    if (!!remove) bgRed = ' bg-red-600 ';
    const navigation = useNavigation();
    return (
        <SafeAreaView
            className="bg-lcn-blue-2"
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
            <View className="h-14 flex flex-row w-full items-center bg-lcn-blue-2">
                <View className="flex flex-row w-2/3">
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
                </View>
                <View className="ml-2 w-1/3">
                    <TouchableOpacity
                        className={' w-28  h-9 items-center justify-center rounded-3xl bg-lcn-blue-4' + bgRed}
                        onPress={onPress}
                    >
                        <Text className=" font-semibold text-white">{btnName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
