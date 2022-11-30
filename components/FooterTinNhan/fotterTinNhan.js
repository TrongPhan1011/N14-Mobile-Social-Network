import { View, Text, TextInput, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect, useRef, memo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { addMess } from '../../services/messageService';
import socket from '../../utils/getSocketIO';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileImg, uploadFileBase64 } from '../../services/fileService';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { replyMess } from '../../redux/Slice/messageSlice';
import { Video } from 'expo-av';
import Storage from '@aws-amplify/storage';
//import { replyMess } from '../../redux/Slice/messageSlice';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
//import * as Clipboard from 'expo-clipboard';

export default memo(function fotterTinNhan({ type }) {
    const dispatch = useDispatch();
    const curChat = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var dataReply = useSelector((state) => state.messageSlice.replyMess);
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [currMessage, setCurrMessage] = useState('');
    const [messageSend, setMessageSend] = useState();
    const [image, setImage] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [replyMessData, setReplyMessData] = useState();
    const [listFileIMG, setListFileIMG] = useState([]);
    const video = React.useRef(null);
    var arrImg = [];

    //const txtSendRef = useRef();
    useEffect(() => {
        if (!!dataReply) {
            setReplyMessData(dataReply);
        }
    }, [dataReply]);

    var hiddenReply = ' hidden ';
    if (!!replyMessData) hiddenReply = '';

    useEffect(() => {
        if (!!curChat && !!messageSend) {
            socket.emit('sendMessage', {
                receiverId: curChat.id,
                contentMessage: messageSend,
            });
        }
    }, [messageSend]);

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraRollStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
                    alert('Xin lỗi, chúng tôi cần quyền truy cập từ thiết bị của bạn!');
                }
            }
        })();
    }, []);

    const saveMess = async (newMessSave, newMess) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            newMess.id = messData.id;
            setMessageSend(newMess);
        }
    };

    var saveIMG = async () => {
        const formDataIMG = new FormData();

        for (var i = 0; i < listFileIMG.length; i++) {
            formDataIMG.append('images', listFileIMG[i]);
        }

        var arrURLImg = await uploadFileImg(formDataIMG);
        var newMessIMG = getNewMess('', 'img/video', arrURLImg);
        saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
    };

    var getNewMess = (title, type, file) => {
        let newReplyDataSocket = null,
            newReplyDataSave = null;

        if (!!replyMessData) {
            newReplyDataSocket = {
                id: replyMessData.id,
                title: replyMessData.title,
                file: replyMessData.file[0],
            };
            newReplyDataSave = replyMessData.id;
        }
        var newMess = {
            title: title,
            authorID: {
                id: curSignIn.id,
                fullName: curSignIn.fullName,
                profile: {
                    urlAvartar: curSignIn.profile.urlAvartar,
                },
            },

            type: type,
            idChat: curChat.id,
            seen: [
                {
                    idSeen: curSignIn.id,
                    seenAt: Date.now(),
                },
            ],
            file: [],
            replyMessage: newReplyDataSocket,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        if (!!file) {
            newMess.file = file;
        }

        var newMessSave = {
            title: newMess.title,
            authorID: newMess.authorID.id,
            seen: newMess.seen,
            type_mess: newMess.type,
            idChat: newMess.idChat,
            status: 1,
            file: newMess.file,
            replyMessage: newMess.replyMessage,
        };

        return { newMess, newMessSave };
    };

    const handleSendMessage = () => {
        if (!!currMessage && currMessage !== '') {
            var newMessText = getNewMess(currMessage, 'text', null);
            saveMess(newMessText.newMessSave, newMessText.newMess);
            setCurrMessage('');
            setReplyMessData(null);
            dispatch(replyMess(null));
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            allowsMultipleSelection: true,
            //base64: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!!result.selected) arrImg.push(...result.selected);
        else arrImg.push(result);
        //console.log(arrImg);

        if (!result.cancelled) {
            try {
                uploadImage();
            } catch (error) {
                console.log(error);
            }
        }
    };
    const uploadImage = async () => {
        if (arrImg.length === 1) {
            var typeFile = '';
            if (arrImg[0].type === 'image' || arrImg[0].type === 'jpeg') typeFile = 'image/jpeg';
            else if (arrImg[0].type === 'video') typeFile = 'video/mp4';
            else typeFile = 'doc';
            var photo = {
                uri: arrImg[0].uri,
                type: typeFile,
                name: 'file',
            };
            const formDataIMG = new FormData();

            formDataIMG.append('images', photo);
            //console.log(formDataIMG);
            var arrURLImg = await uploadFileImg(formDataIMG);
            var newMessIMG = getNewMess('', 'img/video', arrURLImg);
            await saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
            //formDataIMG.delete();
        } else {
            const formDataIMGGroup = new FormData();
            for (var i = 0; i < arrImg.length; i++) {
                var typeFile = '';
                if (arrImg[i].type === 'image' || arrImg[i].type === 'jpeg') typeFile = 'image/jpeg';
                else if (arrImg[i].type === 'video') typeFile = 'video/mp4';
                else typeFile = 'doc';
                var photo = {
                    uri: arrImg[i].uri,
                    type: typeFile,
                    name: 'file',
                };

                formDataIMGGroup.append('images', photo);
            }
            //console.log(formDataIMGGroup);
            var arrURLImgGroup = await uploadFileImg(formDataIMGGroup);
            var newMessIMGroup = getNewMess('', 'img/video', arrURLImgGroup);
            await saveMess(newMessIMGroup.newMessSave, newMessIMGroup.newMess);
            //arrImg = [];
            //formDataIMG.delete();
        }
    };

    // const takePhoto = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: 'Images',
    //         aspect: [4, 3],
    //     });

    //     this.handleImagePicked(result);
    // };

    //console.log(replyMessData);
    const reviewMessFileReply = () => {
        if (replyMessData?.type_mess === 'img/video')
            return (
                <View>
                    {replyMessData?.file[0].fileType === 'image' ? (
                        <Image
                            style={{ width: 50, height: 50, resizeMode: 'cover' }}
                            className=""
                            source={{
                                uri: `${replyMessData?.file[0].path}`,
                            }}
                        ></Image>
                    ) : (
                        <View className="w-24">
                            <Video
                                ref={video}
                                source={{
                                    uri: `${replyMessData?.file[0].path}`,
                                }}
                                style={{ width: '100%', aspectRatio: 16 / 9 }}
                                resizeMode="contain"
                                usePoster={true}
                                posterStyle={{ resizeMode: 'cover' }}
                            />
                        </View>
                    )}
                </View>
            );
        else
            return (
                <View className="bg-blue-200 p-2 rounded-2xl flex flex-row w-full items-center">
                    <View className="mr-2 items-center">
                        <MaterialCommunityIcons name="file-word" size={30} color="#47A9FF" />
                    </View>
                    <Text className="break-words pr-10">{replyMessData?.file[0].title}</Text>
                </View>
            );
    };

    const reviewMessageReply = () => {
        //console.log(replyMessData);
        return (
            <View
                className={
                    ' w-full flex p-2 ml-1 bg-slate-200 flex-row relative border-l-4 border-lcn-blue-4' + hiddenReply
                }
            >
                <View className="">
                    <Text className="text-xs">Đang trả lời cho tin nhắn</Text>
                    {replyMessData?.type_mess === 'text' ? (
                        <Text className="text-sm text-black">{replyMessData?.title}</Text>
                    ) : (
                        reviewMessFileReply()
                    )}
                </View>
                <View className="absolute right-1">
                    <AntDesign
                        className=""
                        name="close"
                        size={20}
                        color="#47A9FF"
                        onPress={() => {
                            dispatch(replyMess(null));
                            setReplyMessData(null);
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="">
            {reviewMessageReply()}
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            <View className=" flex flex-row items-center bg-white justify-center p-2 border border-slate-100 border-t">
                <View className="">
                    <AntDesign name="pluscircle" size={30} color="#47A9FF" />
                </View>
                <View className="ml-3">
                    <FontAwesome name="file-image-o" size={30} color="#47A9FF" onPress={pickImage} />
                </View>
                <View className=" ml-3 w-4/6 rounded-3xl p-1 border border-lcn-blue-4 bg-white">
                    <TextInput
                        className="pl-2 pr-2"
                        placeholder="Tin nhắn"
                        value={currMessage}
                        onChangeText={(value) => setCurrMessage(value)}
                    ></TextInput>
                </View>
                <TouchableOpacity className="ml-2" onPress={handleSendMessage}>
                    <FontAwesome name="send" size={30} color="#47A9FF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});
