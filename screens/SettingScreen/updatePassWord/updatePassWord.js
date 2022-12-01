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
import TextInputDN from '../../../components/TextInputDN';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '../../../utils/httpConfigRefreshToken';
import { sendOTP, getAuthByMail, checkOldPassword, updatePassword } from '../../../services/authService';
export default function UpdatePassWord() {
    const navigation = useNavigation();
    const [confirmPaswordValue, setConfirmPaswordValue] = useState('');
    const [hidePassMK, setHidePassMK] = useState(true);
    const [hidePassOld, setHidePassOld] = useState(true);
    const [hidePassXN, setHidePassXN] = useState(true);
    const [passwordValue, setPasswordValue] = useState('');
    const [validPassword, setValidPassword] = useState('opacity-0');
    const [validConfirmPassword, setvalidConfirmPassword] = useState('opacity-0');
    const [oldPassValue, setOldPassValue] = useState('');
    const [failUpdate, setFailUpdate] = useState('hidden');
    const [failLogin, setFailLogin] = useState('hidden');
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    //console.log(currAuth);

    const checkValidPassword = (dataPassword) => {
        var valuePassword = dataPassword.trim();
        setValidPassword('opacity-0');
        // console.log(valuePassword);
        if (valuePassword.length === 0 || !valuePassword.match(/^[A-Z]{1}[a-zA-Z0-9\.@ ]{5,}$/)) {
            setValidPassword('opacity-1');
            return '';
        } else {
            setValidPassword('opacity-0');
            return valuePassword;
        }
    };
    const handleSuaMatKhau = async (dataOldPass) => {
        var oldPass = dataOldPass.trim();
        var user = { userName: currAccount.userName, password: oldPass };
        var check = await checkOldPassword(user);

        if (check === true) {
            // console.log('Không trùng mật khẩu');
            setFailLogin('');
        } else {
            // console.log('Trùng mật khẩu');
            setFailLogin('hidden');
        }
        var valuePassword = checkValidPassword(passwordValue);
        if (!!valuePassword) {
            var user = { userName: currAccount.userName, password: valuePassword };
            var update = await updatePassword(user, dispatch);
            if (update === false) {
                setFailUpdate('');
            } else if (!!update) {
                Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công');
            }
        } else return false;
    };
    const checkConfirmPassword = (dataConfirmPassword) => {
        var valueConfirmPassword = dataConfirmPassword?.trim();
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
    const presentPass = async (dataOldPass) => {
        var oldPass = dataOldPass.trim();
        var user = { userName: currAccount.userName, password: oldPass };
        var check = await checkOldPassword(user);

        if (check === true) {
            // console.log('Không trùng mật khẩu');
            setFailLogin('');
        } else {
            // console.log('Trùng mật khẩu');
            setFailLogin('hidden');
        }
    };
    return (
        <ScrollView className="bg-white">
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View className="bg-white">
                    <View className="h-14 flex flex-row items-center justify-between">
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
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Đổi mật khẩu</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu cũ</Text>
                        <TextInputDN
                            secureTextEntry={hidePassOld ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu"
                            onChangeText={(oldPassValue) => {
                                setOldPassValue(oldPassValue);
                                //checkValidPassword(passwordValue);
                            }}
                            Icon2={
                                hidePassOld ? (
                                    <Ionicons
                                        name="eye"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassOld(!hidePassOld);
                                        }}
                                    />
                                ) : (
                                    <Ionicons
                                        name="eye-off"
                                        size={20}
                                        color="#47A9FF"
                                        onPress={() => {
                                            setHidePassOld(!hidePassOld);
                                        }}
                                    />
                                )
                            }
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + failLogin}>
                                Mật khẩu cũ không đúng!!!
                            </Text>
                        </View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu mới</Text>
                        <TextInputDN
                            secureTextEntry={hidePassMK ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập mật khẩu"
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
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validPassword}>
                                Mật khẩu phải chữ cái đầu viết hoa và tối thiểu 6 kí tự và không kí tự đặc biệt
                            </Text>
                        </View>
                    </View>
                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập lại mật khẩu</Text>
                        <TextInputDN
                            className={'w-full'}
                            secureTextEntry={hidePassXN ? true : false}
                            Icon={<Ionicons name="lock-closed" size={20} color="#47A9FF" />}
                            placeholder="Nhập lại mật khẩu"
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
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validConfirmPassword}>
                                Mật khẩu nhập lại không trùng khớp
                            </Text>
                        </View>
                    </View>

                    <View className="p-3 mt-2 flex flex-row justify-between">
                        <View>
                            <TouchableHighlight
                                className="rounded-3xl "
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <View className="bg-lcn-grey-1 h-8 w-32 rounded-3xl justify-center items-center  ">
                                    <Text className="text-white font-semibold text-lg ">Hủy</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View>
                            <TouchableHighlight
                                className="rounded-3xl "
                                // onPress={() => {
                                //     navigation.navigate('');
                                // }}
                                onPress={() => handleSuaMatKhau(oldPassValue)}
                            >
                                <View className="bg-lcn-blue-4 h-8 w-32 rounded-3xl justify-center items-center ">
                                    <Text className="text-white font-semibold text-lg ">Lưu</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
