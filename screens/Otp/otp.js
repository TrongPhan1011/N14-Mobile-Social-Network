import { View, Text, SafeAreaView, StatusBar, TextInput, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import TextInputDN from '../../components/TextInputDN';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, register } from '../../services/authService';
import { useState } from 'react';
import { userSignUp } from '../../redux/Slice/signUpSlice';
function Otp() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [validOTP, setValidOTP] = useState('opacity-0');
    const currentSignUpAccount = useSelector((state) => state.signUp.userSignUp);
    const userSelector = useSelector((state) => state.auth);

    const checkValidOTP = (dataOTP) => {
        var valueOTP = dataOTP.trim();

        if (valueOTP.length === 0 || !valueOTP.match(/^[0-9]{6}$/)) {
            setValidOTP('opacity-1');
            return '';
        } else {
            setValidOTP('opacity-0');
            return valueOTP;
        }
    };
    const checkEmail = async () => {
        const checkMail = await User.findOne({ email: req.body.email });
        if (checkEmail) {
            Alert.alert('Mail đã đươc');
        }
    };

    const handleRegister = async () => {
        var otpValue = checkValidOTP(otp);
        console.log(currentSignUpAccount);

        // var user = { userName: currentSignUpAccount.email, password: currentSignUpAccount.password };
        // // console.log(test.);
        // var login = await loginUser(user, dispatch);

        // if (login) {
        //     //s console.log(login);
        //     navigation.navigate('HomeTabBar');
        // }

        var dangKy = {
            userName: currentSignUpAccount.userName,
            email: currentSignUpAccount.email,
            password: currentSignUpAccount.password,
            birthday: currentSignUpAccount.birthday,
            gender: currentSignUpAccount.gender,
            otp: otpValue,
        };

        var registerHandle = await register(dangKy, dispatch);

        if (registerHandle) {
            navigation.navigate('DangNhapScreen');
        } else {
            Alert.alert('Mã OTP không đúng');
        }
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
                            <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Nhập mã xác thực</Text>
                        </View>
                        <View className={'w-1/4'}></View>
                    </View>
                    <View className={'p-4 items-center'}>
                        <View>
                            <Ionicons name="mail-outline" size={30} color="#47A9FF" />
                        </View>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>
                            Mã xác thực đã được gửi đến Gmail
                        </Text>
                        <Text className={'text-base items-center justify-center text-center'}>
                            Để bảo mật tài khoản của bạn, LCN muốn xác minh danh tính của bạn. LCN sẽ gửi một Email kèm
                            mã xác minh gồm 6 chữ số.
                        </Text>
                    </View>
                    <View className="text-center items-center justify-center flex flex-row">
                        <View className={'p-2  justify-center'}>
                            <TextInputDN
                                onChangeText={(otp) => {
                                    checkValidOTP(otp);
                                    setOtp(otp);
                                }}
                            ></TextInputDN>
                            <View>
                                <Text className={'absolute z-10 text-red-500 text-sm w-full pt-0 ' + validOTP}>
                                    OTP phải gồm 6 số!
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className={'p-5 items-center justify-center'}>
                        <Button
                            classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                            onPress={handleRegister}
                        >
                            <Text className={'text-white font-semibold text-2xl'}>Xác nhận</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

export default Otp;
