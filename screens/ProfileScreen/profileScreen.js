import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChiTietProfile from '../ChiTietProfile';
import BanBeProfile from '../BanBeProfile';
import HinhAnhProfile from '../HinhAnhProfile';
import HeaderProfile from '../../components/HeaderProfile';
import ThongTinChung from '../ThongTinChung';
import { useEffect, useState, memo } from 'react';
import { getUserById } from '../../services/userService';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { findFriend } from '../../redux/Slice/friendSlice';
import Button from '../../components/Button/button';
const Tab = createMaterialTopTabNavigator();
function ProfileScreen({ route }) {
    const userId = route.params.userId;
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState({});
    const [profile, setProfile] = useState({});
    const [birthday, setBirthday] = useState();
    const [active, setActive] = useState('');
    const [inRelationship, setInRelationship] = useState('');
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
        };

        getProfile();
    }, [userId]);

    return (
        <>
            <SafeAreaView />
            <HeaderProfile userName={userProfile?.fullName} />
            <ChiTietProfile avatar={profile?.urlAvartar} userName={userProfile?.fullName} />
            <View className={'mr-16'}>
                <Button xacnhan onPress={() => Alert.alert('ggg')}>
                    <Text className={'text-white'}>Xác nhận</Text>
                </Button>
            </View>
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
                <Tab.Screen name="Bạn bè" component={BanBeProfile} />
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
