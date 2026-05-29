import { WaterProduct, FAQItem, Testimonial } from './types';

export const products: WaterProduct[] = [
  {
    id: 'purified',
    name: 'Standard Purified Water',
    description: 'Undergoes a thorough 16-stage purification process, including reverse osmosis and carbon filtering. Totally free of contaminants, crisp and lightweight.',
    price: 35, // Let's use currency-independent numbers and display PHP or USD. We can use native PHP Pesos (₱35 per 5-gallon) as standard local water refill rates, and provide an option to toggle between Pesos (₱) and Dollars ($).
    category: 'purified',
    features: ['16-Stage Reverse Osmosis', 'Zero Mineral Density', 'Ultra-soft taste profile', 'Safe for all age groups'],
    unit: '5-Gallon Bottle Refill',
    minOrder: 3
  },
  {
    id: 'mineral',
    name: 'Mineral-Enriched Water',
    description: 'Purified water enriched with healthy, trace amounts of essential minerals like Calcium, Potassium, and Magnesium to replenish your body naturally.',
    price: 45,
    category: 'mineral',
    features: ['Restored Essential Minerals', 'Smooth, rounded taste', 'Electrolyte balancing qualities', 'Ideal for daily hydration'],
    unit: '5-Gallon Bottle Refill',
    minOrder: 2
  },
  {
    id: 'alkaline',
    name: 'Premium Alkaline Water',
    description: 'Ionized pH 9.0+ water featuring powerful antioxidant properties. Helps neutralize acidity, detoxifies, and boosts daily cellular hydration.',
    price: 55,
    category: 'alkaline',
    features: ['pH Level 9.0 - 9.5', 'Active Antioxidants', 'Enhanced cellular absorption', 'Promotes body alkalinity'],
    unit: '5-Gallon Bottle Refill',
    minOrder: 2
  },
  {
    id: 'bottled-box',
    name: 'Pocket Purified Bottles (Case)',
    description: 'Convenient case of individual pocket-sized purified water bottles, perfect for events, guests, office coolers, or vehicle storage.',
    price: 180,
    category: 'bottled',
    features: ['24 x 500ml bottles per case', 'Sealed-tight leakproof caps', '100% Recycled plastic material', 'Ready-to-serve chilling cases'],
    unit: 'Case of 24 Bottles',
    minOrder: 1
  }
];

export const faqItems: FAQItem[] = [
  {
    question: 'How does the bottle delivery process work?',
    answer: 'Simply place your order using our online calculator. We will deliver fresh bottles directly to your doorstep. If you have empty 5-gallon bottles from RLM or other stations, we will swap them. If you do not have empty bottles, there is an initial container deposit fee.',
    category: 'delivery'
  },
  {
    question: 'What is the container swap / deposit policy?',
    answer: 'We accept straight swaps for standard slim or round 5-gallon bottles in clean condition. If you do not have a spare bottle, we charge a one-time refundable deposit of ₱200 ($4.00) per blue container, which is fully returned if you close your subscription.',
    category: 'delivery'
  },
  {
    question: 'How often should I clean my water dispenser?',
    answer: 'For safety, we highly recommend sanitizing your water dispenser, ceramic crock, or manual pump once every 4 to 6 weeks. Always perform this check using mild dish soap, diluted vinegar, or dispenser sanitizing kits.',
    category: 'quality'
  },
  {
    question: 'What makes your purification system superior?',
    answer: 'At RLM, we pass our physical source supply through dual sand, carbon, and sediment filters, followed by premium Reverse Osmosis (RO) membranes, mineral restorage channels, pH balancing ionizers, and continuous ultraviolet (UV) sanitizing stages.',
    category: 'quality'
  },
  {
    question: 'Do you offer a subscription discount for regular delivery?',
    answer: 'Yes! When choosing our recurring weekly, bi-weekly, or monthly automated schedules, you save an instant 10% on every single refill. You can modify, pause, or cancel deliveries with zero penalty.',
    category: 'general'
  }
];

export const testimonials: Testimonial[] = [
  {
    name: 'Maria Santos',
    role: 'Homeowner & Mother of 3',
    content: 'We swapped to RLM Alkaline Water two months ago and we have never looked back. The customer service team is incredibly responsive, always early with delivery, of absolute peace of mind for my young kids!',
    rating: 5,
    avatarSeed: 'maria'
  },
  {
    name: 'Dr. David Cruz',
    role: 'Local Athletic General Practitioner',
    content: 'Proper hydration is vital, especially with balanced electrolytes. I highly suggest the RLM Mineral-Enriched variant to my patients for active daily recovery. Cleanest water station standards in the area, hands down.',
    rating: 5,
    avatarSeed: 'david'
  },
  {
    name: 'Cafe Sol & Brew',
    role: 'Commercial Partnership Cafe Owner',
    content: 'Espresso beverages are 98% water. RLM Purified Water is our secret to extraction consistency. Zero mineral scale build-up in our expensive Italian espresso machines, and impeccable regular deliveries.',
    rating: 5,
    avatarSeed: 'cafesol'
  }
];

export const stationInfo = {
  name: 'RLM Water Station',
  phone: '+63 912 345 6789', // realistic business contact
  email: 'deliveries@rlmwater.com',
  address: '142 Aqua Breeze Boulevard, Metro Manila, Philippines',
  workingHours: {
    weekdays: '7:00 AM - 7:00 PM',
    saturday: '8:00 AM - 5:00 PM',
    sunday: 'Closed (Pre-booked events only)'
  },
  baseInquiryText: 'Hi RLM Water Station! I would like to inquire about a fresh water order and delivery schedule.',
  googleMapUrl: 'https://maps.google.com'
};
