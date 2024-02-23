import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import welcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

export default function Page() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcomeImage} />
      <Text style={styles.headline}>Welcome to WhatsApp</Text>
      <Text style={styles.description}>
        Read our <Text style={styles.link}>Privacy Policy.</Text> Tap "Agree &
        Continue" to accept the{" "}
        <Text style={styles.link}>Terms of Service.</Text>
      </Text>
      <Link href={"/otp"} asChild replace>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.gray,
    marginBottom: 80,
    paddingHorizontal: 25,
  },
  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "700",
  },
});
