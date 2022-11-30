import { View, Text, SafeAreaView, StatusBar, TextInput, Alert } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import TextInputDN from '../../components/TextInputDN';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, register, verifyOtp, findBanAccount, banAccount } from '../../services/authService';
import { useState, useEffect } from 'react';
import { userSignUp } from '../../redux/Slice/signUpSlice';
import { sendOTP, getAuthByMail } from '../../services/authService';
import DangNhapScreen from '../DangNhapScreen/dangNhapScreen';
function Otp() {
    const navigation = useNavigation();
    const [banned, setBanned] = useState('');
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [countFail, setCountFail] = useState(0);
    const [validOTP, setValidOTP] = useState('opacity-0');
    var currentSignUpAccount = useSelector((state) => state.signUp.userSignUp);
    const userSelector = useSelector((state) => state.auth);
    const [countDown, setCountDown] = useState(180);
    var list = 'lll';

    const checkValidOTP = (dataOTP) => {
        const valueOTP = dataOTP.trim();

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
            Alert.alert('Mail đã đươc dùng!');
        }
    };
    const GuilaiOTP = async () => {
        var user = {
            userName: currentSignUpAccount.name,
            email: currentSignUpAccount.userName,
            password: currentSignUpAccount.password,
            birthday: currentSignUpAccount.birthday,
            gender: currentSignUpAccount.gender,
        };

        // đăng nhập thành công -->
        var register = await sendOTP(user, dispatch);
        setCountDown(180);
        Alert.alert('Đã gửi lại mã');
    };

    const handleRegister = async () => {
        var otpValue = checkValidOTP(otp);

        // var user = { userName: currentSignUpAccount.email, password: currentSignUpAccount.password };
        // // console.log(test.);
        // var login = await loginUser(user, dispatch);

        // if (login) {
        //     //s console.log(login);
        //     navigation.navigate('HomeTabBar');
        // }

        var dangKy = {
            userName: currentSignUpAccount.name,
            email: currentSignUpAccount.userName,
            password: currentSignUpAccount.password,
            birthday: currentSignUpAccount.birthday,
            gender: currentSignUpAccount.gender,
            otp: otpValue,
        };
        if (countFail === 10) {
            await banAccount(currentSignUpAccount.userName);
        }

        var registerHandle = await register(dangKy, dispatch);

        if (!!registerHandle) {
            await loginUser(registerHandle, dispatch);
            Alert.alert('Bạn đã đăng ký thành công!!');
            navigation.navigate('HomeTabBar');
        } else {
            if (countFail < 10) {
                Alert.alert('Mã OTP không đúng');
                setCountFail((preFail) => preFail + 1);
            }
        }
    };

    const handleVerify = async () => {
        var otpValue = checkValidOTP(otp);
        var user = {
            userName: currentSignUpAccount.userName,
            otp: otpValue,
        };
        // console.log(user);
        var thongBao = await verifyOtp(user);
        if (thongBao) {
            navigation.navigate('CapNhatMatKhau');
        } else if (!thongBao) {
            if (countFail < 10) {
                Alert.alert('Mã OTP không đúng');
                setCountFail((preFail) => preFail + 1);
            }
        }
    };
    // useEffect(() => {
    //     if (!!countDown) {
    //         const time = setInterval(() => {
    //             setCountDown((preSec) => preSec - 1);
    //             // console.log(countDown);
    //         }, 1000);
    //         // console.log(countDown);

    //         return () => clearInterval(time);
    //     }
    // }, [countDown]);

    useEffect(() => {
        // if(currentSignUpAccount.userName)
        const checkBan = async () => {
            const check = await findBanAccount(currentSignUpAccount.userName);
            // console.log(check);
            if (!!check) {
                // setBanned('blur-sm w-screen h-screen');
                Alert.alert(
                    'Thông báo',
                    'Hiện email đã bị tạm khoá do nhập sai quá nhiều lần xin bạn thử lại sau vài tiếng nữa',
                );
                // navigation.navigate(DangNhapScreen);
            } else {
                setBanned('');
            }
        };
        checkBan();

        if (countDown > 0 && countFail < 10 && banned === '') {
            const time = setInterval(() => {
                setCountDown((preSec) => preSec - 1);
                // console.log(countDown);
            }, 1000);
            // console.log(countDown);

            return () => clearInterval(time);
        }
    }, [countDown, countFail, banned]);

    const handleConfirmOtp = () => {
        if (phut == 0 && giay == 0) {
            Alert.alert('Mã xác thực đã hết thời gian');
        } else if (!!currentSignUpAccount.gender) {
            handleRegister();
        } else {
            handleVerify();
        }
    };
    const renderGuima = () => {
        if (phut == 0 && giay == 0) {
            return (
                <Text className={' mt-2 text-lcn-blue-4'} onPress={GuilaiOTP}>
                    Gửi lại mã
                </Text>
            );
        }
    };

    var phan_nguyen = countDown - (countDown % 60);
    var phut = phan_nguyen / 60;
    var giay = countDown % 60;

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
                        <Text>
                            Mã có hiệu lực trong : {phut}:{giay}
                        </Text>
                        <View>{renderGuima()}</View>
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
                            onPress={handleConfirmOtp}
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
