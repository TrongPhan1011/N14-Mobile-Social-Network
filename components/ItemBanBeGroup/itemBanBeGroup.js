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
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addMemberGroup } from '../../redux/Slice/friendSlice';
import avatarDefault from '../../assets/avatarDefault.png';
import { useNavigation } from '@react-navigation/native';

export default function ItemBanBe({ userId, name, avt, quanTriGroup, waiting, friend }) {
    const dispatch = useDispatch();
    const arrMember = useSelector((state) => state.friendSlice.member);
    //console.log(arrMember);
    const [tick, setTick] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const navigation = useNavigation();
    var quanTri = 'Thành viên';
    var waitingHidden = '';
    var friendHidden = '';
    if (!!friend) {
        friendHidden = ' hidden ';
    }
    //if (!!waiting) waitingHidden = ' hidden ';
    if (!!quanTriGroup) {
        quanTri = 'Quản trị viên';
        waitingHidden = ' hidden ';
    }

    var img = avatarDefault;
    if (!!avt) {
        img = { uri: `${avt}` };
    }

    const getAllChecked = (e) => {
        setTick(!tick);
        if (!tick) {
            setListChecked((prev) => [...prev, userId]);
        } else {
            var arrRemove = listChecked.filter((item) => !userId.includes(item));
            setListChecked(arrRemove);
        }
    };
    // let arr = [...arrMember, ...listChecked];
    //dispatch(addMemberGroup(arr));
    console.log(listChecked);
    return (
        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl">
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#C6E4FF"
                //onPress={() => navigation.navigate('ProfileScreen')}
            >
                <View className="flex flex-row bg-white  p-2 ">
                    <View className="flex flex-row items-center w-10/12">
                        <View>
                            <Image
                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                className="rounded-full ml-4"
                                source={img}
                            ></Image>
                        </View>

                        <View className="flex flex-col">
                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5">{name}</Text>
                            <Text className={'ml-3 text-gray-600 ' + friendHidden}>{quanTri}</Text>
                        </View>
                    </View>
                    <View className={' flex flex-row justify-end items-center w-2/12 pr-4' + waitingHidden}>
                        <Checkbox
                            status={tick ? 'checked' : 'unchecked'}
                            onPress={getAllChecked}
                            testID={userId}
                            key={userId}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}
