export interface WaterProduct {
  id: string;
  name: string;
  description: string;
  price: number; // base price in current currency unit
  category: 'purified' | 'alkaline' | 'mineral' | 'bottled';
  features: string[];
  unit: string;
  minOrder: number;
}

export interface BookingState {
  fullName: string;
  phone: string;
  address: string;
  deliveryDate: string;
  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly';
  notes: string;
  selectedProducts: { [productId: string]: number };
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'delivery' | 'quality';
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarSeed: string;
}
