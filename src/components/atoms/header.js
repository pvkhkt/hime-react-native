import { Text, StyleSheet, SafeAreaView } from "react-native";

export default function Header({ content }) {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>{content}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: "center",
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
});
