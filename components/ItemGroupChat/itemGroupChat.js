import { View, Text, Image, TouchableHighlight, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useState } from 'react';

export default function ItemGroupChat() {
    const [checked, setChecked] = useState(false);
    return (
        <TouchableHighlight className="mt-1" onPress={() => Alert.alert('kk')}>
            <View className="flex flex-row items-center bg-white p-2">
                <View>
                    <Image
                        className="rounded-full ml-4 h-12 w-12"
                        source={{
                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                        }}
                    ></Image>
                </View>
                <View className="w-4/6">
                    <Text className="ml-3 text-xl font-semibold text-lcn-blue-5 ">Nguyễn Văn A</Text>
                </View>
                <RadioButton
                    value="false"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(checked ? false : true)}
                />
            </View>
        </TouchableHighlight>
    );
}
