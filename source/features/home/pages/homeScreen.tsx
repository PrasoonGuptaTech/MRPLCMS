import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeLogo from '../../../assets/svg/Home.svg';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <HomeLogo width={100} height={100} />
    </SafeAreaView>
  );
}

export default HomeScreen;
