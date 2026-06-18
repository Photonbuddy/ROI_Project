import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the 2 screens that we will be using
import StaffDirectory from './screens/StaffDirectory';
import UpdateStaff from './screens/UpdateStaff';

// Import the CSV data for Departments and Staff

import { initialDepartmentsCSV, parseDepartmentCSV } from './src/departments';
import { staff as initialStaff } from './src/Staff';

const DEPT_KEY = '@departments_data';
const STAFF_KEY = '@staff_directory_data';

const Stack = createNativeStackNavigator();

const App = () => {
  const [masterDepartments, setMasterDepartments] = useState([]);
  const [masterStaff, setMasterStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapData = async () => {
      try {
        // Fetch Departments
        const storedDepts = await AsyncStorage.getItem(DEPT_KEY);
        if (storedDepts) {
          setMasterDepartments(JSON.parse(storedDepts));
        } else {
          const parsedDepts = parseDepartmentCSV(initialDepartmentsCSV);
          await AsyncStorage.setItem(DEPT_KEY, JSON.stringify(parsedDepts));
          setMasterDepartments(parsedDepts);
        }

        // Fetch Staff
        const storedStaff = await AsyncStorage.getItem(STAFF_KEY);
        if (storedStaff) {
          setMasterStaff(JSON.parse(storedStaff));
        } else {
          await AsyncStorage.setItem(STAFF_KEY, JSON.stringify(initialStaff));
          setMasterStaff(initialStaff);
        }
      } catch (error) {
        console.error("AsyncStorage Bootup Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    bootstrapData();
  }, []);

  // Universal handler to save an added or edited staff member
  const handleSaveStaff = async (updatedMember) => {
    try {
      let updatedList = [];
      const exists = masterStaff.some(s => s.id === updatedMember.id);
      
      if (exists) {
        updatedList = masterStaff.map(s => s.id === updatedMember.id ? updatedMember : s);
      } else {
        updatedList = [...masterStaff, updatedMember];
      }

      setMasterStaff(updatedList);
      await AsyncStorage.setItem(STAFF_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error("Failed to persist updated staff member: ", error);
    }
  };


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          {/* Staff Directory Screen */}
          <Stack.Screen name="StaffDirectory">
            {(props) => (
              <StaffDirectory 
                {...props} 
                staffList={masterStaff} 
                departments={masterDepartments} 
              />
            )}
          </Stack.Screen>

          {/* Update Staff Screen */}
          <Stack.Screen name="UpdateStaff">
            {(props) => (
              <UpdateStaff 
                {...props} 
                staffList={masterStaff} 
                departments={masterDepartments} 
                onSave={handleSaveStaff}
              />
            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;