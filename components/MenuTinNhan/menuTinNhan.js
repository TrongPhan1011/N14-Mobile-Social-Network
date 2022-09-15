import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';

export default function MenuTinNhan() {
    const [visible, setVisible] = useState(false);

    const closeMenu = () => setVisible(false);
    const openMenu = (v) => setVisible(true);
    return (
        <Provider>
            <View className="flex flex-row items-center p-2">
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Button onPress={openMenu} mode="outlined">
                            Open
                        </Button>
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
