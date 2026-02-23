import React from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

// ---------- Dummy Data ----------
const categories = [
  { id: '1', name: 'All', image: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' },
  { id: '2', name: 'Fruits', image: 'https://images.unsplash.com/photo-1619566621402-0c7e6c6b3d7f?w=100&h=100&fit=crop' },
  { id: '3', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1597362925123-77861c2f6c6b?w=100&h=100&fit=crop' },
  { id: '4', name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop' },
  { id: '5', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop' },
];

const beveragesProducts = [
  { id: 'b1', name: 'Cothas Coffee 500gm', price: '₹459', image: 'https://img.jagranjosh.com/images/2025/11/28/article/image/tea-vs-coffee-1764328684973.webp' },
  { id: 'b2', name: 'VKR Pencil Rice', price: '₹70/kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIG2QK8pO5miZwDWSxQpgjcvkNlHpX6wllQ&s' },
  { id: 'b3', name: 'Maggi Mega Pack', price: '₹33% OFF', discount: '33% OFF', image: 'https://m.media-amazon.com/images/I/91P64N86ggL.jpg' },
];

const kitchenProducts = [
  { id: 'k1', name: 'VKR Ponni Rice', price: '₹70/kg', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIG2QK8pO5miZwDWSxQpgjcvkNlHpX6wllQ&s' },
  { id: 'k2', name: 'Mysore Sandal', price: '₹20% OFF', discount: '20% OFF', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsfxJuRtr2VXqj7t1a_w_NjTnMITUJQleMg&s' },
];

const noodlesProducts = [
  { id: 'n1', name: 'Maggi Mega Pack', price: '₹33% OFF', discount: '33% OFF', image: 'https://m.media-amazon.com/images/I/91P64N86ggL.jpg' },
];

const selfCareProducts = [
  { id: 's1', name: 'Mysore Sandal', price: '₹20% OFF', discount: '20% OFF', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDsfxJuRtr2VXqj7t1a_w_NjTnMITUJQleMg&s' },
  { id: 's2', name: 'Laundry Detergent', price: '₹179', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200' },
];

const electronicsProducts = [
  { id: 'e1', name: 'Charging Cables', price: '₹59', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200' },
];

const offers = [
  { id: '1', title: 'FLAT ₹50 OFF', description: 'On first order above ₹199', image: 'https://images.unsplash.com/photo-1607083206868-6c7a3c9752e9?w=300&h=150&fit=crop' },
  { id: '2', title: 'FREE delivery', description: 'On all your orders', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=150&fit=crop' },
];

const bestsellersList = [
  'Vegetables & Fruits', 'Chips & Namkeen', 'Oil, Ghee & Masala', 'Sweets & Chocolates',
  'Drinks & Juices', 'Bakery & Biscuits', 'Baby Care', 'Health & Pharma',
  'Sexuality & Wellness', 'Instant Food', 'Sausages & Spreads', 'Pain Corner', 'Ice Creams & More'
];

const groceryList = [
  'Vegetables & Fruits', 'Atta, Rice & Dal', 'Oils, Ghee & Masala', 'Dairy, Bread & Eggs',
  'Bakery & Biscuits', 'Dry Fruits & Cereals', 'Chicken, Meat & Fish', 'Kitchenware & Appliances'
];

const snacksList = [
  'Chips & Namkeen', 'Sweets & Chocolates', 'Drinks & Juices', 'Tea, Coffee & Milk Drinks',
  'Instant Food', 'Sausages & Spreads', 'Pain Corner', 'Ice Creams & More'
];

const beautyList = [
  'Bath & Body', 'Hair', 'Skin & Face', 'Beauty & Cosmetics',
  'Feminine Hygiene', 'Baby Care', 'Health & Pharma', 'Sexual Wellness'
];

// ---------- Component ----------
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOffer = ({ item }: any) => (
    <View style={styles.offerCard}>
      <ImageBackground source={{ uri: item.image }} style={styles.offerImage} imageStyle={styles.offerImageStyle}>
        <View style={styles.offerOverlay}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
        </View>
      </ImageBackground>
    </View>
  );

  const renderHorizontalList = (title: string, data: any[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const renderVerticalList = (title: string, data: string[]) => (
    <View style={styles.verticalSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item, index) => (
        <TouchableOpacity key={index} style={styles.listItem}>
          <Text style={styles.listItemText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFD700" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.minutes}>18 minutes</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileIcon}
          >
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png' }}
              style={styles.profileIconImage}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.location}>Pallavaram, Chennai, Tamil Nadu ▼</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149309.png' }} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Search "disposables"'
          placeholderTextColor="#666"
        />
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/709/709586.png' }} style={styles.micIcon} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>ALL DAY EVERYDAY</Text>
        </View>

        {/* Categories */}
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {renderHorizontalList('Tea, Coffee & Beverages', beveragesProducts)}
        {renderHorizontalList('Kitchen Essentials', kitchenProducts)}
        {renderHorizontalList('Noodles, Biscuits & more', noodlesProducts)}
        {renderHorizontalList('Self Care & Wellness', selfCareProducts)}
        {renderHorizontalList('Electronics & Home Needs', electronicsProducts)}

        {/* Offers */}
        <Text style={styles.sectionTitle}>OFFERS FOR YOU</Text>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offersList}
        />

        {renderVerticalList('Bestsellers', bestsellersList)}
        {renderVerticalList('Grocery & Kitchen', groceryList)}
        {renderVerticalList('Snacks & Drinks', snacksList)}
        {renderVerticalList('Beauty & Personal Care', beautyList)}

        <TouchableOpacity style={styles.householdBanner}>
          <Text style={styles.householdText}>Household Essentials</Text>
        </TouchableOpacity>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9E6' },
  header: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  minutes: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: { padding: 5 },
  profileIconImage: { width: 24, height: 24, resizeMode: 'contain' },
  location: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    opacity: 0.8,
  },
  searchContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  searchIcon: { width: 20, height: 20, marginRight: 10, tintColor: '#FFD700' },
  searchInput: { flex: 1, color: '#333', fontSize: 15, padding: 0 },
  micIcon: { width: 20, height: 20, marginLeft: 10, tintColor: '#FFD700' },
  banner: {
    backgroundColor: '#FFD54F',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bannerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginBottom: 10,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: width * 0.4,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 80,
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
  productName: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  productPrice: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
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
  offersList: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  offerCard: {
    width: width * 0.7,
    height: 120,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerImageStyle: {
    borderRadius: 15,
  },
  offerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,249,230,0.9)',
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
  verticalSection: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  listItemText: {
    fontSize: 14,
    color: '#333',
  },
  householdBanner: {
    backgroundColor: '#FFD700',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  householdText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    height: 30,
  },
});

export default HomeScreen;