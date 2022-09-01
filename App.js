import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Fragment } from 'react';

import DefaultLayout from './layout/DefaultLayout';
import { publicScreen } from './configScreen';

export default function App() {
    return (
        <>
            {publicScreen.map((screenLayout, index) => {
                let Layout = DefaultLayout;
                if (screenLayout.layout) Layout = screenLayout.layout;
                else if (screenLayout.layout === null) {
                    Layout = Fragment;
                }

                var Screen = screenLayout.screen;
                return (
                    <View key={index}>
                        <Layout>
                            <Screen />
                        </Layout>
                    </View>
                );
            })}

            <StatusBar style="auto" />
        </>
    );
}
