import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberOfChat } from '../../services/chatService';
import { getAxiosJWT } from '../../utils/httpConfigRefreshToken';
import avatarDefault from '../../assets/avatarDefault.png';

const Avatar = ({ src, idGroup, typeAvatar }) => {
    const dispatch = useDispatch();
    const currAuth = useSelector((state) => state.auth.currentUser);
    var accessToken = currAuth.accessToken;
    const curSignIn = useSelector((state) => state.signIn.userLogin);
    var axiosJWT = getAxiosJWT(dispatch, currAuth);
    const [memberFetch, setMemberFetch] = useState();
    const [srcImg, setSrcImg] = useState(avatarDefault);

    useEffect(() => {
        const getMemberGroup = async () => {
            var arrMemberFetch = await getMemberOfChat(idGroup, accessToken, axiosJWT);
            setMemberFetch(arrMemberFetch);
        };

        if (!!src) {
            setSrcImg(src);
        } else if (typeAvatar === 'group' && !!idGroup) {
            getMemberGroup();
        }
    }, [idGroup, src, typeAvatar]);

    const renderAvatarGroup = () => {
        if (!!memberFetch && memberFetch.length > 0) {
            var numberMemberOther = memberFetch.length - 3;

            var arrAvartar = memberFetch.map((member, index) => {
                if (memberFetch.length > 4 && index > 2) {
                    return (
                        <View
                            key={index + ' '}
                            className=" flex justify-center items-center overflow-hidden h-1/2 w-1/2 rounded-full"
                        >
                            <Text className="text-lcn-blue-4 font-semibold text-xs">+{numberMemberOther}</Text>
                        </View>
                    );
                }
                return (
                    <View
                        key={index + ''}
                        className="flex justify-center items-center overflow-hidden h-1/2 w-1/2 rounded-full"
                    >
                        <Image
                            source={{ uri: `${member.profile.urlAvartar}` }}
                            className="w-10 h-10"
                            resizeMode="contain"
                        />
                    </View>
                );
            });

            return arrAvartar.slice(0, 4);
        }
    };

    return (
        <View>
            {!!src ? (
                <View className={'flex justify-center items-center p-0 overflow-hidden '}>
                    <Image source={{ uri: `${srcImg}` }} className="w-14 h-14 rounded-full" resizeMode="contain" />
                </View>
            ) : (
                <View className={' flex justify-center flex-wrap items-center rounded-full h-14 w-14'}>
                    {renderAvatarGroup()}
                </View>
            )}
        </View>
    );
};

export default memo(Avatar);
