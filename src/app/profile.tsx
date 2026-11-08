import { useState } from "react";
import {
  ScrollView,
  Text,
  Switch,
  View,
  ActivityIndicator,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useProfile, valid, Profile } from "../lib/profile";
import { Button, Field, s } from "../lib/ui";
export default function ProfilePage() {
  const { profile, loading } = useProfile();
  if (loading) return <ActivityIndicator />;
  if (!profile) return <Redirect href="/" />;
  return <ProfileForm profile={profile} />;
}
function ProfileForm({ profile }: { profile: Profile }) {
  const { save, logout } = useProfile();
  const [form, setForm] = useState<Profile>(profile);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  if (!profile) return <Redirect href="/" />;
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Text style={s.title}>Personal information</Text>
      <Text
        style={{
          fontSize: 42,
          backgroundColor: "#EDEFEE",
          padding: 20,
          borderRadius: 60,
          alignSelf: "flex-start",
        }}
      >
        {form.firstName[0] ?? "?"}
        {form.lastName[0] ?? ""}
      </Text>
      {(["firstName", "lastName", "email", "phone"] as const).map((key, i) => (
        <Field
          key={key}
          label={["First name", "Last name", "Email", "Phone number"][i]}
          email={key === "email"}
          value={form[key]}
          onChangeText={(v) => setForm({ ...form, [key]: v })}
        />
      ))}
      <Text style={s.subtitle}>Email preferences</Text>
      {(["orderStatus", "newsletter"] as const).map((key, i) => (
        <View key={key} style={s.row}>
          <Text>{["Order statuses", "Newsletter"][i]}</Text>
          <Switch
            accessibilityLabel={key}
            value={form[key]}
            onValueChange={(v) => setForm({ ...form, [key]: v })}
          />
        </View>
      ))}
      <Text accessibilityLiveRegion="polite">{message}</Text>
      <Button
        title="Save changes"
        disabled={!valid(form) || busy}
        onPress={async () => {
          setBusy(true);
          try {
            await save(form);
            setMessage("Changes saved");
          } catch {
            setMessage("Save failed. Please try again.");
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button
        title="Discard changes"
        onPress={() => {
          setForm(profile);
          setMessage("Changes discarded");
        }}
      />
      <Button title="Back to menu" onPress={() => router.back()} />
      <Button
        title="Log out"
        disabled={busy}
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch {
            setMessage("Could not clear profile. Please try again.");
          }
        }}
      />
    </ScrollView>
  );
}
