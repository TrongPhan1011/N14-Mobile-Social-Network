import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import logo from '../../assets/logo.png';
import Button from '../../components/Button/button';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function TrangChuScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <LinearGradient colors={['#FFFFFF', '#68D2FF', '#47A9FF']} className={'h-full'}>
                <View className={'h-40 w-full flex justify-center items-center'}>
                    <Image source={logo} />
                </View>
                <View className={'flex justify-center items-center h-full'}>
                    <Button
                        classNames={'w-64 h-14 bg-lcn-blue-4 rounded-[50px] border border-white '}
                        onPress={() => {
                            navigation.navigate('DangNhapScreen');
                        }}
                    >
                        <Text className={'text-white font-semibold text-2xl'}>Đăng nhập</Text>
                    </Button>
                    <View className={' flex flex-row p-5'}>
                        <Text className={'text-lcn-blue-5 font-semibold text-base'}>Bạn chưa có tài khoản ? </Text>
                        <Text
                            className={'text-white font-semibold text-base'}
                            onPress={() => {
                                navigation.navigate('DangKyScreen');
                            }}
                        >
                            Đăng ký ngay
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}
