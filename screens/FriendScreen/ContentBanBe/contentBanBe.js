import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import ItemBanBe from '../../../components/ItemBanBe';

export default function ContentBanBe() {
    return (
        <View className="bg-white">
            <SafeAreaView>
                <ItemBanBe />
                <ItemBanBe />
            </SafeAreaView>
        </View>
    );
}
