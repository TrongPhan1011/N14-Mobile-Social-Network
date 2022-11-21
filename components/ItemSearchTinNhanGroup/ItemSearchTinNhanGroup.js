import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button,
    Alert,
    TouchableHighlight,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import avatarDefault from '../../assets/avatarDefault.png';
import { useNavigation } from '@react-navigation/native';
import { getChatByIdMember, findInbox } from '../../services/chatService';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';

export default function ItemBanBe({ group, name, avt }) {
    const dispatch = useDispatch();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const navigation = useNavigation();
    var img = avatarDefault;
    if (avt) {
        img = {
            uri: `${avt}`,
        };
    }

    const handleGroupChat = async () => {
        //var inboxChat = await findInbox(currSignIn.id, userId, accessToken, axiosJWT);
        dispatch(selectGroup(group));
        navigation.navigate('ChiTietTinNhan');
    };

    const renderFriendItem = () => {
        return (
            <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl">
                <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="#C6E4FF"
                    onPress={handleGroupChat}
                    className="w-full"
                >
                    <View className="flex flex-row bg-white  p-2 ">
                        <View className="flex flex-row items-center w-2/3">
                            <View>
                                <Image
                                    style={{ height: 60, width: 60, resizeMode: 'contain' }}
                                    className="rounded-full ml-4"
                                    source={img}
                                ></Image>
                            </View>

                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5 w-full">{name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };
    return <>{renderFriendItem()}</>;
}
