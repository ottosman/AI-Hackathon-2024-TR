import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View, useThemeColor } from './Themed';

import Colors from '@/constants/Colors';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Niğde X Kavşağı', value: '1' },
  { label: 'Nevşehir Y Kavşağı', value: '2' }
]


export default function EditScreenInfo({ path }: { path: string }) {
  const backgroundColor = useThemeColor({}, 'background'); // Tema rengini almak için useThemeColor hook'unu kullanıyoruz
  const textColor = useThemeColor({}, 'text'); // Tema rengini almak için useThemeColor hook'unu kullanıyoruz
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [openMaps, setOpenMaps] = useState(false); // State to track map opening

  const handleOpenMaps = async () => {
    // Replace with your desired latitude and longitude
    const latitude = 39.904211; // Example latitude
    const longitude = 32.855278; // Example longitude

    const url = Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${latitude},${longitude}`
      : `geo:${latitude},${longitude}`; // Construct URL based on platform

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        setOpenMaps(true); // Set state for potential UI feedback
      } else {
      }
    } catch (error) {
    }
  };


  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Kavşaktaki Araç Sayısı:
          <MonoText> 55</MonoText>


        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
        </View>


        <View style={{ ...styles.container, backgroundColor }}>
          <View style={[styles.dropdownContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Dropdown
              style={[styles.dropdown, { width: 200 }, isFocus && styles.dropdownFocus]}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Kavşak Seçiniz' : '...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}

            />
            <TouchableOpacity
              style={styles.button} >
              <Text style={styles.buttonText}>Göster</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // DropdownLabel'ın ortalanması için
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownLabel: {
    fontSize: 16,
    color: 'gray',
  },
  dropdownFocus: {
    borderColor: 'blue', // Focus olduğunda çerçeve rengini değiştir
  },
  buttonFocus: {
    backgroundColor: 'darkblue', // Focus olduğunda arka plan rengini değiştir
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginLeft: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
