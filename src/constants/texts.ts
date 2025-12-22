export const TEXTS = {
  header: {
    logo: '🛍️ Shop',
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
    },
    cart: '🛒 Cart',
  },
  home: {
    title: 'Welcome to Our Store',
    description: 'Discover amazing products at great prices. Browse our catalog and find exactly what you need.',
    homeButton: 'Browse Products',
  },
  about: {
    title: 'About Us',
    content: {
      intro: 'We are a modern e-commerce platform dedicated to bringing you the best products at competitive prices. Our mission is to make online shopping easy, fast, and enjoyable.',
      story: "Founded in 2024, we've grown to serve thousands of satisfied customers worldwide. We believe in quality, transparency, and excellent customer service.",
    },
    valuesTitle: 'Our Values',
    values: [
      'Customer satisfaction first',
      'Quality products',
      'Fast and reliable shipping',
      'Transparent pricing',
    ],
  },
  products: {
    title: 'Catalog',
    search: {
      placeholder: 'Search products...',
      button: 'Search',
      clearButton: 'Clear All',
    },
    category: {
      all: 'All Categories',
      label: 'Category:',
    },
    results: {
      searchLabel: 'Search:',
      found: (count: number) => `(${count} found)`,
    },
  },
  productCard: {
    addToCart: 'Add to Cart',
    details: 'Details',
    addedToCart: (title: string) => `${title} added to cart!`,
  },
  productDetail: {
    backLink: '← Back to Products',
    category: 'Category:',
  },
  cart: {
    title: 'Your Cart',
    empty: 'Your cart is empty',
    total: 'Total:',
    checkout: 'Checkout',
    remove: 'Remove',
  },
  notifications: {
    loadError: (message: string) => `Failed to load products: ${message}`,
  },
  loading: 'Loading...',
  error: 'Something went wrong',
} as const;
