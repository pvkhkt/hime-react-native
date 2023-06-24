import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Header from "../components/atoms/header";
import VerticalPost from "../components/molecules/verticalPost";

function LibraryScreen({ route, navigation }) {
  const { data } = route.params;
  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Content", { html: item.html })}
          >
            <VerticalPost
              id={item.id}
              title={item.title}
              shorttext={item.shorttext}
              avatar={item.avatar}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});

export default LibraryScreen;
