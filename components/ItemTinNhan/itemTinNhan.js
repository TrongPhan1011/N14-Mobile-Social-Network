import { View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { messageType } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import React, { useState, useEffect } from 'react';
import { formatTimeAuto, getLastName } from '../../lib/formatString';
import MessageModal from '../MessageModal';
import MessageFile from '../MessageFile/messageFile';

export default function ItemTinNhan({ children, from, type, messageData }) {
    const [hidden, setHidden] = useState('hidden');
    var seen = '';
    var nameSend = '';
    var textColorSend = '';
    var bgMessage = ' bg-slate-100 ';
    var bgFile = '';
    var flexRowReverse = '';
    var avatarHidden = '';
    if (!!from) {
        bgMessage = ' bg-lcn-blue-4 text-white ';
        flexRowReverse = 'flex-row-reverse';
        seen = 'Đã gửi';
        textColorSend = ' text-white ';
        avatarHidden = ' hidden ';
    } else {
        seen = 'Đã xem';
        nameSend = getLastName(messageData.authorID.fullName);
    }
    //if (type === 'ALL') seen = 'Đã xem';
    const handelDaXem = () => {
        if (!!messageData.file && messageData.file.length > 0) {
        } else {
            if (hidden === 'hidden') setHidden('');
            else setHidden('hidden');
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const files = messageData.file;
    if (!!messageData.file && messageData.file.length > 0) bgFile = ' bg-white ';

    var renderMessage = () => {
        if (!!messageData.file && messageData.file.length > 0) {
            return <MessageFile data={files} />;
        }
        return <Text className={' break-words p-1 text-sm' + textColorSend}>{children}</Text>;
    };
    //console.log(messageData.file);

    return (
        <View>
            <View className="w-full">
                <Text className={'text-center text-[12px] text-slate-400 pr-2 ' + hidden}>
                    {formatTimeAuto(messageData.createdAt)}
                </Text>
            </View>
            <View className={'flex flex-row items-end mb-2 pl-2 pr-2 ' + flexRowReverse}>
                <View className="rounded-full overflow-hidden flex justify-center items-center p-1 mb-5">
                    <Image
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        className={'rounded-full' + avatarHidden}
                        source={{
                            uri: `${messageData.authorID.profile.urlAvartar}`,
                        }}
                    ></Image>
                </View>
                <TouchableWithoutFeedback delayLongPress={500} onLongPress={handleOpenModal} onPress={handelDaXem}>
                    <View>
                        <Text className={'text-left text-[12px] text-gray-700 pl-2 '}>{nameSend}</Text>
                        <View
                            className={bgMessage + ' w-min rounded-2xl p-2 text-sm ' + bgFile}
                            style={{ maxWidth: 280 }}
                        >
                            {/* <Text className={' break-words p-1 text-sm' + textColorSend}>{children}</Text> */}
                            {renderMessage()}
                            <View className="flex flex-row">
                                <View className="absolute right-0 bottom-0 hidden">
                                    <Feather name="heart" size={20} color="#000000" />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text className={'text-right text-[12px] text-slate-400 pr-2 ' + hidden}>{seen}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className="bg-blue-200 items-center">
                <MessageModal
                    modalVisible={modalVisible}
                    handleCloseModal={handleCloseModal}
                    handleOpenModal={handleOpenModal}
                ></MessageModal>
            </View>
        </View>
    );
}
