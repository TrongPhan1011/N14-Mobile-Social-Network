import { View, ScrollView, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import ItemBanBe from '../../../components/ItemBanBe';

export default function ContentBanBe() {
    return (
        <View className="bg-white">
            <SafeAreaView>
                <ScrollView>
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                    <ItemBanBe />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
