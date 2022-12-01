import { View, Text, Image, TouchableWithoutFeedback, Alert, Pressable, TouchableHighlight } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';
import { formatTimeAuto, getLastName } from '../../lib/formatString';
import MessageModal from '../MessageModal';
import MessageFile from '../MessageFile/messageFile';
import { ThuHoiTinNhan, removeMessWithUser, addReaction } from '../../services/messageService';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import socket from '../../utils/getSocketIO';
import { replyMess } from '../../redux/Slice/messageSlice';

export default function ItemTinNhan({ children, from, type, messageData }) {
    const navigation = useNavigation();
    const [hidden, setHidden] = useState('hidden');
    const [statusMess, setStatusMess] = useState(messageData.status);
    const [hidenModal, setHiddenModal] = useState('hidden');
    const dispatch = useDispatch();
    const [socketMessChange, setSocketMessChange] = useState();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const [status, setStatus] = React.useState({});
    const video = React.useRef(null);

    var seen = '';
    var nameSend = '';
    var textColorSend = '';
    var bgMessage = ' bg-slate-100 ';
    var bgFile = '';
    var flexRowReverse = '';
    var avatarHidden = '';
    var positionReaction = ' absolute h-0 bottom-2 pl-1 ';
    if (!!from) {
        bgMessage = ' bg-lcn-blue-4 text-white ';
        flexRowReverse = 'flex-row-reverse';
        seen = 'Đã gửi';
        textColorSend = ' text-white ';
        avatarHidden = ' hidden ';
        positionReaction = 'relative h-3 -bottom-2';
    } else {
        seen = 'Đã xem';
        nameSend = getLastName(messageData.authorID.fullName);
    }

    useEffect(() => {
        socket.emit('removeMess', { receiverId: groupChatSelect.id, idMess: '' });
    }, []);

    useEffect(() => {
        socket.emit('sendMessChange', {
            receiverId: groupChatSelect.id,
            contentMessage: socketMessChange,
        });
    }, [socketMessChange]);

    const handelDaXem = () => {
        if (!!messageData.file && messageData.file.length > 0) {
        } else {
            if (hidden === 'hidden') setHidden('');
            else setHidden('hidden');
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const getRepMessType = (replyMess) => {
        //console.log(replyMess);
        if (!!replyMess.file) {
            if (replyMess.file.fileType === 'image') {
                return (
                    <View className={' w-24 pt-1 overflow-x-hidden flex items-center ml-2 mr-2 opacity-50 '}>
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                            className={'object-cover rounded-md '}
                            source={{
                                uri: `${replyMess.file.path}`,
                            }}
                        ></Image>
                    </View>
                );
            } else if (replyMess.file.fileType === 'video') {
                return (
                    <View className={'w-52 overflow-x-hidden  flex items-center  mr-1 pt-1 opacity-50'}>
                        <Video
                            ref={video}
                            source={{
                                uri: `${replyMess.file.path}`,
                            }}
                            style={{ width: '100%', aspectRatio: 16 / 9 }}
                            resizeMode="contain"
                            isLooping={true}
                            usePoster={true}
                            className="object-cover rounded-md"
                        />
                    </View>
                );
            } else
                return (
                    <View
                        className={
                            ' pr-2 pl-2 h-10 p-1 text-sm  bg-slate-100 bg-opacity-80 t rounded-full shadow-md flex flex-row items-center justify-center font-medium text-slate-400 ml-2 mr-2'
                        }
                    >
                        <Feather name="paperclip" size={20} color="#47A9FF" />
                        <Text>{replyMess?.file?.title}</Text>
                    </View>
                );
        } else
            return (
                <View
                    className={
                        'max-w-[30%] flex p-2 pt-1 bg-slate-100 opacity-50 text-slate-500 text-sm  rounded-full items-center ml-3 mr-3'
                    }
                >
                    <Text>{messageData?.replyMessage?.title}</Text>
                </View>
            );
    };

    const renderReplyMess = () => {
        if (!!messageData.replyMessage)
            return (
                <View
                    //href={'#' + messageData.replyMessage.id}
                    className={' flex relative -bottom-5 ' + flexRowReverse}
                >
                    {getRepMessType(messageData.replyMessage)}
                </View>
            );
    };

    const files = messageData.file;
    if (!!messageData.file && messageData.file.length > 0) bgFile = ' bg-white ';
    if (statusMess === 0 && messageData.authorID.id === currSignIn?.id) bgFile = ' bg-white ';

    var renderMessage = () => {
        if (statusMess === 0 && messageData.authorID.id === currSignIn?.id) {
            return (
                <View className=" rounded-3xl p-2 pr-3 pl-3 text-sm text-center text-gray-400 italic border border-gray-300 ">
                    <Text> Tin nhắn đã được thu hồi với bạn</Text>
                </View>
            );
        }
        if (!!messageData.file && messageData.file.length > 0) {
            return <MessageFile data={files} idMess={messageData.id} messageData={messageData} />;
        }
        return <Text className={' break-words p-1 text-sm' + textColorSend}>{children}</Text>;
    };
    //console.log(messageData.file);

    const handleThuHoi = async () => {
        Alert.alert('Cảnh báo', 'Bạn có chắc muốn xóa tin nhắn này với mọi người không?', [
            {
                text: 'Hủy',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    var result = await ThuHoiTinNhan(groupChatSelect.id, messageData.id, accessToken, AxiosJWT);
                    if (result) {
                        socket.emit('removeMess', { receiverId: groupChatSelect.id, idMess: messageData.id });
                        handleCloseModal();
                    }
                },
            },
        ]);
        // var result = await ThuHoiTinNhan(groupChatSelect.id, messageData.id, accessToken, AxiosJWT);
        // if (result) {
        //     socket.emit('removeMess', { receiverId: groupChatSelect.id, idMess: messageData.id });
        //     handleCloseModal();
        // }
    };

    const handleRemoveWithUser = async () => {
        var result = await removeMessWithUser(messageData.id, accessToken, AxiosJWT);
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

    const renderReactMess = () => {
        if (!!messageData.reactionMess && messageData.reactionMess.length > 0)
            return (
                <>
                    <View className={'w-full flex flex-row ' + flexRowReverse + positionReaction}>
                        {renderListReaction()}

                        <View
                            className={
                                'text-[9px] hidden min-w-[12rem] absolute bg-black bg-opacity-80  text-white p-1 rounded-md'
                            }
                        >
                            {renderItemReact()}
                        </View>
                    </View>
                </>
            );
    };

    const getArrItemReact = (type) => {
        return messageData.reactionMess.filter((item) => item.type_emotion === type);
    };

    const renderItemReact = () => {
        var arrLike = getArrItemReact('👍');
        var arrHeart = getArrItemReact('❤');
        var arrHaha = getArrItemReact('😆');
        var arrWow = getArrItemReact('😮');
        var arrSad = getArrItemReact('😢');
        var arrAngry = getArrItemReact('😡');
        var mergeReact = [...arrLike, ...arrHeart, ...arrHaha, ...arrWow, ...arrSad, ...arrAngry];

        return mergeReact.map((item, index) => {
            return (
                <View key={index + ''} className={'flex justify-between'}>
                    <View className="flex">
                        <View
                            className={
                                ' w-4 h-4  flex flex-row items-center justify-center rounded-full bg-slate-100  bg-opacity-80 backdrop-blur-md'
                            }
                        >
                            <Text>{item.type_emotion}</Text>
                        </View>
                    </View>
                    <View className="pl-4">
                        <Text>{item.idUser.fullName}</Text>
                    </View>
                </View>
            );
        });
    };

    const renderListReaction = () => {
        var listTypeReact = [];

        return messageData.reactionMess.map((reaction, index) => {
            if (listTypeReact.includes(reaction.type_emotion)) {
                return <View key={index + ''}></View>;
            } else listTypeReact.push(reaction.type_emotion);
            return (
                <View
                    key={index + ' '}
                    className={
                        'ring-2 ml-1 ring-white w-4 h-4 text-xs flex items-center justify-center rounded-full bg-slate-100  bg-opacity-80 backdrop-blur-md'
                    }
                >
                    <Text>{reaction.type_emotion}</Text>
                </View>
            );
        });
    };

    return (
        <View className="">
            {renderReplyMess()}
            <View className="w-full">
                <Text className={'text-center text-[12px] text-slate-400 pr-2 ' + hidden}>
                    {formatTimeAuto(messageData.createdAt)}
                </Text>
            </View>
            <View className={'flex flex-row items-end mb-2 pl-2 pr-2 relative ' + flexRowReverse}>
                <View className="rounded-full overflow-hidden flex justify-center items-center p-1 mb-5">
                    <Image
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        className={'rounded-full' + avatarHidden}
                        source={{
                            uri: `${messageData.authorID.profile.urlAvartar}`,
                        }}
                    ></Image>
                </View>
                <TouchableWithoutFeedback
                    delayLongPress={500}
                    onLongPress={handleOpenModal}
                    //onLongPress={() => setHiddenModal('')}
                    //onPressOut={() => setHiddenModal('hidden')}
                    onPress={handelDaXem}
                >
                    <View>
                        <Text className={'text-left text-[12px] text-gray-700 pl-2 '}>{nameSend}</Text>
                        <View
                            className={bgMessage + ' w-min rounded-2xl p-2 text-sm ' + bgFile}
                            style={{ maxWidth: 280 }}
                        >
                            {/* <Text className={' break-words p-1 text-sm' + textColorSend}>{children}</Text> */}
                            {renderMessage()}
                            {renderReactMess()}
                        </View>

                        <View className=" flex-row items-center justify-center hidden">
                            <View className="absolute">
                                <Feather name="heart" size={14} color="#000000" />
                            </View>
                        </View>
                        <View>
                            <Text className={'text-right text-[12px] text-slate-400 pr-2 ' + hidden}>{seen}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className="absolute bottom-0 left-0">
                <View className="relative">
                    <MessageModal
                        className=""
                        modalVisible={modalVisible}
                        handleCloseModal={handleCloseModal}
                        handleOpenModal={handleOpenModal}
                        handleThuHoi={handleThuHoi}
                        handleRemoveWithUser={handleRemoveWithUser}
                        handleForward={handleForward}
                        handleReply={handleReply}
                        idUser={messageData.authorID.id}
                        messageData={messageData}
                    ></MessageModal>
                </View>
            </View>
        </View>
    );
}
