import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { departments } from '../src/departments';
import { useRoute } from '@react-navigation/native';
export default function UpdateStaff({ navigation }) {
  const route = useRoute();
  const staff = route.params?.staff;
  const isEdit = !!staff;
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [streetAddress, setStreetAddress] = React.useState('');
  const [cityAddress, setCityAddress] = React.useState('');
  const [stateAddress, setStateAddress] = React.useState('');
  const [postCodeAddress, setPostCodeAddress] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [originalData, setOriginalData] = React.useState(null);

  React.useEffect(() => {
    if (staff) {
      setName(staff.name);
      setPhone(staff.phone);
      setDepartment(staff.department);
      setStreetAddress(staff.streetAddress);
      setCityAddress(staff.cityAddress);
      setStateAddress(staff.stateAddress);
      setPostCodeAddress(staff.postCodeAddress);
      setCountry(staff.country);

      setOriginalData(staff);
    }
  }, [staff]);
  const hasChanges = () => {
    if (!isEdit) {
      return (
        name !== '' ||
        phone !== '' ||
        department !== '' ||
        streetAddress !== '' ||
        cityAddress !== '' ||
        stateAddress !== '' ||
        postCodeAddress !== '' ||
        country !== ''
      );
    } else {
      return (
        name !== (originalData?.name || '') ||
        phone !== (originalData?.phone || '') ||
        department !== (originalData?.department || 0) ||
        streetAddress !== (originalData?.streetAddress || '') ||
        cityAddress !== (originalData?.cityAddress || '') ||
        stateAddress !== (originalData?.stateAddress || '') ||
        postCodeAddress !== (originalData?.postCodeAddress || '') ||
        country !== (originalData?.country || '')
      );
    }
  };

const handleCancelOrBack = () => {
  if (!hasChanges()) {
    console.log('No changes detected');
    navigation.goBack();
    return;
  }

  // 1. WEB DETECTED
  if (Platform.OS === 'web') {
    // window.confirm opens a standard browser pop-up with "OK" and "Cancel"
    const userConfirmed = window.confirm(
      "Unsaved Changes\n\nYou have unsaved changes. Click 'OK' to cancel changes."
    );

    // If the user clicked "OK" (true), go back
    if (userConfirmed) {
      navigation.goBack();
    }
    // If they clicked "Cancel" (false), it does nothing and keeps them on the page
  } 
  
  // 2. MOBILE DETECTED (iOS/Android)
  else {
    Alert.alert(
      'Unsaved Changes',
      'You have unsaved changes. Are you sure you want to cancel?',
      [
        { text: 'Continue Editing', style: 'cancel' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  }
};  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Background */}
      <ImageBackground
        source={require('../assets/AppBackground.jpg')}
        style={styles.background}
        resizeMode="repeat">
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.navIcons}>
            <Image source={require('../assets/Home.png')} style={styles.icon} />
            <Image
              source={require('../assets/Back-Button.png')}
              style={styles.icon}
            />
          </View>

          <Image
            source={require('../assets/ROILogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>Add or Update Staff</Text>

        {/* Name */}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#999"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        {/* Department */}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
<Picker
  selectedValue={String(department)} // Safely handle any legacy data
  onValueChange={(value) => setDepartment(value)} // Just set the string directly!
  style={styles.picker}>
  <Picker.Item label="Select Department" value="" /> {/* Empty string placeholder */}
  {departments.map((dept) => (
    <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
  ))}
</Picker>          </View>
        </View>
        {/* Phone */}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#999"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>
        {/* Street Adress */}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
            <TextInput
              placeholder="Street Address"
              placeholderTextColor="#999"
              style={styles.input}
              value={streetAddress}
              onChangeText={setStreetAddress}
            />
          </View>
        </View>
        {/* City */}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
            <TextInput
              placeholder="City"
              placeholderTextColor="#999"
              style={styles.input}
              value={cityAddress}
              onChangeText={setCityAddress}
            />
          </View>
        </View>

        <View style={styles.row}>
          {/*State*/}
          <View style={styles.card}>
            <View style={styles.FullWidthInputBar}>
              <Picker
                selectedValue={stateAddress}
                onValueChange={(itemValue) => setStateAddress(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Select State" value="" />
                <Picker.Item label="NSW" value="NSW" />
                <Picker.Item label="VIC" value="VIC" />
                <Picker.Item label="QLD" value="QLD" />
                <Picker.Item label="SA" value="SA" />
                <Picker.Item label="WA" value="WA" />
                <Picker.Item label="TAS" value="TAS" />
                <Picker.Item label="ACT" value="ACT" />
                <Picker.Item label="NT" value="NT" />
              </Picker>{' '}
            </View>
          </View>
          {/*PostCode*/}
          <View style={styles.cardPostCode}>
            <View style={styles.FullWidthInputBar}>
              <TextInput
                placeholder="PostCode"
                placeholderTextColor="#999"
                style={styles.input}
                value={postCodeAddress}
                onChangeText={setPostCodeAddress}
                maxLength={6}
              />
            </View>
          </View>
        </View>
        {/*Country*/}
        <View style={styles.card}>
          <View style={styles.FullWidthInputBar}>
            <TextInput
              placeholder="Country"
              placeholderTextColor="#999"
              style={styles.input}
              value={country}
              onChangeText={setCountry}
            />
          </View>
        </View>
        <View style={styles.row}>
          {/* ADD BUTTON */}
          <Pressable style={styles.button} onPress={handleCancelOrBack}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flexGrow: 1,
  },

  background: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  navIcons: {
    flexDirection: 'column',
    gap: 16,
  },

  icon: {
    width: 40,
    height: 40,
  },

  logo: {
    width: 300,
    height: 157,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },

  FullWidthInputBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 4,
    flex: 1,
    minHeight: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    marginBottom: 10,
    height: 48,
  },
  cardPostCode: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    marginBottom: 10,
    height: 48,
    overflow: 'hidden',
    minWidth: 0,
  },
  picker: {
    flex: 1,
    height: 30,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 28,
    paddingHorizontal: 6,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  button: {
    backgroundColor: '#941a1d',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
