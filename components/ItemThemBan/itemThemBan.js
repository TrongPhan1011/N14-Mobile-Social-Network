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
import { useNavigation } from '@react-navigation/native';

export default function ItemThemBan({ userId, name, avt }) {
    const navigation = useNavigation();

    var img = avatarDefault;
    if (avt) {
        img = {
            uri: `${avt}`,
        };
    }

    const renderFriendItem = () => {
        return (
            <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl w-full">
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={() =>
                        navigation.navigate('ProfileScreen', {
                            userId,
                        })
                    }
                >
                    <View className="flex flex-row bg-white p-2 w-full">
                        <View className="flex flex-row items-center w-full">
                            <View>
                                <Image
                                    style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                    className="rounded-full ml-4"
                                    source={img}
                                ></Image>
                            </View>

                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 w-full">{name}</Text>
                            {/* <View className="w-2 h-2 bg-lcn-green-1 rounded-full ml-3 mb-2"></View> */}
                        </View>
                        {/* <View className=" flex flex-row justify-end items-center w-1/3 pr-4">
                            <Ionicons name="call" size={30} color="#47A9FF" style={{ marginRight: 20 }}></Ionicons>
                            <FontAwesome name="video-camera" size={30} color="#47A9FF"></FontAwesome>
                        </View> */}
                    </View>
                </TouchableHighlight>
            </View>
        );
    };
    return <>{renderFriendItem()}</>;
}
