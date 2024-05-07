import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { MonoText } from '@/components/StyledText';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useState } from 'react';
import FancyTable from 'react-native-fancy-table'
import { fetchDataFromAPI } from '@/api/apiClient';

export default function ModalScreen() {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [tableBody, setTableBody] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(date, time);
        if (response && response.data) {
          setTableBody(response.data);
        }
      } catch (error) {
      }
    };

    fetchData();
  }, [date, time]);

  // date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('tr-TR', options);
    setDate(formattedDate);
    hideDatePicker();
  };
  // time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleTimeConfirm = (time) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    setTime(time.toLocaleTimeString('tr-TR', options));
    hideTimePicker();
  }



  const header = [
    ' id',
    'Araç Sayısı',
    'Saat',
    'Tarih',
    'Kavşak'
  ];


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>


        <Button title="Tarih Seç" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <Button title="Saat Seç" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </View>
      {(date || time) && (
        <MonoText>
          {date && time ? `${date} - ${time}` : (date ? date : time)}
        </MonoText>
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <MonoText style={{ marginBottom: 5 }}>İlgili Kayıtlar</MonoText>


      <FancyTable
        headerBGColor="silver"
        headerFontColor="white"
        headerFontSize={15}
        bodyFontSize={13}
        bodyFontColor="black"
        tableHeight={1.5}
        header={header}
        tableBody={tableBody}
        rowWidth={4}
        borderColor="gray"
        borderWidth={0.7}
      />


      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
