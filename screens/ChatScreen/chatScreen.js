import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Headers from '../../components/Header';

export default function ChatScreen() {
    return (
        <>
            <SafeAreaView />
            <Headers />
            <View>
                <Text className="pt-80 text-center">ChatScreen</Text>
            </View>
        </>
    );
}
