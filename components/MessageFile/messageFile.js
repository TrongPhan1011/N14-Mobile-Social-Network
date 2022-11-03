import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function MessageFile({ data }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    var renderOneFile = (firstFile) => {
        if (firstFile.fileType === 'image') {
            return (
                <View className="overflow-hidden rounded-2xl">
                    <Image
                        style={{ width: 250, height: 250, resizeMode: 'contain' }}
                        className=""
                        source={{
                            uri: `${firstFile?.path}`,
                        }}
                    ></Image>
                </View>
            );
        } else if (firstFile.fileType === 'video') {
            return (
                <View className="rounded-2xl">
                    <Video
                        ref={video}
                        source={{
                            uri: `${firstFile?.path}`,
                        }}
                        style={{ width: '100%', aspectRatio: 16 / 9 }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping={true}
                        usePoster={true}
                        posterStyle={{ resizeMode: 'cover' }}
                        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                    <View>
                        {/* <Button
                            title={status.isPlaying ? 'Pause' : 'Play'}
                            onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
                        />
                         <TouchableOpacity>
                            
                            </TouchableOpacity> */}
                    </View>
                </View>
            );
        } else if (firstFile.fileType === 'doc') {
            return (
                <View className="bg-blue-200 p-2 rounded-2xl flex flex-row w-full ">
                    <View className="mr-2 items-center">
                        <MaterialCommunityIcons name="file-word" size={30} color="#47A9FF" />
                    </View>
                    <Text className="break-words pr-10">{firstFile.title}</Text>
                </View>
            );
        } else if (firstFile.fileType === 'excel') {
            return (
                <View className="bg-blue-200 p-2 rounded-2xl flex flex-row w-full ">
                    <View className="mr-2 items-center">
                        <MaterialCommunityIcons name="file-excel" size={30} color="#47A9FF" />
                    </View>
                    <Text className="break-words pr-10">{firstFile.title}</Text>
                </View>
            );
        }
    };

    var renderManyFile = (files) => {
        const compManyIMG = files.map((file, index) => {
            if (file.fileType === 'image') {
                return (
                    <View key={file.title + index} className="p-0.5 overflow-hidden rounded-2xl">
                        <Image
                            style={{ width: 120, height: 120 }}
                            className=""
                            source={{
                                uri: `${file?.path}`,
                            }}
                        ></Image>
                    </View>
                );
            } else if (file.fileType === 'video') {
                return (
                    <View className="rounded-2xl">
                        <Video
                            ref={video}
                            source={{
                                uri: `${firstFile?.path}`,
                            }}
                            style={{ width: '100%', aspectRatio: 16 / 9 }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping={true}
                            usePoster={true}
                            posterStyle={{ resizeMode: 'cover' }}
                            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                        />
                    </View>
                );
            }
        });
        return <View className="flex flex-row flex-wrap overflow-hidden w-full">{compManyIMG}</View>;
    };

    var handleRenderFile = () => {
        const files = data;
        const ONE_FILE = 1; // 1 file img, video
        if (files?.length === ONE_FILE) {
            var firstFile = files[0];
            return <>{renderOneFile(firstFile)}</>;
        } else return <>{renderManyFile(files)}</>;
    };

    return <>{handleRenderFile()}</>;
}
