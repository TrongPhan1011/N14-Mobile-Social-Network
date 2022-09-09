import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import HeaderTinNhan from '../../components/HeaderTinNhan';
import ItemTinNhan from '../../components/ItemTinNhan';
import FooterTinNhan from '../../components/FooterTinNhan';
import { useNavigation } from '@react-navigation/native';

export default function ChiTietTinNhan() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View>
                <HeaderTinNhan
                    onPressChiTiet={() => {
                        navigation.goBack();
                    }}
                    onPressCallVideo={() => {
                        navigation.navigate('VideoCall');
                    }}
                />
                <View className="bg-lcn-blue-1 w-full h-5/6">
                    <ItemTinNhan from>xin chào</ItemTinNhan>
                    <ItemTinNhan>ai đó</ItemTinNhan>
                    <ItemTinNhan from>
                        ydhhdh dhhhh đhhdhdhdh đhdhdhhdh dhdhdhdhhdh dhdhdhdhhdh đjđ dhdhdhdh hdhdhdhd hdhđhhd hdhđhhd
                        hdhđhhd fjfffhhf hffhhffh fhfhfhh hfhfjgjghgh hfhf
                    </ItemTinNhan>
                    <ItemTinNhan>bye</ItemTinNhan>
                </View>
                <View>
                    <FooterTinNhan />
                </View>
            </View>
        </SafeAreaView>
    );
}
