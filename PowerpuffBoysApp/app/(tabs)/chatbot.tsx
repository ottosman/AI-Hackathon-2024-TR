import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TabTwoScreen() {
  return (
    <WebView source={{ uri: 'http://172.20.10.7:8000' }} style={styles.webview} />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  webview: {
    flex: 1,
  },
});
