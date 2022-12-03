import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllFriend } from '../../services/userService';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
export default function ThongTinChung({}) {
    const profile = useSelector((state) => state.friendSlice.friend);

    const dispatch = useDispatch();
    const [userFriend, setUserFriend] = useState([]);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var myDate = '';
    var date = profile?.birthday.split('-');
    if (date) {
        myDate = `${date[2]}-${date[1]}-${date[0]}`;
    }

    return (
        <ScrollView className={'h-full bg-white'}>
            <View className="flex flex-row items-center w-full pl-4 pr-4 pt-2">
                <View className="w-10 items-center">
                    <FontAwesome5 name="school" size={20} color="#47A9FF" />
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        {profile?.profile?.education}
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4 ">
                <View className="w-10 items-center ">
                    <Text className=" text-red-500">
                        <FontAwesome name="intersex" size={20} />
                    </Text>
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        {profile?.gender}
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4">
                <View className="w-10 items-center">
                    <Text className={'text-yellow-500'}>
                        <FontAwesome name="envelope" size={25} />
                    </Text>
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">
                        {profile?.email}
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center w-full p-4">
                <View className="w-10 items-center">
                    <Text className={'text-pink-500'}>
                        <FontAwesome name="birthday-cake" size={20} />
                    </Text>
                </View>
                <View className="break-words">
                    <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 break-words max-w-[96%]">{myDate}</Text>
                </View>
            </View>
        </ScrollView>
    );
}
