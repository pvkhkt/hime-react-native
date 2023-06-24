import { StyleSheet, Text, View, Image } from "react-native";

export default function VerticalPost({ id, title, shorttext, html, avatar }) {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: avatar }} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.shorttext}>{shorttext}</Text>
        <Text style={styles.readmore}>{"Xem thêm >>>"}</Text>
      </View>
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
    backgroundColor: "white",
    flexDirection: "column",
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  shorttext: {
    flex: 1,
    fontSize: 15,
    color: "gray",
    flexWrap: "wrap",
  },
  readmore: {
    fontSize: 13,
    color: "red",
    flexWrap: "wrap",
  },
});
