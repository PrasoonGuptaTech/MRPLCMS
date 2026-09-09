import { StyleSheet, Text, View } from 'react-native';
import HomeLogo from '../../../assets/svg/Home.svg';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <HomeLogo width={100} height={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
