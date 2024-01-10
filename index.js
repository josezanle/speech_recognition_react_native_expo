import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from '@react-native-community/voice';
import * as Speech from 'expo-speech';

export default function App() {
    const [isListening, setIsListening] = useState(false);
    const [transcription, setTranscription] = useState('');

    useEffect(() => {
        Voice.onSpeechResults = (event) => {
            setTranscription(event.value[0]);
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startListening = async () => {
        try {
            await Voice.start('en-US');
            setIsListening(true);
        } catch (error) {
            console.error('Error starting voice recognition:', error);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (error) {
            console.error('Error stopping voice recognition:', error);
        }
    };

    const speakTranscription = () => {
        Speech.speak(transcription);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{transcription}</Text>
            <Button
                title={isListening ? 'Stop Listening' : 'Start Listening'}
                onPress={isListening ? stopListening : startListening}
            />
            <Button title="Speak Transcription" onPress={speakTranscription} />
        </View>
    );
}
