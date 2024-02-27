import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";

const CELL_COUNT = 6;

export default function Page() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setcode] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setcode,
  });

  useEffect(() => {
    if (code.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)/calls");
      }, 1200);
    }
  }, [code]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: phone }} />
      {loading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Confirming code...</Text>
        </View>
      )}
      <Text style={styles.legal}>
        We have sent you an SMS with a code to the number above
      </Text>
      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digit
        activation code
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setcode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={[styles.cellText, isFocused && styles.focusText]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          Didn't receive a verification code?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  legal: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.gray,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  codeFieldRoot: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.gray,
  },
  cellText: {
    color: Colors.gray,
    fontSize: 20,
    fontWeight: "bold",
  },
  focusCell: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
  },
  focusText: {
    color: Colors.primary,
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
