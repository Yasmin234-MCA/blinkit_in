import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Define the list of screens and their parameters
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

// Create the stack navigator with the type
const Stack = createNativeStackNavigator<RootStackParamList>();

export default Stack;