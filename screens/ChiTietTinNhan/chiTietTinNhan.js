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
import { useMemo } from 'react';

const ChiTietTinNhan = () => {
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
    const groupName = useSelector((state) => state.sidebarChatSlice.nameGroup);
    const [name, setName] = useState(groupName);
    const [reactMess, setReactMess] = useState();
    //console.log(name);

    useMemo(() => {
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
                    replyMessage: data.replyMessage,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };
                //console.log(groupChatSelect);
                setArrivalMessage(getNewMess);
            }
        });

        socket.on('getMessRemoved', (data) => {
            if (!!data) {
                setMessRemove((prev) => [...prev, data]);
            }
        });
        socket.on('getReactMess', (data) => {
            if (!!data) {
                setReactMess(data);
            }
        });
    }, [groupChatSelect]);

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
    }, [groupChatSelect, limitMessage, arrivalMessage]);

    useEffect(() => {
        arrivalMessage &&
            groupChatSelect?.member.includes(arrivalMessage.authorID.id) &&
            setArrMessage((prev) => [...prev, arrivalMessage]);
    }, [groupChatSelect, arrivalMessage, limitMessage]);

    // useMemo(() => {
    //     const resetGroupChat = async () => {
    //         var newCurChat = await getChatById(groupChatSelect?.id, currAuth.accessToken, AxiosJWT);
    //         //console.log(newCurChat);
    //         if (!!newCurChat) {
    //             dispatch(selectGroup(newCurChat));
    //             // console.log('1');
    //             // console.log(newCurChat.name);
    //             setName(newCurChat.name);
    //         }
    //     };

    //     socket.on('getMessage', (data) => {
    //         if (!!data) {
    //             //console.log(data);
    //             if (data.type === 'system') {
    //                 resetGroupChat();
    //             }
    //             //setReRender(true);
    //         }
    //     });

    //     socket.on('getReactMess', (data) => {
    //         if (!!data) {
    //             setReactMess(data);
    //         }
    //     });
    // }, [socket, groupChatSelect]);
    //console.log(arrMessage);
    //console.log(groupChatSelect);
    const handleChiTietTinNhan = () => {
        if (arrMessage.length > 0) {
            return arrMessage.map((item, index) => {
                // var isLastMess = false;
                // var indexLast = arrMessage.length - 1;
                // if (index === indexLast) isLastMess = true;
                if (!!reactMess && reactMess.id === item.id) {
                    var reactObj = reactMess.reactionMess;
                    //console.log(item.reactionMess);
                    if (!!item.reactionMess) {
                        if (!item.reactionMess.includes(reactObj)) item.reactionMess = [...item.reactionMess, reactObj];
                    } else item.reactionMess = [reactObj];
                }
                if (item.type_mess === 'system') {
                    return <ItemTinNhanSystem key={index + item.authorID.id}>{item.title}</ItemTinNhanSystem>;
                } else {
                    if (!!messRemove && messRemove.includes(item.id)) {
                        return <View key={item.id + index + ''}></View>;
                    } else if (item.authorID.id === currSignIn?.id) {
                        return (
                            <ItemTinNhan from="me" key={item.id + index + item.authorID.id} messageData={item}>
                                {item.title}
                            </ItemTinNhan>
                        );
                    } else
                        return (
                            <ItemTinNhan key={item.id + item.authorID.id + index} messageData={item}>
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
        var userId = member.filter((e) => e !== currSignIn?.id);
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
                        name={name}
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
                        name={name}
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

export default ChiTietTinNhan;
