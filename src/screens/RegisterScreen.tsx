// RegisterScreen.tsx – Added eye icons for password and confirm password
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

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const existingEmails = ['test@example.com', 'user@demo.com'];

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // track focus on password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validatePassword = (pass: string): boolean => {
    return Object.values(criteria).every(value => value === true);
  };

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Weak Password', 'Please meet all password requirements.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (existingEmails.includes(email.toLowerCase())) {
      Alert.alert('Registration Failed', 'Email already registered');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 1500);
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

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/stack-yellow-shopping-bags-yellow-background_235490-6706.jpg?w=360' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#ccc"
              value={name}
              onChangeText={setName}
            />
          </View>

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

          {/* Password with eye icon */}
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

          {/* Confirm Password with eye icon */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Password requirements – only shown when password field is focused */}
          {isFocused && (
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password must contain:</Text>
              {renderRequirement('At least 8 characters', criteria.minLength)}
              {renderRequirement('Uppercase letter (A–Z)', criteria.hasUpperCase)}
              {renderRequirement('Lowercase letter (a–z)', criteria.hasLowerCase)}
              {renderRequirement('Number (0–9)', criteria.hasNumber)}
              {renderRequirement('Special character (!@#$%^&*)', criteria.hasSpecial)}
            </View>
          )}

          {/* Confirm password match indicator (always visible if confirm field has text) */}
          {confirmPassword.length > 0 && (
            <View style={styles.matchContainer}>
              <Icon
                name={password === confirmPassword ? 'check-circle' : 'cancel'}
                size={18}
                color={password === confirmPassword ? '#4caf50' : '#f44336'}
              />
              <Text style={[styles.matchText, { color: password === confirmPassword ? '#4caf50' : '#f44336' }]}>
                {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
              </Text>
            </View>
          )}

          {/* Register Button – always enabled except during loading */}
          <TouchableOpacity
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Sign In</Text>
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
    color: '#000000',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 18,
    color: '#0c0101',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontFamily: 'serif',
  },
  inputContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(8, 2, 2, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(2, 0, 0, 0.33)',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  // Special container for password with eye icon
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(8, 2, 2, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(2, 0, 0, 0.33)',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  eyeIcon: {
    padding: 8,
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
    color: '#080908',
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  matchText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  registerButton: {
    backgroundColor: '#fcf8b3',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    opacity: 0.5,
  },
  registerButtonText: {
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
    color: '#242219',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterScreen;