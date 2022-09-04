import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import Header from '../../components/Header';

export default function HomeScreen() {
    return (
        <>
            <SafeAreaView />
            <Header />
            <View>
                <Text className="pt-80 text-center">HomeScreen</Text>
            </View>
        </>
    );
}
