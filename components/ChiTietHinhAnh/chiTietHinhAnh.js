import { View, Text, Image, SafeAreaView, StatusBar, Platform, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef, memo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileImg, uploadFileBase64 } from '../../services/fileService';
import Button from '../Button/button';
const ChiTietHinhAnh = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const [urlImage, setUrlImage] = useState(arrayImage[0]);
    var arrImg = [];
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
                //for (result of arrImg) uploadImage(result);
                //for (var i = 0; i < arrImg.length; i++)
                uploadImage();
                // arrImg.map((item, index) => {
                //     uploadImage(item[index]);
                // });
                // var typeFile = '';
                // if (result.type === 'image' || result.type === 'jpeg') typeFile = 'image/jpeg';
                // else if (result.type === 'video') typeFile = 'video/mp4';
                // else typeFile = 'doc';
                // var photo = {
                //     uri: result.uri,
                //     type: typeFile,
                //     name: 'file',
                // };
                // const formDataIMG = new FormData();
                // formDataIMG.append('images', photo);
                // var arrURLImg = await uploadFileImg(formDataIMG);
                // var newMessIMG = getNewMess('', 'img/video', arrURLImg);
                // await saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
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
                    <Pressable className="w-1/6 ">
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
                    </Pressable>
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
            </View>
        </SafeAreaView>
    );
};

export default ChiTietHinhAnh;
