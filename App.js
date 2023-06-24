import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LibraryScreen from "./src/screens/library";
import HomeScreen from "./src/screens/home";
import ContentScreen from "./src/screens/content";
import CameraScreen from "./src/screens/camera";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ title: "Hình ảnh" }}
        />
        <Stack.Screen
          name="Library"
          component={LibraryScreen}
          options={{ title: "Thư viện" }}
        />
        <Stack.Screen
          name="Content"
          component={ContentScreen}
          options={{ title: "Nội dung" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
