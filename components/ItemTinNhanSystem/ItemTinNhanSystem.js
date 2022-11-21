import { View, Text } from 'react-native';
import React from 'react';

const ItemTinNhanSystem = ({ children }) => {
    return (
        <View className="w-full flex items-center">
            <View className="w-64 rounded-2xl p-2 text-sm">
                <Text className="text-center text-xs font-medium text-gray-500">{children}</Text>
            </View>
        </View>
    );
};

export default ItemTinNhanSystem;
