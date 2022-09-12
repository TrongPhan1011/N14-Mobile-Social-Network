import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function TaoBaiViet() {
    const navigation = useNavigation();
    return (
        <View className="w-full items-center bg-white p-2">
            <TouchableHighlight
                className="rounded-2xl"
                onPress={() => {
                    navigation.navigate('TaoBaiViet');
                }}
            >
                <View className="bg-lcn-blue-4 h-10 w-80 rounded-2xl items-center justify-center flex flex-row">
                    <View className="ml-2">
                        <FontAwesome name="send" size={20} color="#ffffff" />
                    </View>
                    <Text className="text-white font-semibold text-lg pl-4">Tạo bài viết</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}
