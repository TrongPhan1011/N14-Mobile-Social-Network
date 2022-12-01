import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderSearch from '../../components/HeaderSearch';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BanBe from './ContentBanBe/contentBanBe';
import ChoXacNhan from './ContentChoXacNhan/contentChoXacNhan';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, memo } from 'react';
import HeaderSearchFriend from '../../components/HeaderSearchFriend';

const Tab = createMaterialTopTabNavigator();

export default function FriendScreen() {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [countXN, setCountXN] = useState(0);
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    // var curUser = curSignIn.userLogin;
    //console.log(curSignIn);
    useEffect(() => {
        setCount(0);
        for (var i = 0; i <= curSignIn.friend.length; i++) {
            if (curSignIn.friend[i]?.status === 1) {
                setCount((prev) => prev + 1);
            }
        }
    }, [curSignIn]);

    // useEffect(() => {
    //     setCountXN(0);
    //     for (var i = 0; i < curSignIn.friend.length; i++) {
    //         if (curSignIn.friend[i]?.status === 0) {
    //             const id = curSignIn.friend[i - 1].id;
    //             if (curSignIn.friend[i].id != id) {
    //                 setCountXN((prev) => prev + 1);
    //                 // console.log('jjj');
    //             }
    //         }
    //     }
    // }, [curSignIn]);

    return (
        <>
            <SafeAreaView />
            <HeaderSearchFriend />
            <Tab.Navigator
                screenOptions={{
                    tabBarAutoCapitalize: 'false',
                    tabBarActiveTintColor: '#47A9FF',
                    tabBarInactiveTintColor: '#004078',
                    tabBarLabelStyle: { textTransform: 'none', fontSize: 18 },
                }}
            >
                <Tab.Screen tabBarAutoCapitalize="none" name={'Tất cả' + '(' + count + ')'} component={BanBe} />
                <Tab.Screen name={'Chờ xác nhận' + '(' + countXN + ')'} component={ChoXacNhan} />
            </Tab.Navigator>

            {/* <View>
                <Text className="pt-80 text-center">FriendScreen</Text>
                <Text className="pt-10 text-center">FriendScreen</Text>
            </View> */}
        </>
    );
}
