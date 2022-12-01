import {
    View,
    Text,
    Modal,
    StyleSheet,
    Pressable,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    TouchableHighlight,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { changeNameChat } from '../../services/chatService';
import socket from '../../utils/getSocketIO';
import { addMess } from '../../services/messageService';
import { getUserById } from '../../services/userService';
import { groupChatSelect, selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { userLogin } from '../../redux/Slice/signInSlice';

export default function renameModal({ handleCloseModal, handleOpenModal, modalVisible }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    const [name, setName] = useState('');
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);

    const handleRenameChat = async () => {
        if (name === '') {
            Alert.alert('Vui lòng nhập tên nhóm trước khi lưu');
        } else {
            var result = await changeNameChat(groupChatSelect?.id, name, currSignIn?.id, accessToken, axiosJWT);

            if (!!result) {
                //dispatch(userLogin(currSignIn));
                //console.log(groupChatSelect);
                var member = await getUserById(currSignIn?.id, accessToken, axiosJWT);
                await saveMessSystem(groupChatSelect.id, currSignIn.fullName + ' đã đổi tên nhóm thành ' + name);
                setName('');
                //Alert.alert('Đổi tên nhóm thành công');
                // dispatch(userLogin(null));
                // dispatch(userLogin(currSignIn));
                navigation.navigate('ChiTietTinNhan');
                modalVisible = false;
            }
        }
    };

    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: currSignIn?.id,
            seen: [{ id: currSignIn?.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        var newMessSocket = {
            title: text,
            authorID: {
                id: currSignIn?.id,
                fullName: currSignIn?.fullName,
                profile: {
                    urlAvartar: currSignIn?.profile.urlAvartar,
                },
            },

            seen: [{ id: currSignIn?.id, seenAt: Date.now() }],
            type: 'system',
            idChat: id,
            status: 1,
            file: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: newMessSocket,
            });
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
            <TouchableOpacity activeOpacity={0.5} onPressOut={handleCloseModal} className="">
                <View
                    className={'w-full h-full flex items-center justify-center  '}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <View className="w-72 bg-white border border-lcn-blue-4 rounded-2xl relative">
                        <View className="p-2">
                            <Text className="font-medium text-base text-lcn-blue-5 m-2 text-center">
                                Chỉnh sửa tên nhóm
                            </Text>
                        </View>
                        <View className=" m-4 border-b border-gray-500">
                            <TextInput
                                placeholder="Nhập tên nhóm cần đổi"
                                onChangeText={(value) => setName(value)}
                            ></TextInput>
                        </View>
                        <View className="w-full flex flex-row p-2 justify-end">
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className="p-2 "
                                onPress={handleCloseModal}
                            >
                                <Text className="text-lcn-blue-5 font-medium text-base">Hủy</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className="p-2 "
                                onPress={handleRenameChat}
                            >
                                <Text className="text-lcn-blue-5 font-medium text-base">Lưu</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
