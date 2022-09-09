import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
} from 'react-native';
import React from 'react';
import Button from '../Button/button';

export default function ItemThemBan() {
    return (
        <View>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF">
                <View className="flex flex-row bg-white mt-2 p-2 rounded-b-2xl rounded-t-2xl">
                    <View className="flex flex-row items-center w-3/4">
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
                    </View>
                    <View className=" flex flex-row justify-end items-center w-1/4 pr-4">
                        <View className={'ml-16'}>
                            <Button xacnhan onPress={() => Alert.alert('ggg')}>
                                <Text className={'text-white'}>Kết bạn</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
