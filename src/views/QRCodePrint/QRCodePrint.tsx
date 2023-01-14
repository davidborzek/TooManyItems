import * as Print from 'expo-print';
import * as React from 'react';
// The import react-native-svg is necessary for react-native-qrcode-svg to properly work.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Svg from 'react-native-svg';

import { Button, Icon } from 'react-native-elements';
import { Platform, StyleSheet, View } from 'react-native';

import { AppStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';
import { shareAsync } from 'expo-sharing';
import { useTranslation } from 'react-i18next';

function buildQrCodeHtml(qrCodeDataUrl: string): string {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="display: flex; justify-content: center; align-items: center;">
        <img src="data:image/jpeg;base64,${qrCodeDataUrl}" style="width: 50vw;" />
      </body>
    </html>
    `;
}

type QRCodeRef = {
  toDataURL: (cb: (dataUrl: string) => void) => void;
};

export type QRCodePrintParams = {
  content: string;
};

type Props = NativeStackScreenProps<AppStackParamList, 'QRCodePrint'>;

function QRCodePrint({ route }: Props) {
  const { t } = useTranslation();
  const { content } = route.params;

  let qrRef: QRCodeRef;

  const getQrCodeDataUrl = async (): Promise<string> => {
    return new Promise((resolve) => {
      qrRef.toDataURL((url) => resolve(url));
    });
  };

  const handlePrintQRCode = async () => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      // In web, print the current page.
      await Print.printAsync({});
      return;
    }

    // This only works on iOS or Android.
    const qrDataUrl = await getQrCodeDataUrl();
    await Print.printAsync({
      html: buildQrCodeHtml(qrDataUrl),
    });
  };

  const handleShareQrCode = async () => {
    // This only works on iOS or Android.
    const qrDataUrl = await getQrCodeDataUrl();
    const { uri } = await Print.printToFileAsync({
      html: buildQrCodeHtml(qrDataUrl),
    });

    console.log(uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const renderShareButton = () => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      return (
        <Button
          title={t('share') || ''}
          icon={
            <Icon
              name="share"
              type="ionicons"
              size={24}
              color="white"
              tvParallaxProperties={undefined}
              style={{ marginRight: 20 }}
            />
          }
          iconPosition="left"
          onPress={handleShareQrCode}
          containerStyle={styles.button}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <QRCode
        size={200}
        value={content}
        getRef={(ref: QRCodeRef) => (qrRef = ref)}
      />
      <View style={styles.buttonGroup}>
        <Button
          title={t('print') || ''}
          icon={
            <Icon
              name="print"
              type="ionicons"
              size={24}
              color="white"
              tvParallaxProperties={undefined}
              style={{ marginRight: 20 }}
            />
          }
          onPress={handlePrintQRCode}
          containerStyle={styles.button}
        />
        {renderShareButton()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  buttonGroup: {
    marginTop: 40,
    width: '80%',
  },
  container: { alignItems: 'center', flex: 1, justifyContent: 'center' },
});

export default QRCodePrint;
