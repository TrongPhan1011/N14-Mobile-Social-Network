import { View, Text, TextInput, SafeAreaView, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { addMessageToChat } from '../../services/chatService';
import { useDispatch, useSelector } from 'react-redux';

export default function fotterTinNhan() {
    const dispatch = useDispatch();
    const idGroupChatSelect = useSelector((state) => state.sidebarChatSlice.idGroupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        const newMessage = {
            id: '1',
            authorID: currAuth._id,
            title: message,
            createAt: Date.now,
            seen: [],
            tagName: [currAuth._id],
            replyMessage: '1',
            emotion: [
                {
                    idUser: currAuth._id,
                    type: 'smile',
                },
            ],
            status: 1,
            type: 'text',
            file: null,
        };
        //lam sau
    };
    return (
        <SafeAreaView className="">
            <View className=" flex flex-row items-center bg-white justify-center p-2 border border-lcn-blue-4 border-t">
                <View className="">
                    <AntDesign name="pluscircle" size={30} color="#47A9FF" />
                </View>
                <View className="ml-3">
                    <FontAwesome name="file-image-o" size={30} color="#47A9FF" />
                </View>
                <View className=" ml-3 w-4/6 rounded-3xl p-1 border border-lcn-blue-4 bg-white">
                    <TextInput
                        className="pl-2 pr-2"
                        placeholder="Tin nhắn"
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                    ></TextInput>
                </View>
                <TouchableOpacity className="ml-2" onPress={handleSendMessage}>
                    <FontAwesome name="send" size={30} color="#47A9FF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
