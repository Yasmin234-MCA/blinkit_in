import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  Image,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { Category, Product, Offer } from '../../types'; // ✅ correct path
import ProfileModal from '../profile/ProfileScreen'; // ✅ renamed import to avoid duplicate

const { width } = Dimensions.get('window');

// Data (same as before)
const categories: Category[] = [
  { id: '1', name: 'All', image: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' },
  { id: '2', name: 'Holi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBoloI-7x2HLVj71HMJerJnzZjbiISepL_PQ&s' },
  { id: '3', name: 'Ramzan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQibfJOCpkMOR_6zZx_nMHlP7_sUi_xEUuenQ&s' },
  { id: '4', name: 'Electronics', image: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' },
  { id: '5', name: 'Beauty', image: 'https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-makeup-icon-design-vector-png-image_1985312.jpg' },
];

const gridProducts: Product[] = [
  {
    id: '1',
    name: 'Tea & Coffee',
    price: 'starting at ₹20',
    image: 'https://img.jagranjosh.com/images/2025/11/28/article/image/tea-vs-coffee-1764328684973.webp',
  },
  {
    id: '2',
    name: 'Kitchen Essentials',
    price: 'starting at ₹60 ' ,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIG2QK8pO5miZwDWSxQpgjcvkNlHpX6wllQ&s',
  },
  {
    id: '3',
    name: 'Maggi Mega Pack',
    price: '₹33% OFF',
    discount: '33% OFF',
    image: 'https://m.media-amazon.com/images/I/91P64N86ggL.jpg',
  },
  {
    id: '4',
    name: 'Self Care & Wellness',
    price: 'starting at ₹159',
    discount: '20% OFF',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsfxJuRtr2VXqj7t1a_w_NjTnMITUJQleMg&s',
  },
  {
    id: '5',
    name: 'Laundry & Cleaning',
    price: 'STARTING AT ₹179',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200',
  },
  {
    id: '6',
    name: 'Electronics',
    price: 'STARTING AT ₹200',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200',
  },
];

const offers: Offer[] = [
  {
    id: '1',
    title: 'FLAT ₹50 OFF',
    description: 'On first order above ₹199',
    image: 'https://images.unsplash.com/photo-1607083206868-6c7a3c9752e9?w=300&h=150&fit=crop',
  },
  {
    id: '2',
    title: 'FREE delivery',
    description: 'On all your orders',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=150&fit=crop',
  },
];

const HomeScreen = () => {
  const [showProfile, setShowProfile] = useState(false);

  // Render functions
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        {item.weight && <Text style={styles.productWeight}>{item.weight}</Text>}
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOffer = ({ item }: { item: Offer }) => (
    <View style={styles.offerCard}>
      <Image source={{ uri: item.image }} style={styles.offerImage} />
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />

      {/* Top yellow bar */}
      <View style={styles.topSpacing} />

      {/* Header with location and icons */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer}>
          <View>
            <Text style={styles.locationText}>Blinkit in 14 minutes</Text>
            <Text style={styles.locationSubtext}>🏠 1.8 km away • Kumananchavadi, Poonamallee ▼</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => setShowProfile(true)}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }} style={styles.headerIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => Alert.alert('Wallet', 'Wallet feature coming soon!')}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2830/2830288.png' }} style={styles.headerIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={() => Alert.alert('Notifications', 'No new notifications')}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' }} style={styles.headerIconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' }} style={styles.headerIconImage} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149309.png' }} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Search "pet food"'
          placeholderTextColor="#666"
        />
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/709/709586.png' }} style={styles.micIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Horizontal categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Low price banner */}
        <View style={styles.lowPriceBanner}>
          <Text style={styles.bannerText}>LOW PRICES ALL DAY EVERYDAY</Text>
        </View>

        {/* Product grid (2 columns) */}
        <View style={styles.grid}>
          {gridProducts.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              {renderProductCard({ item })}
            </View>
          ))}
        </View>

        {/* Offers section */}
        <Text style={styles.sectionTitle}>OFFERS FOR YOU</Text>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersList}
        />

        {/* Bestsellers banner */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=150&fit=crop' }}
          style={styles.bestsellerSection}
          imageStyle={styles.bestsellerImage}
        >
          <View style={styles.bestsellerOverlay}>
            <Text style={styles.bestsellerTitle}>Bestsellers</Text>
            <Text style={styles.bestsellerSubtitle}>Get Flat ₹50 OFF on items worth ₹199</Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Krazo Mart</Text>
        </View>
      </ScrollView>

      {/* Profile Modal */}
      <Modal
        visible={showProfile}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowProfile(false)}
      >
        <ProfileModal onClose={() => setShowProfile(false)} />
      </Modal>
    </SafeAreaView>
  );
};

// Styles (unchanged, must be present)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6',
  },
  topSpacing: {
    height: 40,
    backgroundColor: '#FFD700',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFD700',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  locationContainer: {
    flex: 1,
  },
  locationText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  locationSubtext: {
    color: '#333',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
    position: 'relative',
  },
  headerIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#FFD700',
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 15,
    padding: 0,
  },
  micIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: '#FFD700',
  },
  categoriesList: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  categoryText: {
    color: '#333',
    marginTop: 8,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  lowPriceBanner: {
    backgroundColor: '#FFD54F',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  bannerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  gridItem: {
    width: (width - 45) / 2,
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4444',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 1,
  },
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  productWeight: {
    color: '#666',
    fontSize: 11,
    marginBottom: 4,
  },
  productPrice: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  offersList: {
    paddingHorizontal: 10,
  },
  offerCard: {
    width: width * 0.7,
    height: 130,
    marginHorizontal: 6,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#FFF9E6',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  offerContent: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    padding: 15,
    justifyContent: 'center',
  },
  offerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  offerDescription: {
    color: '#333',
    fontSize: 12,
    marginTop: 2,
  },
  bestsellerSection: {
    height: 180,
    marginHorizontal: 15,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  bestsellerImage: {
    borderRadius: 15,
    opacity: 0.3,
  },
  bestsellerOverlay: {
    flex: 1,
    backgroundColor: '#FFF9E6',
    padding: 20,
    justifyContent: 'center',
  },
  bestsellerTitle: {
    color: '#333',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bestsellerSubtitle: {
    color: '#333',
    fontSize: 14,
    marginVertical: 8,
  },
  shopNowButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#FFD700',
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;