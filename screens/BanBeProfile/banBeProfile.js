import { View, Text, ScrollView, TextInput, Alert, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';
import ItemBanBeProfile from '../../components/ItemBanBeProfile';
import Button from '../../components/Button/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import ItemBanBe from '../../components/ItemBanBe';
import { getAllFriend, getWaitingFriend } from '../../services/userService';

export default function BanBeProfile() {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const [listFriend, setListFriend] = useState([]);
    const [listAddFriend, setListAddFriend] = useState([]);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const profile = useSelector((state) => state.friendSlice.friend);

    // const userId = profile?.id;
    // console.log('lll');
    // var listFriend = profile.friend;
    // console.log(listFriend);

    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(profile?.id, accessToken, axiosJWT);
            setListFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, []);

    const renderAllFriend = () => {
        return listFriend

            .filter((item) => {
                return item.fullName.includes(searchValue);
            })
            .map((item) => {
                return (
                    <ItemBanBe
                        key={item._id}
                        userId={item._id}
                        name={item.fullName}
                        avt={item?.profile?.urlAvartar}
                        type="1"
                        onPress={handleCloseModal}
                    />
                );
            });
    };

    return (
        <>
            <Modal animationType="fade" transparent={true} visible={showModal}>
                <TouchableOpacity activeOpacity={0.9} onPressOut={handleCloseModal} className="">
                    <View
                        className={'w-full h-full flex items-center justify-center  '}
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <View className="w-80 h-96 bg-white border border-lcn-blue-4 rounded-2xl relative">
                            <View className="p-2">
                                <Text className="font-medium text-base text-lcn-blue-5 m-2 text-center">
                                    Bạn bè của {profile?.fullName}
                                </Text>
                            </View>
                            <View className=" m-4 border-b border-gray-500">
                                <TextInput
                                    placeholder="Nhập tên cần tìm"
                                    onChangeText={(searchValue) => setSearchValue(searchValue)}
                                ></TextInput>
                            </View>

                            <ScrollView>
                                <View className="p-2">{renderAllFriend()}</View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <View className={' pt-2 pb-1 items-center justify-center '}>
                <Button
                    classNames={'flex flex-row w-52 h-8 rounded-[50px] border border-lcn-blue-4'}
                    className={'bg-lcn-blue-2'}
                    onPress={handleShowModal}
                >
                    <Ionicons name="search" size={20} color="#47A9FF"></Ionicons>
                    <Text className={'text-lcn-blue-4 font-semibold text-sm ml-2'}>Tìm bạn bè</Text>
                </Button>
            </View>
            <ScrollView>
                <View>
                    <Text>
                        <ItemBanBeProfile />
                    </Text>
                </View>
            </ScrollView>
        </>
    );
}
