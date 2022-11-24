import {
    View,
    Text,
    SafeAreaView,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    FlatList,
    Pressable,
} from 'react-native';
import React, { useState, useEffect, memo, useRef } from 'react';
import HeaderTinNhan from '../../components/HeaderTinNhan';
import HeaderTinNhanGroup from '../../components/HeaderTinNhanGroup';
import ItemTinNhan from '../../components/ItemTinNhan';
import ItemTinNhanSystem from '../../components/ItemTinNhanSystem';
import FooterTinNhan from '../../components/FooterTinNhan';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import ItemAddMember from '../../components/ItemAddMember/itemAddMember';
import { getMessageByIdChat } from '../../services/messageService';
import socket from '../../utils/getSocketIO';
import avatarDefault from '../../assets/avatarDefault.png';
import { getChatById } from '../../services/chatService';
import Avatar from '../../components/Avatar';
import { selectGroup } from '../../redux/Slice/sidebarChatSlice';

const ChiTietTinNhan = ({ route }) => {
    const dispatch = useDispatch();
    const groupChatSelect = useSelector((state) => state.sidebarChatSlice.groupChatSelect);
    const currAuth = useSelector((state) => state.auth.currentUser);
    const currSignIn = useSelector((state) => state.signIn.userLogin);
    var accessToken = currAuth.accessToken;
    var AxiosJWT = getAxiosJWT(dispatch, currAuth);
    const [chatResult, setChatResult] = useState([]);
    const [limitMessage, setLimitMessage] = useState(20);
    const [arrMessage, setArrMessage] = useState([]);
    const [messRemove, setMessRemove] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const bottomRef = useRef();
    const groupName = route.params.groupName;
    //console.log(groupName);

    useEffect(() => {
        socket.on('getMessage', (data) => {
            if (!!data) {
                var getNewMess = {
                    id: data.id,
                    title: data.title,
                    authorID: data.authorID,
                    seen: data.seen,
                    type_mess: data.type,
                    idChat: data.idChat,
                    file: data.file,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };
                setArrivalMessage(getNewMess);
            }
        });

        // const resetGroupChat = async () => {
        //     var newCurChat = await getChatById(groupChatSelect.id, accessToken, AxiosJWT);
        //     dispatch(selectGroup(newCurChat));
        // };
        // socket.on('getMessage', (data) => {
        //     if (!!data) {
        //         if (data.type_mess === 'system') {
        //             resetGroupChat();
        //         }
        //         //setReRender(true);
        //     }
        // });

        socket.on('getMessRemoved', (data) => {
            if (!!data) {
                setMessRemove((prev) => [...prev, data]);
            }
        });
    }, [socket, groupChatSelect]);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatById(groupChatSelect?.id, accessToken, AxiosJWT);

            setChatResult(arrChat);
        };
        fetchChat();
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(groupChatSelect?.id, limitMessage, accessToken, AxiosJWT);
            setArrMessage(listMess);
        };
        getListMessage();
    }, [groupChatSelect, limitMessage]);

    // useEffect(() => {
    //     const scrollToBottom = () => {
    //         if (arrMessage.length > 0) {
    //             bottomRef.current?.scrollToBottom({ behavior: 'smooth' });
    //         }
    //     };
    //     scrollToBottom();
    // }, [arrMessage]);

    //console.log(arrivalMessage);

    useEffect(() => {
        arrivalMessage &&
            groupChatSelect?.member.includes(arrivalMessage.authorID.id) &&
            setArrMessage((prev) => [...prev, arrivalMessage]);
    }, [groupChatSelect, arrivalMessage, limitMessage]);
    //console.log(messRemove);
    const handleChiTietTinNhan = () => {
        if (arrMessage.length > 0) {
            return arrMessage.map((item, index) => {
                // var isLastMess = false;
                // var indexLast = arrMessage.length - 1;
                // if (index === indexLast) isLastMess = true;
                if (item.type_mess === 'system') {
                    return <ItemTinNhanSystem key={index + item.authorID.id}>{item.title}</ItemTinNhanSystem>;
                } else {
                    if (!!messRemove && messRemove.includes(item.id)) {
                        return <View key={item.id + index}></View>;
                    } else if (item.authorID.id === currSignIn.id) {
                        return (
                            <ItemTinNhan from="me" key={item.id + index + item.authorID.id} messageData={item}>
                                {item.title}
                            </ItemTinNhan>
                        );
                    } else
                        return (
                            <ItemTinNhan key={item.id + item.authorID.id} messageData={item}>
                                {item.title}
                            </ItemTinNhan>
                        );
                }
            });
        }
    };

    const navigation = useNavigation();

    var img = avatarDefault;
    if (!!chatResult.avatar) {
        img = { uri: `${chatResult.avatar}` };
    }

    const handleProfile = () => {
        var member = chatResult.member;
        var userId = member.filter((e) => e !== currSignIn.id);
        //console.log(idFreind);
        navigation.navigate('ProfileScreen', {
            userId,
        });
    };
    // console.log(groupChatSelect);
    //console.log(chatResult);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
            className="flex-1"
        >
            <View className="w-full h-full">
                {groupChatSelect.typeChat === 'group' ? (
                    <HeaderTinNhanGroup
                        onPressChiTiet={() => {
                            navigation.goBack();
                        }}
                        onPressCallVideo={() => {
                            navigation.navigate('VideoCall');
                        }}
                        onPressOpenMenu={() => navigation.navigate('QuanLyNhom')}
                        name={groupName}
                    />
                ) : (
                    <HeaderTinNhan
                        onPressChiTiet={() => {
                            navigation.goBack();
                        }}
                        onPressCallVideo={() => {
                            navigation.navigate('VideoCall');
                        }}
                        onPressOpenMenu={handleProfile}
                        // onPressOpenMenu={() =>
                        //     navigation.navigate('ProfileScreen', {
                        //         chatResult.id,
                        //     })
                        // }
                        name={groupName}
                    />
                )}

                <ScrollView
                    className="overflow-y-auto max-h-[83%] bg-white"
                    ref={bottomRef}
                    onContentSizeChange={() => bottomRef.current.scrollToEnd({ animated: true })}
                >
                    <View className="">
                        {/* <ScrollView className="overflow-y-auto "> */}
                        <View className="h-32 w-full items-center p-2">
                            {/* <Image
                                style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                className="rounded-full"
                                source={img}
                            ></Image> */}
                            <Avatar
                                src={chatResult.typeChat === 'group' ? chatResult.avatar : chatResult?.avatar}
                                typeAvatar={chatResult.typeChat === 'group' ? 'group' : 'inbox'}
                                idGroup={chatResult.id}
                            />
                            <View className="flex flex-row mt-2 items-center pt-2">
                                <Text className="font-semibold ">Bạn đã kết nối với</Text>
                                <Text className="text-lcn-blue-5 font-semibold ml-1">{chatResult.name}</Text>
                            </View>
                            <View>
                                <Pressable
                                    onPress={() => {
                                        setLimitMessage(limitMessage + 20);
                                        //console.log(limitMessage);
                                    }}
                                >
                                    <Text className="text-lcn-blue-5 mt-4 text-xs font-bold">Xem thêm tin nhắn</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View className=" w-full">{handleChiTietTinNhan()}</View>
                        {/* </ScrollView> */}
                    </View>
                </ScrollView>
                <View className="w-full absolute bottom-0">
                    <FooterTinNhan />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default memo(ChiTietTinNhan);
