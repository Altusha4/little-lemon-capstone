import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};
const endpoint =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
export async function loadMenu(): Promise<Dish[]> {
  let db: import("expo-sqlite").SQLiteDatabase | undefined;
  if (Platform.OS === "web") {
    const saved = await AsyncStorage.getItem("little-lemon-menu");
    if (saved) return JSON.parse(saved);
  } else {
    const SQLite = await import("expo-sqlite");
    db = await SQLite.openDatabaseAsync("little_lemon");
    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY, name TEXT, price REAL, description TEXT, image TEXT, category TEXT);",
    );
    const saved = await db.getAllAsync<Dish>("SELECT * FROM menu");
    if (saved.length) return saved;
  }
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Menu download failed");
  const json = await response.json();
  if (!Array.isArray(json.menu)) throw new Error("Invalid menu");
  const dishes: Dish[] = json.menu.map((d: Omit<Dish, "id">, i: number) => ({
    ...d,
    id: i + 1,
    price: Number(d.price),
    category: d.category ?? "mains",
  }));
  if (db) {
    await db.withTransactionAsync(async () => {
      for (const d of dishes)
        await db!.runAsync(
          "INSERT OR REPLACE INTO menu VALUES (?, ?, ?, ?, ?, ?)",
          d.id,
          d.name,
          d.price,
          d.description,
          d.image,
          d.category,
        );
    });
  } else
    await AsyncStorage.setItem("little-lemon-menu", JSON.stringify(dishes));
  return dishes;
}
