import { View, Text, StatusBar, Platform, Image, ScrollView, Alert, TouchableHighlight, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderProfile from '../../components/HeaderProfile';
import ItemQuanLyNhom from '../../components/ItemQuanLyNhom/itemQuanLyNhom';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { leaveToChat, changeStatusChat, removeChat } from '../../services/chatService';
import avatarDefault from '../../assets/avatarDefault.png';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { userLogin } from '../../redux/Slice/signInSlice';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { getMessageFileByIdChat, getMessageByIdChat } from '../../services/messageService';
import Avatar from '../../components/Avatar';
import RenameModal from '../../components/ModalRenameGroup';

const QuanLyNhom = () => {
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const navigation = useNavigation();
    const statusGroup = groupChatSelect?.status;
    const [modalVisible, setModalVisible] = useState(false);
    const [arrImg, setArrImg] = useState([]);
    const [isEnabled, setIsEnabled] = useState(statusGroup === 2 ? true : false);

    const duyetThanhVien = async () => {
        if (groupChatSelect.adminChat.includes(curSignIn.id)) {
            setIsEnabled((previousState) => !previousState);
            if (statusGroup == 1) {
                let newChat = await changeStatusChat(groupChatSelect.id, '2', accessToken, axiosJWT);
                dispatch(selectGroup(newChat));
            } else {
                let newChatOff = await changeStatusChat(groupChatSelect.id, '1', accessToken, axiosJWT);
                dispatch(selectGroup(newChatOff));
            }
        } else Alert.alert('Chỉ có quản trị viên mới có quyền!');
    };
    const onPressAddMember = () => {
        navigation.navigate('ThemThanhVien');
    };
    const onPressRename = () => {
        setModalVisible(true);
    };
    const onPressXemThanhVien = () => {
        navigation.navigate('XemThanhVien');
    };
    const onPressXemFile = () => {
        navigation.navigate('FileGroup');
    };
    const onPressLeaveGroup = () => {
        Alert.alert('Cảnh báo', 'Bạn có chắc muốn rời nhóm không?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    await leaveToChat(groupChatSelect.id, curSignIn.id, accessToken, axiosJWT);
                    dispatch(userLogin(curSignIn.id));
                    navigation.navigate('HomeTabBar');
                },
            },
        ]);
    };
    const onPressRemoveGroup = () => {
        Alert.alert('Cảnh báo', 'Bạn có chắc muốn xóa nhóm trò chuyện này không?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    await removeChat(groupChatSelect.id, curSignIn.id, accessToken, axiosJWT);
                    navigation.navigate('HomeTabBar');
                },
            },
        ]);
    };
    const onPressQuanTri = () => {
        if (groupChatSelect.adminChat.includes(curSignIn.id)) navigation.navigate('QuanTriGroup');
        else Alert.alert('Chỉ có quản trị viên mới có quyền!');
    };
    const onPressXoaThanhVien = () => {
        if (groupChatSelect.adminChat.includes(curSignIn.id)) navigation.navigate('XoaThanhVien');
        else Alert.alert('Chỉ có quản trị viên mới có quyền!');
    };
    const onPressDuyetThanhVien = () => {
        if (groupChatSelect.adminChat.includes(curSignIn.id)) navigation.navigate('DuyetThanhVien');
        else Alert.alert('Chỉ có quản trị viên mới có quyền!');
    };
    const onPressXoaQuyenQuanTri = () => {
        if (groupChatSelect.adminChat.includes(curSignIn.id)) navigation.navigate('XoaQuyenQuanTri');
        else Alert.alert('Chỉ có quản trị viên mới có quyền!');
    };

    var img = avatarDefault;
    if (!!groupChatSelect.avatar) {
        img = { uri: `${groupChatSelect.avatar}` };
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    return (
        <View className="h-full w-full bg-white">
            <HeaderProfile userName={'Tùy chọn'}></HeaderProfile>
            <ScrollView>
                <View>
                    <View className="w-full mt-2 items-center">
                        {/* <Image
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                            className="rounded-full"
                            source={img}
                        ></Image> */}
                        <Avatar
                            src={groupChatSelect.avatar}
                            typeAvatar={groupChatSelect.typeChat === 'group' ? 'group' : 'inbox'}
                            idGroup={groupChatSelect.id}
                        />
                        <Text className="font-semibold text-xl text-lcn-blue-5 mt-2">{groupChatSelect.name}</Text>
                    </View>
                    <View className="h-4 w-full flex justify-center flex-row mt-2">
                        <View className="w-1/12"></View>
                        <View className=" w-10/12 border-t border-t-lcn-blue-3"></View>
                        <View className="w-1/12"></View>
                    </View>
                    <View>
                        <ItemQuanLyNhom
                            icon={<FontAwesome name="pencil-square-o" size={30} color="#47A9FF" />}
                            text="Đổi tên nhóm"
                            onPress={onPressRename}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<Feather name="paperclip" size={30} color="#47A9FF" />}
                            text="Tài liệu, hình ảnh, video"
                            onPress={onPressXemFile}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            onPress={onPressXemThanhVien}
                            icon={<MaterialIcons name="groups" size={30} color="#47A9FF" />}
                            text="Xem thành viên"
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            onPress={onPressAddMember}
                            icon={<AntDesign name="adduser" size={30} color="#47A9FF" />}
                            text="Thêm thành viên"
                        ></ItemQuanLyNhom>
                        <View className="h-4 w-full flex justify-center flex-row">
                            <View className="w-1/12"></View>
                            <View className=" w-10/12 border-t border-t-lcn-blue-3"></View>
                            <View className="w-1/12"></View>
                        </View>
                        <ItemQuanLyNhom
                            icon={<MaterialIcons name="security" size={30} color="#47A9FF" />}
                            text="Thêm quyền quản trị"
                            onPress={onPressQuanTri}
                        ></ItemQuanLyNhom>

                        <ItemQuanLyNhom
                            icon={<MaterialCommunityIcons name="account-check-outline" size={30} color="#47A9FF" />}
                            text="Duyệt thành viên"
                            onPress={onPressDuyetThanhVien}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<MaterialCommunityIcons name="message-lock-outline" size={30} color="#47A9FF" />}
                            text="Quyền gửi tin nhắn"
                        ></ItemQuanLyNhom>
                        <View className="flex flex-row items-center">
                            <View className="w-4/5">
                                <ItemQuanLyNhom
                                    icon={<Fontisto name="checkbox-active" size={25} color="#47A9FF" />}
                                    text="Chế độ duyệt thành viên"
                                ></ItemQuanLyNhom>
                            </View>
                            <View className="">
                                <Switch
                                    trackColor={{ false: '#767577', true: '#00FFFF' }}
                                    thumbColor={isEnabled ? '#0000FF' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={duyetThanhVien}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                        <View className="h-4 w-full flex justify-center flex-row">
                            <View className="w-1/12"></View>
                            <View className=" w-10/12 border-t border-t-lcn-blue-3"></View>
                            <View className="w-1/12"></View>
                        </View>
                        <ItemQuanLyNhom
                            icon={<MaterialCommunityIcons name="shield-remove" size={30} color="#FF0000" />}
                            text="Xóa quyền quản trị"
                            remove
                            onPress={onPressXoaQuyenQuanTri}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<MaterialIcons name="person-remove" size={30} color="#FF0000" />}
                            text="Xóa thành viên"
                            remove
                            onPress={onPressXoaThanhVien}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<AntDesign name="delete" size={30} color="#FF0000" />}
                            text="Xóa nhóm trò chuyện"
                            remove
                            onPress={onPressRemoveGroup}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<AntDesign name="logout" size={30} color="#FF0000" />}
                            text="Rời nhóm"
                            remove
                            onPress={onPressLeaveGroup}
                        ></ItemQuanLyNhom>
                    </View>
                </View>
            </ScrollView>
            <RenameModal
                modalVisible={modalVisible}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            ></RenameModal>
        </View>
    );
};

export default QuanLyNhom;
