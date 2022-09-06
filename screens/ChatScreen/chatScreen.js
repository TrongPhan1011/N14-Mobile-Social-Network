import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';

import HeaderSearch from '../../components/HeaderSearch';
import ListItemChat from '../../components/ListItemChat';

export default function ChatScreen() {
    return (
        <>
            <SafeAreaView>
                <HeaderSearch />
                <View className="bg-white h-full w-full">
                    <ListItemChat />
                </View>
            </SafeAreaView>
        </>
    );
}
