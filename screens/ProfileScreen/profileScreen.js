import { View, Text, SafeAreaView, Alert } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChiTietProfile from '../ChiTietProfile';
import BanBeProfile from '../BanBeProfile';
import HinhAnhProfile from '../HinhAnhProfile';
import HeaderProfile from '../../components/HeaderProfile';
import ThongTinChung from '../ThongTinChung';
import { useEffect, useState, memo, useCallback } from 'react';
import { getUserById } from '../../services/userService';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { findFriend } from '../../redux/Slice/friendSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button/button';
import { getChatByIdMember, findInbox } from '../../services/chatService';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { getAllFriend, addFriend, declineFriend } from '../../services/userService';
import { userName } from '../../redux/Slice/signUpSlice';
const Tab = createMaterialTopTabNavigator();

function ProfileScreen({ route }) {
    const navigation = useNavigation();
    const userLoginData = useSelector((state) => state.signIn.userLogin);
    const userId = route.params.userId;

    const dispatch = useDispatch();
    const [hiddenMenu, setHiddenMenu] = useState('hidden');
    const [showMenu, setShowMenu] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [profile, setProfile] = useState({});
    const [birthday, setBirthday] = useState();
    const [active, setActive] = useState('');
    const [inRelationship, setInRelationship] = useState('');
    const [arrayGroup, setArrayGroup] = useState([]);
    const [userFriend, setUserFriend] = useState([]);
    const [count, setCount] = useState(0);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    useEffect(() => {
        const getProfile = async () => {
            const getUserProfile = await getUserById(userId, accessToken, axiosJWT);
            setUserProfile(getUserProfile);
            setProfile(getUserProfile?.profile);
            // console.log(getUserProfile);
            // setBirthday(getUserProfile.birthday.split('-'));
            var date = getUserProfile.birthday.split('-');
            var myDate = `${date[2]}-${date[1]}-${date[0]}`;
            setBirthday(myDate);
            dispatch(findFriend(getUserProfile));
            if (curUser.id === userId) {
                setActive('hidden');
            } else {
                setActive('');
            }

            // var obj = curUser.friend.find((o) => o.id === userId);
            // console.log(obj.id);
            // if (obj.id === userId) {
            //     console.log('dang la ban be');
            // }
            var obj = curUser.friend.find((o) => o.id === userId);
            if (!!obj && obj.id === userId && obj.status === 1) {
                setInRelationship('Bạn bè');
            } else if (!!obj && obj.id === userId && obj.status === 2) {
                setInRelationship('Đang gửi lời mời');
            } else if (!!obj && obj.id === userId && obj.status === 0) {
                setInRelationship('Chấp nhận kết bạn');
            } else {
                setInRelationship('Kết bạn');
            }

            setCount(0);
            for (var i = 0; i <= getUserProfile.friend.length; i++) {
                if (getUserProfile.friend[i]?.status === 1) {
                    setCount((prev) => prev + 1);
                }
            }
        };

        getProfile();
    }, [userId]);

    const handleInbox = async () => {
        var inboxChat = await findInbox(userLoginData.id, userProfile.id, accessToken, axiosJWT);
        dispatch(selectGroup(inboxChat));
        navigation.navigate('ChiTietTinNhan');
    };
    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(userId, accessToken, axiosJWT);

            setUserFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, [userId]);

    const handleKetBan = async () => {
        var ketBan = await addFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        if (!!ketBan) {
            setInRelationship('Đang gửi lời mời');
        }
    };
    const handleChapNhanKetBan = async () => {
        await acceptFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        setInRelationship('Bạn bè');
    };
    const handleHuyKetBan = async () => {
        var huyKetBan = await declineFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        if (!!huyKetBan) {
            setInRelationship('Kết bạn');
        }
    };
    const handleBanBe = async () => {
        const getUserProfile = await getUserById(userId, accessToken, axiosJWT);
        const Name = getUserProfile.fullName;
        console.log(Name);
        if (inRelationship === 'Kết bạn') {
            handleKetBan();
        } else if (inRelationship === 'Bạn bè') {
            handleShowMenu();
            Alert.alert('Thông báo!', 'Bạn muốn hủy kết bạn với ' + Name, [
                {
                    text: 'Trở lại',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Hủy kết bạn',
                    onPress: () => {
                        handleHuyKetBan();
                    },
                },
            ]);
        } else if (inRelationship === 'Chấp nhận kết bạn') {
            handleChapNhanKetBan();
        }
    };
    const handleHiddenMenu = useCallback(() => {
        setHiddenMenu('hidden');
        setShowMenu(false);
    }, []);
    const handleShowMenu = () => {
        if (showMenu === false) {
            setHiddenMenu('');
            setShowMenu(true);
        } else {
            setHiddenMenu('hidden');
            setShowMenu(false);
        }
    };

    return (
        <>
            <SafeAreaView className="bg-white">
                <HeaderProfile userName={userProfile?.fullName} />
                <ChiTietProfile
                    userId={userProfile?.id}
                    avatar={profile?.urlAvartar}
                    userName={userProfile?.fullName}
                    coverPhoto={profile?.urlCoverPhoto}
                />
                <View className=" flex flex-row items-end  justify-between ml-10 mr-10 mb-1 ">
                    <Button
                        classNames={
                            'flex flex-row w-25 h-10 bg-lcn-blue-2 rounded-[50px] border border-lcn-blue-4 ' + active
                        }
                        onPress={handleBanBe}
                    >
                        <Ionicons name="person-add-outline" size={20} color="#47A9FF"></Ionicons>
                        <Text className={'text-lcn-blue-4 font-semibold text-sm ml-2'}>{inRelationship}</Text>
                    </Button>
                    <Button
                        classNames={'flex flex-row w-25 h-10 rounded-[50px] border border-lcn-green-1 ' + active}
                        className={'bg-lcn-blue-2'}
                        onPress={handleInbox}
                    >
                        <Ionicons name="chatbubble-outline" size={20} color="#66DA53"></Ionicons>
                        <Text className={'text-lcn-green-1 font-semibold text-sm ml-2'}>Nhắn tin</Text>
                    </Button>
                </View>
            </SafeAreaView>
            <Tab.Navigator
                userName={userProfile?.fullName}
                screenOptions={{
                    tabBarAutoCapitalize: 'false',
                    tabBarActiveTintColor: '#47A9FF',
                    tabBarInactiveTintColor: '#004078',
                    tabBarLabelStyle: { textTransform: 'none', fontSize: 15 },
                }}
            >
                <Tab.Screen tabBarAutoCapitalize="none" name="Thông tin chung" component={ThongTinChung} />
                <Tab.Screen name={'Bạn bè' + '(' + count + ')'} component={BanBeProfile} />
                <Tab.Screen name="Hình ảnh" component={HinhAnhProfile} />
            </Tab.Navigator>
            {/* <View>
                <Text className="pt-80 text-center">FriendScreen</Text>
                <Text className="pt-10 text-center">FriendScreen</Text>
            </View> */}
        </>
    );
}

export default memo(ProfileScreen);
