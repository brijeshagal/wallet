import { Stack } from "expo-router";

export default function SetPasswordLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Networks" }} />
    </Stack>
  );
}
