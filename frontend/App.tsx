import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Import SafeAreaProvider
import PragueMap from "./components/PragueMap";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
      <View style={styles.container}>
      <Text>Welcome to the Prague Map!</Text>
      <PragueMap />
    </View>
    </SafeAreaProvider>

    </PaperProvider>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;