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
import ThongBaoScreen from '../../screens/ThongBaoScreen';
const DATA = [
    {
        id: '1',
        title: 'Nguyễn Văn A',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '2',
        title: 'Nguyễn Văn B',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '3',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '4',
        title: 'Nguyễn Văn D',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '5',
        title: 'Nguyễn Văn E',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '6',
        title: 'Nguyễn Văn D',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '7',
        title: 'Nguyễn Văn D',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '8',
        title: 'Nguyễn Văn D',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
    {
        id: '9',
        title: 'Nguyễn Văn D',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
];

const Item = ({ title, uri }) => (
    <View>
        <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF" onPress={() => <ThongBaoScreen />}>
            <View className="flex flex-row bg-white mt-2 p-2 rounded-b-2xl rounded-t-2xl">
                <View className="flex flex-row items-center w-2/3">
                    <View>
                        <Image
                            style={{ height: 60, width: 60, resizeMode: 'contain' }}
                            className="rounded-full ml-4"
                            source={{ uri }}
                        ></Image>
                    </View>

                    <Text className="ml-3 text-xl font-semibold text-lcn-blue-5 ">{title}</Text>
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

export default function ItemBanBe() {
    const renderItem = ({ item }, rowmap) => <Item title={item.title} uri={item.uri} />;

    return (
        <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                // renderHidenItem = {renderHidenItem}
                keyExtractor={(item) => item.id}

                // leftOpenValue={75}
                // rightOpenValue={-75}
            />
        </SafeAreaView>
    );
}
