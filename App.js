import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './screens/ChatScreen';
import ThongBaoScreen from './screens/ThongBaoScreen';
import BangTinScreen from './screens/BangTinScreen';
import FriendScreen from './screens/FriendScreen';
import SettingScreen from './screens/SettingScreen';
import VideoCallBenGoi from './screens/VideoCallBenGoi';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

import ChiTietTinNhan from './screens/ChiTietTinNhan';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App(Ơ) {
    function ChatParent() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
                <Stack.Screen
                    name="ChiTietTinNhan"
                    component={ChiTietTinNhan}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
                <Stack.Screen
                    name="VideoCallBenGoi"
                    component={VideoCallBenGoi}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
            </Stack.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Tab.Navigator options={{ tabBarInactiveTintColor: '#47A9FF', tabBarInactiveTintColor: 'lightgray' }}>
                <Tab.Screen
                    name="Chat"
                    component={ChatParent}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={30} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Friend"
                    component={FriendScreen}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="person" size={30} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Bảng tin"
                    component={BangTinScreen}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="newspaper" size={30} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Thông báo"
                    component={ThongBaoScreen}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <FontAwesome name="bell" size={30} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="settings" size={30} color={color} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
