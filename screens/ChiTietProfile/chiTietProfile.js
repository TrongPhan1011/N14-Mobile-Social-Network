import { View, Text, Image, Pressable, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { addArrayImage } from '../../redux/Slice/sidebarChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import anhBia from '../../assets/coverPhoto.jpg';
import avatarDefault from '../../assets/avatarDefault.png';
import Dialog from 'react-native-dialog';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { uploadFileImg, uploadFileBase64 } from '../../services/fileService';
export default function ChiTietProfile({ userId, avatar, coverPhoto, userName }) {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [visibleBia, setVisibleBia] = useState(false);
    const [active, setActive] = useState('');
    const [activeBia, setActiveBia] = useState('');
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var banner = false;
    const showDialog = () => {
        setVisible(true);
        setVisibleBia(false);
    };
    const showDialogBia = () => {
        setVisibleBia(true);
        setVisible(false);
    };
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const navigation = useNavigation();
    var arrImg = [];
    useEffect(() => {
        if (curUser.id === userId) {
            setActive('hidden');
            setActiveBia('hidden');
        } else {
            setActive('');
            setActiveBia('');
        }
    }, [userId]);
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
    // var singleImage = '';
    // if (arrayImage.length < 2) singleImage = ' hidden';

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

        //console.log(result);
        // setListFileIMG((prev) => [...prev, ...result]);
        if (!!result.selected) arrImg.push(...result.selected);
        else arrImg.push(result);
        //console.log(arrImg);

        if (!result.cancelled) {
            try {
                var arrayImage = [];
                var uri = result.uri;
                // console.log(uri);
                arrayImage.push(uri);
                dispatch(addArrayImage(arrayImage));
                navigation.navigate('PreviewAvatar', {
                    arrayImage,
                    banner,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const pickImageBia = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            allowsMultipleSelection: true,
            //base64: true,
            aspect: [4, 3],
            quality: 1,
        });

        //console.log(result);
        // setListFileIMG((prev) => [...prev, ...result]);
        if (!!result.selected) arrImg.push(...result.selected);
        else arrImg.push(result);
        //console.log(arrImg);

        if (!result.cancelled) {
            try {
                banner = true;
                var arrayImage = [];
                var uri = result.uri;
                // console.log(uri);
                arrayImage.push(uri);
                dispatch(addArrayImage(arrayImage));
                navigation.navigate('PreviewAvatar', {
                    arrayImage,
                    banner,
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    var imgBia = anhBia;
    var imgAvartar = avatarDefault;
    if (coverPhoto) {
        imgBia = {
            uri: `${coverPhoto}`,
        };
    }

    if (avatar) {
        imgAvartar = {
            uri: `${avatar}`,
        };
    }

    var arrUrlImg = [];

    const handleChiTietHinhAnhAvartar = () => {
        arrUrlImg.push(avatar);
        // console.log(arrUrlImg);
        dispatch(addArrayImage(arrUrlImg));
        setVisible(false);
        setVisibleBia(false);
        navigation.navigate('ChiTietHinhAnh');
    };
    const handleChiTietHinhAnhBia = () => {
        arrUrlImg.push(imgBia);
        console.log(arrUrlImg);
        dispatch(addArrayImage(arrUrlImg));
        setVisible(false);
        setVisibleBia(false);
        navigation.navigate('ChiTietHinhAnh');
    };
    const handleCancel = () => {
        setVisible(false);
        setVisibleBia(false);
    };
    const rederBia = () => {
        if (activeBia == 'hiden') {
            <View className="w-full h-40  ">
                <Pressable
                    //onPress={handleChiTietHinhAnhBia}
                    onPress={showDialogBia}
                >
                    <TouchableWithoutFeedback>
                        <Dialog.Container visible={visibleBia}>
                            <Dialog.Description>
                                <Text onPress={handleChiTietHinhAnhBia}>Xem ảnh bìa</Text>
                            </Dialog.Description>

                            <Dialog.Description>
                                <Text onPress={pickImageBia}>Đổi ảnh bìa</Text>
                            </Dialog.Description>
                            {/* <Dialog.Description>
                                    <View className={'text-right ml-5'}>
                                        <Text
                                            onPress={() => {
                                                navigation.goBack();
                                            }}
                                        >
                                            Trở lại
                                        </Text>
                                    </View>
                                </Dialog.Description> */}
                            <Dialog.Button label="Trở lại" onPress={handleCancel} />
                        </Dialog.Container>
                    </TouchableWithoutFeedback>
                    <Image
                        className="h-full w-full"
                        // source={{
                        //     uri: `${coverPhoto}`,
                        // }}
                        source={imgBia}
                    ></Image>
                </Pressable>
            </View>;
        }
    };

    const reder = () => {
        if (active === 'hidden') {
            return (
                <>
                    <View className="w-full h-40  ">
                        <Pressable
                            //onPress={handleChiTietHinhAnhBia}
                            onPress={showDialogBia}
                        >
                            <TouchableWithoutFeedback>
                                <Dialog.Container visible={visibleBia}>
                                    <Dialog.Description>
                                        <Text onPress={handleChiTietHinhAnhBia}>Xem ảnh bìa</Text>
                                    </Dialog.Description>

                                    <Dialog.Description>
                                        <Text onPress={pickImageBia}>Đổi ảnh bìa</Text>
                                    </Dialog.Description>
                                    {/* <Dialog.Description>
                                    <View className={'text-right ml-5'}>
                                        <Text
                                            onPress={() => {
                                                navigation.goBack();
                                            }}
                                        >
                                            Trở lại
                                        </Text>
                                    </View>
                                </Dialog.Description> */}
                                    <Dialog.Button label="Trở lại" onPress={handleCancel} />
                                </Dialog.Container>
                            </TouchableWithoutFeedback>
                            <Image
                                className="h-full w-full"
                                // source={{
                                //     uri: `${coverPhoto}`,
                                // }}
                                source={imgBia}
                            ></Image>
                        </Pressable>
                    </View>
                    <View className="overflow-hidden absolute top-24 rounded-full">
                        <Pressable
                            // onPress={handleChiTietHinhAnhAvartar}
                            onPress={showDialog}
                            // onPressOut={handleCancel}
                        >
                            <TouchableWithoutFeedback>
                                <Dialog.Container visible={visible}>
                                    <Dialog.Description>
                                        <Text onPress={handleChiTietHinhAnhAvartar}>Xem ảnh đại diện</Text>
                                    </Dialog.Description>

                                    <Dialog.Description>
                                        <Text onPress={pickImage}>Đổi ảnh đại diện</Text>
                                    </Dialog.Description>
                                    {/* <Dialog.Description>
                                    <View className={'text-right ml-5'}>
                                        <Text
                                            onPress={() => {
                                                navigation.goBack();
                                            }}
                                        >
                                            Trở lại
                                        </Text>
                                    </View>
                                </Dialog.Description> */}
                                    <Dialog.Button label="Trở lại" onPress={handleCancel} />
                                </Dialog.Container>
                            </TouchableWithoutFeedback>
                            <Image
                                className="h-32 w-32  "
                                // source={{
                                //     uri: `${avatar}`,
                                // }}
                                source={imgAvartar}
                            ></Image>
                        </Pressable>
                    </View>
                </>
            );
        } else {
            return (
                <>
                    <View className="w-full h-40  ">
                        <Pressable
                            //onPress={handleChiTietHinhAnhBia}
                            onPress={showDialogBia}
                        >
                            <TouchableWithoutFeedback>
                                <Dialog.Container visible={visibleBia}>
                                    <Dialog.Description>
                                        <Text onPress={handleChiTietHinhAnhBia}>Xem ảnh bìa</Text>
                                    </Dialog.Description>

                                    <Dialog.Button label="Trở lại" onPress={handleCancel} />
                                </Dialog.Container>
                            </TouchableWithoutFeedback>
                            <Image
                                className="h-full w-full"
                                // source={{
                                //     uri: `${coverPhoto}`,
                                // }}
                                source={imgBia}
                            ></Image>
                        </Pressable>
                    </View>
                    <View className="overflow-hidden absolute top-24 rounded-full">
                        <Pressable
                            // onPress={handleChiTietHinhAnhAvartar}
                            onPress={showDialog}
                            // onPressOut={handleCancel}
                        >
                            <TouchableWithoutFeedback>
                                <Dialog.Container visible={visible}>
                                    <Dialog.Description>
                                        <Text onPress={handleChiTietHinhAnhAvartar}>Xem ảnh đại diện</Text>
                                    </Dialog.Description>

                                    <Dialog.Button label="Trở lại" onPress={handleCancel} />
                                </Dialog.Container>
                            </TouchableWithoutFeedback>
                            <Image
                                className="h-32 w-32  "
                                // source={{
                                //     uri: `${avatar}`,
                                // }}
                                source={imgAvartar}
                            ></Image>
                        </Pressable>
                    </View>
                </>
            );
        }
    };

    return (
        <View
            className=" bg-white pb-3"
            onPress={() => {
                navigation.goBack();
            }}
        >
            <View className=" w-full items-center">{reder()}</View>
            <View className="pt-20 w-full items-center">
                <Text className="font-semibold text-xl text-lcn-blue-5">{userName}</Text>
            </View>
        </View>
    );
}
