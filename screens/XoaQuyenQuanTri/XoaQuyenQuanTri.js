import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, TouchableHighlight, Alert } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQlGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemBanBeGroup from '../../components/ItemBanBeGroup';
import { getAllFriend } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { inCludesString } from '../../lib/regexString';
import { Checkbox } from 'react-native-paper';
import { Button } from 'react-native-paper';
import avatarDefault from '../../assets/avatarDefault.png';
import { groupChatSelect, selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { addMemberToChat, getMemberOfChat, addAdminToChat } from '../../services/chatService';

const ThemThanhVien = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);
    var arrMemberFilter = [];

    useEffect(() => {
        const getListMember = async () => {
            const memberGroup = await getMemberOfChat(groupChatSelect?.id, accessToken, axiosJWT);
            setListMember(memberGroup);
        };

        getListMember();
    }, [groupChatSelect]);

    const handleAddAdmin = async () => {
        ///console.log(listChecked);

        if (!!listChecked && listChecked.length > 0) {
            var dataNewChat = await addAdminToChat(groupChatSelect?.id, listChecked, accessToken, axiosJWT);
            //console.log(dataNewChat);
            if (dataNewChat) {
                dispatch(selectGroup(dataNewChat));
                setListChecked([]);
                setListMember([]);
                Alert.alert('Thêm Admin thành công');
                navigation.navigate('ChiTietTinNhan');
            }
        } else Alert.alert('Vui lòng chọn người cần thêm');
    };

    const getAllChecked = (item, index) => {
        const temp = [...arrMemberFilter];
        if (temp[index]._id === item._id) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item.id]);
        else {
            var arrRemove = listChecked.filter((e) => e !== item.id);
            setListChecked(arrRemove);
        }
        setListMember(temp);
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
        arrMemberFilter = [...arrAdmin, ...arrMember];
        //listMember.isChecked = false;
        return arrMemberFilter.map((item, index) => {
            var img = avatarDefault;
            if (!!item.profile.urlAvartar) {
                img = { uri: `${item.profile.urlAvartar}` };
            }
            return (
                <View key={item._id}>
                    {item.isAdmin ? (
                        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl" key={item._id + index}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                key={item._id + index}
                                onPress={() => getAllChecked(item, index)}
                            >
                                <View className="flex flex-row bg-white  p-2 " key={item._id + index}>
                                    <View className="flex flex-row items-center w-10/12" key={item._id + index}>
                                        <View key={item._id}>
                                            <Image
                                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                                className="rounded-full ml-4"
                                                source={img}
                                                key={item._id}
                                            ></Image>
                                        </View>

                                        <View className="flex flex-col" key={item._id}>
                                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5" key={item._id}>
                                                {item.fullName}
                                            </Text>
                                            <Text className="ml-3 text-gray-600" key={item._id}>
                                                Quản trị viên
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        className={' flex flex-row justify-end items-center w-2/12 pr-4'}
                                        key={item._id}
                                    >
                                        <Checkbox
                                            status={item.isChecked ? 'checked' : 'unchecked'}
                                            onPress={() => getAllChecked(item, index)}
                                            key={item._id}
                                            testID={item.id}
                                        />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    ) : (
                        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl" key={item._id}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                key={item._id}
                                onPress={() => getAllChecked(item, index)}
                            >
                                <View className="flex flex-row bg-white  p-2 " key={item._id}>
                                    <View className="flex flex-row items-center w-10/12" key={item._id}>
                                        <View key={item._id}>
                                            <Image
                                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                                className="rounded-full ml-4"
                                                source={img}
                                                key={item._id}
                                            ></Image>
                                        </View>

                                        <View className="flex flex-col" key={item._id}>
                                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5" key={item._id}>
                                                {item.fullName}
                                            </Text>
                                            <Text className="ml-3 text-gray-600" key={item._id}>
                                                Thành viên
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )}
                </View>
            );
        });
    };
    return (
        <View className="bg-white">
            <HeaderQlGroup btnName="Xóa" onPress={handleAddAdmin} remove>
                Xóa quyền quản trị
            </HeaderQlGroup>
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
