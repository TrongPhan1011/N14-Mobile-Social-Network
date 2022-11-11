import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQLGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemXemBanBeGroup from '../../components/ItemXemBanBeGroup';
//import { getAllFriend } from '../../services/userService';
import { inCludesString } from '../../lib/regexString';
import { getMemberOfChat } from '../../services/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const XemThanhVien = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [searchValue, setSearchValue] = useState('');
    const [listMember, setListMember] = useState([]);

    useEffect(() => {
        const getListMember = async () => {
            const memberGroup = await getMemberOfChat(groupChatSelect?.id, accessToken, axiosJWT);
            setListMember(memberGroup);
        };

        getListMember();
    }, [groupChatSelect]);

    const handleAdd = () => {
        navigation.navigate('ThemThanhVien');
    };

    const renderBanBe = () => {
        let arrAdmin = listMember.filter((member) => {
            if (groupChatSelect.adminChat.includes(member.id) && inCludesString(searchValue, member.fullName)) {
                member.isAdmin = true;
                return true;
            }
            return false;
        });
        let arrMember = listMember.filter((member) => {
            if (!groupChatSelect.adminChat.includes(member.id) && inCludesString(searchValue, member.fullName))
                return true;
            else return false;
        });
        let arrMemberFilter = [...arrAdmin, ...arrMember];
        return arrMemberFilter.map((item) => {
            return (
                <View key={item.id}>
                    {item.isAdmin ? (
                        <ItemXemBanBeGroup
                            key={item.id}
                            userId={item.id}
                            name={item.fullName}
                            avt={item.profile.urlAvartar}
                            quanTriGroup
                        />
                    ) : (
                        <ItemXemBanBeGroup
                            key={item.id}
                            userId={item.id}
                            name={item.fullName}
                            avt={item.profile.urlAvartar}
                        />
                    )}
                </View>
            );
        });
    };
    return (
        <View className="bg-white h-full">
            <HeaderQLGroup btnName="Thêm" onPress={handleAdd}>
                Xem thành viên
            </HeaderQLGroup>
            {/* <View className="flex flex-row ml-6 pr-6">
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
            </View> */}
            <View>{renderBanBe()}</View>
        </View>
    );
};

export default memo(XemThanhVien);
