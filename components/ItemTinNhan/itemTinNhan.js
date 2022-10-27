import { View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { messageType } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { formatTime } from '../../lib/formatString';
import MessageModal from '../MessageModal';

export default function ItemTinNhan({ children, from, type, messageData }) {
    var seen = '';
    var messCreatedAt = formatTime(messageData.createdAt, 'hh:mm') || '';
    const [hidden, setHidden] = useState('hidden');
    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = '';
    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';
    }
    if (type === 'ALL') seen = 'Đã xem';
    const handelDaXem = () => {
        if ((type = 'ALL')) {
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

    return (
        <View>
            <View className={'flex flex-row items-end mb-2 pl-2 pr-2 ' + flexRowReverse}>
                <View className="rounded-full overflow-hidden flex justify-center items-center p-1 mb-8">
                    <Image
                        style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        className="rounded-full"
                        source={{
                            uri: `${messageData.authorID.profile.urlAvartar}`,
                        }}
                    ></Image>
                </View>
                <TouchableWithoutFeedback delayLongPress={500} onLongPress={handleOpenModal} onPress={handelDaXem}>
                    <View>
                        <View className={bgMessage + ' w-min rounded-3xl p-3 text-sm'} style={{ maxWidth: 280 }}>
                            <Text className={' break-words rounded-3xl p-2 text-sm'}>{children}</Text>
                            <View className="flex flex-row">
                                <View className="">
                                    <Text className="text-left text-[12px] ml-2">{messCreatedAt}</Text>
                                </View>
                                <View className="absolute right-0 bottom-0 hidden">
                                    <Feather name="heart" size={20} color="#000000" />
                                </View>
                            </View>
                        </View>
                        {/* trạng thái đã xem cho chat cá nhân hoặc group */}
                        <View>
                            {type === 'ALL' ? (
                                <Text className={'text-right text-[12px] text-slate-400 pr-2 ' + hidden}>{seen}</Text>
                            ) : type === 'GROUPCHAT' ? (
                                <View
                                    className={
                                        'rounded-full overflow-hidden flex justify-center items-center p-1 flex-row ' +
                                        hidden
                                    }
                                >
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'contain' }}
                                        className="rounded-full ml-1"
                                        source={{
                                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                                        }}
                                    ></Image>
                                    <Image
                                        style={{ width: 15, height: 15, resizeMode: 'contain' }}
                                        className="rounded-full ml-1"
                                        source={{
                                            uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                                        }}
                                    ></Image>
                                </View>
                            ) : (
                                <></>
                            )}
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
