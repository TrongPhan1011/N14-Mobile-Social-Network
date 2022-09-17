import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Keyboard,
    Alert,
    TextInput,
    TouchableHighlight,
    Placeholder,
} from 'react-native';
import React from 'react';
import HeaderProfile from '../../../components/HeaderProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function UpdatePassWord() {
    const navigation = useNavigation();
    return (
        <View className="bg-white">
            <HeaderProfile>Cập nhật mật khẩu</HeaderProfile>
            <View>
                <View className="ml-6 mb-1 mt-1 w-5/6">
                    <Text className="font-semibold text-xl text-lcn-blue-5">Mật khẩu hiện tại của bạn:</Text>
                </View>
            </View>
            <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 flex flex-row items-center bg-white">
                <View className="ml-4 w-4/6 items-center flex flex-row">
                    <TextInput
                        className="font-semibold text-lg text-lcn-blue-5 w-64 "
                        secureTextEntry={true}
                        value="123123123"
                    ></TextInput>
                    <View className="overflow-hidden ml-10">
                        <FontAwesome
                            name="eye"
                            size={25}
                            color="#47A9FF"
                            onPress={() => {
                                navigation.navigate('');
                            }}
                        />
                    </View>
                </View>
            </View>
            <View>
                <View className="ml-6 mb-1 mt-1 w-5/6">
                    <Text className="font-semibold text-xl text-lcn-blue-5">Mật khẩu mới:</Text>
                </View>
            </View>
            <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 flex flex-row items-center bg-white">
                <View className="ml-4 w-4/6 items-center flex flex-row">
                    <TextInput
                        className="font-semibold text-lg text-lcn-blue-5 w-64 "
                        secureTextEntry={true}
                        value="123123123"
                    ></TextInput>
                    <View className="overflow-hidden ml-10">
                        <FontAwesome
                            name="eye"
                            size={25}
                            color="#47A9FF"
                            onPress={() => {
                                navigation.navigate('');
                            }}
                        />
                    </View>
                </View>
            </View>
            <View>
                <View className="ml-6 mb-1 mt-1 w-5/6">
                    <Text className="font-semibold text-xl text-lcn-blue-5">Xác nhận lại mật khẩu:</Text>
                </View>
            </View>
            <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 flex flex-row items-center bg-white">
                <View className="ml-4 w-4/6 items-center flex flex-row">
                    <TextInput
                        className="font-semibold text-lg text-lcn-blue-5 w-64 "
                        secureTextEntry={true}
                        value="123123123"
                    ></TextInput>
                    <View className="overflow-hidden ml-10">
                        <FontAwesome
                            name="eye"
                            size={25}
                            color="#47A9FF"
                            onPress={() => {
                                navigation.navigate('');
                            }}
                        />
                    </View>
                </View>
            </View>
            <View className="p-6 mt-10 flex flex-row justify-between">
                <View>
                    <TouchableHighlight
                        className="rounded-3xl "
                        onPress={() => {
                            navigation.navigate('');
                        }}
                    >
                        <View className="bg-lcn-grey-1 h-12 w-40 rounded-3xl justify-center items-center  ">
                            <Text className="text-white font-semibold text-2xl ">Hủy</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight
                        className="rounded-3xl "
                        onPress={() => {
                            navigation.navigate('');
                        }}
                    >
                        <View className="bg-lcn-blue-4 h-12 w-40 rounded-3xl justify-center items-center ">
                            <Text className="text-white font-semibold text-2xl ">Lưu</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}
