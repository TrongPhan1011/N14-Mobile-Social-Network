import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function Button({ children, className, xoa, xacnhan, onPress, ...passProps }) {
    var bgXoa = '';
    var bgXacNhan = '';

    if (!!xoa) {
        bgXoa = 'bg-red-400 border border-red-500 ';
    }
    if (!!xacnhan) {
        bgXacNhan = ' bg-lcn-blue-4 border border-blue-400';
    }
    return (
        <TouchableOpacity
            className={' w-28  h-9 items-center justify-center rounded-3xl ' + bgXoa + bgXacNhan}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}
