import { View, Text, SafeAreaView, StatusBar, Image, ScrollView, Input, TextInput, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import logo from '../../assets/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../components/TextInputDN';
import Button from '../../components/Button/button';
import { Button as Btn } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import React, { useState } from 'react';
import moment from 'moment';
export default function DangKyScreen() {
    const navigation = useNavigation();
    const [checked, setChecked] = useState('nam');
    const [tick, setTick] = React.useState(false);
    const [isSelected, setSelection] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    // let NewDate = moment(new Date()).format('DD/MM/YYYY');
    // NewDate = NewDate.split('T')[0];
    // const [date, setDate] = useState(NewDate);

    const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className={'bg-white h-full'}>
                <ScrollView>
                    <View className=" p-2 w-1/4">
                        <Ionicons
                            name="arrow-back"
                            size={30}
                            color="#47A9FF"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <View className={'h-15 w-full flex justify-center items-center'}>
                        <Image source={logo} />
                    </View>
                    <View className={' mt-2 mb-6 items-center justify-center'}>
                        <Text className={'text-3xl font-semibold text-lcn-blue-5'}>Đăng ký</Text>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Tên người dùng</Text>
                        <TextInputDN
                            Icon={<Ionicons name="person" size={20} color="#47A9FF" />}
                            placeholder="Tên người dùng"
                        ></TextInputDN>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Số điện thoại</Text>
                        <TextInputDN
                            Icon={<Ionicons name="call" size={20} color="#47A9FF" />}
                            placeholder="Nhập số điện thoại"
                        ></TextInputDN>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu</Text>
                        <TextInputDN
                            secureTextEntry={true}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu"
                        ></TextInputDN>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập lại mật khẩu</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={true}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập lại mật khẩu"
                        ></TextInputDN>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Ngày sinh</Text>
                        <TextInputDN
                            className={'w-full'}
                            // secureTextEntry={true}
                            Icon={<Ionicons name="calendar" size={20} color="#47A9FF" onPress={showDatepicker} />}
                            onChangeText={(date) => setDate(date)}
                            value={
                                date.getDate().toString() +
                                '/' +
                                (date.getMonth() + 1).toString() +
                                '/' +
                                date.getFullYear().toString()
                            }
                        ></TextInputDN>
                        {show && (
                            <RNDateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                // mode={mode}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Giới tính</Text>
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

                    <View className={'p-4'}>
                        <View className={'flex flex-row items-center justify-center'}>
                            <Checkbox
                                status={tick ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setTick(!tick);
                                }}
                            />

                            <View>
                                <Text className={'text-lg text-lcn-blue-5 '}>
                                    Tôi đã đọc kỹ và đồng ý với các điều khoản
                                </Text>
                                <Text className={'text-lg text-lcn-blue-4'}>Tìm hiểu thêm</Text>
                            </View>
                        </View>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={() => {
                                navigation.navigate('DangNhapScreen');
                            }}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Đăng ký</Text>
                        </Button>
                    </View>

                    <View className={' flex flex-row p-5 items-center justify-center'}>
                        <Text className={'text-lcn-blue-5 font-semibold text-base'}>Bạn đã có tài khoản ? </Text>
                        <Text
                            className={'text-lcn-blue-4 font-semibold text-base'}
                            onPress={() => {
                                navigation.navigate('DangNhapScreen');
                            }}
                        >
                            Đăng nhập ngay
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
