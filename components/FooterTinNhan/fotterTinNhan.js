import { View, Text, TextInput, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect, useRef, memo } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import Storage from '@aws-amplify/storage';
//import { Item } from 'react-native-paper/lib/typescript/components/List/List';
//import * as Clipboard from 'expo-clipboard';

export default memo(function fotterTinNhan({ type }) {
    const dispatch = useDispatch();
    const curChat = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [currMessage, setCurrMessage] = useState('');
    const [messageSend, setMessageSend] = useState();
    const [image, setImage] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [listFileIMG, setListFileIMG] = useState([]);
    var arrImg = [];

    //const txtSendRef = useRef();

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
                    alert('Sorry, we need these permissions to make this work!');
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
        };

        return { newMess, newMessSave };
    };

    const handleSendMessage = () => {
        if (!!currMessage && currMessage !== '') {
            var newMessText = getNewMess(currMessage, 'text', null);
            saveMess(newMessText.newMessSave, newMessText.newMess);
        }
        setCurrMessage('');
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
    const handleImagePicked = async (pickerResult) => {
        try {
            if (pickerResult.cancelled) {
                alert('Upload cancelled');
                return;
            } else {
                setPercentage(0);
                const img = await fetchImageFromUri(pickerResult.uri);
                console.log(img);
                const uploadUrl = await uploadImage('demo.jpg', img);
                downloadImage(uploadUrl);
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed');
        }
    };

    const setLoading = (progress) => {
        const calculated = parseInt((progress.loaded / progress.total) * 100);
        updatePercentage(calculated); // due to s3 put function scoped
    };

    const updatePercentage = (number) => {
        setPercentage(number);
    };

    const downloadImage = (uri) => {
        Storage.get(uri)
            .then((result) => setImage(result))
            .catch((err) => console.log(err));
    };

    const fetchImageFromUri = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const copyToClipboard = () => {
        Clipboard.setString(image);
        alert('Copied image URL to clipboard');
    };

    // const takePhoto = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: 'Images',
    //         aspect: [4, 3],
    //     });

    //     this.handleImagePicked(result);
    // };

    var handlePreviewIMG = (selectedFiles) => {
        //console.log(selectedFiles);
        var listFileImgPreview = [];
        const SIZE_FILE = 62914560; // = 60MB
        const TOTAL_IMG = 50;

        if (selectedFiles.length > TOTAL_IMG) {
            Alert.alert('Tối đa mỗi lần gửi là 50 ảnh hoặc video');
            return;
        }
        // console.log('length ' + selectedFiles.length);
        for (var i = 0; i < selectedFiles.length; i++) {
            var img = selectedFiles[i].uri;
            console.log(img);
            if (img.size > SIZE_FILE) {
                Alert.alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
                return;
            }

            //img.preview = URL.createObjectURL(img);
            listFileImgPreview.push(img);
        }
        setListFileIMG((prev) => [...prev, ...listFileImgPreview]);
    };

    return (
        <SafeAreaView className="">
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
