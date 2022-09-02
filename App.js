import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import DefaultLayout from './layout/DefaultLayout';
import ChatScreen from './screens/ChatScreen';

export default function App() {
    return (
        <>
            <DefaultLayout>
                <ChatScreen />
            </DefaultLayout>

            <StatusBar style="auto" />
        </>
    );
}
