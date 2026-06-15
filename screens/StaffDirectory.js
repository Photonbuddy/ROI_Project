import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

export default function StaffDirectory({ navigation, staffList, departments }) {
  const [searchQuery, setSearchQuery] = useState('');

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === String(deptId));
    return dept ? dept.name : 'Unknown Department';
  };

  const filteredStaff = staffList.filter((member) => {
    const query = searchQuery.toLowerCase();
    const staffName = (member.name || '').toLowerCase();
    const deptName = getDepartmentName(member.departmentId).toLowerCase();

    return staffName.includes(query) || deptName.includes(query);
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/AppBackground.jpg')}
        style={styles.background}
        resizeMode="repeat">
        {/* Header */}
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

        <Text style={styles.title}>Staff Directory</Text>

        {/* Search Bar */}
        <View style={styles.cardSearch}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search staff..."
              placeholderTextColor="#999"
              style={styles.input}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
          <View style={styles.searchIconContainer}>
            <Image
              source={require('../assets/search_glass.png')}
              style={styles.searchIcon}
            />
          </View>
        </View>

        {/* Create a scrolling panel that scrolls the staff directory*/}
        <ScrollView
          style={styles.scrollPanel}
          contentContainerStyle={styles.scrollContent}
          pagingEnabled={false}
          snapToStart={true}
          snapToEnd={true}
          disableIntervalMomentum={true} // Stops the scroll from flying past multiple cards
          snapToInterval={95} // Set the height of each interval for the scroll
          decelerationRate="fast"
          snapToAlignment="start">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((item) => (
              <Pressable
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('UpdateStaff', {
                    employeeId: item.id,
                    departments: departments,
                    staffList: staffList,
                  })
                }>
                <Text style={styles.cardTextName}>{item.name}</Text>
                <Text style={styles.cardTextDet}>
                  {getDepartmentName(item.departmentId)}
                </Text>
                <Text style={styles.cardTextDet}>{item.phone}</Text>
              </Pressable>
            ))
          ) : (
            <View style={styles.noResultsCard}>
              <Text style={styles.noResultsText}>No matching staff found.</Text>
            </View>
          )}
        </ScrollView>

        {/* Add Staff button */}
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('UpdateStaff', {
              employeeId: null,
              departments: departments,
            })
          }>
          <Text style={styles.buttonText}>Add Staff</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  background: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
    width: 316,
    height: 165,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },

  cardSearch: {
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    height: 48,
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 4,
    flex: 7,
    height: 32,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 4,
    flex: 1,
    minHeight: 26,
    marginLeft: 4,
  },

  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7,
  },

  searchIcon: {
    width: 28,
    height: 24,
    tintColor: '#fff',
  },

   scrollPanel: {
    maxHeight: 475,
    flexGrow: 0,
    marginBottom: 15,
  },

  scrollContent: {
    paddingHorizontal: 4,
    paddingTop: 0,
    paddingBottom: 0,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#941a1d',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
    height: 85,
  },

  cardTextName: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardTextDet: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 14,
    marginTop: 2,
  },

  noResultsCard: {
    backgroundColor: '#941a1d',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },

  noResultsText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },

  button: {
    backgroundColor: '#941a1d',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
