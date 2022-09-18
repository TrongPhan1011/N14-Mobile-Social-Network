import { View, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function itemAvatarGroupChat() {
    return (
        <View>
            <View>
                <Image
                    className="rounded-full ml-4 h-12 w-12"
                    source={{
                        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                    }}
                ></Image>
            </View>
            <View className="absolute top-0 right-0">
                <FontAwesome name="remove" size={20} color="#FF0000" />
            </View>
        </View>
    );
}
