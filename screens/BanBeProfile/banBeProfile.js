import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import ItemBanBeProfile from '../../components/ItemBanBeProfile';

export default function BanBeProfile() {
    return (
        <ScrollView>
            <View>
                <Text>
                    <ItemBanBeProfile />
                </Text>
            </View>
        </ScrollView>
    );
}
