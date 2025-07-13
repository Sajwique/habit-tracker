import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATEFORM!);

export const account = new Account(client);
export const database = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;

export const HABIT_COLLECTION_ID =
  process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID!;

export const HABIT_COMPLETIONS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_HABIT_COMPLETETINS_ID!;
