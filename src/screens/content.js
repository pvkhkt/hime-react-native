import { WebView } from "react-native-webview";

function ContentScreen({ route, navigation }) {
  const { html } = route.params;
  return (
    <WebView
      source={{
        html: html ? html : "<h1><center>ĐANG CẬP NHẬT</center></h1>",
      }}
    />
  );
}

export default ContentScreen;
