import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ItemQuanLyNhom = ({ icon, text, remove, onPress }) => {
    var removeText = ' text-lcn-blue-5 ';
    if (!!remove) removeText = ' text-red-600 ';
    return (
        <Pressable className="w-full h-14 bg-white flex flex-row items-center" onPress={onPress}>
            <View className="ml-6">{icon}</View>
            <Text className={'font-semibold text-lg ml-4' + removeText}>{text}</Text>
        </Pressable>
    );
};

export default ItemQuanLyNhom;
