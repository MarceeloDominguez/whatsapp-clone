import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MaskInput from "react-native-mask-input";

const ARG_PHONE = [
  `+`,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 400);
  };

  const trySignIn = async () => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Argentina</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            style={styles.input}
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+54 your phone number"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={ARG_PHONE}
          />
        </View>
        <Text style={styles.legal}>
          You must be <Text style={styles.link}>at least 16 years old</Text> to
          register. Learn how WhatsApp works with the{" "}
          <Text style={styles.link}>Meta Companies</Text>
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber !== "" ? styles.enabledButton : null,
          ]}
          disabled={phoneNumber === ""}
          onPress={sendOTP}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== "" ? styles.enabledText : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  description: {
    fontSize: 13,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginBottom: 6,
  },
  listItemText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  legal: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabledButton: {
    backgroundColor: Colors.primary,
  },
  enabledText: {
    color: Colors.background,
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    fontSize: 16,
    marginTop: 10,
    color: Colors.gray,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.gray,
    padding: 10,
  },
});
