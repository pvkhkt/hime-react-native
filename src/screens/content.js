import { WebView } from "react-native-webview";
import { StyleSheet, SafeAreaView, Text } from "react-native";

function ContentScreen({ route, navigation }) {
  const { html } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      {!html && (
        <SafeAreaView>
          <Text style={styles.textNoItem}>Đang cập nhật</Text>
        </SafeAreaView>
      )}
      {html && (
        <WebView
          source={{
            html: html,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textNoItem: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default ContentScreen;
