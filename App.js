
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StaffDirectory from './screens/StaffDirectory';
import UpdateStaff from './screens/UpdateStaff';
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="UpdateStaff"
                component={UpdateStaff}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};
export default App;
