// LoginScreen.tsx – Added Forgot Password link and password visibility toggle
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Extend the param list if you have a ForgotPassword screen
// type RootStackParamList = {
//   Login: undefined;
//   Register: undefined;
//   Home: undefined;
//   ForgotPassword: undefined; // <-- add this if it exists
// };

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'Test@123';

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  const [criteria, setCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    const newCriteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setCriteria(newCriteria);
  }, [password]);

  // No password strength validation – button is always enabled (except when loading)
  const isFormValid = (): boolean => {
    return email.trim() !== '' && password.length > 0;
  };

  const renderRequirement = (label: string, met: boolean) => (
    <View style={styles.requirementRow}>
      <Icon
        name={met ? 'check-circle' : 'radio-button-unchecked'}
        size={18}
        color={met ? '#4caf50' : '#999999'}
      />
      <Text style={[styles.requirementText, met && styles.requirementMetText]}>
        {label}
      </Text>
    </View>
  );

  const handleLogin = async () => {
    if (!isFormValid()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call – replace with real fetch
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));

      if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        throw new Error('Invalid email or password');
      }

      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // If you have a ForgotPassword screen, navigate to it:
    // navigation.navigate('ForgotPassword');
    // Otherwise show an alert for now
    Alert.alert('Forgot Password', 'Please contact support or reset your password via email.');
  };

  // Show requirements only when password field is focused
  const showRequirements = isFocused;

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/stack-yellow-shopping-bags-yellow-background_235490-6706.jpg?w=360' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password with focus handlers and visibility toggle */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password link */}
          <TouchableOpacity style={styles.forgotContainer} onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Password rules checklist – only shown when focused */}
          {showRequirements && (
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password must contain:</Text>
              {renderRequirement('At least 8 characters', criteria.minLength)}
              {renderRequirement('Uppercase letter (A–Z)', criteria.hasUpperCase)}
              {renderRequirement('Lowercase letter (a–z)', criteria.hasLowerCase)}
              {renderRequirement('Number (0–9)', criteria.hasNumber)}
              {renderRequirement('Special character (!@#$%^&*)', criteria.hasSpecial)}
            </View>
          )}

          {/* Login Button – always enabled (except during loading) */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#130c0c',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 18,
    color: '#2a2020',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#515151',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(2, 0, 0, 0.33)',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#000000',
    textShadowColor: 'rgba(6, 3, 3, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  // Special container for password with eye icon
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // reduced to accommodate forgot link
    borderWidth: 1,
    borderColor: '#515151',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(2, 0, 0, 0.33)',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000000',
    textShadowColor: 'rgba(6, 3, 3, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  requirementsContainer: {
    marginBottom: 15,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 10,
  },
  requirementsTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  requirementText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  requirementMetText: {
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#f5eab7',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'serif',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  link: {
    color: '#1b1b17',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;