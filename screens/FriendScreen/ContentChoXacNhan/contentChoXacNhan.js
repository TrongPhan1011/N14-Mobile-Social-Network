import { View, ScrollView, Text } from 'react-native';
import React from 'react';
import ItemChoXacNhan from '../../../components/ItemChoXacNhan';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemBanBe from '../../../components/ItemBanBe';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllFriend, getWaitingFriend } from '../../../services/userService';
import { getAxiosJWT } from '../../../utils/httpConfigRefreshToken';
import { findSuccess } from '../../../redux/Slice/friendSlice';

export default function ContentChoXacNhan({ type }) {
    const dispatch = useDispatch();
    const [listFriend, setListFriend] = useState([]);
    const [listAddFriend, setListAddFriend] = useState([]);
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;
    // useEffect(() => {
    //     const getListFriend = async () => {
    //         const friendByStatus = await getAllFriend(curUser.id, accessToken, axiosJWT);
    //         setListFriend(friendByStatus[0].friend);
    //     };

    //     getListFriend();
    // }, []);

    useEffect(() => {
        const getListWaiting = async () => {
            const friendIsWaiting = await getWaitingFriend(curUser.id, accessToken, axiosJWT);
            setListAddFriend(friendIsWaiting[0].friend);
        };

        getListWaiting();
    }, []);

    console.log(listAddFriend);
    var Comp = ItemChoXacNhan;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
    } else if (type === 'chan') {
        Comp = ItemChan;
    }

    const handleRenderItem = () => {
        var listAdd = listAddFriend;
        // delete listAdd[0];
        // if (listFriend.length > 0 && Comp === ItemBanBe) {
        //     dispatch(findSuccess(listFriend[0]));
        //     return listFriend.map((item) => {
        //         return <Comp key={item._id} userId={item._id} name={item.fullName} avt={item.profile.urlAvartar} />;
        //     });
        // }
        if (listAdd.length > 0 && Comp === ItemChoXacNhan) {
            dispatch(findSuccess(listAdd[0]));
            return listAdd.map((item) => {
                return (
                    <Comp
                        key={item._id}
                        avt={item.profile?.urlAvartar}
                        friendName={item.fullName}
                        friendId={item._id}
                        accessToken={accessToken}
                        axiosJWT={axiosJWT}
                    />
                );
            });
        }
    };

    return (
        <View className="bg-white">
            <SafeAreaView>
                <ScrollView>{handleRenderItem()}</ScrollView>
            </SafeAreaView>
        </View>
    );
}
