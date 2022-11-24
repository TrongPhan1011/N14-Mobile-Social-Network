import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, TouchableHighlight, Alert } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQlGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemBanBeGroup from '../../components/ItemBanBeGroup';
import { getAllFriend, getUserById } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { inCludesString } from '../../lib/regexString';
import { Checkbox } from 'react-native-paper';
import { Button } from 'react-native-paper';
import avatarDefault from '../../assets/avatarDefault.png';
import { groupChatSelect, selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { removeMemberToChat, getMemberOfChat } from '../../services/chatService';
import socket from '../../utils/getSocketIO';
import { addMess } from '../../services/messageService';

const XoaThanhVien = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [listFriend, setListFriend] = useState([]);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);
    const [valueTick, setValueTick] = useState('');
    const [tick, setTick] = useState(false);
    var arrMemberFilter = [];

    useEffect(() => {
        const getListMember = async () => {
            const memberGroup = await getMemberOfChat(groupChatSelect?.id, accessToken, axiosJWT);
            setListMember(memberGroup);
        };

        getListMember();
    }, [curSignIn]);
    //for (let i = 0; i < listMember.length; i++) listMember[i].isChecked = false;
    const handleRemoveMember = async () => {
        //console.log(listChecked);
        if (!!listChecked && listChecked.length > 0) {
            var dataNewChat = await removeMemberToChat(groupChatSelect?.id, listChecked, accessToken, axiosJWT);

            if (dataNewChat) {
                dispatch(selectGroup(dataNewChat));
                setListChecked([]);
                setListMember([]);
                for (let memberId of listChecked) {
                    var member = await getUserById(memberId, accessToken, axiosJWT);
                    saveMessSystem(dataNewChat.id, member.fullName + ' đã bị xoá khỏi nhóm');
                }
                Alert.alert('Xóa thành viên thành công');
                navigation.navigate('ChiTietTinNhan');
            }
        } else Alert.alert('Vui lòng chọn người cần xóa');
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

    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: curSignIn.id,
            seen: [{ id: curSignIn.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: messData,
            });
        }
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

        return arrMemberFilter.map((item, index) => {
            var img = avatarDefault;
            if (!!item.profile.urlAvartar) {
                img = { uri: `${item.profile.urlAvartar}` };
            }

            return (
                <View>
                    {item.isAdmin ? (
                        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl" key={item._id + index}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                onPress={() => getAllChecked(item, index)}
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
                                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5">
                                                {item.fullName}
                                            </Text>
                                            <Text className="ml-3 text-gray-600">Quản trị viên</Text>
                                        </View>
                                    </View>
                                    <View className={' flex flex-row justify-end items-center w-2/12 pr-4'}>
                                        <Checkbox
                                            status={item.isChecked ? 'checked' : 'unchecked'}
                                            onPress={() => getAllChecked(item, index)}
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
                                onPress={() => getAllChecked(item, index)}
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
                                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5">
                                                {item.fullName}
                                            </Text>
                                            <Text className="ml-3 text-gray-600">Thành viên</Text>
                                        </View>
                                    </View>
                                    <View className={' flex flex-row justify-end items-center w-2/12 pr-4'}>
                                        <Checkbox
                                            //status={tick ? 'checked' : 'unchecked'}
                                            status={item.isChecked ? 'checked' : 'unchecked'}
                                            value={item.id}
                                            onPress={() => getAllChecked(item, index)}
                                            testID={item.id}
                                        />
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
        <View className="bg-white h-full">
            <HeaderQlGroup btnName="Xóa" onPress={handleRemoveMember} remove>
                Xóa thành viên
            </HeaderQlGroup>
            {/* <View className="flex flex-row ml-6 mr-6">
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
            <ScrollView>{renderBanBe()}</ScrollView>
        </View>
    );
};

export default memo(XoaThanhVien);
