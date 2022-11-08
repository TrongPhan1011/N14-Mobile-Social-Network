import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQlGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemBanBeGroup from '../../components/ItemBanBeGroup';
import { getAllFriend } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

const ThemThanhVien = () => {
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [listFriend, setListFriend] = useState([]);

    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(curSignIn.id, accessToken, axiosJWT);
            setListFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, [curSignIn]);

    const renderBanBe = () => {
        return listFriend.map((item) => {
            return (
                <ItemBanBeGroup key={item._id} userId={item._id} name={item.fullName} avt={item.profile.urlAvartar} />
            );
        });
    };
    return (
        <View className="bg-white">
            <HeaderQlGroup btnName="Thêm">Thêm thành viên</HeaderQlGroup>
            <View className="flex flex-row ml-6 pr-6">
                <View className=" w-full h-10 flex flex-row items-center bg-white rounded-3xl m-2 pl-2 pr-2 border border-lcn-blue-4">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className=" ml-2"
                        placeholder="Tìm tên hoặc số điện thoại"
                        placeholderTextColor={'#47A9FF'}
                    ></TextInput>
                </View>
            </View>
            <View>{renderBanBe()}</View>
        </View>
    );
};

export default memo(ThemThanhVien);
