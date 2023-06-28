import { WebView } from "react-native-webview";
import { StyleSheet, SafeAreaView, Text, Platform } from "react-native";
import RenderHTML from "react-native-render-html";

function ContentScreen({ route, navigation }) {
  const { html } = route.params;
  console.log(html);
  return (
    <SafeAreaView style={styles.container}>
      {!html && (
        <SafeAreaView>
          <Text style={styles.textNoItem}>Đang cập nhật</Text>
        </SafeAreaView>
      )}
      {html && (
        <RenderHTML baseStyle={styles.webView} source={{ html: html }} />
        // <WebView
        //   originWhitelist={["*"]}
        //   source={{
        //     html: html,
        //   }}
        // />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webView: {
    margin: 15,
    textAlign: "left",
  },
  textNoItem: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default ContentScreen;
