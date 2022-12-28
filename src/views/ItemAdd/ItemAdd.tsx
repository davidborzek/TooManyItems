import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { FAB, Icon, Text } from "react-native-elements";
import { AppStackParamList } from "../../App";
import { useImagePicker } from "../../hooks/image";
import { Container, insertItem } from "../../supabase/supabase";

type Props = NativeStackScreenProps<AppStackParamList, 'ItemAdd'>;

export type ItemAddParamList = {
    container: Container;
};

export default function ItemAdd({ route, navigation }: Props) {
    const { image, pickImage } = useImagePicker();
    const { t } = useTranslation();
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const { container } = route.params;

    const handleCreateItem = async () => {
        await insertItem({
            container_id: container.id,
            name: itemName,
            description: description,
            image: image
        })
    
        navigation.goBack();
      };

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                onPress={pickImage}
                style={{
                backgroundColor: '#c1c1c1',
                marginVertical: 20,
                minWidth: 250,
                maxWidth: 250,
                height: 250,
                }}
            >
                {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%' }}
                />
                )}
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-start', width: 250, marginTop: 10 }}>
                <Text>{t('name')}</Text>
                <TextInput
                style={{
                    height: 30,
                    marginVertical: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '100%',
                }}
                onChangeText={setItemName}
                value={itemName}
                />

                <Text>{t('description')}</Text>
                <TextInput
                style={{
                    height: 30,
                    marginVertical: 5,
                    borderWidth: 1,
                    padding: 10,
                    width: '100%',
                }}
                onChangeText={setDescription}
                value={description}
                />
            </View>
            <FAB
                title=""
                color="#137b11"
                placement="right"
                icon={
                <Icon
                    name="check"
                    size={24}
                    color="white"
                    tvParallaxProperties={undefined}
                />
                }
                disabled={!itemName}
                onPress={handleCreateItem}
            />
            </View>
    )
}