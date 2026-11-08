import { Stack } from "expo-router";
import { ProfileProvider } from "../lib/profile";
export default function Layout() {
  return (
    <ProfileProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#495E57" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{ title: "Little Lemon", headerBackVisible: false }}
        />
        <Stack.Screen
          name="profile"
          options={{ title: "Personal information" }}
        />
      </Stack>
    </ProfileProvider>
  );
}
