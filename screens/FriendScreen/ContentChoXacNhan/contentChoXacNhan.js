import { View, Text } from 'react-native';
import React from 'react';
import ItemChoXacNhan from '../../../components/ItemChoXacNhan';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContentChoXacNhan() {
    return (
        <View className="bg-white">
            <SafeAreaView>
                <ItemChoXacNhan />
                <ItemChoXacNhan />
            </SafeAreaView>
        </View>
    );
}
