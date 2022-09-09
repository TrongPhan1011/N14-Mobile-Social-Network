import { View, Text } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ButtonCall from '../ButtonCall';

export default function footterCall() {
    return (
        <View className="w-full flex flex-row justify-around">
            <ButtonCall>
                <AntDesign name="videocamera" size={30} color="#47A9FF" />
            </ButtonCall>
            <ButtonCall end>
                <FontAwesome name="phone" size={30} color="#ffffff" />
            </ButtonCall>
            <ButtonCall>
                <MaterialIcons name="keyboard-voice" size={30} color="#47A9FF" />
            </ButtonCall>
        </View>
    );
}
