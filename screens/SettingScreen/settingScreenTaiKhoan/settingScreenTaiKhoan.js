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
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputDN from '../../../components/TextInputDN';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { memo } from 'react';
import { updateProfile } from '../../../services/userService';
import { getAxiosJWT } from '../../../utils/httpConfigRefreshToken';

export default memo(function SettingScreenTaiKhoan() {
    const navigation = useNavigation();
    const [checked, setChecked] = useState('nam');
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    const [validName, setvalidName] = useState('opacity-0');
    const [validDate, setValidDate] = useState('opacity-0');
    const [nameValue, setNameValue] = useState('');
    const [education, setEducation] = useState('');

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

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        if (new Date().getFullYear() - currentDate.getFullYear() > 18) {
            setValidDate('opacity-0');
            console.log('2');
        } else {
            setValidDate('opacity-1');
            console.log('1');
        }
    };
    const showMode = (currentMode) => {
        setShow(true);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const birthday =
        date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
    const handleUpdate = async () => {
        var valueName = checkValidName(nameValue);
        if (!!validName) {
            if (new Date().getFullYear() - date.getFullYear() < 18) {
                setValidDate('opacity-1');
            } else {
                setValidDate('opacity-0');

                var user = {
                    fullName: valueName,
                    education: education,
                    birthday: birthday,
                    gender: checked,
                };
                console.log(user);
                console.log(curUser.id);
                var update = await updateProfile(curUser.id, user, accessToken, axiosJWT, dispatch);
                if (!!update) {
                    alert('Sửa thông tin thành công');
                }
            }
        }
    };
    return (
        <View className="bg-white">
            <View>
                <HeaderProfile>Thông Tin Chung</HeaderProfile>
            </View>
            <ScrollView>
                <View className={'p-4'}>
                    <Text className={'text-lg font-semibold text-lcn-blue-5'}>Tên người dùng</Text>
                    <TextInputDN
                        onChangeText={(nameValue) => {
                            checkValidName(nameValue);
                            setNameValue(nameValue);
                        }}
                        Icon={<Ionicons name="person" size={20} color="#47A9FF" />}
                        placeholder="Tên người dùng"
                        defaultValue={curUser.fullName}
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
                        Icon={<Ionicons name="person" size={20} color="#47A9FF" />}
                        placeholder="Email"
                        defaultValue={curUser.email}
                    ></TextInputDN>
                </View>

                <View className={'p-4'}>
                    <Text className={'text-lg font-semibold text-lcn-blue-5'}>Tên trường học</Text>
                    <TextInputDN
                        onChangeText={(education) => {
                            setEducation(education);
                        }}
                        Icon={<Ionicons name="person" size={20} color="#47A9FF" />}
                        placeholder="Tên trường học"
                        defaultValue={curUser.profile.education}
                    ></TextInputDN>
                </View>

                <View className={'p-4'}>
                    <Text className={'text-lg font-semibold text-lcn-blue-5'}>Ngày sinh</Text>
                    <TextInputDN
                        className={'w-full'}
                        editable={true}
                        placeholderTextColor={'#000000'}
                        // secureTextEntry={true}
                        Icon={<Ionicons name="calendar" size={20} color="#47A9FF" onPress={showDatepicker} />}
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

                <View className="items-center p-6">
                    <TouchableHighlight className="rounded-3xl " onPress={handleUpdate}>
                        <View className="bg-lcn-blue-4 h-14 w-80 rounded-3xl items-center justify-center flex flex-row">
                            <Text className="text-white font-semibold text-2xl">Lưu</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
});
