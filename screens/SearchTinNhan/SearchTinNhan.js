import { View, Text, SafeAreaView, Pressable, TextInput, Platform, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import useDebounce from '../../hook/useDebounce';
import { getUserByTextSearch } from '../../services/userService';
import ItemSearchTinNhanGroup from '../../components/ItemSearchTinNhanGroup';
import ItemSearchTinNhan from '../../components/ItemSearchTinNhan';

const SearchTinNhan = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(false);
    const [hiddenSearchResult, setHiddenSearchResult] = useState('hidden');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);

    const [searchValueMore, setSearchValueMore] = useState('');
    const [searchResultMore, setSearchResultMore] = useState([]);

    const valueSearchLess = useDebounce(searchValue, 500);
    const valueSearchMore = useDebounce(searchValueMore, 500);

    useEffect(() => {
        if (!valueSearchMore.trim()) {
            setSearchResultMore([]);
            return;
        }
        const LIMIT_USER = {
            MORE: 20,
        };
        const fetchSearchMore = async () => {
            const result = await getUserByTextSearch(
                curSignIn.id,
                valueSearchMore,
                LIMIT_USER.MORE,
                accessToken,
                axiosJWT,
            );

            setSearchResultMore(result);
        };
        fetchSearchMore();
    }, [valueSearchMore]);

    var arrUser = searchResultMore.users;
    var arrGroup = searchResultMore.groups;

    const handleSearch = () => {
        if (!!arrUser && arrUser.length > 0)
            return arrUser.map((item) => {
                //console.log('1');
                return (
                    <ItemSearchTinNhan
                        key={item.id}
                        userId={item.id}
                        name={item.fullName}
                        avt={item.profile.urlAvartar}
                    ></ItemSearchTinNhan>
                );
            });
        else return <></>;
    };
    const handleSearchGroup = () => {
        if (!!arrGroup && arrGroup.length > 0)
            return arrGroup.map((item) => {
                //console.log(item);
                return (
                    <ItemSearchTinNhanGroup
                        key={item.id}
                        group={item}
                        name={item.name}
                        avt={item.avatar}
                    ></ItemSearchTinNhanGroup>
                );
            });
        else return <></>;
    };

    //console.log(searchResultMore.users);

    return (
        <SafeAreaView
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
            className="bg-white h-full w-full"
        >
            <View className="h-14 flex flex-row w-full items-center bg-white">
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="#47A9FF" onPress={() => navigation.goBack()} />
                </View>
                <View className="ml-4">
                    <FontAwesome name="search" size={20} color="#47A9FF" />
                </View>

                <Pressable className="w-9/12">
                    <TextInput
                        className="w-full ml-2"
                        placeholder="Tìm kiếm"
                        placeholderTextColor={'#47A9FF'}
                        //value={valueSearchMore}
                        onChangeText={(valueSearchMore) => setSearchValueMore(valueSearchMore)}
                    ></TextInput>
                </Pressable>

                <View className="right-2">
                    <FontAwesome
                        name="pencil-square-o"
                        size={25}
                        color="#47A9FF"
                        onPress={() => navigation.navigate('ThemMoiChat')}
                    />
                </View>
            </View>
            <ScrollView className="overflow-y-auto max-h-[95%] bg-white">
                <View className="bg-white">{handleSearch()}</View>
                <View className="bg-white">{handleSearchGroup()}</View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default memo(SearchTinNhan);
