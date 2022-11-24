// import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import ChatScreen from './screens/ChatScreen';
import ThongBaoScreen from './screens/ThongBaoScreen';
import BangTinScreen from './screens/BangTinScreen';
import FriendScreen from './screens/FriendScreen';
import SettingScreen from './screens/SettingScreen';
import VideoCall from './screens/VideoCall';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ThemBanScreen from './screens/ThemBanScreen/themBanScreen';
import TaoBaiViet from './screens/TaoBaiViet/taoBaiViet';

import { createStackNavigator } from '@react-navigation/stack';

import ChiTietTinNhan from './screens/ChiTietTinNhan';
import GroupChatScreen from './screens/GroupChatScreen';

import TrangChuScreen from './screens/TrangChuScreen';
import DangNhapScreen from './screens/DangNhapScreen';
import DangKyScreen from './screens/DangKyScreen';

import ProfileScreen from './screens/ProfileScreen';
import QuenMatKhau from './screens/QuenMatKhauScreen/QuenMatKhau';

import CapNhatMatKhau from './screens/QuenMatKhauScreen/CapNhatMatKhau';

import SettingScreenTaiKhoan from './screens/SettingScreen/settingScreenTaiKhoan/settingScreenTaiKhoan';
import UpdatePassWord from './screens/SettingScreen/updatePassWord/updatePassWord';
import ChiTietHinhAnh from './components/ChiTietHinhAnh/chiTietHinhAnh';
import QuanLyNhom from './screens/QuanLyNhom/quanLyNhom';
import ThemMoiChat from './screens/ThemMoiChat/themMoiChat';
import SearchAddChat from './screens/SearchAddChat';
import ThemThanhVien from './screens/ThemThanhVien';
import XemThanhVien from './screens/XemThanhVien';
import QuanTriGroup from './screens/QuanTriGroup';
import XoaThanhVien from './screens/XoaThanhVien';
import DuyetThanhVien from './screens/DuyetThanhVien';
import XoaQuyenQuanTri from './screens/XoaQuyenQuanTri';
import FileGroup from './screens/FileGroup';
import SearchTinNhan from './screens/SearchTinNhan';
import ForwardMessage from './screens/ForwardMessage';
import PreviewAvatar from './components/PreviewAvatar';
import Otp from './screens/Otp';

export default function App() {
    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    let tabBarVisible = true;

    function AddFriend() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="F"
                    component={FriendScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
                <Stack.Screen
                    name="ThemBanBe"
                    component={ThemBanScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
            </Stack.Navigator>
        );
    }

    function BangTin() {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="BangTinScreen"
                    component={BangTinScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                    }}
                />
            </Stack.Navigator>
        );
    }

    function HomeTabBar() {
        return (
            <Tab.Navigator options={{ tabBarInactiveTintColor: '#47A9FF', tabBarInactiveTintColor: 'lightgray' }}>
                <Tab.Screen
                    name="Tin nhắn"
                    component={ChatScreen}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="ios-chatbubble-ellipses-outline" size={30} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Bạn bè"
                    component={AddFriend}
                    options={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
                    }}
                />
                <Tab.Screen
                    name="Bảng tin"
                    component={BangTin}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="ios-newspaper-outline" size={30} color={color} />,
                    }}
                />
                {/* <Tab.Screen
                    name="Thông báo"
                    component={ThongBaoScreen}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <FontAwesome name="bell-o" size={30} color={color} />,
                    }}
                /> */}
                <Tab.Screen
                    name="Cài đặt"
                    component={SettingScreen}
                    options={{
                        headerShown: false,
                        tabBarHideOnKeyboard: true,
                        // tabBarShowLabel: false,
                        tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={30} color={color} />,
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="TrangChuScreen"
                        component={TrangChuScreen}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="DangNhapScreen"
                        component={DangNhapScreen}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />

                    <Stack.Screen
                        name="QuenMatKhau"
                        component={QuenMatKhau}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />

                    <Stack.Screen
                        name="Otp"
                        component={Otp}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="CapNhatMatKhau"
                        component={CapNhatMatKhau}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="DangKyScreen"
                        component={DangKyScreen}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="HomeTabBar"
                        component={HomeTabBar}
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
                        name="VideoCall"
                        component={VideoCall}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="GroupChatScreen"
                        component={GroupChatScreen}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />

                    <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="TaoBaiViet"
                        component={TaoBaiViet}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="SettingScreenTaiKhoan"
                        component={SettingScreenTaiKhoan}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="UpdatePassWord"
                        component={UpdatePassWord}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="ChiTietHinhAnh"
                        component={ChiTietHinhAnh}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="PreviewAvatar"
                        component={PreviewAvatar}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="QuanLyNhom"
                        component={QuanLyNhom}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />

                    <Stack.Screen
                        name="ThemMoiChat"
                        component={ThemMoiChat}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="SearchAddChat"
                        component={SearchAddChat}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="ThemThanhVien"
                        component={ThemThanhVien}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="XemThanhVien"
                        component={XemThanhVien}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="QuanTriGroup"
                        component={QuanTriGroup}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="XoaThanhVien"
                        component={XoaThanhVien}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="DuyetThanhVien"
                        component={DuyetThanhVien}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="XoaQuyenQuanTri"
                        component={XoaQuyenQuanTri}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="FileGroup"
                        component={FileGroup}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="SearchTinNhan"
                        component={SearchTinNhan}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                    <Stack.Screen
                        name="ForwardMessage"
                        component={ForwardMessage}
                        options={{
                            headerShown: false,
                            tabBarShowLabel: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
