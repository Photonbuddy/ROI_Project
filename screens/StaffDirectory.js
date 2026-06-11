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
} from 'react-native';

export default function StaffDirectory() {
  return (
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
        <Text style={styles.title}>Staff Directory</Text>

        {/* SEARCH BAR */}
        <View style={styles.card}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Search staff..."
              placeholderTextColor="#999"
              style={styles.input}
            />
          </View>
          <View style={styles.searchIcon}>
            <Image
              source={require('../assets/search_glass.png')}
              style={styles.searchIcon}
            />
          </View>
        </View>
        {/* STAFF CARD PLACEHOLDER */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Staff Name Placeholder</Text>
        </View>

        {/* ADD BUTTON */}
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add Staff</Text>
        </Pressable>
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

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 4,
    /*marginBottom: 20,*/
    width: '88%',
    minheight: 32,
  },

  input: {
    flex: 1,
    height: 32,
    paddingHorizontal: 4,
    alignSelf: 'stretch',
  },

  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
    marginTop: 2,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#941a1d',
    padding: 8,
    borderRadius: 25,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
    height: 48,
  },

  cardText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 4,
    marginLeft: 4,
  },

  button: {
    backgroundColor: '#941a1d',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
