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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateStaff({ route, navigation }) {
  const { employeeId, departments: routeDepts, staffList } = route.params || {};

  const isEdit = !!employeeId;

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
    if (isEdit && staffList) {
      const employee = staffList.find((emp) => emp.id === employeeId);

      if (employee) {
        setName(employee.name || '');
        setPhone(employee.phone || '');
        setDepartment(
          employee.departmentId ? String(employee.departmentId) : ''
        );
        setStreetAddress(employee.streetAddress || '');
        setCityAddress(employee.cityAddress || '');
        setStateAddress(employee.stateAddress || '');
        setPostCodeAddress(employee.postCodeAddress || '');
        setCountry(employee.country || '');
        setOriginalData(employee);
      }
    } else {
      setName('');
      setPhone('');
      setDepartment('');
      setStreetAddress('');
      setCityAddress('');
      setStateAddress('');
      setPostCodeAddress('');
      setCountry('');
      setOriginalData(null);
    }
  }, [employeeId, staffList, routeDepts]);

  const hasChanges = () => {
    if (!isEdit) {
      return (
        name !== '' ||
        phone !== '' ||
        department !==
          (routeDepts && routeDepts.length > 0
            ? String(routeDepts[0].id)
            : '') ||
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
        department !== String(originalData?.departmentId || '') ||
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
      navigation.goBack();
      return;
    }
    const userConfirmed = window.confirm(
      "Unsaved Changes\n\nYou have unsaved changes. Click 'OK' to cancel changes."
    );
    if (userConfirmed) {
      navigation.goBack();
    }
  };
  const handleSave = async () => {
    // Simple validation to ensure Name isn't blank
    if (!name.trim()) {
      window.alert('Validation Error. \nPlease enter a name.');
      return;
    }

    // Create the data from form states
    const updatedStaffMember = {
      id: isEdit ? employeeId : String(Date.now()), // Generate unique ID if it's a new record
      name: name.trim(),
      phone: phone.trim(),
      departmentId: department,
      streetAddress: streetAddress.trim(),
      cityAddress: cityAddress.trim(),
      stateAddress: stateAddress,
      postCodeAddress: postCodeAddress.trim(),
      country: country.trim(),
    };

    let newStaffList = [...(staffList || [])];

    if (isEdit) {
      // If we are updating a current record, find the index and swap the old record for the new one
      const index = newStaffList.findIndex((emp) => emp.id === employeeId);
      if (index !== -1) {
        newStaffList[index] = updatedStaffMember;
      }
    } else {
      // If Adding a staff record, push it into the staff data
      newStaffList.push(updatedStaffMember);
    }

    try {
      const STAFF_KEY = '@staff_directory_data';
      await AsyncStorage.setItem(STAFF_KEY, JSON.stringify(newStaffList));

      // Alert user of success and bounce them back to the Directory
      window.alert('Staff record saved successfully.');
      navigation.navigate('StaffDirectory', {
        updatedStaffList: newStaffList,
      });
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      window.alert('Storage Error! \nCould not save staff data.');
    }
  };

  const handleDelete = () => {
    // Safety guard: Don't allow deleting a person who doesn't exist yet!
    if (!isEdit) return;

    const performDelete = async () => {
      // Filter out the active employee from the master array tracking list
      const newStaffList = staffList.filter((emp) => emp.id !== employeeId);

      try {
        const STAFF_KEY = '@staff_directory_data';
        await AsyncStorage.setItem(STAFF_KEY, JSON.stringify(newStaffList));

        window.alert('Deleted', 'Staff record removed successfully.');
        navigation.navigate('StaffDirectory', {
          updatedStaffList: newStaffList,
        });
      } catch (error) {
        console.error('Error deleting data from AsyncStorage:', error);
        window.alert('Storage Error! \nCould not save staff data.');
      }
    };

    // Double confirmation pop-up to protect against accidental clicks

    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${name}? \n Press 'OK' to delete`
    );
    if (confirmDelete) performDelete();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ImageBackground
        source={require('../assets/AppBackground.jpg')}
        style={styles.background}
        resizeMode="repeat">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.navIcons}>
            <Pressable onPress={handleCancelOrBack}>
              <Image
                source={require('../assets/Home.png')}
                style={styles.icon}
              />
            </Pressable>{' '}
            {/*<Image source={require('../assets/Settings.png')} style={styles.icon} /> */}
            <Pressable onPress={handleCancelOrBack}>
              <Image
                source={require('../assets/Back-Button.png')}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <Image
            source={require('../assets/ROILogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.tabletFormWrapper}>
          <Text style={styles.title}>
            {isEdit ? 'Update Staff Profile' : 'Add New Staff'}
          </Text>

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

          {/* Department Picker */}
          <View style={styles.card}>
            <View style={styles.FullWidthInputBar}>
              <Picker
                selectedValue={department}
                onValueChange={(value) => setDepartment(value)}
                style={styles.picker}>
                <Picker.Item label="Select Department" value="" />
                {routeDepts &&
                  routeDepts.map((dept) => (
                    <Picker.Item
                      key={dept.id}
                      label={dept.name}
                      value={String(dept.id)}
                    />
                  ))}
              </Picker>
            </View>
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

          {/* Street Address */}
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
            {/* State */}
            <View style={styles.cardState}>
              <View style={styles.FullWidthInputBar}>
                <Picker
                  selectedValue={stateAddress}
                  onValueChange={(itemValue) => setStateAddress(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="State" value="" />
                  <Picker.Item label="NSW" value="NSW" />
                  <Picker.Item label="VIC" value="VIC" />
                  <Picker.Item label="QLD" value="QLD" />
                  <Picker.Item label="SA" value="SA" />
                  <Picker.Item label="WA" value="WA" />
                  <Picker.Item label="TAS" value="TAS" />
                  <Picker.Item label="ACT" value="ACT" />
                  <Picker.Item label="NT" value="NT" />
                </Picker>
              </View>
            </View>

            {/* Postcode */}
            <View style={styles.cardPostCode}>
              <View style={styles.PostCardInputBar}>
                <TextInput
                  placeholder="Postcode"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={postCodeAddress}
                  onChangeText={setPostCodeAddress}
                  maxLength={6}
                />
              </View>
            </View>
          </View>

          {/* Country */}
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

          {/* FORM ACTION BUTTONS */}
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleCancelOrBack}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            {/*This code makes the delete button go blank if we have come here to add*/}
            {isEdit ? (
              <Pressable
                style={[styles.button, styles.button]}
                onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            ) : (
              <View style={styles.buttonPlaceholder} />
            )}{' '}
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
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
    marginBottom: 5,
  },
  navIcons: {
    flexDirection: 'column',
    gap: 16,
  },
  icon: {
    width: 45,
    height: 45,
  },

  logo: {
    width: 300,
    height: 157,
  },
  tabletFormWrapper: {
    width: '100%', // Stretches fully on mobile screens
    maxWidth: 480, // Locks form fields to phone-width on tablets
    alignSelf: 'center', // Centers the form beautifully on large screens
    paddingHorizontal: 20, // Keeps uniform padding away from the edge
    paddingBottom: 40, // Adds some extra breathing room at the bottom of the form
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    marginBottom: 5,
    height: 48,
  },
  cardState: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    marginBottom: 5,
    height: 48,
  },
  cardPostCode: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    marginBottom: 5,
    height: 48,
    overflow: 'hidden',
    minWidth: 0,
  },
  PostCardInputBar: {
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 4,
    flex: 1,
    minHeight: 32,
  },
  picker: {
    flex: 1,
    height: 30,
    borderRadius: 25,
  },
  input: {
    width: '100%',
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
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: '#611012', // Slightly darker maroon tone to visually indicate a destructive action
  },

  buttonPlaceholder: {
    flex: 1, // Matches the size of a standard button to preserve layout layout spacing when hidden
  },
});
