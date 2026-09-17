import { StyleSheet, Text, View } from 'react-native';

export default function MediaScreen() {
  return (
    <View style={styles.container}>
      <Text>Media</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
