import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setOnboardingCompleted: async (value: boolean) => {
    await AsyncStorage.setItem('onboardingCompleted', value.toString());
  },
  
  getOnboardingCompleted: async (): Promise<boolean> => {
    const value = await AsyncStorage.getItem('onboardingCompleted');
    return value === 'true';
  },
  
  clearAll: async () => {
    await AsyncStorage.clear();
  },
};