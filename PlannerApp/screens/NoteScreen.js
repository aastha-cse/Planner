import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteScreen = ({ route, navigation }) => {
  const { date } = route.params;
  const [note, setNote] = useState('');

  useEffect(() => {
    const loadNote = async () => {
      const savedNote = await AsyncStorage.getItem(date);
      if (savedNote) {
        setNote(savedNote);
      }
    };
    loadNote();
  }, [date]);

  const saveNote = async () => {
    await AsyncStorage.setItem(date, note);
    navigation.goBack();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#3c405b',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: '700',
      },
      title: 'Notes',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Notes for {date}</Text>
      <TextInput
        style={styles.textInput}
        value={note}
        onChangeText={setNote}
        placeholder="Write your notes here..."
        multiline
      />
      <Button title="Save Note" onPress={saveNote} color="#8ae3ac" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#3c405b',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#ffffff',
  },
  textInput: {
    height: 200,
    padding: 10,
    backgroundColor: '#4a5267',
    borderColor: '#8ae3ac',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#ffffff',
  },
});

export default NoteScreen;
