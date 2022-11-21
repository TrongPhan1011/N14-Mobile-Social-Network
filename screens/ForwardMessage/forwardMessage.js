import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, TouchableHighlight, Alert } from 'react-native';
import React, { useEffect, useState, memo } from 'react';
import HeaderQlGroup from '../../components/HeaderQLGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemBanBeGroup from '../../components/ItemBanBeGroup';
import { getAllFriend, getUserById } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { inCludesString } from '../../lib/regexString';
import { Checkbox } from 'react-native-paper';
import avatarDefault from '../../assets/avatarDefault.png';
import { groupChatSelect, selectGroup } from '../../redux/Slice/sidebarChatSlice';
import { useNavigation } from '@react-navigation/native';
import { addMemberToChat, getChatByIdMember } from '../../services/chatService';
import socket from '../../utils/getSocketIO';
import { addMess } from '../../services/messageService';
import Avatar from '../../components/Avatar';

const ForwardMessage = ({ route }) => {
    var dataMess = route.params.messageData;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const currAuth = useSelector((state) => state.auth.currentUser);
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);
    const [listChat, setListChat] = useState([]);

    useEffect(() => {
        const getItemForward = async () => {
            let arrChatFetch = await getChatByIdMember(curSignIn.id, accessToken, axiosJWT);

            var arrInbox = [],
                arrGroup = [];
            for (let chat of arrChatFetch) {
                if (chat.typeChat === 'inbox') {
                    var userChatOther;
                    if (chat.member[0] !== curSignIn.id) {
                        userChatOther = await getUserById(chat.member[0], accessToken, axiosJWT);
                    } else userChatOther = await getUserById(chat.member[1], accessToken, axiosJWT);

                    let chatTemp = { ...chat, name: userChatOther.fullName, avatar: userChatOther.profile.urlAvartar };
                    arrInbox = [...arrInbox, chatTemp];
                } else arrGroup = [...arrGroup, chat];
            }
            var arrChatFilter = [...arrInbox, ...arrGroup];
            setListChat(arrChatFilter);
        };
        getItemForward();
    }, [curSignIn]);

    const getAllChecked = (item, index) => {
        //setTick(!tick);
        const temp = [...listChat];
        if (temp[index].id === item.id) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item.id]);
        else {
            var arrRemove = listChecked.filter((e) => e !== item.id);
            setListChecked(arrRemove);
        }
        setListMember(temp);
    };

    const handleForward = async () => {
        //console.log(listChecked);
        if (!!listChecked && listChecked.length > 0) {
            for (let chatId of listChecked) {
                let objNewMess = getNewMess(dataMess, chatId);
                saveMess(objNewMess.newMessSocket, objNewMess.newMessSave, chatId);
            }

            setListChecked([]);
            setListChat([]);
            Alert.alert('Đã chuyển tiếp tin nhắn');
            navigation.navigate('ChiTietTinNhan');
        } else Alert.alert('Vui lòng chọn người cần thêm');
    };

    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: curSignIn.id,
            seen: [{ id: curSignIn.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: messData,
            });
        }
    };
    var getNewMess = (curMess, idChat) => {
        var newMess = {
            title: curMess.title,
            authorID: {
                id: curSignIn.id,
                fullName: curSignIn.fullName,
                profile: {
                    urlAvartar: curSignIn.profile.urlAvartar,
                },
            },
            type_mess: curMess.type_mess,
            idChat: idChat,
            seen: [
                {
                    idSeen: curSignIn.id,
                    seenAt: Date.now(),
                },
            ],
            file: curMess.file,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        var newMessSave = {
            title: newMess.title,
            authorID: newMess.authorID.id,
            seen: newMess.seen,
            type_mess: newMess.type_mess,
            idChat: newMess.idChat,
            status: 1,
            file: newMess.file,
        };

        return { newMessSocket: newMess, newMessSave };
    };
    const saveMess = async (newMessSocket, newMessSave, idChat) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            if (!!messData) {
                newMessSocket.id = messData.id;
                socket.emit('sendMessage', {
                    receiverId: idChat,
                    contentMessage: newMessSocket,
                });
            }
        }
    };

    const renderItem = () => {
        if (listChat.length > 0) {
            let arrChatFilter = listChat.filter((chat) => {
                if (inCludesString(searchValue, chat.name)) return true;
                else return false;
            });
            return arrChatFilter.map((item, index) => {
                if (!groupChatSelect.memberWaiting.includes(item._id))
                    return (
                        <View className="flex flex-row mt-2 p-2 rounded-b-2xl rounded-t-2xl" key={item.id}>
                            <TouchableHighlight
                                activeOpacity={0.6}
                                underlayColor="#C6E4FF"
                                onPress={() => getAllChecked(item, index)}
                            >
                                <View className="flex flex-row bg-white  p-2 ">
                                    <View className="flex flex-row items-center w-10/12">
                                        <View>
                                            <Avatar
                                                src={item.avatar}
                                                typeAvatar={item.typeChat === 'group' ? 'group' : 'inbox'}
                                                idGroup={item.id}
                                            />
                                        </View>

                                        <View className="flex flex-col">
                                            <Text className="ml-3 text-lg font-semibold text-lcn-blue-5">
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className={' flex flex-row justify-end items-center w-2/12 pr-4'}>
                                        <Checkbox
                                            status={item.isChecked ? 'checked' : 'unchecked'}
                                            value={item.id}
                                            onPress={() => getAllChecked(item, index)}
                                            key={item.id}
                                            testID={item.id}
                                        />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    );
            });
        }
    };

    return (
        <View className="bg-white h-full">
            <HeaderQlGroup btnName="Chuyển tiếp" onPress={handleForward}>
                Chuyển tiếp
            </HeaderQlGroup>
            <View className="flex flex-row ml-6 mr-6">
                <View className=" w-full h-10 flex flex-row items-center bg-white rounded-3xl m-2 pl-2 pr-2 border border-lcn-blue-4">
                    <View className="ml-2">
                        <FontAwesome name="search" size={20} color="#47A9FF" />
                    </View>
                    <TextInput
                        className=" ml-2"
                        placeholder="Tên bạn bè hoặc nhóm cần tìm"
                        placeholderTextColor={'#47A9FF'}
                        onChangeText={(value) => setSearchValue(value)}
                    ></TextInput>
                </View>
            </View>
            <ScrollView>{renderItem()}</ScrollView>
        </View>
    );
};

export default memo(ForwardMessage);
