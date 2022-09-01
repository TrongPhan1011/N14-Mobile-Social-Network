import { Text, View, ScrollView } from 'react-native';

import HeaderDefault from './HeaderDefault/headerDefault';
import MenuDefault from './MenuDefault/menuDefault';

function DefaultLayout({ children }) {
    return (
        <View className="h-screen">
            <View className=" h-16 bg-blue-300 pt-5">
                <HeaderDefault />
            </View>
            <ScrollView className="h-full">
                <View className="h-96">{children}</View>
            </ScrollView>

            <View className="w-full h-14 bg-blue-600">
                <MenuDefault />
            </View>
        </View>
    );
}

export default DefaultLayout;
