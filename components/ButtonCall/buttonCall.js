import { View, Text } from 'react-native';
import React from 'react';

export default function buttonCall({ children, end }) {
    var bgEnd = '';
    if (!!end) {
        bgEnd = ' bg-red-500 ';
    }
    return (
        <View
            className={
                'border border-lcn-blue-4 rounded-full w-14 h-14 items-center align-middle justify-center' + bgEnd
            }
        >
            {children}
        </View>
    );
}
