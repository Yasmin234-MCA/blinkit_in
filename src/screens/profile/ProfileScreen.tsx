import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header without close button (tab screen) */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your account</Text>
        </View>

        {/* Phone number */}
        <View style={styles.phoneRow}>
          <Text style={styles.phone}>6384330170</Text>
        </View>

        {/* Add birthday */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Add your birthday</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Three buttons row */}
        <View style={styles.rowButtons}>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonEmoji}>📦</Text>
            <Text style={styles.rowButtonText}>Your orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonEmoji}>💰</Text>
            <Text style={styles.rowButtonText}>Blinkit Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonEmoji}>❓</Text>
            <Text style={styles.rowButtonText}>Need help?</Text>
          </TouchableOpacity>
        </View>

        {/* App update banner */}
        <View style={styles.updateBanner}>
          <View>
            <Text style={styles.updateTitle}>App update available</Text>
            <Text style={styles.updateDesc}>bug fixes and improvements</Text>
            <Text style={styles.updateVersion}>v17.79.1</Text>
          </View>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>

        {/* Appearance */}
        <View style={styles.appearanceRow}>
          <Text style={styles.appearanceLabel}>Appearance</Text>
          <TouchableOpacity style={styles.appearanceValue}>
            <Text style={styles.appearanceText}>LIGHT ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Hide sensitive items */}
        <View style={styles.hideSensitive}>
          <Text style={styles.hideSensitiveTitle}>Hide sensitive items</Text>
          <Text style={styles.hideSensitiveDesc}>
            Sexual wellness, nicotine products and other sensitive items will be hidden
          </Text>
          <TouchableOpacity>
            <Text style={styles.knowMore}>Know more</Text>
          </TouchableOpacity>
        </View>

        {/* Your information section */}
        <Text style={styles.sectionHeader}>Your information</Text>
        <MenuItem text="Address book" />
        <MenuItem text="Bookmarked recipes" />
        <MenuItem text="Your wishlist" />
        <MenuItem text="GST details" />
        <MenuItem text="E-gift cards" />
        <MenuItem text="Your prescriptions" />

        {/* Payment and coupons */}
        <Text style={styles.sectionHeader}>Payment and coupons</Text>
        <MenuItem text="Wallet" />
        <MenuItem text="Blinkit Money" />
        <MenuItem text="Payment settings" />
        <MenuItem text="Claim Gift card" />
        <MenuItem text="Your collected rewards" />

        {/* About us */}
        <Text style={styles.sectionHeader}>About us</Text>
        <MenuItem text="Account privacy" />
        <MenuItem text="Notification preferences" />
        <MenuItem text="Log out" />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>blinkit  v17.79.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ text }: { text: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>{text}</Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  header: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  phoneRow: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  phone: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    backgroundColor: '#FFF9E6',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 18,
    color: '#666',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFF9E6',
  },
  rowButton: {
    alignItems: 'center',
  },
  rowButtonEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  rowButtonText: {
    fontSize: 12,
    color: '#333',
  },
  updateBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  updateDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  updateVersion: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  updateButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  updateButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  appearanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  appearanceLabel: {
    fontSize: 16,
    color: '#333',
  },
  appearanceValue: {
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  appearanceText: {
    fontSize: 14,
    color: '#333',
  },
  hideSensitive: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  hideSensitiveTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  hideSensitiveDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  knowMore: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
  footer: {
    alignItems: 'center',
    padding: 25,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileScreen;