import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';

export default function Button({ children, classNames, xoa, xacnhan, huy, dangNhap, onPress, ...passProps }) {
    var bgXoa = '';
    var bgXacNhan = '';
    var btndangNhap = '';
    var bgHuy = '';

    if (!!xoa) {
        bgXoa = 'bg-red-400 border border-red-500 w-20 h-7 ';
    }
    if (!!xacnhan) {
        bgXacNhan = 'bg-lcn-blue-4 border border-blue-400 w-20  h-7 ';
    }
    if (!!huy) {
        bgHuy = ' bg-gray-400 h-9 w-24';
    }

    return (
        <TouchableOpacity
            className={' w-28  h-9 items-center justify-center rounded-3xl ' + bgXoa + bgXacNhan + bgHuy + classNames}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}
