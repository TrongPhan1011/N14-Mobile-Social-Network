import { View, Text, SafeAreaView, StatusBar, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../../components/TextInputDN';
import Button from '../../../components/Button/button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../services/authService';
export default function CapNhatMatKhau() {
    const navigation = useNavigation();
    const [hidePassMK, setHidePassMK] = useState(true);
    const [hidePassXN, setHidePassXN] = useState(true);
    const dispatch = useDispatch();
    const [validpassword, setValidPassword] = useState('opacity-0');
    const [validconfirmPassword, setvalidConfirmPassword] = useState('opacity-0');
    const [failUpdate, setFailUpdate] = useState('hidden');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPaswordValue, setConfirmPaswordValue] = useState('');
    var currentSignUpAccount = useSelector((state) => state.signUp.userSignUp);

    const checkValidPassword = (dataPassword) => {
        var valuePassword = dataPassword.trim();
        setValidPassword('opacity-0');
        // console.log(valuePassword);
        if (valuePassword.length === 0 || !/^[A-Z]{1}[a-zA-Z0-9\.@ ]{5,}$/) {
            setValidPassword('opacity-1');
            return '';
        } else {
            setValidPassword('opacity-0');
            return valuePassword;
        }
    };
    const checkConfirmPassword = (dataConfirmPassword) => {
        var valueConfirmPassword = dataConfirmPassword.trim();
        setvalidConfirmPassword('opacity-0');
        // console.log(valueConfirmPassword);

        if (valueConfirmPassword.length === 0 || valueConfirmPassword !== passwordValue.trim()) {
            setvalidConfirmPassword('opacity-1');
            return '';
        } else {
            setvalidConfirmPassword('opacity-0');
            return valueConfirmPassword;
        }
    };

    const handleSuaMatKhau = async () => {
        var valuePassword = checkConfirmPassword(confirmPaswordValue);
        if (!!validpassword && !!validconfirmPassword) {
            if (!!valuePassword) {
                var user = { userName: currentSignUpAccount.userName, password: valuePassword };
                var update = await updatePassword(user, dispatch);
                if (update) {
                    navigation.navigate('DangNhapScreen');
                }
                if (update === false) {
                    setFailUpdate('');
                }
            } else return false;
        }
    };

    const showPassword = () => {
        secureTextEntry = 'false';
    };

    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View className={' h-full bg-white'}>
                    <View className="h-14 flex flex-row items-center justify-between border border-b-2 border-t-0  border-blue-400">
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
                        <View className=" text-center items-center  ">
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Cập nhật mật khẩu</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu mới</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={hidePassMK ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu mới"
                            onChangeText={(passwordValue) => {
                                setPasswordValue(passwordValue);
                                checkValidPassword(passwordValue);
                            }}
                            Icon2={
                                hidePassMK ? (
                                    <Ionicons
                                        name="eye"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassMK(!hidePassMK);
                                        }}
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye-off"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassMK(!hidePassMK);
                                        }}
                                    />
                                )
                            }
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validpassword}>
                                Mật khẩu phải chữ cái đầu viết hoa và tối thiểu 6 kí tự và không kí tự đặc biệt
                            </Text>
                        </View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Xác nhận lại mật khẩu</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={hidePassXN ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Xác nhận lại mật khẩu"
                            onChangeText={(confirmPaswordValue) => {
                                setConfirmPaswordValue(confirmPaswordValue);
                                checkConfirmPassword(confirmPaswordValue);
                            }}
                            Icon2={
                                hidePassXN ? (
                                    <Ionicons
                                        name="eye"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassXN(!hidePassXN);
                                        }}
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye-off"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassXN(!hidePassXN);
                                        }}
                                    />
                                )
                            }
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validconfirmPassword}>
                                Mật khẩu phải có ít nhất 6 kí tự
                            </Text>
                        </View>
                    </View>
                    <View className={'p-3 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={handleSuaMatKhau}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Cập nhật</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}
