import { StyleSheet, View,StatusBar } from 'react-native';
import AppNavigation from './Navigation/AppNavigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <>
   
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppProvider>
      <View style={styles.container}>
        <AppNavigation />
      </View>
      </AppProvider>
 
    </ApplicationProvider>
      
      <StatusBar
        backgroundColor='white'
        barStyle={"dark-content"}
        translucent={false}
        
      />
       </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
