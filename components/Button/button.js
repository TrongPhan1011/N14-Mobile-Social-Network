import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function Button({ children, classNames, xoa, xacnhan, dangNhap, onPress, ...passProps }) {
    var bgXoa = '';
    var bgXacNhan = '';
    var btndangNhap = '';

    if (!!xoa) {
        bgXoa = 'bg-red-400 border border-red-500 w-28 h-9 ';
    }
    if (!!xacnhan) {
        bgXacNhan = 'bg-lcn-blue-4 border border-blue-400 w-28 h-9 ';
    }

    return (
        <TouchableOpacity
            className={' items-center justify-center rounded-3xl ' + bgXoa + bgXacNhan + classNames}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}
