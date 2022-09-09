import { View, Text, Image } from 'react-native';
import React from 'react';

export default function ItemTinNhan({ children, from }) {
    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = '',
        seen = '';
    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';
        seen = 'Đã xem';
    }
    return (
        <View className={'flex flex-row items-end mb-2 pl-2 pr-2 ' + flexRowReverse}>
            <View className="bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 mb-8">
                <Image
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                    className="rounded-full"
                    source={{
                        uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                    }}
                ></Image>
            </View>
            <View className="w-min mr-2 rounded-3xl p-3 text-sm" style={{ maxWidth: 300 }}>
                <Text className={bgMessage + ' break-words rounded-3xl p-3 text-sm'}>{children}</Text>
                <Text className="text-right text-[12px] text-slate-400 pr-2">{seen}</Text>
            </View>
        </View>
    );
}
