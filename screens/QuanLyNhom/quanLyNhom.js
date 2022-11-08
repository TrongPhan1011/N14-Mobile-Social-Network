import { View, Text, StatusBar, Platform, Image, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderProfile from '../../components/HeaderProfile/headerProfile';
import ItemQuanLyNhom from '../../components/ItemQuanLyNhom/itemQuanLyNhom';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const QuanLyNhom = () => {
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const navigation = useNavigation();
    const onPressAddMember = () => {
        navigation.navigate('ThemThanhVien');
    };
    const onPressXemThanhVien = () => {
        navigation.navigate('XemThanhVien');
    };
    const onPressQuanTri = () => {
        navigation.navigate('QuanTriGroup');
    };
    return (
        <View className="h-full w-full bg-white">
            <HeaderProfile>Tùy chọn</HeaderProfile>
            <ScrollView>
                <View>
                    <View className="w-full mt-2 items-center">
                        <Image
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                            className="rounded-full"
                            source={{
                                uri: `${groupChatSelect.avatar}`,
                            }}
                        ></Image>
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
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<Feather name="paperclip" size={30} color="#47A9FF" />}
                            text="Tài liệu, hình ảnh, video"
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
                            text="Quyền quản trị viên"
                            onPress={onPressQuanTri}
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<MaterialCommunityIcons name="account-check-outline" size={30} color="#47A9FF" />}
                            text="Duyệt thành viên"
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<MaterialCommunityIcons name="message-lock-outline" size={30} color="#47A9FF" />}
                            text="Quyền gửi tin nhắn"
                        ></ItemQuanLyNhom>
                        <View className="h-4 w-full flex justify-center flex-row">
                            <View className="w-1/12"></View>
                            <View className=" w-10/12 border-t border-t-lcn-blue-3"></View>
                            <View className="w-1/12"></View>
                        </View>
                        <ItemQuanLyNhom
                            icon={<MaterialIcons name="person-remove" size={30} color="#FF0000" />}
                            text="Xóa thành viên"
                            remove
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<AntDesign name="delete" size={30} color="#FF0000" />}
                            text="Xóa nhóm trò chuyện"
                            remove
                        ></ItemQuanLyNhom>
                        <ItemQuanLyNhom
                            icon={<AntDesign name="logout" size={30} color="#FF0000" />}
                            text="Rời nhóm"
                            remove
                        ></ItemQuanLyNhom>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default QuanLyNhom;
