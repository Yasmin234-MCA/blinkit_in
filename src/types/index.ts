export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  weight?: string;
  image: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: 'Delivered' | 'In Transit' | 'Cancelled' | 'Processing';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
}