import { useNavigation } from '@react-navigation/native';
import React from 'react';
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
// import MainNavigator from '../../Router/Router';
import BangTinScreen from '../../screens/BangTinScreen';
import ItemChat from '../ItemChat';

const DATA = [
    {
        id: '1',
        title: 'Nguyễn Văn A',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '2',
        title: 'Nguyễn Văn B',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '3',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '4',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '5',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '6',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '8',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '9',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '10',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
    {
        id: '11',
        title: 'Nguyễn Văn C',
        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
        message: 'xin chào',
        from: 'bạn',
        gio: '11:22',
    },
];

const Item = ({ title, message, uri, from, gio, navigation }) => (
    <View>
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#C6E4FF"
            onPress={() => navigation.navigate('ChiTietTinNhan')}
        >
            <View className=" mt-1 rounded-xl p-4 pl-6 pr-6 flex flex-row items-center">
                <View className="overflow-hidden">
                    <Image
                        style={{ width: 60, height: 60, resizeMode: 'contain' }}
                        className="rounded-full"
                        source={{ uri }}
                    ></Image>
                    <View className="w-3 h-3 bg-lcn-green-1 rounded-full absolute right-1 bottom-0 "></View>
                </View>
                <View className="ml-4 w-4/6">
                    <Text className="font-semibold text-xl text-lcn-blue-5">{title}</Text>
                    <View className="flex flex-row">
                        <Text className="text-sm text-gray-700">{from}:</Text>
                        <Text className="text-sm text-gray-700 ml-1">{message}</Text>
                    </View>
                </View>
                <View className="">
                    <Text></Text>
                    <View>
                        <View className="w-4 h-4 bg-lcn-blue-4 rounded-full ml-5"></View>
                        <Text className="text-sm text-gray-700">{gio}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    </View>
);

// const HomeStack = createNativeStackNavigator();

export default function ListItemChat() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <Item
            title={item.title}
            message={item.message}
            from={item.from}
            gio={item.gio}
            uri={item.uri}
            navigation={navigation}
        />
    );
    return (
        <SafeAreaView>
            <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />

            {/* <ItemChat />
            <ItemChat />
            <ItemChat /> */}
        </SafeAreaView>
    );
}
