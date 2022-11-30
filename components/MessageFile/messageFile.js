import {
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
    Pressable,
    Alert,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, memo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video, AVPlaybackStatus } from 'expo-av';
import { addArrayImage } from '../../redux/Slice/sidebarChatSlice';
import { ThuHoiTinNhan, removeMessWithUser } from '../../services/messageService';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import MessageModal from '../MessageModal';
import { replyMess } from '../../redux/Slice/messageSlice';
import socket from '../../utils/getSocketIO';

export default memo(function MessageFile({ data, idMess, messageData }) {
    const dispatch = useDispatch();
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const navigation = useNavigation();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [hidenModal, setHiddenModal] = useState('opacity-0 -z-10 h-0');
    var arrUrlImg = [];
    const [modalVisible, setModalVisible] = useState(false);
    const [statusMess, setStatusMess] = useState(1);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };
    var renderOneFile = (firstFile) => {
        if (firstFile.fileType === 'image') {
            arrUrlImg.push(firstFile?.path);
            return (
                <View className=" ">
                    <Pressable
                        className="overflow-hidden rounded-2xl "
                        onPress={handleChiTietHinhAnh}
                        onLongPress={handleOpenModal}
                        //onLongPress={() => setHiddenModal(' opacity-100 z-20')}
                    >
                        <Image
                            style={{ width: 250, height: 250, resizeMode: 'cover' }}
                            className=""
                            source={{
                                uri: `${firstFile?.path}`,
                            }}
                        ></Image>
                    </Pressable>
                    <MessageModal
                        className=""
                        modalVisible={modalVisible}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        handleThuHoi={handleThuHoiTinNhan}
                        handleForward={handleForward}
                        handleRemoveWithUser={handleRemoveWithUser}
                        handleReply={handleReply}
                        messageData={messageData}
                        idUser={messageData.authorID.id}
                    ></MessageModal>
                </View>
            );
        } else if (firstFile.fileType === 'video') {
            return (
                <View className="rounded-2xl">
                    <Pressable onLongPress={handleOpenModal}>
                        <Video
                            ref={video}
                            source={{
                                uri: `${firstFile?.path}`,
                            }}
                            style={{ width: '100%', aspectRatio: 16 / 9 }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping={true}
                            usePoster={true}
                            posterStyle={{ resizeMode: 'cover' }}
                            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                        />
                    </Pressable>
                    <MessageModal
                        className=""
                        modalVisible={modalVisible}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        handleThuHoi={handleThuHoiTinNhan}
                        handleForward={handleForward}
                        handleRemoveWithUser={handleRemoveWithUser}
                        handleReply={handleReply}
                        messageData={messageData}
                        idUser={messageData.authorID.id}
                    ></MessageModal>
                </View>
            );
        } else if (firstFile.fileType === 'doc') {
            return (
                <View>
                    <Pressable onLongPress={handleOpenModal}>
                        <View className="bg-blue-200 p-2 rounded-2xl flex flex-row w-full ">
                            <View className="mr-2 items-center">
                                <MaterialCommunityIcons name="file-word" size={30} color="#47A9FF" />
                            </View>
                            <Text className="break-words pr-10">{firstFile.title}</Text>
                        </View>
                    </Pressable>
                    <MessageModal
                        className=""
                        modalVisible={modalVisible}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        handleThuHoi={handleThuHoiTinNhan}
                        handleForward={handleForward}
                        handleRemoveWithUser={handleRemoveWithUser}
                        handleReply={handleReply}
                        messageData={messageData}
                        idUser={messageData.authorID.id}
                    ></MessageModal>
                </View>
            );
        } else if (firstFile.fileType === 'excel') {
            return (
                <View className="bg-blue-200 p-2 rounded-2xl flex flex-row w-full ">
                    <View className="mr-2 items-center">
                        <MaterialCommunityIcons name="file-excel" size={30} color="#47A9FF" />
                    </View>
                    <Text className="break-words pr-10">{firstFile.title}</Text>
                </View>
            );
        }
    };

    var renderManyFile = (files) => {
        const compManyIMG = files.map((file, index) => {
            if (file.fileType === 'image') {
                arrUrlImg.push(file?.path);
                return (
                    <View key={file.path + ''}>
                        <Pressable
                            key={file.title + index}
                            className="p-0.5 overflow-hidden rounded-2xl"
                            onPress={handleChiTietHinhAnh}
                            //onLongPress={() => setHiddenModal('')}
                            onLongPress={handleOpenModal}
                        >
                            <Image
                                style={{ width: 120, height: 120 }}
                                className=""
                                source={{
                                    uri: `${file?.path}`,
                                }}
                            ></Image>
                        </Pressable>
                        <MessageModal
                            className=""
                            modalVisible={modalVisible}
                            handleCloseModal={handleCloseModal}
                            handleOpenModal={handleOpenModal}
                            handleThuHoi={handleThuHoiTinNhan}
                            handleRemoveWithUser={handleRemoveWithUser}
                            handleForward={handleForward}
                            handleReply={handleReply}
                            messageData={messageData}
                            idUser={messageData.authorID.id}
                        ></MessageModal>
                    </View>
                );
            } else if (file.fileType === 'video') {
                return (
                    <View>
                        <Pressable onLongPress={handleOpenModal}>
                            <View className="rounded-2xl" key={file.path + index}>
                                <Video
                                    ref={video}
                                    source={{
                                        uri: `${file?.path}`,
                                    }}
                                    style={{ width: '100%', aspectRatio: 16 / 9 }}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping={true}
                                    usePoster={true}
                                    posterStyle={{ resizeMode: 'cover' }}
                                    key={file.title + index}
                                    onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                                />
                            </View>
                        </Pressable>
                        <MessageModal
                            className=""
                            modalVisible={modalVisible}
                            handleCloseModal={handleCloseModal}
                            handleOpenModal={handleOpenModal}
                            handleThuHoi={handleThuHoiTinNhan}
                            handleRemoveWithUser={handleRemoveWithUser}
                            handleForward={handleForward}
                            handleReply={handleReply}
                            messageData={messageData}
                            idUser={messageData.authorID.id}
                        ></MessageModal>
                    </View>
                );
            }
        });
        return <View className="flex flex-row flex-wrap overflow-hidden w-full">{compManyIMG}</View>;
    };

    var handleRenderFile = () => {
        const files = data;
        //console.log(data);
        if (statusMess === 0) {
            return (
                <View className=" rounded-3xl p-2 pr-3 pl-3 text-sm text-center text-gray-400 italic border border-gray-300 ">
                    <Text> Tin nhắn đã được thu hồi với bạn</Text>
                </View>
            );
        }
        //console.log(data);
        const ONE_FILE = 1; // 1 file img, video
        if (files?.length === ONE_FILE) {
            var firstFile = files[0];
            return <>{renderOneFile(firstFile)}</>;
        } else return <>{renderManyFile(files)}</>;
    };
    const handleChiTietHinhAnh = () => {
        //console.log(arrUrlImg);
        dispatch(addArrayImage(arrUrlImg));
        navigation.navigate('ChiTietHinhAnh');
    };
    const handleThuHoiTinNhan = async () => {
        var result = await ThuHoiTinNhan(groupChatSelect.id, idMess, accessToken, AxiosJWT);
        if (result) {
            socket.emit('removeMess', { receiverId: groupChatSelect.id, idMess: idMess });
            handleCloseModal();
        }
    };

    const handleRemoveWithUser = async () => {
        var result = await removeMessWithUser(idMess, accessToken, AxiosJWT);
        if (result === true) {
            setStatusMess(0);
            handleCloseModal();
        }
    };
    const handleForward = () => {
        navigation.navigate('ForwardMessage', { messageData });
        handleCloseModal();
    };

    const handleReply = () => {
        //console.log(messageData);
        dispatch(replyMess(messageData));
        handleCloseModal();
    };

    return <>{handleRenderFile()}</>;
});
