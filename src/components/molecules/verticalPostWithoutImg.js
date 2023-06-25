import { StyleSheet, Text, View, Image } from "react-native";

export default function VerticalPostWithoutImg({
  id,
  title,
  shorttext,
  html,
  avatar,
}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.shorttext}>{shorttext}</Text>
      <Text style={styles.readmore}>{"Xem thêm >>>"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  image: {
    borderRadius: 20,
    height: 180,
    width: 100,
  },
  content: {
    flex: 1,
    margin: 5,
    height: 180,
    backgroundColor: "white",
    flexDirection: "column",
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  shorttext: {
    flex: 1.5,
    fontSize: 14,
    margin: 3,
    color: "gray",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  readmore: {
    fontSize: 13,
    color: "red",
    flexWrap: "wrap",
  },
});
