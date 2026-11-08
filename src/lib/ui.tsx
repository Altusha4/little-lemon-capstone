import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
export const colors = {
  green: "#495E57",
  yellow: "#F4CE14",
  ink: "#25332E",
  light: "#EDEFEE",
};
export function Button({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[s.button, disabled && { opacity: 0.35 }]}
    >
      <Text style={s.buttonText}>{title}</Text>
    </Pressable>
  );
}
export function Field({
  label,
  value,
  onChangeText,
  email = false,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  email?: boolean;
}) {
  return (
    <View style={{ gap: 8, marginVertical: 10 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={email ? "none" : "words"}
        keyboardType={email ? "email-address" : "default"}
        style={s.input}
      />
    </View>
  );
}
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "white" },
  content: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    padding: 24,
    gap: 12,
  },
  title: { fontSize: 32, fontWeight: "700", color: colors.ink },
  subtitle: { fontSize: 18, color: colors.green, lineHeight: 26 },
  label: { fontSize: 15, fontWeight: "600", color: colors.green },
  input: {
    borderWidth: 1,
    borderColor: "#9AA8A2",
    borderRadius: 9,
    padding: 14,
    fontSize: 16,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: colors.yellow,
    borderRadius: 9,
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "700", color: colors.ink },
  error: { color: "#A12626" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
});
