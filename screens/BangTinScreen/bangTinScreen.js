import { View, Text } from 'react-native';
import React from 'react';
import HeaderSearch from '../../components/HeaderSearch';

export default function BangTinScreen() {
    return (
        <View>
            <HeaderSearch />
            <View className="bg-lcn-blue-2 w-full h-full">
                <Text className="text-center">bangTinScreen</Text>
            </View>
        </View>
    );
}
