import EncryptedStorage from "react-native-encrypted-storage";

/**
 * Retrieve encrypted data securely
 * @param key - The storage key
 * @returns The encrypted value, or null if not found
 */
export const getSecureData = async (key: string): Promise<string | null> => {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value ? value : null;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    throw error;
  }
};