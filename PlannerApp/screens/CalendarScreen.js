import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const loadMarkedDates = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const notesMarked = {};
      
      for (const key of allKeys) {
        const note = await AsyncStorage.getItem(key);
        if (note) {
          notesMarked[key] = {
            marked: true,
            dotColor: '#8ae3ac',
            selectedColor: '#8ae3ac',
          };
        }
      }

      setMarkedDates(notesMarked);
    };

    const unsubscribe = navigation.addListener('focus', loadMarkedDates);

    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#3c405b',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: '700',
      },
      title: 'Calendar',
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          navigation.navigate('Note', { date: day.dateString });
        }}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#3c405b',
          calendarBackground: '#3c405b',
          selectedDayBackgroundColor: '#8ae3ac',
          monthTextColor: '#ffffff',
          textMonthFontWeight: '700',
          textMonthFontSize: 20,
          textDayHeaderFontSize: 15,
          textDayHeaderFontWeight: "500",
          arrowColor: '#ffffff',
        }}
        dayComponent={({ date, state }) => {
          const isMarked = !!markedDates[date.dateString];
          
          return (
            <TouchableOpacity
              style={[
                styles.dayContainer,
                state === 'disabled' && styles.disabledDayContainer,
                isMarked && styles.markedDayContainer,
              ]}
              onPress={() => {
                console.log('Day pressed in custom component:', date.dateString);
                navigation.navigate('Note', { date: date.dateString });
              }}
            >
              <Text
                style={[
                  styles.dayText,
                  state === 'disabled' && styles.disabledDayText,
                  isMarked && styles.markedDayText,
                ]}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c405b',
    padding: 16,
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c4a6b',
    borderRadius: 4,
  },
  disabledDayContainer: {
    backgroundColor: '#2d3455',
  },
  markedDayContainer: {
    backgroundColor: '#8ae3ac',
  },
  dayText: {
    color: '#ffffff',
    fontSize: 16,
  },
  disabledDayText: {
    color: '#4d4d4d',
  },
  markedDayText: {
    color: '#000000',
  },
});

export default CalendarScreen;
