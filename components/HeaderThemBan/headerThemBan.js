import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    TouchableHighlight,
    Image,
    ScrollView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../Button/button';
import { useState, useCallback, memo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import { useDebounce } from '../../hooks/useDebounce';
import * as userService from '../../services/userService';
import ItemThemBan from '../ItemThemBan';
import { findSuccess } from '../../redux/Slice/friendSlice';
import ItemBanBe from '../ItemBanBe';
export default function HeaderThemBan() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.signIn);
    var curUser = curSignIn.userLogin;

    const [showSearch, setShowSearch] = useState(false);
    const [hiddenSearchResult, setHiddenSearchResult] = useState('hidden');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [searchValueMore, setSearchValueMore] = useState('');
    const [searchResultMore, setSearchResultMore] = useState([]);
    const [limitValue, setLimitValue] = useState(10);
    const valueSearch = useDebounce(searchValue, 500);
    const valueSearchMore = useDebounce(searchValueMore, 500);
    const [searchButton, setSearchButton] = useState('friend');
    useEffect(() => {
        if (!valueSearch.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchSearch = async () => {
            let result = await userService.getUserByTextSearch(
                curUser.id,
                valueSearch,
                limitValue,
                accessToken,
                axiosJWT,
            );

            // console.log(result);

            let listResult = [];
            if (searchButton === 'friend') {
                // loc ban be bang filter
                listResult = result.users.filter((user) => {
                    // chay some de check object trong mang ban be

                    return (
                        curUser.friend.some((friend) => friend.id === user.id && friend.status === 1) ||
                        !curUser.friend.some((friend) => friend.id === user.id && friend.status === 1)
                    );
                });
            }

            setSearchResult(listResult);
        };
        fetchSearch();
    }, [valueSearch, limitValue, searchButton]);

    const handleHiddenSearch = useCallback(() => {
        setHiddenSearchResult('hidden');
        setSearchButton('friend');
        setLimitValue(10);
        setShowSearch(false);
    }, []);

    const handleFocusSearch = () => {
        setHiddenSearchResult('');
        setShowSearch(true);
    };
    const handleRenderItem = () => {
        var list = searchResult;
        console.log(list.length);
        if (list.length > 0) {
            return list.map((item) => {
                return (
                    <ItemThemBan key={item.id} userId={item.id} name={item.fullName} avt={item?.profile?.urlAvartar} />
                );
            });
        } else {
            return (
                <View className={'items-center'}>
                    <Text>Không tìm thấy kết quả phù hợp!!!</Text>
                </View>
            );
        }
    };

    const handleShowModal = () => {
        handleHiddenSearch();
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };
    const handleKeyUpSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchValueMore(searchValue);

            handleShowModal();
        }
    };
    const handleShowSearchMore = () => {
        return searchResultMore.map((item) => <ItemSearchAll key={item.id} data={item} />);
    };
    return (
        <>
            <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
                <View className="h-14 flex flex-row items-center justify-between">
                    <View className=" p-2 w-1/4">
                        <Ionicons
                            name="arrow-back"
                            size={30}
                            color="#47A9FF"
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <View className=" text-center items-center  ">
                        <Text className={'text-2xl font-semibold text-lcn-blue-4'}>Tìm bạn bè</Text>
                    </View>
                    <View className={'w-1/4'}></View>
                </View>
                <View className={'flex flex-row  p-2 border border-b-2 border-t-0  border-lcn-blue-2'}>
                    <View className={'w-4/6'}>
                        <TextInput
                            className=" h-10 border  border-blue-400 rounded-3xl"
                            placeholder="Nhập tên người dùng"
                            placeholderTextColor={'black'}
                            style={{ paddingLeft: 10 }}
                            onChangeText={(searchValue) => setSearchValue(searchValue)}
                            onKeyPress={handleKeyUpSearch}
                            onFocus={handleFocusSearch}
                        ></TextInput>
                    </View>
                    <View className={'w-2/6 justify-center items-end'}>
                        <Button xacnhan onPress={() => setSearchButton('friend')}>
                            <Text className={'text-white text-lg'}>Tìm</Text>
                        </Button>
                    </View>
                </View>
                <View className={'h-full bg-white'}>
                    <ScrollView>{handleRenderItem()}</ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
}
