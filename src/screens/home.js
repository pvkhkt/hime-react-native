import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  View,
} from "react-native";

import { SearchBar } from "react-native-elements";
import { FAB } from "react-native-paper";

import HorizonalPost from "../components/molecules/horizontalPost";
import { useEffect, useState } from "react";
import { getBaiHoc, getCauChuyen, doSearch } from "../utils/http";
import CameraScreen from "./camera";

let updateSearch;
let onSummitEditing;

function btnLoadMore() {
  return <Button color={"coral"} title="Xem thêm"></Button>;
}

function HomeScreen({ navigation }) {
  const [story, setStory] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [search, setSeach] = useState("");

  useEffect(() => {
    getCauChuyen().then((res) => {
      console.log("getCauChuyen");
      // setStory(res.slice(0, 3));
      setStory(res);
    });

    getBaiHoc().then((res) => {
      console.log("getBaiHoc");
      // setLesson(res.slice(0, 3));
      setLesson(res);
    });
  }, []);

  updateSearch = (search) => {
    setSeach(search);
  };

  onSummitEditing = async (event) => {
    const keyword = event.nativeEvent.text.toUpperCase();
    console.log("searching...", keyword);
    const response = await doSearch(keyword);
    navigation.navigate("Library", { data: response });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <SearchBar
          style={styles.searchBar}
          placeholder="Tìm kiếm..."
          onChangeText={updateSearch}
          onSubmitEditing={onSummitEditing}
          value={search}
        />
        <Text style={styles.session}>Danh sách câu chuyện</Text>
        <FlatList
          horizontal={true}
          data={story}
          contentContainerStyle={styles.contentContainer}
          // ListFooterComponent={btnLoadMore}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Content", { html: item.html })
              }
            >
              <HorizonalPost
                id={item.id}
                title={item.title}
                shorttext={item.shorttext}
                avatar={item.avatar}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.session}>Danh sách bài học</Text>
        <FlatList
          horizontal={true}
          data={lesson}
          contentContainerStyle={styles.contentContainer}
          // ListFooterComponent={btnLoadMore}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Content", { html: item.html })
              }
            >
              <HorizonalPost
                id={item.id}
                title={item.title}
                shorttext={item.shorttext}
                avatar={item.avatar}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="camera"
        color="black"
        onPress={() => navigation.navigate("Camera")}
      ></FAB>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
  },
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
  session: {
    margin: 10,
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  contentContainer: {
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    borderRadius: 100,
    backgroundColor: "#9ab89a",
    margin: 16,
    right: 0,
  },
});

export default HomeScreen;
