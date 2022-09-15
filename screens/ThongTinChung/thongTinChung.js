import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ThongTinChung() {
    return (
        <ScrollView>
            <View className="flex flex-row items-center w-full pl-4 pr-4 pt-2">
                <View className="w-10 items-center">
                    <FontAwesome5 name="school" size={30} color="#47A9FF" />
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        Học tại trường Đại học Công nghiệp TP.HCM
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4">
                <View className="w-10 items-center">
                    <FontAwesome name="intersex" size={30} color="#47A9FF" />
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">Nam</Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4">
                <View className="w-10 items-center">
                    <FontAwesome name="mobile-phone" size={30} color="#47A9FF" />
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        0329218740
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4">
                <View className="w-10 items-center">
                    <FontAwesome name="birthday-cake" size={30} color="#47A9FF" />
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        10/1/2001
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
