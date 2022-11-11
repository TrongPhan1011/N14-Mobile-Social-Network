import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { addArrayImage } from '../../redux/Slice/sidebarChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function ChiTietProfile({ avatar, coverPhoto, userName }) {
    const dispatch = useDispatch();
    const arrayImage = useSelector((state) => state.sidebarChatSlice.arrayImage);
    const navigation = useNavigation();
    var arrUrlImg = [];

    const handleChiTietHinhAnh = () => {
        arrUrlImg.push(avatar);
        console.log(arrUrlImg);
        dispatch(addArrayImage(arrUrlImg));

        navigation.navigate('ChiTietHinhAnh');
    };

    return (
        <View className=" bg-white pb-3">
            <View className=" w-full items-center">
                <View className="w-full h-40  ">
                    <Image
                        className="h-full w-full"
                        source={{
                            uri: 'https://i.pinimg.com/736x/52/55/44/5255445017cd98fd66d7d589e6c10f58.jpg',
                        }}
                    ></Image>
                </View>
                <View className="overflow-hidden absolute top-24 rounded-full">
                    <Pressable onPress={handleChiTietHinhAnh}>
                        <Image
                            className="h-32 w-32  "
                            source={{
                                uri: `${avatar}`,
                            }}
                        ></Image>
                    </Pressable>
                </View>
            </View>
            <View className="pt-20 w-full items-center">
                <Text className="font-semibold text-xl text-lcn-blue-5">{userName}</Text>
            </View>
        </View>
    );
}
