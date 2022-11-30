import {
    View,
    Text,
    Image,
    SafeAreaView,
    StatusBar,
    Platform,
    Pressable,
    ScrollView,
    BackHandler,
    StyleSheet,
    ViewStyle,
    Dimensions,
    ImageStyle,
    ImageResizeMode,
    Alert,
} from 'react-native';
import React, { useState, useEffect, useRef, memo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadFile } from '../../services/fileService';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import avtDefault from '../../assets/avatarDefault.png';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileImg, uploadFileBase64 } from '../../services/fileService';
import Button from '../Button/button';
import { updateAvatar, updateBanner } from '../../services/userService';
import { changeAvatarGroup } from '../../services/chatService';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import socket from '../../utils/getSocketIO';
import { addMess } from '../../services/messageService';

const PreviewAvatar = ({ route }) => {
    var arrImage = route.params.arrayImage;
    var banner = route.params.banner;
    console.log(banner);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const [banner, setBanner] = useState(false);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var accessToken = currAccount.accessToken;
    const [selectedFile, setSelectedFile] = useState();
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const [urlImage, setUrlImage] = useState(arrayImage[0]);
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const curSignInGroup = useSelector((state) => state.signIn.userLogin);
    // const currAuth = useSelector((state) => state.auth.currentUser);
    // var axiosJWT = getAxiosJWT(dispatch, currAuth);

    // const [preview, setPreview] = useState(ava);
    // var arrImage = arrImg;
    useEffect(() => {
        if (!selectedFile) {
            // setPreview(ava);
            // setBanner(false);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
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
    // const [border, setBorder] = useState('');
    // const saveImg = async () => {
    //     var listFileImgPreview = [];

    //     listFileImgPreview.push(selectedFile);
    //     const formDataFile = new FormData();

    //     formDataFile.append('images', listFileImgPreview[0]);
    //     console.log(listFileImgPreview);
    //     var urlIMG = await uploadFileImg(formDataFile);
    //     console.log(urlIMG);
    //     if (banner === true) {
    //         const updateImg = await updateBanner(curUser.id, urlIMG[0].path, accessToken, axiosJWT, dispatch);
    //         if (!!updateImg) {
    //             alert('Đổi ảnh thành công');
    //             window.location.reload(false);
    //         }
    //     } else {
    //         const updateImg = await updateAvatar(curUser.id, urlIMG[0].path, accessToken, axiosJWT, dispatch);
    //         if (!!updateImg) {
    //             alert('Đổi ảnh thành công');
    //             window.location.reload(false);
    //         }
    //     }
    // };
    var singleImage = '';
    if (arrayImage.length < 2) singleImage = ' hidden';

    const renderImage = () => {
        const image = arrayImage.map((item, index) => {
            return (
                <Pressable
                    onPress={() => {
                        setUrlImage(item);
                        //setBorder(' border border-lcn-blue-4 bottom-2 ');
                    }}
                    key={item + index}
                    //className={'' + border}
                >
                    <Image
                        style={{ width: 80, height: 80 }}
                        className="p-1"
                        key={item + index}
                        source={{
                            uri: `${item}`,
                        }}
                    ></Image>
                </Pressable>
            );
        });
        return (
            <ScrollView horizontal={true} className="">
                <View className="flex flex-row items-center justify-center">{image}</View>
            </ScrollView>
        );
    };

    const uploadImage = async () => {
        console.log(arrImage[0]);
        if (arrImage.length === 1) {
            var typeFile = 'image/jpeg';
            // if (arrImage[0].type === 'image' || arrImage[0].type === 'jpeg') typeFile = 'image/jpeg';
            // else if (arrImage[0].type === 'video') typeFile = 'video/mp4';
            // else typeFile = 'doc';
            var photo = {
                uri: arrImage[0],
                type: typeFile,
                name: 'file',
            };
            const formDataIMG = new FormData();

            formDataIMG.append('images', photo);
            console.log(photo);
            var arrURLImg = await uploadFileImg(formDataIMG);

            //console.log(arrURLImg);
            // var newMessIMG = getNewMess('', 'img/video', arrURLImg);
            // await saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
            //formDataIMG.delete();

            if (banner === true) {
                const updateImg = await updateBanner(curUser.id, arrURLImg[0].path, accessToken, axiosJWT, dispatch);
                if (!!updateImg) {
                    Alert.alert('Đổi ảnh bìa thành công');
                }
            } else if (banner === 'group') {
                const updateImg = await changeAvatarGroup(
                    groupChatSelect?.id,
                    arrURLImg[0].path,
                    accessToken,
                    axiosJWT,
                );
                if (!!updateImg) {
                    dispatch(selectGroup(updateImg));
                    saveMessSystem(groupChatSelect.id, curSignInGroup.fullName + ' đã đổi ảnh đại diện nhóm ');
                    //Alert.alert('Đổi ảnh đại diện nhóm thành công');
                    navigation.navigate('ChiTietTinNhan');
                }
            } else {
                const updateImg = await updateAvatar(curUser.id, arrURLImg[0].path, accessToken, axiosJWT, dispatch);
                if (!!updateImg) {
                    Alert.alert('Thành công');
                }
            }
            // } else {
            //     const formDataIMGGroup = new FormData();
            //     for (var i = 0; i < arrImg.length; i++) {
            //         var typeFile = '';
            //         if (arrImg[i].type === 'image' || arrImg[i].type === 'jpeg') typeFile = 'image/jpeg';
            //         else if (arrImg[i].type === 'video') typeFile = 'video/mp4';
            //         else typeFile = 'doc';
            //         var photo = {
            //             uri: arrImg[i].uri,
            //             type: typeFile,
            //             name: 'file',
            //         };

            //         formDataIMGGroup.append('images', photo);
            //     }
            //console.log(formDataIMGGroup);
            // var arrURLImgGroup = await uploadFileImg(formDataIMGGroup);
            // var newMessIMGroup = getNewMess('', 'img/video', arrURLImgGroup);
            // await saveMess(newMessIMGroup.newMessSave, newMessIMGroup.newMess);
            //arrImg = [];
            //formDataIMG.delete();
        }
    };

    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: curSignInGroup.id,
            seen: [{ id: curSignInGroup.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        var newMessSocket = {
            title: text,
            authorID: {
                id: curSignInGroup.id,
                fullName: curSignInGroup.fullName,
                profile: {
                    urlAvartar: curSignInGroup.profile.urlAvartar,
                },
            },

            seen: [{ id: curSignInGroup.id, seenAt: Date.now() }],
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

    const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
        console.log('');
        console.log('');
        console.log('-------------');
        console.log('Event: ', event);
        console.log('GestureState: ', gestureState);
        console.log('ZoomableEventObject: ', zoomableViewEventObject);
        console.log('');
        console.log(`Zoomed from ${zoomableViewEventObject.lastZoomLevel} to  ${zoomableViewEventObject.zoomLevel}`);
    };
    console.log(urlImage);
    var img = urlImage;
    if (urlImage.length > 2) {
        img = {
            uri: `${urlImage}`,
        };
    }
    return (
        <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            className="bg-lcn-blue-2"
        >
            <View className="h-full w-full flex flex-col bg-white">
                <View className="h-14 bg-lcn-blue-2 flex flex-row items-center">
                    <Pressable className="ml-2 w-4/6" onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={30} color="#47A9FF" />
                    </Pressable>
                    {/* <Pressable className="w-2/6">
                        <Button
                            classNames={'text-gray-500 border-gray-500 m-0 rounded-2xl border h-7 bg-white flex'}
                            disabled
                        >
                            <Text>Đã xóa yêu cầu</Text>
                        </Button>
                    </Pressable> */}
                    {/* <Pressable className="w-1/6 ">
                        <Feather
                            name="download"
                            size={30}
                            color="#47A9FF"
                            // onPress={() => {
                            //     if (!!urlImage) DownloadFile(urlImage);
                            // }}
                        />
                    </Pressable>

                    <Pressable className="">
                        <Feather name="more-vertical" size={30} color="#47A9FF" onPress={pickImage} />
                    </Pressable> */}
                </View>

                <View style={{ flex: 1, overflow: 'hidden' }} className="flex-1 items-center justify-center bg-white">
                    <ReactNativeZoomableView
                        maxZoom={1.5}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                        onZoomAfter={() => {
                            logOutZoomState;
                        }}
                        style={{
                            padding: 10,
                        }}
                    >
                        <Image
                            //  style={{ width: 400, height: 400, resizeMode: 'contain' }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                width: 300,
                                height: 200,
                                padding: 10,
                                resizeMode: 'contain',
                            }}
                            // source={{
                            //     uri: `${urlImage}`,
                            // }}
                            source={img}
                            resizeMode="contain"
                        ></Image>
                    </ReactNativeZoomableView>
                </View>
                <View className={'h-24 bg-white items-center justify-center' + singleImage}>
                    <View className="h-16 w-72 items-center justify-center">{renderImage()}</View>
                </View>
                <View className={'items-center justify-center mb-5'}>
                    <Button
                        classNames={
                            ' w-40 text-gray-500 border-gray-500 m-0 rounded-2xl border h-10 bg-white flex items-center justify-center'
                        }
                        onPress={uploadImage}
                    >
                        <Text>Lưu thay đổi</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PreviewAvatar;
