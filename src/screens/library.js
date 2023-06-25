import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import Header from "../components/atoms/header";
import VerticalPost from "../components/molecules/verticalPost";

function LibraryScreen({ route, navigation }) {
  const { data } = route.params;
  console.log(data);
  const length = data.length ? data.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      {length <= 0 && (
        <SafeAreaView>
          <Text style={styles.textNoItem}>Không tồn tại kết quả phù hợp</Text>
        </SafeAreaView>
      )}
      {length > 0 && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Content", { html: item.html })
              }
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
      )}
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
  textNoItem: {
    marginTop: 20,
    textAlign: "center",
  },
  list: {
    marginTop: 20,
  },
});

export default LibraryScreen;
