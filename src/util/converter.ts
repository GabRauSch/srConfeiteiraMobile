import React from 'react';
import { Button, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const createAndSharePdf = async () => {
    try {
        const { uri } = await Print.printToFileAsync({
            html: '<h1>Hello, World!</h1>',
            base64: false,
        });

        console.log('PDF created at: ', uri);

        await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Compartilhe o orçamento WhatsApp',
            UTI: 'com.adobe.pdf',
        });

        console.log('PDF shared successfully');
    } catch (error) {
        console.error('Error generating or sharing PDF:', error);
    }
};