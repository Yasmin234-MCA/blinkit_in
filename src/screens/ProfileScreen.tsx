// ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [hideSensitive, setHideSensitive] = useState(false); // Example state for toggle

  // Reusable row component for sections
  const MenuRow = ({ icon, label, onPress, rightElement }: any) => (
    <TouchableOpacity style={styles.menuRow} onPress={onPress}>
      <View style={styles.rowLeft}>
        {icon && <Icon name={icon} size={20} color="#333" style={styles.rowIcon} />}
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      {rightElement || <Icon name="chevron-right" size={20} color="#999" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Account header */}
        <View style={styles.accountHeader}>
          <Text style={styles.accountTitle}>Your account</Text>
          <Text style={styles.phoneNumber}>6384330170</Text>
        </View>

        {/* Add your birthday */}
        <TouchableOpacity style={styles.birthdayRow}>
          <View>
            <Text style={styles.birthdayLabel}>Add your birthday</Text>
            <Text style={styles.birthdayHint}>Enter details</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>

        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="shopping-bag" size={24} color="#333" />
            <Text style={styles.quickActionLabel}>Your orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="dollar-sign" size={24} color="#333" />
            <Text style={styles.quickActionLabel}>Blinkit Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Icon name="help-circle" size={24} color="#333" />
            <Text style={styles.quickActionLabel}>Need help?</Text>
          </TouchableOpacity>
        </View>

        {/* App update banner */}
        <View style={styles.updateBanner}>
          <View style={styles.updateLeft}>
            <Icon name="download-cloud" size={20} color="#333" />
            <View style={styles.updateTexts}>
              <Text style={styles.updateTitle}>App update available</Text>
              <Text style={styles.updateDesc}>bug fixes and improvements</Text>
            </View>
          </View>
          <Text style={styles.version}>v17.79.1</Text>
        </View>

        {/* Appearance selector */}
        <TouchableOpacity style={styles.appearanceRow}>
          <View style={styles.rowLeft}>
            <Icon name="sun" size={20} color="#333" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Appearance</Text>
          </View>
          <View style={styles.appearanceRight}>
            <Text style={styles.appearanceValue}>LIGHT</Text>
            <Icon name="chevron-down" size={20} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Hide sensitive items toggle */}
        <View style={styles.toggleRow}>
          <View style={styles.toggleLeft}>
            <Icon name="eye-off" size={20} color="#333" style={styles.rowIcon} />
            <View>
              <Text style={styles.rowLabel}>Hide sensitive items</Text>
              <Text style={styles.toggleSubtext}>
                Sexual wellness, nicotine products and other sensitive items will be hidden
              </Text>
            </View>
          </View>
          <Switch
            value={hideSensitive}
            onValueChange={setHideSensitive}
            trackColor={{ false: '#ccc', true: '#F7C600' }}
          />
        </View>
        <TouchableOpacity style={styles.knowMore}>
          <Text style={styles.knowMoreText}>Know more</Text>
        </TouchableOpacity>

        {/* Your information section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your information</Text>
          <MenuRow icon="map-pin" label="Address book" />
          <MenuRow icon="bookmark" label="Bookmarked recipes" />
          <MenuRow icon="heart" label="Your wishlist" />
          <MenuRow icon="file-text" label="GST details" />
          <MenuRow icon="gift" label="E-gift cards" />
          <MenuRow icon="clipboard" label="Your prescriptions" />
        </View>

        {/* Payment and coupons section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment and coupons</Text>
          <MenuRow icon="wallet" label="Wallet" />
          <MenuRow icon="dollar-sign" label="Blinkit Money" />
          <MenuRow icon="settings" label="Payment settings" />
          <MenuRow icon="gift" label="Claim Gift card" />
          <MenuRow icon="award" label="Your collected rewards" />
        </View>

        {/* About us section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About us</Text>
          <MenuRow icon="lock" label="Account privacy" />
          <MenuRow icon="bell" label="Notification preferences" />
          <MenuRow icon="log-out" label="Log out" onPress={() => {/* handle logout */}} />
        </View>

    
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f858',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f2e33e',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'serif',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  accountHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  birthdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2e33e',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  birthdayLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  birthdayHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },
  updateBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2e33e',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  updateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updateTexts: {
    marginLeft: 12,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  updateDesc: {
    fontSize: 13,
    color: '#666',
  },
  version: {
    fontSize: 14,
    color: '#999',
  },
  appearanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appearanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appearanceValue: {
    marginRight: 8,
    fontSize: 16,
    color: '#333',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 14,
  },
  toggleLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 16,
  },
  toggleSubtext: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    width: '90%',
  },
  knowMore: {
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: -8,
  },
  knowMoreText: {
    color: '#F7C600',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 36, // align with icon space
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    marginRight: 14,
  },
  rowLabel: {
    fontSize: 16,
    color: '#333',
  },

});