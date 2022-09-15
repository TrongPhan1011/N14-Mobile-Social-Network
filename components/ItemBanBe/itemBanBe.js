import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button,
    Alert,
    TouchableHighlight,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import avatarDefault from '../../assets/avatarDefault.png';

export default function ItemBanBe() {
    return (
        <View>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF">
                <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl">
                    <View className="flex flex-row items-center w-2/3">
                        <View>
                            <Image
                                style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                className="rounded-full ml-4"
                                source={{
                                    uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                                }}
                            ></Image>
                        </View>

                        <Text className="ml-3 text-xl font-semibold text-lcn-blue-5 ">Nguyễn Văn A</Text>
                        <View className="w-3 h-3 bg-lcn-green-1 rounded-full ml-3"></View>
                    </View>
                    <View className=" flex flex-row justify-end items-center w-1/3 pr-4">
                        <Ionicons name="call" size={30} color="#47A9FF" style={{ marginRight: 20 }}></Ionicons>
                        <FontAwesome name="video-camera" size={30} color="#47A9FF"></FontAwesome>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
