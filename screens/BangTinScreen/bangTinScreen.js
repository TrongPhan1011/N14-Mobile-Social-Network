import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import HeaderSearch from '../../components/HeaderSearch';
import BangTin from '../../components/BangTin';
import TaoBaiViet from '../../components/ButtonTaoBaiViet';

export default function BangTinScreen() {
    return (
        <View className="">
            <HeaderSearch />
            <TaoBaiViet />
            <ScrollView className="max-h-[80%]">
                <BangTin />
                <BangTin />
                <BangTin />
            </ScrollView>
        </View>
    );
}
