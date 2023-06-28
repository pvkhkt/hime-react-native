import { StyleSheet, Text, View, Image } from "react-native";

export default function VerticalPost({ id, title, shorttext, html, avatar }) {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: avatar }} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.shorttext} numberOfLines={4}>
          {shorttext}
        </Text>
        <Text style={styles.readmore}>{"Xem thêm >>>"}</Text>
      </View>
    </View>
  );
}

const itemHeight = 150;

const styles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  image: {
    borderRadius: 20,
    height: itemHeight,
    width: 120,
  },
  content: {
    flex: 1,
    margin: 5,
    height: itemHeight,
    backgroundColor: "white",
    flexDirection: "column",
  },
  title: {
    fontSize: 17,
    margin: 2,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  shorttext: {
    fontSize: 14,
    margin: 2,
    color: "gray",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  readmore: {
    fontSize: 13,
    margin: 2,
    color: "red",
    flexWrap: "wrap",
  },
});
