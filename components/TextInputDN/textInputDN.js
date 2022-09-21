import { View, Text, TextInput } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function TextInputDN({
    Icon,
    Icon2,
    secureTextEntry,
    autoComplete,
    onChangeText,
    value,
    type,
    placeholder,
    name,
    editable,
    placeholderTextColor,
}) {
    return (
        <View className="rounded-3xl w-full h-12  flex flex-row border border-lcn-blue-4 items-center p-2 ">
            <View className={'mr-2'}>{Icon}</View>
            <TextInput
                secureTextEntry={secureTextEntry}
                autoComplete={autoComplete}
                type={type}
                value={value}
                name={name}
                onChangeText={onChangeText}
                editable={editable}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                className={'w-5/6'}
            ></TextInput>
            <View className={'mr-8'}>{Icon2}</View>
        </View>
    );
}
