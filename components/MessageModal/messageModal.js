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
import { useDispatch, useSelector } from 'react-redux';
import { addReaction } from '../../services/messageService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import socket from '../../utils/getSocketIO';
// const handleThuHoi = async () => {
//     var result = await ThuHoiTinNhan(groupChatSelect.id, messageData.id, accessToken, AxiosJWT);
//     if (result) {
//         setHiddenModal('hidden');
//     }
// };
export default function MessageModal({
    handleCloseModal,
    handleOpenModal,
    modalVisible,
    handleThuHoi,
    handleRemoveWithUser,
    handleForward,
    handleReply,
    idUser,
    messageData,
}) {
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    // console.log(idUser);
    // console.log(currSignIn.id);
    var hidden = ' hidden ';
    if (idUser === currSignIn?.id) hidden = '';

    const sendReactMess = async (typeReact) => {
        //e.stopPropagation();

        if (!!messageData.reactionMess && messageData.reactionMess.length > 0) {
            var userReactData = messageData.reactionMess.filter((reaction) => reaction.idUser === currSignIn?.id);
            for (let reactUser of userReactData) {
                if (typeReact === reactUser.type_emotion) {
                    return;
                }
            }
        }
        var newReaction = {
            idUser: {
                id: currSignIn?.id,

                fullName: currSignIn.fullName,
            },
            type_emotion: typeReact,
        };

        var dataReactSocket = {
            id: messageData.id,
            reactionMess: newReaction,
        };
        var dataReactSave = {
            id: messageData.id,
            reactionMess: {
                idUser: currSignIn?.id,

                type_emotion: typeReact,
            },
        };

        var result = await addReaction(dataReactSave, accessToken, axiosJWT);
        if (result) {
            socket.emit('sendReactMess', { receiverId: groupChatSelect.id, contentMessage: dataReactSocket });
        }
        //setShowEmotion('hidden');
    };
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
            <TouchableOpacity activeOpacity={0.5} onPressOut={handleCloseModal} className="">
                <View
                    className={'w-full h-full flex items-center justify-center  '}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <View className="w-60 bg-white border border-lcn-blue-4 rounded-2xl relative">
                        <View className="flex flex-col p-2 ">
                            <TouchableHighlight activeOpacity={0.6} underlayColor="#C6E4FF" className="p-2 ">
                                <View className="flex flex-row items-center justify-center">
                                    <Pressable className="m-2" onPress={() => sendReactMess('👍')}>
                                        <Text>👍</Text>
                                    </Pressable>
                                    <Pressable className="m-2" onPress={() => sendReactMess('❤')}>
                                        <Text>❤</Text>
                                    </Pressable>
                                    <Pressable className="m-2" onPress={() => sendReactMess('😆')}>
                                        <Text>😆</Text>
                                    </Pressable>
                                    <Pressable className="m-2" onPress={() => sendReactMess('😮')}>
                                        <Text>😮</Text>
                                    </Pressable>
                                    <Pressable className="m-2" onPress={() => sendReactMess('😢')}>
                                        <Text>😢</Text>
                                    </Pressable>
                                    <Pressable className="m-2" onPress={() => sendReactMess('😡')}>
                                        <Text>😡</Text>
                                    </Pressable>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className="p-2 "
                                onPress={handleForward}
                            >
                                <View className="flex flex-row items-center">
                                    <Text className="text-center text-lcn-blue-5 font-medium">Chuyển tiếp</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className="p-2 "
                                onPress={handleReply}
                            >
                                <View className="flex flex-row items-center">
                                    <Text className="text-center text-lcn-blue-5 font-medium">Trả lời</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className={'p-2 ' + hidden}
                                onPress={handleThuHoi}
                            >
                                <View className="flex flex-row items-center">
                                    <Text className="text-center font-medium text-red-500">Xóa với mọi người</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className={'p-2' + hidden}
                                onPress={handleRemoveWithUser}
                            >
                                <View className="flex flex-row items-center">
                                    <Text className="text-center font-medium text-red-500">Xóa chỉ mình tôi</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}
