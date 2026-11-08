import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useProfile } from "../lib/profile";
import { Dish, loadMenu } from "../lib/menu";
import { Button, colors, s } from "../lib/ui";
export default function Home() {
  const { profile, loading } = useProfile();
  const [menu, setMenu] = useState<Dish[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const refresh = () => {
    setBusy(true);
    setError("");
    loadMenu()
      .then(setMenu)
      .catch(() =>
        setError("Menu unavailable. Connect to the internet and retry."),
      )
      .finally(() => setBusy(false));
  };
  useEffect(() => {
    let active = true;
    loadMenu()
      .then((d) => {
        if (active) setMenu(d);
      })
      .catch(() => {
        if (active)
          setError("Menu unavailable. Connect to the internet and retry.");
      })
      .finally(() => {
        if (active) setBusy(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const items = useMemo(
    () =>
      menu.filter(
        (d) =>
          (!categories.length || categories.includes(d.category)) &&
          d.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [menu, categories, query],
  );
  if (loading) return <ActivityIndicator />;
  if (!profile) return <Redirect href="/" />;
  return (
    <View style={s.page}>
      <FlatList
        data={items}
        keyExtractor={(d) => String(d.id)}
        contentContainerStyle={{
          width: "100%",
          maxWidth: 700,
          alignSelf: "center",
        }}
        ListHeaderComponent={
          <>
            <View style={[s.row, { padding: 20 }]}>
              <Text
                style={{ fontWeight: "800", fontSize: 22, color: colors.green }}
              >
                🍋 LITTLE LEMON
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open profile"
                onPress={() => router.push("/profile")}
                style={{
                  backgroundColor: colors.light,
                  borderRadius: 40,
                  padding: 14,
                }}
              >
                <Text>
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </Text>
              </Pressable>
            </View>
            <View
              style={{ backgroundColor: colors.green, padding: 24, gap: 12 }}
            >
              <Text
                style={{
                  fontSize: 42,
                  color: colors.yellow,
                  fontWeight: "700",
                }}
              >
                Little Lemon
              </Text>
              <Text style={{ fontSize: 24, color: "white" }}>Chicago</Text>
              <View style={s.row}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    lineHeight: 25,
                    flex: 1,
                  }}
                >
                  We are a family-owned Mediterranean restaurant, focused on
                  traditional recipes served with a modern twist.
                </Text>
                <Image
                  accessibilityLabel="Greek salad"
                  source={{
                    uri: "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/greekSalad.jpg",
                  }}
                  style={{ width: 110, height: 120, borderRadius: 12 }}
                />
              </View>
              <TextInput
                accessibilityLabel="Search menu"
                placeholder="Search menu"
                value={query}
                onChangeText={setQuery}
                style={s.input}
              />
            </View>
            <View style={{ padding: 20, gap: 16 }}>
              <Text style={{ fontWeight: "800", fontSize: 20 }}>
                ORDER FOR DELIVERY
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {Array.from(new Set(menu.map((d) => d.category))).map((c) => (
                  <Pressable
                    key={c}
                    accessibilityRole="button"
                    accessibilityLabel={c}
                    accessibilityState={{ selected: categories.includes(c) }}
                    onPress={() =>
                      setCategories((prev) =>
                        prev.includes(c)
                          ? prev.filter((x) => x !== c)
                          : [...prev, c],
                      )
                    }
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      backgroundColor: categories.includes(c)
                        ? colors.green
                        : colors.light,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        color: categories.includes(c) ? "white" : colors.green,
                      }}
                    >
                      {c}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {categories.length > 0 && (
                <Button
                  title="Clear filters"
                  onPress={() => {
                    setCategories([]);
                    setQuery("");
                  }}
                />
              )}
              {busy && <ActivityIndicator />}
              {!!error && (
                <>
                  <Text style={s.error}>{error}</Text>
                  <Button title="Retry menu" onPress={refresh} />
                </>
              )}
            </View>
          </>
        }
        renderItem={({ item }) => (
          <View
            style={[
              s.row,
              {
                marginHorizontal: 20,
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#DDE2DF",
              },
            ]}
          >
            <View style={{ flex: 1, gap: 9 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                style={{ color: colors.green, lineHeight: 22 }}
              >
                {item.description}
              </Text>
              <Text style={{ fontWeight: "700", color: colors.green }}>
                ${item.price.toFixed(2)}
              </Text>
            </View>
            <Image
              accessibilityLabel={item.name}
              source={{
                uri:
                  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/" +
                  encodeURIComponent(item.image),
              }}
              style={{ width: 88, height: 88, borderRadius: 8 }}
            />
          </View>
        )}
        ListEmptyComponent={
          !busy && !error ? (
            <Text style={{ padding: 24 }}>No dishes match your search.</Text>
          ) : undefined
        }
      />
    </View>
  );
}
