import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  useWindowDimensions,
  FlatList,
} from 'react-native';

export default function StaffDirectory({
  route,
  navigation,
  staffList,
  departments,
}) {
  // These 2 lines setup our tablet mode with 2 columns
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  const [currentStaff, setCurrentStaff] = useState(staffList || []);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (staffList) {
      setCurrentStaff(staffList);
    }
  }, [staffList]);

  // Catch the incoming data coming back from UpdateStaff.js
  useEffect(() => {
    if (route.params?.updatedStaffList) {
      // Update our local state so the screen redraws!
      setCurrentStaff(route.params.updatedStaffList);

      // Clear out the navigation parameter helper so it doesn't loop
      navigation.setParams({ updatedStaffList: undefined });
    }
  }, [route.params?.updatedStaffList]);

  const getDepartmentName = (deptId) => {
    // Add a quick fallback filter check just in case departments array is temporarily blank
    if (!departments) return 'Unknown Department';
    const dept = departments.find((d) => d.id === String(deptId));
    return dept ? dept.name : 'Unknown Department';
  };

  // Run the filter over your local state 'currentStaff' instead of the raw prop
  const filteredStaff = currentStaff.filter((member) => {
    const query = searchQuery.toLowerCase();
    const staffName = (member.name || '').toLowerCase();
    const deptName = getDepartmentName(member.departmentId).toLowerCase();

    return staffName.includes(query) || deptName.includes(query);
  });

  return (
    <View style={styles.container}>
      {/* Check if we are in Web mode, as messages are designed to display only in Web mode*/}
      {Platform.OS !== 'web' && (
        <View style={styles.webWarningBanner}>
          <Text style={styles.webWarningText}>
            Optimization Warning: This app is optimized for Pure Web Mode.
            Please switch your Snack preview tab to "Web" for perfect grid
            snapping.
          </Text>
        </View>
      )}
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
          // This allows us to present 2 columns when in tablet mode
          contentContainerStyle={[
            styles.scrollContent,
            isTablet && {
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            },
          ]}
          // Turn off snapping on tablet because 2 columns will break a single vertical 95px snap interval
          pagingEnabled={false}
          snapToInterval={isTablet ? null : 95}
          decelerationRate={isTablet ? 'normal' : 'fast'}>
          {filteredStaff.length > 0 ? (
            filteredStaff.map((item) => (
              <Pressable
                key={item.id}
                // Force a slightly reduced width for the card, so 2 can fit on a tablet screen
                style={[
                  styles.card,
                  isTablet && { width: '48%', marginBottom: 15 },
                ]}
                onPress={() =>
                  navigation.navigate('UpdateStaff', {
                    employeeId: item.id,
                    departments: departments,
                    staffList: currentStaff,
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
            // A special display if no results found from search
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
              staffList: currentStaff,
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
    width: 45,
    height: 45,
  },

  logo: {
    width: 300,
    height: 157,
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
  webWarningBanner: {
    backgroundColor: '#ffcc00', // Eye-catching warning yellow
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e6b800',
  },

  webWarningText: {
    color: '#333', // Dark text for high contrast readability
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
