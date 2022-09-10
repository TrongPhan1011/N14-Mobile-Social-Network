import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChiTietProfile from '../ChiTietProfile';
import BanBeProfile from '../BanBeProfile';
import HinhAnhProfile from '../HinhAnhProfile';
import HeaderProfile from '../../components/HeaderProfile';
import ThongTinChung from '../ThongTinChung';

const Tab = createMaterialTopTabNavigator();
export default function ProfileScreen() {
    return (
        <>
            <SafeAreaView />
            <HeaderProfile />
            <ChiTietProfile />
            <Tab.Navigator
                screenOptions={{
                    tabBarAutoCapitalize: 'false',
                    tabBarActiveTintColor: '#47A9FF',
                    tabBarInactiveTintColor: '#004078',
                    tabBarLabelStyle: { textTransform: 'none', fontSize: 15 },
                }}
            >
                <Tab.Screen tabBarAutoCapitalize="none" name="Thông tin chung" component={ThongTinChung} />
                <Tab.Screen name="Bạn bè" component={BanBeProfile} />
                <Tab.Screen name="Hình ảnh" component={HinhAnhProfile} />
            </Tab.Navigator>
            {/* <View>
                <Text className="pt-80 text-center">FriendScreen</Text>
                <Text className="pt-10 text-center">FriendScreen</Text>
            </View> */}
        </>
    );
}
