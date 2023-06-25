import { StyleSheet, Text, View, Image } from "react-native";

export default function HorizontalPost({ id, title, shorttext, html, avatar }) {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: avatar }} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.shorttext} numberOfLines={3}>
          {shorttext}
        </Text>
        <Text style={styles.readmore}>{"Xem thêm >>>"}</Text>
      </View>
    </View>
  );
}

const itemWidth = 180;
const styles = StyleSheet.create({
  item: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "column",
  },
  image: {
    borderRadius: 20,
    height: 250,
    width: itemWidth,
  },
  content: {
    margin: 5,
    width: itemWidth,
    backgroundColor: "white",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    margin: 3,
    color: "black",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  shorttext: {
    fontSize: 15,
    margin: 3,
    color: "gray",
    flexWrap: "wrap",
  },
  readmore: {
    fontSize: 13,
    margin: 3,
    color: "red",
    flexWrap: "wrap",
  },
});
