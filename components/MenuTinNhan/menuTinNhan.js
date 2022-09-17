import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Menu, Provider } from 'react-native-paper';

export default function MenuTinNhan() {
    const [visible, setVisible] = useState(false);

    const closeMenu = () => setVisible(false);
    const openMenu = (v) => setVisible(true);
    return (
        <Provider>
            <View className="flex flex-row items-center p-2 h-full">
                <Menu
                    className="bg-black absolute top-10 left-0 "
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        // <Button onPress={openMenu} mode="outlined">
                        //     Open
                        // </Button>
                        <Feather name="more-vertical" size={30} color="#47A9FF" onPress={openMenu} mode="outlined" />
                    }
                >
                    <Menu.Item
                        onPress={() => {
                            Alert.alert('Action : ', 'Print');
                        }}
                        title="Print"
                    />
                    <Menu.Item
                        onPress={() => {
                            Alert.alert('Action : ', 'Forward');
                        }}
                        title="Forward"
                    />
                    <Menu.Item
                        onPress={() => {
                            Alert.alert('Action : ', 'Backward');
                        }}
                        title="Backward"
                    />
                    <Menu.Item
                        onPress={() => {
                            Alert.alert('Action :', 'Save');
                        }}
                        title="Save"
                    />
                </Menu>
            </View>
        </Provider>
    );
}
