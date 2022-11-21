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
} from 'react-native';
import React, { useState } from 'react';
import HeaderProfile from '../../../components/HeaderProfile';
import { Provider, Appbar, RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
export default function SettingScreenTaiKhoan() {
    const navigation = useNavigation();
    const [checked, setChecked] = useState('nam');
    const [isSelected, setSelection] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const dispatch = useDispatch();
    var curSignIn = useSelector((state) => state.signIn);
    console.log(curSignIn);
    return (
        <View className="bg-white">
            <View>
                <HeaderProfile>Thông Tin Chung</HeaderProfile>
            </View>
            <ScrollView>
                <View>
                    <View className="mt-6 ml-6 mb-1 w-5/6">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Tên người dùng:</Text>
                    </View>
                </View>

                <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-80 h-15 p-1.5 pl-6 pr-6 flex flex-row items-center bg-white">
                    <View className="overflow-hidden">
                        <FontAwesome name="user" size={20} color="#47A9FF" />
                    </View>
                    <View className="ml-4 w-4/6">
                        <TextInput className="font-semibold text-lg text-lcn-blue-5">Nguyễn Văn A</TextInput>
                    </View>
                </View>

                <View>
                    <View className="ml-6 mt-4 mb-1 w-5/6">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Số điện thoại:</Text>
                    </View>
                </View>
                <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 pl-6 pr-6 flex flex-row items-center bg-white">
                    <View className="overflow-hidden">
                        <FontAwesome name="phone" size={20} color="#47A9FF" />
                    </View>
                    <View className="ml-4 w-4/6">
                        <TextInput className="font-semibold text-lg text-lcn-blue-5">0587656378</TextInput>
                    </View>
                </View>
                <View>
                    <View className="ml-6 mt-4 mb-1 w-5/6">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Ngày sinh:</Text>
                    </View>
                </View>
                <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 pl-6 pr-6 flex flex-row items-center bg-white">
                    <View className="overflow-hidden">
                        <FontAwesome name="calendar" size={20} color="#47A9FF" />
                    </View>
                    <View className="ml-6 w-5/6">
                        <TextInput className="font-semibold text-lg text-lcn-blue-5">15-10-2001</TextInput>
                    </View>
                </View>
                <View>
                    <View className="ml-6 mt-4 mb-1 w-5/6">
                        <Text className="font-semibold text-xl text-lcn-blue-5">Địa chỉ:</Text>
                    </View>
                </View>
                <View className="border-solid border-x border-y border-sky-500 ml-4 rounded-3xl w-96 h-15 p-1.5 pl-6 pr-6 flex flex-row items-center bg-white">
                    <View className="overflow-hidden">
                        <FontAwesome name="map-marker" size={20} color="#47A9FF" />
                    </View>
                    <View className="ml-6 w-5/6">
                        <TextInput className="font-semibold text-lg text-lcn-blue-5">Lê Hoàng Phái</TextInput>
                    </View>
                </View>
                <View className={'p-4'}>
                    <Text className={'ml-2 text-lg font-semibold text-lcn-blue-5'}>Giới tính</Text>
                    <View className={'flex flex-row items-center justify-center'}>
                        <View className={'flex flex-row items-center mr-10'}>
                            <RadioButton
                                value="nam"
                                status={checked === 'nam' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('nam')}
                            />
                            <Text>Nam</Text>
                        </View>
                        <View className={'flex flex-row items-center mr-10'}>
                            <RadioButton
                                value="nu"
                                status={checked === 'nu' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('nu')}
                            />
                            <Text>Nữ</Text>
                        </View>
                        <View className={'flex flex-row items-center mr-10'}>
                            <RadioButton
                                value="khac"
                                status={checked === 'khac' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('khac')}
                            />
                            <Text>Khác</Text>
                        </View>
                    </View>
                </View>
                <View className="items-center p-6">
                    <TouchableHighlight
                        className="rounded-3xl "
                        onPress={() => {
                            navigation.navigate('');
                        }}
                    >
                        <View className="bg-lcn-blue-4 h-14 w-80 rounded-3xl items-center justify-center flex flex-row">
                            <Text className="text-white font-semibold text-2xl">Lưu</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
}
