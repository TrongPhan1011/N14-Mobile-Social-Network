import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQlGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemBanBeGroup from '../../components/ItemBanBeGroup';
import { getMemberOfChat } from '../../services/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

const ThemThanhVien = () => {
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [listMember, setListMember] = useState([]);

    useEffect(() => {
        const getListMember = async () => {
            const memberGroup = await getMemberOfChat(groupChatSelect.id, accessToken, axiosJWT);
            setListMember(memberGroup);
        };

        getListMember();
    }, [groupChatSelect]);

    const renderBanBe = () => {
        return listMember.map((item) => {
            return (
                <ItemBanBeGroup
                    key={item.id}
                    userId={item.id}
                    name={item.fullName}
                    avt={item.profile.urlAvartar}
                    quanTriGroup
                />
            );
        });
    };
    return (
        <View className="bg-white">
            <HeaderQlGroup btnName="Thêm">Quyền quản trị</HeaderQlGroup>
            <View className="flex flex-row ml-6 pr-6">
                {/* <View className=" w-full h-10 flex flex-row items-center bg-white rounded-3xl m-2 pl-2 pr-2 border border-lcn-blue-4">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className=" ml-2"
                        placeholder="Tìm tên hoặc số điện thoại"
                        placeholderTextColor={'#47A9FF'}
                    ></TextInput>
                </View> */}
            </View>
            <View>{renderBanBe()}</View>
        </View>
    );
};

export default memo(ThemThanhVien);
