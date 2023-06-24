import { WebView } from "react-native-webview";

function ContentScreen({ route, navigation }) {
  const { html } = route.params;
  return (
    <WebView
      source={{
        html: html,
      }}
    />
  );
}

export default ContentScreen;
