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
    ScrollView,
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
import FooterTaoBaiViet from '../../components/FooterTaoBaiViet';

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
        <SafeAreaView className="h-full">
            <HeaderProfile>Tạo bài viết</HeaderProfile>
            <View className="bg-white flex-1">
                <View className=" flex flex-row p-4 bg-lcn-blue-3 items-center">
                    <View className="">
                        <View className="rounded-full overflow-hidden">
                            <Image
                                className="w-16 h-16 rounded-full"
                                source={{
                                    uri: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
                                }}
                            ></Image>
                        </View>
                    </View>
                    <View className="pr-14 ml-4 w-full">
                        <View className="">
                            <Text className="text-lcn-blue-5 text-xl font-semibold">Nguyễn Văn Đúng</Text>
                        </View>
                        <View className="w-1/2 mt-2 ">
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
                </View>

                <View className="p-4">
                    <View className=" rounded-3xl bg-white">
                        <TextInput
                            className="justify-start p-4 "
                            underlineColorAndroid="transparent"
                            placeholder="Đăng bài viết"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>
                </View>

                <View className="absolute bottom-0 w-full">
                    <FooterTaoBaiViet />
                </View>
            </View>
        </SafeAreaView>
    );
}
