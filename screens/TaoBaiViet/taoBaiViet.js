import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import HeaderProfile from '../../components/HeaderProfile';
import SelectDropdown from 'react-native-select-dropdown';
const { width } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button/button';
import ButtonTaoBaiViet from '../../components/ButtonTaoBaiViet';

const doiTuong = ['Công khai', 'Bạn bè'];

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});

export default function TaoBaiViet() {
    return (
        <SafeAreaView>
            <HeaderProfile>Tạo bài viết</HeaderProfile>
            <View className="bg-lcn-blue-3">
                <View className=" flex flex-row p-4 items-center">
                    <View className="rounded-full overflow-hidden">
                        <Image
                            className="w-12 h-12 rounded-full"
                            source={{
                                uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                            }}
                        ></Image>
                    </View>
                    <View className="w-2/4">
                        <Text className="text-lcn-blue-5 text-xl font-semibold ml-1 pl-2">Nguyễn Văn Đúng</Text>
                    </View>
                    <View className="w-2/4 pr-14">
                        <SelectDropdown
                            data={doiTuong}
                            // defaultValueByIndex={1}
                            // defaultValue={'Egypt'}
                            onSelect={(selectedItem, index) => {
                                // console.log(selectedItem, index);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={(isOpened) => {
                                return (
                                    <FontAwesome
                                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                                        color={'#444'}
                                        size={18}
                                    />
                                );
                            }}
                            defaultValueByIndex={0}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>
                </View>
                <View className="p-4 ">
                    <View className="bg-white rounded-3xl">
                        <TextInput
                            className="justify-start p-4 h-40"
                            underlineColorAndroid="transparent"
                            placeholder="Đăng bài viết"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>
                </View>
                <View className="flex flex-row justify-between pl-4 pr-4 pt-2 pb-2 items-center">
                    <View className="ml-2">
                        <FontAwesome name="file-image-o" size={30} color="#47A9FF" />
                    </View>
                    <View className="">
                        <MaterialIcons name="tag-faces" size={35} color="#47A9FF" />
                    </View>
                    <Button huy>
                        <Text className="text-white font-semibold text-lg">Hủy</Text>
                    </Button>
                    <TouchableOpacity className="rounded-2xl">
                        <View className="bg-lcn-blue-4 h-10 w-44 rounded-2xl items-center justify-center flex flex-row">
                            <View className="ml-2">
                                <FontAwesome name="send" size={20} color="#ffffff" />
                            </View>
                            <Text className="text-white font-semibold text-lg pl-4">Tạo bài viết</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
