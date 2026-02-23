import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { UserProfile, Address, Order } from '../../types/index.ts'; // ✅ correct path (two levels up)

// Dummy profile data
const userProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  joinedDate: 'January 2024',
};

const savedAddresses: Address[] = [
  {
    id: '1',
    type: 'Home',
    address: '123 Main Street, Kumananchavadi',
    city: 'Chennai',
    pincode: '600056',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Work',
    address: '456 Business Park, Ambattur',
    city: 'Chennai',
    pincode: '600053',
    isDefault: false,
  },
];

const orderHistory: Order[] = [
  {
    id: 'ORD001',
    date: '2024-02-20',
    items: 'Fresh Fruits, Vegetables',
    total: '₹450',
    status: 'Delivered',
  },
  {
    id: 'ORD002',
    date: '2024-02-18',
    items: 'Dresses, Beauty Products',
    total: '₹1,299',
    status: 'In Transit',
  },
  {
    id: 'ORD003',
    date: '2024-02-15',
    items: 'Organic Bananas, Apples',
    total: '₹180',
    status: 'Delivered',
  },
];

interface ProfileScreenProps {
  onClose?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'settings'>('orders');

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  const renderProfileHeader = () => (
    <View style={styles.profileHeader}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
      <Image source={{ uri: userProfile.avatar }} style={styles.profileAvatar} />
      <Text style={styles.profileName}>{userProfile.name}</Text>
      <Text style={styles.profileEmail}>{userProfile.email}</Text>
      <Text style={styles.profilePhone}>{userProfile.phone}</Text>
      <Text style={styles.profileJoined}>Member since {userProfile.joinedDate}</Text>

      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{orderHistory.length}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{savedAddresses.length}</Text>
          <Text style={styles.statLabel}>Addresses</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Offers</Text>
        </View>
      </View>
    </View>
  );

  const renderProfileTabs = () => (
    <View style={styles.profileTabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
        onPress={() => setActiveTab('orders')}
      >
        <Text style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'addresses' && styles.activeTab]}
        onPress={() => setActiveTab('addresses')}
      >
        <Text style={[styles.tabText, activeTab === 'addresses' && styles.activeTabText]}>Addresses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
        onPress={() => setActiveTab('settings')}
      >
        <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrdersTab = () => (
    <View style={styles.tabContent}>
      {orderHistory.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View
              style={[
                styles.orderStatus,
                {
                  backgroundColor:
                    order.status === 'Delivered'
                      ? '#4CAF50'
                      : order.status === 'In Transit'
                      ? '#FFD700'
                      : '#FF4444',
                },
              ]}
            >
              <Text style={styles.orderStatusText}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.orderDate}>{order.date}</Text>
          <Text style={styles.orderItems}>{order.items}</Text>
          <View style={styles.orderFooter}>
            <Text style={styles.orderTotal}>Total: {order.total}</Text>
            <TouchableOpacity style={styles.orderDetailsButton}>
              <Text style={styles.orderDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAddressesTab = () => (
    <View style={styles.tabContent}>
      {savedAddresses.map((address) => (
        <View key={address.id} style={styles.addressCard}>
          <View style={styles.addressHeader}>
            <View style={styles.addressTypeContainer}>
              <Text style={styles.addressType}>{address.type}</Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Text style={styles.editAddressText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressLine}>{address.address}</Text>
          <Text style={styles.addressLine}>
            {address.city} - {address.pincode}
          </Text>
          <View style={styles.addressActions}>
            <TouchableOpacity style={styles.addressAction}>
              <Text style={styles.addressActionText}>Set as Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addressAction, styles.deleteAction]}>
              <Text style={[styles.addressActionText, styles.deleteActionText]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addAddressButton}>
        <Text style={styles.addAddressIcon}>+</Text>
        <Text style={styles.addAddressText}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingIcon}>👤</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Edit Profile</Text>
          <Text style={styles.settingSubtitle}>Update your personal information</Text>
        </View>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingIcon}>🔔</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <Text style={styles.settingSubtitle}>Manage your notification preferences</Text>
        </View>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingIcon}>🔒</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Privacy & Security</Text>
          <Text style={styles.settingSubtitle}>Manage your privacy settings</Text>
        </View>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingIcon}>💳</Text>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>Payment Methods</Text>
          <Text style={styles.settingSubtitle}>Add or remove payment options</Text>
        </View>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.settingItem, styles.logoutButton]}>
        <Text style={styles.settingIcon}>🚪</Text>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingTitle, styles.logoutText]}>Log Out</Text>
        </View>
        <Text style={styles.settingArrow}>›</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.profileContainer}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderProfileHeader()}
        {renderProfileTabs()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'addresses' && renderAddressesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        <View style={styles.profileFooter}>
          <Text style={styles.profileFooterText}>Krazo Mart v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles (must be included)
const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  profileHeader: {
    backgroundColor: '#FFD700',
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    marginTop: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8,
    marginTop: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: '#333',
    opacity: 0.8,
    marginTop: 2,
  },
  profileJoined: {
    fontSize: 12,
    color: '#333',
    opacity: 0.6,
    marginTop: 8,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#FFD700',
  },
  profileTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 30,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#FFD700',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFF9E6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  orderDetailsText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#333',
  },
  editAddressText: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '600',
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addressAction: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  addressActionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  deleteAction: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF4444',
  },
  deleteActionText: {
    color: '#FF4444',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    gap: 8,
  },
  addAddressIcon: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  addAddressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  settingArrow: {
    fontSize: 20,
    color: '#666',
  },
  logoutButton: {
    marginTop: 20,
    borderColor: '#FF4444',
  },
  logoutText: {
    color: '#FF4444',
  },
  profileFooter: {
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  profileFooterText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileScreen;