import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../App';
import { fetchContainer } from '../../supabase/supabase';
import React from 'react';
import { BarCodeScanningResult, Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FullSpinner from '../../components/FullSpinner/FullSpinner';

type Props = NativeStackScreenProps<AppStackParamList, 'QRCodeScanner'>;

export default function QRCodeScanner({ navigation }: Props) {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
  }, []);

  const showErrorAlert = () => {
    Alert.alert(t('error'), t('invalid_qr_code') || '', [
      {
        onPress: () => setScanned(false),
      },
    ]);
  };

  const handleBarCodeScanned = ({ data }: BarCodeScanningResult) => {
    if (scanned) {
      return;
    }

    setScanned(true);

    const id = parseInt(data, 10);
    if (!id) {
      showErrorAlert();
      return;
    }

    fetchContainer(id).then((container) => {
      setScanned(false);
      navigation.navigate('ContainerView', { container });
    });
  };

  if (hasPermission === null) {
    return <FullSpinner />;
  }
  if (hasPermission === false) {
    return <Text>{t('no_camera_permission')}</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          onBarCodeScanned={handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: ['qr'],
          }}
          style={{ flex: 1 }}
          ratio="16:9"
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
