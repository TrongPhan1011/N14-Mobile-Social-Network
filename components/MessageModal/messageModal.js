import { View, Text, Modal, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function MessageModal({ handleCloseModal, handleOpenModal, modalVisible }) {
    return (
        <View className="relative">
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleCloseModal}>
                <TouchableOpacity activeOpacity={1} onPressOut={handleCloseModal}>
                    <View className=" h-full w-full flex flex-1 items-center justify-center">
                        <View className="bg-red-500 shadow-md p-2 ">
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert('oo');
                                }}
                            >
                                <Text>Test</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            {/* <Pressable onPress={handleOpenModal}>
                <Text>Show Modal</Text>
            </Pressable> */}
        </View>
    );
}
