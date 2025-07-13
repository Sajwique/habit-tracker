import { database, DATABASE_ID, HABIT_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  TextInput,
  useTheme,
} from "react-native-paper";

const BUTTONSLIST = ["daily", "weekly", "monthly"];
type Frequency = (typeof BUTTONSLIST)[number];
const AddHabitScreen = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await database.createDocument(
        DATABASE_ID,
        HABIT_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );
      setTitle("");
      setDescription("");
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("There was an error creating the habit");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        label={"Title"}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label={"Description"}
        onChangeText={setDescription}
        mode="outlined"
        style={styles.input}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value)}
          buttons={BUTTONSLIST.map((frq) => ({
            value: frq,
            label: frq.charAt(0).toUpperCase() + frq.slice(1),
          }))}
          style={styles.segmentedButtons}
        />
      </View>
      <Button
        onPress={handleSubmit}
        mode="contained"
        disabled={!title || !description}
      >
        Add Habit
      </Button>

      {error && (
        <Text style={{ color: theme.colors.error, marginTop: 8 }}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  segmentedButtons: {
    marginBottom: 0,
  },
  button: {
    marginTop: 8,
  },
});

export default AddHabitScreen;
