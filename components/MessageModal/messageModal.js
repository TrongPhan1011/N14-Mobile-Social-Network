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
}) {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
            <TouchableOpacity activeOpacity={0.5} onPressOut={handleCloseModal} className="">
                <View
                    className={'w-full h-full flex items-center justify-center  '}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <View className="w-60 bg-white border border-lcn-blue-4 rounded-2xl relative">
                        <View className="flex flex-col p-2 ">
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
                                className="p-2 "
                                onPress={handleThuHoi}
                            >
                                <View className="flex flex-row items-center">
                                    <Text className="text-center font-medium text-red-500">Xóa với mọi người</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                className="p-2"
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
