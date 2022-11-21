import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import HeaderThemBan from '../../components/HeaderThemBan/headerThemBan';
import ItemThemBan from '../../components/ItemThemBan';
import ItemBanBe from '../../components/ItemBanBe';
export default function ThemBanScreen(list) {
    return (
        <>
            <View className="bg-white">
                <SafeAreaView>
                    <HeaderThemBan />

                    {/* <ItemThemBan /> */}
                </SafeAreaView>
            </View>
        </>
    );
}
