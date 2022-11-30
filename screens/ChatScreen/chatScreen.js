import { View, Text, SafeAreaView, TouchableHighlight, Platform, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import HeaderSearch from '../../components/HeaderSearch';
import ListItemChat from '../../components/ListItemChat';
import ChiTietTinNhan from '../ChiTietTinNhan';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect, useDispatch, useSelector } from 'react-redux';
export default function ChatScreen() {
    const navigation = useNavigation();
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    // if (!curSignIn) {
    //     navigation.navigate('DangNhapScreen');
    // }

    return (
        <>
            {!!currAccount ? (
                <SafeAreaView>
                    {/* phan trang chu tin nhan */}
                    <HeaderSearch />
                    <View className="bg-white h-full w-full">
                        <TouchableHighlight>
                            <ListItemChat />
                        </TouchableHighlight>
                    </View>

                    {/* phan chi tiet tin nhan */}
                    {/* <ChiTietTinNhan /> */}
                </SafeAreaView>
            ) : (
                navigation.navigate('DangNhapScreen')
            )}
        </>
    );
}
