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
import avatarDefault from '../../assets/avatarDefault.png';
import { groupChatSelect, selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { addMemberToChat } from '../../services/chatService';
import socket from '../../utils/getSocketIO';
import { addMess } from '../../services/messageService';

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

    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(curSignIn.id, accessToken, axiosJWT);
            let arrMember = friendByStatus[0].friend.filter((item) => !item.listGroup.includes(groupChatSelect?.id));
            setListMember(arrMember);
        };

        getListFriend();
    }, [curSignIn]);

    const getAllChecked = (item, index) => {
        //setTick(!tick);
        const temp = [...listMember];
        if (temp[index]._id === item._id) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item._id]);
        else {
            var arrRemove = listChecked.filter((e) => e !== item._id);
            setListChecked(arrRemove);
        }
        setListMember(temp);
    };

    const handleAddMember = async () => {
        //console.log(listChecked);
        if (!!listChecked && listChecked.length > 0) {
            var dataNewChat = await addMemberToChat(groupChatSelect?.id, listChecked, accessToken, axiosJWT);

            if (dataNewChat) {
                dispatch(selectGroup(dataNewChat));
                setListChecked([]);
                setListMember([]);
                if (dataNewChat.status === 1 || groupChatSelect.adminChat.includes(curSignIn.id)) {
                    for (let memberId of listChecked) {
                        var member = await getUserById(memberId, accessToken, axiosJWT);
                        saveMessSystem(dataNewChat.id, curSignIn.fullName + ' đã thêm ' + member.fullName);
                    }
                } else {
                    saveMessSystem(dataNewChat.id, listChecked.length + ' thành viên đang chờ duyệt ');
                }
                if (dataNewChat.status === 1) Alert.alert('Thêm thành viên thành công');
                else Alert.alert('Thành viên đang chờ duyệt');
                navigation.navigate('ChiTietTinNhan');
            }
        } else Alert.alert('Vui lòng chọn người cần thêm');
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
            if (groupChatSelect.adminChat.includes(member._id) && inCludesString(searchValue, member.fullName)) {
                member.isAdmin = true;
                return true;
            }
            return false;
        });
        let arrMember = listMember.filter((member) => {
            if (!groupChatSelect.adminChat.includes(member._id) && inCludesString(searchValue, member.fullName))
                return true;
            else return false;
        });

        let arrMemberFilter = [...arrAdmin, ...arrMember];
        return arrMemberFilter.map((item, index) => {
            var img = avatarDefault;
            if (!!item.profile.urlAvartar) {
                img = { uri: `${item.profile.urlAvartar}` };
            }
            if (!groupChatSelect.memberWaiting.includes(item._id))
                return (
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
                                    </View>
                                </View>
                                <View className={' flex flex-row justify-end items-center w-2/12 pr-4'}>
                                    <Checkbox
                                        status={item.isChecked ? 'checked' : 'unchecked'}
                                        value={item.id}
                                        onPress={() => getAllChecked(item, index)}
                                        key={item.id}
                                        testID={item.id}
                                    />
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            else
                return (
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
                                        <Text className="ml-3 text-gray-600">Đang chờ duyệt</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
        });
    };

    return (
        <View className="bg-white h-full">
            <HeaderQlGroup btnName="Thêm" onPress={handleAddMember}>
                Thêm thành viên
            </HeaderQlGroup>
            <View className="flex flex-row ml-6 mr-6">
                <View className=" w-full h-10 flex flex-row items-center bg-white rounded-3xl m-2 pl-2 pr-2 border border-lcn-blue-4">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className=" ml-2"
                        placeholder="Tên bạn bè cần tìm"
                        placeholderTextColor={'#47A9FF'}
                        onChangeText={(value) => setSearchValue(value)}
                    ></TextInput>
                </View>
            </View>
            <ScrollView>{renderBanBe()}</ScrollView>
        </View>
    );
};

export default memo(ThemThanhVien);
