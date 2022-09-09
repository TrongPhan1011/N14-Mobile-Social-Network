import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderSearch from '../../components/HeaderSearch';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BanBe from './ContentBanBe/contentBanBe';
import ChoXacNhan from './ContentChoXacNhan/contentChoXacNhan';

const Tab = createMaterialTopTabNavigator();
export default function FriendScreen() {
    return (
        <>
            <SafeAreaView />
            <HeaderSearch />
            <Tab.Navigator
                screenOptions={{
                    tabBarAutoCapitalize: 'false',
                    tabBarActiveTintColor: '#47A9FF',
                    tabBarInactiveTintColor: '#004078',
                    tabBarLabelStyle: { textTransform: 'none', fontSize: 18 },
                }}
            >
                <Tab.Screen tabBarAutoCapitalize="none" name="Tất cả" component={BanBe} />
                <Tab.Screen name="Chờ xác nhận" component={ChoXacNhan} />
            </Tab.Navigator>
            {/* <View>
                <Text className="pt-80 text-center">FriendScreen</Text>
                <Text className="pt-10 text-center">FriendScreen</Text>
            </View> */}
        </>
    );
}
