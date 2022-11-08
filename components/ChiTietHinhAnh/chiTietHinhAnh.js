import { View, Text, Image, SafeAreaView, StatusBar, Platform, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadFile } from '../../services/fileService';

const ChiTietHinhAnh = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const [urlImage, setUrlImage] = useState(arrayImage[0]);
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
    return (
        <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            className="bg-lcn-blue-2"
        >
            <View className="h-full w-full flex flex-col">
                <View className="h-14 bg-lcn-blue-2 flex flex-row items-center">
                    <Pressable className="ml-2 w-4/6" onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={30} color="#47A9FF" />
                    </Pressable>
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
                        <Feather name="more-vertical" size={30} color="#47A9FF" />
                    </Pressable>
                </View>
                <View className="flex-1 items-center justify-center bg-white">
                    <Image
                        style={{ width: 400, height: 400, resizeMode: 'contain' }}
                        className=""
                        source={{
                            uri: `${urlImage}`,
                        }}
                    ></Image>
                </View>
                <View className={'h-24 bg-white items-center justify-center' + singleImage}>
                    <View className="h-16 w-72 items-center justify-center">{renderImage()}</View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChiTietHinhAnh;
