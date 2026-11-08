import { useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { Redirect } from "expo-router";
import { empty, useProfile, valid } from "../lib/profile";
import { Button, Field, s } from "../lib/ui";
export default function Onboarding() {
  const { profile, loading, save } = useProfile();
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (loading)
    return <ActivityIndicator accessibilityLabel="Loading profile" />;
  if (profile) return <Redirect href="/home" />;
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Text style={{ fontSize: 42, marginTop: 50 }}>🍋</Text>
      <Text style={s.title}>Little Lemon</Text>
      <Text style={s.subtitle}>Chicago · Fresh Mediterranean food</Text>
      <Text style={[s.title, { marginTop: 32, fontSize: 26 }]}>
        Let’s get to know you
      </Text>
      <Text>Your details stay on this device.</Text>
      <Field
        label="First name"
        value={form.firstName}
        onChangeText={(v) => setForm({ ...form, firstName: v })}
      />
      <Field
        label="Email"
        email
        value={form.email}
        onChangeText={(v) => setForm({ ...form, email: v })}
      />
      <Text style={s.error}>{error}</Text>
      <Button
        title="Next"
        disabled={!valid(form) || busy}
        onPress={async () => {
          setBusy(true);
          try {
            await save(form);
          } catch {
            setError("Could not save your details. Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      />
    </ScrollView>
  );
}
