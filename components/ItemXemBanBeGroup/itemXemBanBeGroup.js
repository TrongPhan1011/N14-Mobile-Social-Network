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
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import { Checkbox } from 'react-native-paper';

import avatarDefault from '../../assets/avatarDefault.png';
import { useNavigation } from '@react-navigation/native';

export default function ItemXemBanBeGroup({ userId, name, avt, onPress, quanTriGroup }) {
    //const [tick, setTick] = useState(false);
    var hiddenQT = ' hidden ';
    var textQT = 'Thành viên';
    if (!!quanTriGroup) {
        hiddenQT = '';
        textQT = 'Quản trị viên';
    }
    const navigation = useNavigation();
    return (
        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl">
            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF" onPress={onPress}>
                <View className="flex flex-row bg-white  p-2 ">
                    <View className="flex flex-row items-center w-full">
                        <View>
                            <Image
                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                className="rounded-full ml-4"
                                source={{
                                    uri: `${avt}`,
                                }}
                            ></Image>
                        </View>

                        <View className="flex flex-col">
                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5">{name}</Text>
                            <Text className={'ml-3 text-gray-700'}>{textQT}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
