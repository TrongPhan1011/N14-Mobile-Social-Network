import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    Input,
    TextInput,
    Alert,
    ViewComponent,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import logo from '../../assets/logo.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../components/TextInputDN';
import Button from '../../components/Button/button';
import { connect, useDispatch, useSelector } from 'react-redux';

import { RadioButton } from 'react-native-paper';
import { sendOTP, getAuthByMail } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import React from 'react';
import { useState, memo, useEffect } from 'react';
import moment from 'moment';
function DangKyScreen() {
    const [hidePassMK, setHidePassMK] = useState(true);
    const [hidePassXN, setHidePassXN] = useState(true);
    const navigation = useNavigation();
    const [checked, setChecked] = useState('Nam');
    const [tick, setTick] = React.useState(false);
    const [isSelected, setSelection] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(true);
    const [nameValue, setNameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPaswordValue, setConfirmPaswordValue] = useState('');

    const dispatch = useDispatch();

    const [validEmail, setValidEmail] = useState('opacity-0');
    const [validName, setvalidName] = useState('opacity-0');
    const [validPassword, setValidPassword] = useState('opacity-0');
    const [validConfirmPassword, setvalidConfirmPassword] = useState('opacity-0');
    const [validDate, setValidDate] = useState('opacity-0');
    const [failLogin, setFailLogin] = useState('hidden');

    const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        if (new Date().getFullYear() - currentDate.getFullYear() > 16) {
            setValidDate('opacity-0');
        } else {
            setValidDate('opacity-1');
        }
    };
    const showMode = (currentMode) => {
        setShow(true);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const currentAccount = useSelector((state) => state.auth.currentUser);

    const currentSignUpAccount = useSelector((state) => state.signUp);

    useEffect(() => {
        if (currentSignUpAccount.userSignUp !== null) {
            // var dataTemp = currentSignUpAccount.userSignUp;
            // userRef.current.value = dataTemp.userName;
            // emailRef.current.value = dataTemp.email;
            // passwordRef.current.value = dataTemp.password;
            // confirmPaswordRef.current.value = dataTemp.password;
            // dateRef.current.value = dataTemp.date;
        }
    }, []);

    const checkValidName = (dataName) => {
        var valueName = dataName.trim();
        if (
            valueName.length === 0 ||
            !valueName.match(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
            )
        ) {
            setvalidName('opacity-1');
            return '';
        } else {
            setvalidName('opacity-0');
            return valueName;
        }
    };

    const checkValidEmail = (dataEmail) => {
        var valueEmail = dataEmail.trim();

        if (valueEmail.length === 0 || !valueEmail.match(/^[a-zA-Z._0-9]+@[a-z]+\.[a-z]+$/)) {
            setValidEmail('opacity-1');
            return '';
        } else {
            setValidEmail('opacity-0');
            return valueEmail;
        }
    };

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
    const checkExistEmail = async (dataEmail) => {
        var valueEmail = dataEmail.trim();

        var userGeted = await getAuthByMail(valueEmail);
        if (!!userGeted) {
            setFailLogin('');
        } else setFailLogin('hidden');
    };

    // if (date.getDate().toString().length === 1) {
    //     console.log('0' + date.getDate().toString());
    //     ngaySinh = '0' + date.getDate().toString();
    // }
    if (date.getDate() < 10) {
        var ngaySinh = '0' + date.getDate().toString();
    } else {
        ngaySinh = date.getDate().toString();
    }

    if (date.getMonth() + 1 < 10) {
        var thangSinh = '0' + (date.getMonth() + 1).toString();
    } else {
        thangSinh = (date.getMonth() + 1).toString();
    }

    const birthday = date.getFullYear().toString() + '-' + thangSinh + '-' + ngaySinh;

    const handleRegister = async () => {
        var valueEmail = checkValidEmail(emailValue);
        var valuePassword = checkValidPassword(passwordValue);
        var valueConfirmPassword = checkConfirmPassword(confirmPaswordValue);
        var valueName = checkValidName(nameValue);
        // var valueDate = checkDate(date);
        // var gender = selectedRadioBtn;
        // console.log(gender);

        if (
            validPassword === 'opacity-0' &&
            validName === 'opacity-0' &&
            validEmail === 'opacity-0' &&
            validConfirmPassword === 'opacity-0'
        ) {
            if (new Date().getFullYear() - date.getFullYear() < 18) {
                setValidDate('opacity-1');
            } else {
                setValidDate('opacity-0');
                if (tick) {
                    var user = {
                        name: valueName,
                        userName: valueEmail,
                        password: valuePassword,
                        birthday: birthday,
                        gender: checked,
                    };

                    // đăng nhập thành công -->
                    var register = await sendOTP(user, dispatch);
                    if (!register) {
                        setFailLogin('');
                    }
                    // console.log(register);
                    if (register) {
                        //  console.log(currentSignUpAccount);
                        navigation.navigate('Otp');
                    }
                } else {
                    Alert.alert('Đồng ý với điều khoản của chương trình');
                }
            }
        } else {
            Alert.alert('Thông tin nhập vào không phù hợp');
            return false;
        }
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
                            onChangeText={(nameValue) => {
                                checkValidName(nameValue);
                                setNameValue(nameValue);
                            }}
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validName}>
                                Tên người dùng không hợp lệ
                            </Text>
                        </View>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Email</Text>
                        <TextInputDN
                            Icon={<Ionicons name="mail" size={20} color="#47A9FF" />}
                            placeholder="Nhập email"
                            onChangeText={(emailValue) => {
                                setEmailValue(emailValue);
                                checkValidEmail(emailValue);
                                checkExistEmail(emailValue);
                            }}
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validEmail}>
                                Email không đúng định dạng "abc@gmai.com"
                            </Text>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + failLogin}>
                                Email đã được sử dụng!
                            </Text>
                        </View>
                    </View>

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Nhập mật khẩu</Text>
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

                    <View className={'p-4'}>
                        <Text className={'text-lg font-semibold text-lcn-blue-5'}>Ngày sinh</Text>
                        <TextInputDN
                            className={'w-full'}
                            editable={true}
                            placeholderTextColor={'#000000'}
                            // secureTextEntry={true}
                            Icon2={<Ionicons name="calendar" size={20} color="#47A9FF" onPress={showDatepicker} />}
                            // onPress={checkDate(date)}
                            onChangeText={(date) => {
                                setDate(date);

                                //ycheckDate(date);
                            }}
                            value={birthday}
                        ></TextInputDN>
                        <View>
                            <Text className={'absolute z-10 text-red-500 text-sm  w-full ' + validDate}>
                                Không đủ 18 tuổi!
                            </Text>
                        </View>

                        {show && (
                            <RNDateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                // mode={date}
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
                                    status={checked === 'Nam' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Nam')}
                                />
                                <Text>Nam</Text>
                            </View>
                            <View className={'flex flex-row items-center mr-10'}>
                                <RadioButton
                                    value="nu"
                                    status={checked === 'Nữ' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Nữ')}
                                />
                                <Text>Nữ</Text>
                            </View>
                            <View className={'flex flex-row items-center mr-10'}>
                                <RadioButton
                                    value="Khác"
                                    status={checked === 'Khác' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('Khác')}
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
                            onPress={handleRegister}
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
export default memo(DangKyScreen);
