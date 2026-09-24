import { Product } from '../types';
import { ProductFeedback } from '../services/feedbackService';

/**
 * Authentic DummyJSON Fashion Products & Verified Reviews
 * Directly fetched from DummyJSON official API across verified fashion categories:
 * - Men's Shirts
 * - Tops & Blouses
 * - Women's Dresses
 * - Men's Shoes
 * - Women's Shoes
 * - Men's & Women's Watches
 * - Women's Bags
 * - Sunglasses
 */
export const DUMMY_JSON_FASHION_PRODUCTS: Product[] = [
  {
    "id": "prod-dj-83",
    "product_id": "prod-dj-83",
    "name": "Blue & Black Check Shirt",
    "brand": "Fashion Trends",
    "category": "Tops",
    "subcategory": "Shirts",
    "articleType": "Blue & Black Check Shirt",
    "price": 2489,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.64,
    "reviewCount": 3,
    "stock": 38,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Fashion Trends",
      "stock": 38,
      "rating": 3.64,
      "sku": "MEN-FAS-BLU-083",
      "warranty": "3 year warranty"
    },
    "popularityScore": 0.73,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-84",
    "product_id": "prod-dj-84",
    "name": "Gigabyte Aorus Men Tshirt",
    "brand": "Gigabyte",
    "category": "Tops",
    "subcategory": "Shirts",
    "articleType": "Gigabyte Aorus Men Tshirt",
    "price": 2074,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.18,
    "reviewCount": 3,
    "stock": 90,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Gigabyte",
      "stock": 90,
      "rating": 3.18,
      "sku": "MEN-GIG-GIG-084",
      "warranty": "3 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-85",
    "product_id": "prod-dj-85",
    "name": "Man Plaid Shirt",
    "brand": "Classic Wear",
    "category": "Tops",
    "subcategory": "Shirts",
    "articleType": "Man Plaid Shirt",
    "price": 2904,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.46,
    "reviewCount": 3,
    "stock": 82,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Classic Wear",
      "stock": 82,
      "rating": 3.46,
      "sku": "MEN-CLA-PLA-085",
      "warranty": "1 week warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-86",
    "product_id": "prod-dj-86",
    "name": "Man Short Sleeve Shirt",
    "brand": "Casual Comfort",
    "category": "Tops",
    "subcategory": "Shirts",
    "articleType": "Man Short Sleeve Shirt",
    "price": 1659,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.9,
    "reviewCount": 3,
    "stock": 2,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Casual Comfort",
      "stock": 2,
      "rating": 2.9,
      "sku": "MEN-CAS-SHO-086",
      "warranty": "3 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-87",
    "product_id": "prod-dj-87",
    "name": "Men Check Shirt",
    "brand": "Urban Chic",
    "category": "Tops",
    "subcategory": "Shirts",
    "articleType": "Men Check Shirt",
    "price": 2323,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.72,
    "reviewCount": 3,
    "stock": 95,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Urban Chic",
      "stock": 95,
      "rating": 2.72,
      "sku": "MEN-URB-CHE-087",
      "warranty": "No warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-162",
    "product_id": "prod-dj-162",
    "name": "Blue Frock",
    "brand": "Atelier Studio",
    "category": "Tops",
    "subcategory": "Tops & Blouses",
    "articleType": "Blue Frock",
    "price": 2489,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Blue Frock is a charming and stylish dress for various occasions. With a vibrant blue color and a comfortable design, it adds a touch of elegance to your wardrobe.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.17,
    "reviewCount": 3,
    "stock": 52,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 52,
      "rating": 4.17,
      "sku": "TOP-BRD-BLU-162",
      "warranty": "Lifetime warranty"
    },
    "popularityScore": 0.83,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-163",
    "product_id": "prod-dj-163",
    "name": "Girl Summer Dress",
    "brand": "Atelier Studio",
    "category": "Tops",
    "subcategory": "Tops & Blouses",
    "articleType": "Girl Summer Dress",
    "price": 1659,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Girl Summer Dress is a cute and breezy dress designed for warm weather. With playful patterns and lightweight fabric, it's perfect for keeping cool and stylish during the summer.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.77,
    "reviewCount": 3,
    "stock": 43,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 43,
      "rating": 4.77,
      "sku": "TOP-BRD-GIR-163",
      "warranty": "Lifetime warranty"
    },
    "popularityScore": 0.95,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-164",
    "product_id": "prod-dj-164",
    "name": "Gray Dress",
    "brand": "Atelier Studio",
    "category": "Tops",
    "subcategory": "Tops & Blouses",
    "articleType": "Gray Dress",
    "price": 2904,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/tops/gray-dress/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Gray Dress is a versatile and chic option for various occasions. With a neutral gray color, it can be dressed up or down, making it a wardrobe staple for any fashion-forward individual.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.72,
    "reviewCount": 3,
    "stock": 55,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 55,
      "rating": 2.72,
      "sku": "TOP-BRD-GRA-164",
      "warranty": "1 month warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-165",
    "product_id": "prod-dj-165",
    "name": "Short Frock",
    "brand": "Atelier Studio",
    "category": "Tops",
    "subcategory": "Tops & Blouses",
    "articleType": "Short Frock",
    "price": 2074,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/tops/short-frock/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Short Frock is a playful and trendy dress with a shorter length. Ideal for casual outings or special occasions, it combines style and comfort for a fashionable look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.23,
    "reviewCount": 3,
    "stock": 22,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 22,
      "rating": 3.23,
      "sku": "TOP-BRD-SHO-165",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-166",
    "product_id": "prod-dj-166",
    "name": "Tartan Dress",
    "brand": "Atelier Studio",
    "category": "Tops",
    "subcategory": "Tops & Blouses",
    "articleType": "Tartan Dress",
    "price": 3319,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Tartan Dress features a classic tartan pattern, bringing a timeless and sophisticated touch to your wardrobe. Perfect for fall and winter, it adds a hint of traditional charm.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.05,
    "reviewCount": 3,
    "stock": 73,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 73,
      "rating": 4.05,
      "sku": "TOP-BRD-TAR-166",
      "warranty": "1 month warranty"
    },
    "popularityScore": 0.81,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-177",
    "product_id": "prod-dj-177",
    "name": "Black Women's Gown",
    "brand": "Atelier Studio",
    "category": "Dresses",
    "subcategory": "Dresses",
    "articleType": "Black Women's Gown",
    "price": 10789,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Black Women's Gown is an elegant and timeless evening gown. With a sleek black design, it's perfect for formal events and special occasions, exuding sophistication and style.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.64,
    "reviewCount": 3,
    "stock": 25,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 25,
      "rating": 3.64,
      "sku": "WOM-BRD-BLA-177",
      "warranty": "Lifetime warranty"
    },
    "popularityScore": 0.73,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-178",
    "product_id": "prod-dj-178",
    "name": "Corset Leather With Skirt",
    "brand": "Atelier Studio",
    "category": "Dresses",
    "subcategory": "Dresses",
    "articleType": "Corset Leather With Skirt",
    "price": 7469,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Corset Leather With Skirt is a bold and edgy ensemble that combines a stylish corset with a matching skirt. Ideal for fashion-forward individuals, it makes a statement at any event.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.05,
    "reviewCount": 3,
    "stock": 30,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 30,
      "rating": 3.05,
      "sku": "WOM-BRD-COR-178",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-179",
    "product_id": "prod-dj-179",
    "name": "Corset With Black Skirt",
    "brand": "Atelier Studio",
    "category": "Dresses",
    "subcategory": "Dresses",
    "articleType": "Corset With Black Skirt",
    "price": 6639,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Corset With Black Skirt is a chic and versatile outfit that pairs a fashionable corset with a classic black skirt. It offers a trendy and coordinated look for various occasions.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.52,
    "reviewCount": 3,
    "stock": 33,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 33,
      "rating": 4.52,
      "sku": "WOM-BRD-COR-179",
      "warranty": "1 month warranty"
    },
    "popularityScore": 0.9,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-180",
    "product_id": "prod-dj-180",
    "name": "Dress Pea",
    "brand": "Atelier Studio",
    "category": "Dresses",
    "subcategory": "Dresses",
    "articleType": "Dress Pea",
    "price": 4149,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Dress Pea is a stylish and comfortable dress with a pea pattern. Perfect for casual outings, it adds a playful and fun element to your wardrobe, making it a great choice for day-to-day wear.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.88,
    "reviewCount": 3,
    "stock": 6,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 6,
      "rating": 4.88,
      "sku": "WOM-BRD-DRE-180",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.98,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-181",
    "product_id": "prod-dj-181",
    "name": "Marni Red & Black Suit",
    "brand": "Atelier Studio",
    "category": "Dresses",
    "subcategory": "Dresses",
    "articleType": "Marni Red & Black Suit",
    "price": 14939,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "CLOTHING",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Marni Red & Black Suit is a sophisticated and fashion-forward suit ensemble. With a combination of red and black tones, it showcases a modern design for a bold and confident look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.48,
    "reviewCount": 3,
    "stock": 62,
    "availableSizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "attributes": {
      "brand": "Atelier Studio",
      "stock": 62,
      "rating": 4.48,
      "sku": "WOM-BRD-MAR-181",
      "warranty": "5 year warranty"
    },
    "popularityScore": 0.9,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-88",
    "product_id": "prod-dj-88",
    "name": "Nike Air Jordan 1 Red And Black",
    "brand": "Nike",
    "category": "Footwear",
    "subcategory": "Men Shoes",
    "articleType": "Nike Air Jordan 1 Red And Black",
    "price": 12449,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.77,
    "reviewCount": 3,
    "stock": 7,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Nike",
      "stock": 7,
      "rating": 4.77,
      "sku": "MEN-NIK-NIK-088",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.95,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-89",
    "product_id": "prod-dj-89",
    "name": "Nike Baseball Cleats",
    "brand": "Nike",
    "category": "Footwear",
    "subcategory": "Men Shoes",
    "articleType": "Nike Baseball Cleats",
    "price": 6639,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.88,
    "reviewCount": 3,
    "stock": 12,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Nike",
      "stock": 12,
      "rating": 3.88,
      "sku": "MEN-NIK-NIK-089",
      "warranty": "6 months warranty"
    },
    "popularityScore": 0.78,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-90",
    "product_id": "prod-dj-90",
    "name": "Puma Future Rider Trainers",
    "brand": "Puma",
    "category": "Footwear",
    "subcategory": "Men Shoes",
    "articleType": "Puma Future Rider Trainers",
    "price": 7469,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.9,
    "reviewCount": 3,
    "stock": 90,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Puma",
      "stock": 90,
      "rating": 4.9,
      "sku": "MEN-PUM-PUM-090",
      "warranty": "5 year warranty"
    },
    "popularityScore": 0.98,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-91",
    "product_id": "prod-dj-91",
    "name": "Sports Sneakers Off White & Red",
    "brand": "Off White",
    "category": "Footwear",
    "subcategory": "Men Shoes",
    "articleType": "Sports Sneakers Off White & Red",
    "price": 9959,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.77,
    "reviewCount": 3,
    "stock": 17,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Off White",
      "stock": 17,
      "rating": 4.77,
      "sku": "MEN-OFF-SPO-091",
      "warranty": "1 week warranty"
    },
    "popularityScore": 0.95,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-92",
    "product_id": "prod-dj-92",
    "name": "Sports Sneakers Off White Red",
    "brand": "Off White",
    "category": "Footwear",
    "subcategory": "Men Shoes",
    "articleType": "Sports Sneakers Off White Red",
    "price": 9129,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.69,
    "reviewCount": 3,
    "stock": 62,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Off White",
      "stock": 62,
      "rating": 4.69,
      "sku": "MEN-OFF-SPO-092",
      "warranty": "3 months warranty"
    },
    "popularityScore": 0.94,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-185",
    "product_id": "prod-dj-185",
    "name": "Black & Brown Slipper",
    "brand": "Comfort Trends",
    "category": "Footwear",
    "subcategory": "Women Shoes",
    "articleType": "Black & Brown Slipper",
    "price": 1659,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Black & Brown Slipper is a comfortable and stylish choice for casual wear. Featuring a blend of black and brown colors, it adds a touch of sophistication to your relaxation.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.53,
    "reviewCount": 3,
    "stock": 3,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Comfort Trends",
      "stock": 3,
      "rating": 2.53,
      "sku": "WOM-COM-BLA-185",
      "warranty": "Lifetime warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-186",
    "product_id": "prod-dj-186",
    "name": "Calvin Klein Heel Shoes",
    "brand": "Calvin Klein",
    "category": "Footwear",
    "subcategory": "Women Shoes",
    "articleType": "Calvin Klein Heel Shoes",
    "price": 6639,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "Calvin Klein Heel Shoes are elegant and sophisticated, designed for formal occasions. With a classic design and high-quality materials, they complement your stylish ensemble.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.92,
    "reviewCount": 3,
    "stock": 93,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Calvin Klein",
      "stock": 93,
      "rating": 4.92,
      "sku": "WOM-CAL-CAL-186",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.98,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-187",
    "product_id": "prod-dj-187",
    "name": "Golden Shoes Woman",
    "brand": "Fashion Diva",
    "category": "Footwear",
    "subcategory": "Women Shoes",
    "articleType": "Golden Shoes Woman",
    "price": 4149,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-shoes/golden-shoes-woman/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Golden Shoes for Women are a glamorous choice for special occasions. Featuring a golden hue and stylish design, they add a touch of luxury to your outfit.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.26,
    "reviewCount": 3,
    "stock": 88,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Fashion Diva",
      "stock": 88,
      "rating": 3.26,
      "sku": "WOM-FAS-GOL-187",
      "warranty": "6 months warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-188",
    "product_id": "prod-dj-188",
    "name": "Pampi Shoes",
    "brand": "Pampi",
    "category": "Footwear",
    "subcategory": "Women Shoes",
    "articleType": "Pampi Shoes",
    "price": 2489,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-shoes/pampi-shoes/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "Pampi Shoes offer a blend of comfort and style for everyday use. With a versatile design, they are suitable for various casual occasions, providing a trendy and relaxed look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.05,
    "reviewCount": 3,
    "stock": 49,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Pampi",
      "stock": 49,
      "rating": 3.05,
      "sku": "WOM-PAM-PAM-188",
      "warranty": "No warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-189",
    "product_id": "prod-dj-189",
    "name": "Red Shoes",
    "brand": "Fashion Express",
    "category": "Footwear",
    "subcategory": "Women Shoes",
    "articleType": "Red Shoes",
    "price": 2904,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-shoes/red-shoes/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FOOTWEAR",
    "season": "All-Season",
    "style": "Casual",
    "description": "The Red Shoes make a bold statement with their vibrant red color. Whether for a party or a casual outing, these shoes add a pop of color and style to your wardrobe.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.25,
    "reviewCount": 3,
    "stock": 7,
    "availableSizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "attributes": {
      "brand": "Fashion Express",
      "stock": 7,
      "rating": 3.25,
      "sku": "WOM-FAS-SHO-189",
      "warranty": "No warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.9,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-93",
    "product_id": "prod-dj-93",
    "name": "Brown Leather Belt Watch",
    "brand": "Fashion Timepieces",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Brown Leather Belt Watch",
    "price": 7469,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.19,
    "reviewCount": 3,
    "stock": 32,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Timepieces",
      "stock": 32,
      "rating": 4.19,
      "sku": "MEN-FAS-BRO-093",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.84,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-94",
    "product_id": "prod-dj-94",
    "name": "Longines Master Collection",
    "brand": "Longines",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Longines Master Collection",
    "price": 124499,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.87,
    "reviewCount": 3,
    "stock": 100,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Longines",
      "stock": 100,
      "rating": 3.87,
      "sku": "MEN-LON-LON-094",
      "warranty": "1 week warranty"
    },
    "popularityScore": 0.77,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-95",
    "product_id": "prod-dj-95",
    "name": "Rolex Cellini Date Black Dial",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Cellini Date Black Dial",
    "price": 746999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.97,
    "reviewCount": 3,
    "stock": 40,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 40,
      "rating": 4.97,
      "sku": "MEN-ROL-ROL-095",
      "warranty": "3 months warranty"
    },
    "popularityScore": 0.98,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-96",
    "product_id": "prod-dj-96",
    "name": "Rolex Cellini Moonphase",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Cellini Moonphase",
    "price": 1078999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.58,
    "reviewCount": 3,
    "stock": 36,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 36,
      "rating": 2.58,
      "sku": "MEN-ROL-ROL-096",
      "warranty": "6 months warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-97",
    "product_id": "prod-dj-97",
    "name": "Rolex Datejust",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Datejust",
    "price": 912999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.66,
    "reviewCount": 3,
    "stock": 86,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 86,
      "rating": 3.66,
      "sku": "MEN-ROL-ROL-097",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.73,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-98",
    "product_id": "prod-dj-98",
    "name": "Rolex Submariner Watch",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Submariner Watch",
    "price": 1161999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Men",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Tailored",
    "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.69,
    "reviewCount": 3,
    "stock": 55,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 55,
      "rating": 2.69,
      "sku": "MEN-ROL-ROL-098",
      "warranty": "5 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.9,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.85,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-190",
    "product_id": "prod-dj-190",
    "name": "IWC Ingenieur Automatic Steel",
    "brand": "IWC",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "IWC Ingenieur Automatic Steel",
    "price": 414999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The IWC Ingenieur Automatic Steel watch is a durable and sophisticated timepiece. With a stainless steel case and automatic movement, it combines precision and style for watch enthusiasts.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.93,
    "reviewCount": 3,
    "stock": 90,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "IWC",
      "stock": 90,
      "rating": 2.93,
      "sku": "WOM-IWC-ING-190",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-191",
    "product_id": "prod-dj-191",
    "name": "Rolex Cellini Moonphase",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Cellini Moonphase",
    "price": 1327999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Rolex Cellini Moonphase watch is a masterpiece of horology. Featuring a moon phase complication, it showcases the craftsmanship and elegance that Rolex is renowned for.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.83,
    "reviewCount": 3,
    "stock": 52,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 52,
      "rating": 3.83,
      "sku": "WOM-ROL-ROL-191",
      "warranty": "1 month warranty"
    },
    "popularityScore": 0.77,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-192",
    "product_id": "prod-dj-192",
    "name": "Rolex Datejust Women",
    "brand": "Rolex",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Rolex Datejust Women",
    "price": 912999,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-watches/rolex-datejust-women/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Rolex Datejust Women's watch is an iconic timepiece designed for women. With a timeless design and a date complication, it offers both elegance and functionality.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.86,
    "reviewCount": 3,
    "stock": 4,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Rolex",
      "stock": 4,
      "rating": 2.86,
      "sku": "WOM-ROL-ROL-192",
      "warranty": "5 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-193",
    "product_id": "prod-dj-193",
    "name": "Watch Gold for Women",
    "brand": "Fashion Gold",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Watch Gold for Women",
    "price": 66399,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Gold Women's Watch is a stunning accessory that combines luxury and style. Featuring a gold-plated case and a chic design, it adds a touch of glamour to any outfit.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.24,
    "reviewCount": 3,
    "stock": 0,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Gold",
      "stock": 0,
      "rating": 4.24,
      "sku": "WOM-FAS-WAT-193",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.85,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-194",
    "product_id": "prod-dj-194",
    "name": "Women's Wrist Watch",
    "brand": "Fashion Co.",
    "category": "Accessories",
    "subcategory": "Watches",
    "articleType": "Women's Wrist Watch",
    "price": 10789,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-watches/women's-wrist-watch/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "WATCHES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Women's Wrist Watch is a versatile and fashionable timepiece for everyday wear. With a comfortable strap and a simple yet elegant design, it complements various styles.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.52,
    "reviewCount": 3,
    "stock": 12,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Co.",
      "stock": 12,
      "rating": 3.52,
      "sku": "WOM-FAS-WOM-194",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-172",
    "product_id": "prod-dj-172",
    "name": "Blue Women's Handbag",
    "brand": "Fashionista",
    "category": "Accessories",
    "subcategory": "Bags",
    "articleType": "Blue Women's Handbag",
    "price": 4149,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FASHION ACCESSORIES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Blue Women's Handbag is a stylish and spacious accessory for everyday use. With a vibrant blue color and multiple compartments, it combines fashion and functionality.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.92,
    "reviewCount": 3,
    "stock": 76,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashionista",
      "stock": 76,
      "rating": 2.92,
      "sku": "WOM-FAS-BLU-172",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-173",
    "product_id": "prod-dj-173",
    "name": "Heshe Women's Leather Bag",
    "brand": "Heshe",
    "category": "Accessories",
    "subcategory": "Bags",
    "articleType": "Heshe Women's Leather Bag",
    "price": 10789,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FASHION ACCESSORIES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Heshe Women's Leather Bag is a luxurious and high-quality leather bag for the sophisticated woman. With a timeless design and durable craftsmanship, it's a versatile accessory.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.92,
    "reviewCount": 3,
    "stock": 99,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Heshe",
      "stock": 99,
      "rating": 4.92,
      "sku": "WOM-HES-HES-173",
      "warranty": "5 year warranty"
    },
    "popularityScore": 0.98,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-174",
    "product_id": "prod-dj-174",
    "name": "Prada Women Bag",
    "brand": "Prada",
    "category": "Accessories",
    "subcategory": "Bags",
    "articleType": "Prada Women Bag",
    "price": 49799,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FASHION ACCESSORIES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Prada Women Bag is an iconic designer bag that exudes elegance and luxury. Crafted with precision and featuring the Prada logo, it's a statement piece for fashion enthusiasts.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.71,
    "reviewCount": 3,
    "stock": 75,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Prada",
      "stock": 75,
      "rating": 2.71,
      "sku": "WOM-PRA-PRA-174",
      "warranty": "3 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-175",
    "product_id": "prod-dj-175",
    "name": "White Faux Leather Backpack",
    "brand": "Urban Chic",
    "category": "Accessories",
    "subcategory": "Bags",
    "articleType": "White Faux Leather Backpack",
    "price": 3319,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FASHION ACCESSORIES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The White Faux Leather Backpack is a trendy and practical backpack for the modern woman. With a sleek white design and ample storage space, it's perfect for both casual and on-the-go styles.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.36,
    "reviewCount": 3,
    "stock": 39,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Urban Chic",
      "stock": 39,
      "rating": 3.36,
      "sku": "WOM-URB-WHI-175",
      "warranty": "2 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-176",
    "product_id": "prod-dj-176",
    "name": "Women Handbag Black",
    "brand": "Elegance Collection",
    "category": "Accessories",
    "subcategory": "Bags",
    "articleType": "Women Handbag Black",
    "price": 4979,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Women",
    "color": "FASHION ACCESSORIES",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Women Handbag in Black is a classic and versatile accessory that complements various outfits. With a timeless black color and functional design, it's a must-have in every woman's wardrobe.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.89,
    "reviewCount": 3,
    "stock": 11,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Elegance Collection",
      "stock": 11,
      "rating": 2.89,
      "sku": "WOM-ELE-WOM-176",
      "warranty": "Lifetime warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-154",
    "product_id": "prod-dj-154",
    "name": "Black Sun Glasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "articleType": "Black Sun Glasses",
    "price": 2489,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Unisex",
    "color": "EYEWEAR",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Black Sun Glasses are a classic and stylish choice, featuring a sleek black frame and tinted lenses. They provide both UV protection and a fashionable look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.41,
    "reviewCount": 3,
    "stock": 60,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Shades",
      "stock": 60,
      "rating": 4.41,
      "sku": "SUN-FAS-BLA-154",
      "warranty": "No warranty"
    },
    "popularityScore": 0.88,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-155",
    "product_id": "prod-dj-155",
    "name": "Classic Sun Glasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "articleType": "Classic Sun Glasses",
    "price": 2074,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Unisex",
    "color": "EYEWEAR",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Classic Sun Glasses offer a timeless design with a neutral frame and UV-protected lenses. These sunglasses are versatile and suitable for various occasions.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.86,
    "reviewCount": 3,
    "stock": 1,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Shades",
      "stock": 1,
      "rating": 3.86,
      "sku": "SUN-FAS-CLA-155",
      "warranty": "6 months warranty"
    },
    "popularityScore": 0.77,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-156",
    "product_id": "prod-dj-156",
    "name": "Green and Black Glasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "articleType": "Green and Black Glasses",
    "price": 2904,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Unisex",
    "color": "EYEWEAR",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Green and Black Glasses feature a bold combination of green and black colors, adding a touch of vibrancy to your eyewear collection. They are both stylish and eye-catching.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 4.55,
    "reviewCount": 3,
    "stock": 24,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Shades",
      "stock": 24,
      "rating": 4.55,
      "sku": "SUN-FAS-GRE-156",
      "warranty": "1 year warranty"
    },
    "popularityScore": 0.91,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-157",
    "product_id": "prod-dj-157",
    "name": "Party Glasses",
    "brand": "Fashion Fun",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "articleType": "Party Glasses",
    "price": 1659,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/sunglasses/party-glasses/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Unisex",
    "color": "EYEWEAR",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Party Glasses are designed to add flair to your party outfit. With unique shapes or colorful frames, they're perfect for adding a playful touch to your look during celebrations.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 2.79,
    "reviewCount": 3,
    "stock": 86,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Fun",
      "stock": 86,
      "rating": 2.79,
      "sku": "SUN-FAS-PAR-157",
      "warranty": "3 months warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  },
  {
    "id": "prod-dj-158",
    "product_id": "prod-dj-158",
    "name": "Sunglasses",
    "brand": "Fashion Shades",
    "category": "Accessories",
    "subcategory": "Eyewear",
    "articleType": "Sunglasses",
    "price": 1908,
    "currency": "₹",
    "imageUrl": "https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/1.webp",
    "imageFallbackGradient": "linear-gradient(145deg, #18191d, #27272a)",
    "gender": "Unisex",
    "color": "EYEWEAR",
    "season": "All-Season",
    "style": "Minimalist",
    "description": "The Sunglasses offer a classic and simple design with a focus on functionality. These sunglasses provide essential UV protection while maintaining a timeless look.",
    "material": "Premium High-Density Fabric & Craftsmanship",
    "fit": "Standard Fit",
    "rating": 3.02,
    "reviewCount": 3,
    "stock": 27,
    "availableSizes": [
      "One Size"
    ],
    "attributes": {
      "brand": "Fashion Shades",
      "stock": 27,
      "rating": 3.02,
      "sku": "SUN-FAS-SUN-158",
      "warranty": "3 year warranty"
    },
    "popularityScore": 0.7,
    "featureVector": {
      "outerwear": 0.1,
      "tailoring": 0.2,
      "knitwear": 0.1,
      "minimalism": 0.8,
      "formal": 0.35,
      "casual": 0.2,
      "warmth": 0.5
    },
    "collaborativeScore": 0.85
  }
];

export const DUMMY_JSON_REVIEWS: Record<string, ProductFeedback[]> = {
  "prod-dj-83": [
    {
      "id": "fb-dj-83-0",
      "productId": "prod-dj-83",
      "rating": 1,
      "reviewText": "Waste of money!",
      "reviewerName": "Logan Lee",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-83-1",
      "productId": "prod-dj-83",
      "rating": 5,
      "reviewText": "Very satisfied!",
      "reviewerName": "Zachary Lee",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-83-2",
      "productId": "prod-dj-83",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Aurora Rodriguez",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-84": [
    {
      "id": "fb-dj-84-0",
      "productId": "prod-dj-84",
      "rating": 5,
      "reviewText": "Excellent quality!",
      "reviewerName": "Amelia Perez",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-84-1",
      "productId": "prod-dj-84",
      "rating": 5,
      "reviewText": "Awesome product!",
      "reviewerName": "Tyler Davis",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-84-2",
      "productId": "prod-dj-84",
      "rating": 1,
      "reviewText": "Disappointing product!",
      "reviewerName": "Harper King",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-85": [
    {
      "id": "fb-dj-85-0",
      "productId": "prod-dj-85",
      "rating": 3,
      "reviewText": "Disappointing product!",
      "reviewerName": "Aubrey Wagner",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-85-1",
      "productId": "prod-dj-85",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "Evan Reed",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-85-2",
      "productId": "prod-dj-85",
      "rating": 2,
      "reviewText": "Very disappointed!",
      "reviewerName": "Evelyn Gonzalez",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-86": [
    {
      "id": "fb-dj-86-0",
      "productId": "prod-dj-86",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Charlotte Lopez",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-86-1",
      "productId": "prod-dj-86",
      "rating": 2,
      "reviewText": "Poor quality!",
      "reviewerName": "Ellie Stewart",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-86-2",
      "productId": "prod-dj-86",
      "rating": 1,
      "reviewText": "Would not recommend!",
      "reviewerName": "Sadie Morales",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-87": [
    {
      "id": "fb-dj-87-0",
      "productId": "prod-dj-87",
      "rating": 3,
      "reviewText": "Would not recommend!",
      "reviewerName": "Mateo Nguyen",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-87-1",
      "productId": "prod-dj-87",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Lucas Allen",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-87-2",
      "productId": "prod-dj-87",
      "rating": 2,
      "reviewText": "Very unhappy with my purchase!",
      "reviewerName": "Henry Adams",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-162": [
    {
      "id": "fb-dj-162-0",
      "productId": "prod-dj-162",
      "rating": 4,
      "reviewText": "Great product!",
      "reviewerName": "Victoria McDonald",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-162-1",
      "productId": "prod-dj-162",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Benjamin Foster",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-162-2",
      "productId": "prod-dj-162",
      "rating": 4,
      "reviewText": "Would buy again!",
      "reviewerName": "Addison Ward",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-163": [
    {
      "id": "fb-dj-163-0",
      "productId": "prod-dj-163",
      "rating": 5,
      "reviewText": "Excellent quality!",
      "reviewerName": "Mason Pearson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-163-1",
      "productId": "prod-dj-163",
      "rating": 4,
      "reviewText": "Great product!",
      "reviewerName": "Aubrey Garcia",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-163-2",
      "productId": "prod-dj-163",
      "rating": 4,
      "reviewText": "Very satisfied!",
      "reviewerName": "Charlotte Davis",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-164": [
    {
      "id": "fb-dj-164-0",
      "productId": "prod-dj-164",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Brayden Fleming",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-164-1",
      "productId": "prod-dj-164",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "Michael Johnson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-164-2",
      "productId": "prod-dj-164",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Evelyn Sanchez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-165": [
    {
      "id": "fb-dj-165-0",
      "productId": "prod-dj-165",
      "rating": 3,
      "reviewText": "Disappointing product!",
      "reviewerName": "Gabriel Hayes",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-165-1",
      "productId": "prod-dj-165",
      "rating": 5,
      "reviewText": "Awesome product!",
      "reviewerName": "Samantha Howard",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-165-2",
      "productId": "prod-dj-165",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Luke Cooper",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-166": [
    {
      "id": "fb-dj-166-0",
      "productId": "prod-dj-166",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Mason Pearson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-166-1",
      "productId": "prod-dj-166",
      "rating": 3,
      "reviewText": "Not as described!",
      "reviewerName": "Luke Cooper",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-166-2",
      "productId": "prod-dj-166",
      "rating": 4,
      "reviewText": "Excellent quality!",
      "reviewerName": "William Lopez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-177": [
    {
      "id": "fb-dj-177-0",
      "productId": "prod-dj-177",
      "rating": 4,
      "reviewText": "Great value for money!",
      "reviewerName": "Ethan Fletcher",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-177-1",
      "productId": "prod-dj-177",
      "rating": 3,
      "reviewText": "Very dissatisfied!",
      "reviewerName": "Julian Newton",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-177-2",
      "productId": "prod-dj-177",
      "rating": 5,
      "reviewText": "Very satisfied!",
      "reviewerName": "Savannah Gomez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-178": [
    {
      "id": "fb-dj-178-0",
      "productId": "prod-dj-178",
      "rating": 5,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Natalie Price",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-178-1",
      "productId": "prod-dj-178",
      "rating": 4,
      "reviewText": "Highly recommended!",
      "reviewerName": "Sophia Jones",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-178-2",
      "productId": "prod-dj-178",
      "rating": 4,
      "reviewText": "Highly recommended!",
      "reviewerName": "Leo Rivera",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-179": [
    {
      "id": "fb-dj-179-0",
      "productId": "prod-dj-179",
      "rating": 5,
      "reviewText": "Very satisfied!",
      "reviewerName": "Lucas Allen",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-179-1",
      "productId": "prod-dj-179",
      "rating": 2,
      "reviewText": "Disappointing product!",
      "reviewerName": "Benjamin Wilson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-179-2",
      "productId": "prod-dj-179",
      "rating": 5,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Elena Long",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-180": [
    {
      "id": "fb-dj-180-0",
      "productId": "prod-dj-180",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Harper Turner",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-180-1",
      "productId": "prod-dj-180",
      "rating": 1,
      "reviewText": "Not worth the price!",
      "reviewerName": "Luna Russell",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-180-2",
      "productId": "prod-dj-180",
      "rating": 2,
      "reviewText": "Would not buy again!",
      "reviewerName": "Michael Johnson",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-181": [
    {
      "id": "fb-dj-181-0",
      "productId": "prod-dj-181",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Avery Perez",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-181-1",
      "productId": "prod-dj-181",
      "rating": 3,
      "reviewText": "Very disappointed!",
      "reviewerName": "Scarlett Wright",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-181-2",
      "productId": "prod-dj-181",
      "rating": 4,
      "reviewText": "Highly impressed!",
      "reviewerName": "Claire Foster",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-88": [
    {
      "id": "fb-dj-88-0",
      "productId": "prod-dj-88",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Elena Long",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-88-1",
      "productId": "prod-dj-88",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Addison Wright",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-88-2",
      "productId": "prod-dj-88",
      "rating": 1,
      "reviewText": "Waste of money!",
      "reviewerName": "Mason Wright",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-89": [
    {
      "id": "fb-dj-89-0",
      "productId": "prod-dj-89",
      "rating": 5,
      "reviewText": "Would buy again!",
      "reviewerName": "Aaron Cook",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-89-1",
      "productId": "prod-dj-89",
      "rating": 2,
      "reviewText": "Very disappointed!",
      "reviewerName": "Noah Lewis",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-89-2",
      "productId": "prod-dj-89",
      "rating": 3,
      "reviewText": "Would not recommend!",
      "reviewerName": "Michael Johnson",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-90": [
    {
      "id": "fb-dj-90-0",
      "productId": "prod-dj-90",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Jackson Morales",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-90-1",
      "productId": "prod-dj-90",
      "rating": 1,
      "reviewText": "Very disappointed!",
      "reviewerName": "Sophia Jones",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-90-2",
      "productId": "prod-dj-90",
      "rating": 5,
      "reviewText": "Very pleased!",
      "reviewerName": "Logan Torres",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-91": [
    {
      "id": "fb-dj-91-0",
      "productId": "prod-dj-91",
      "rating": 4,
      "reviewText": "Would buy again!",
      "reviewerName": "Sadie Morales",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-91-1",
      "productId": "prod-dj-91",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Julian Newton",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-91-2",
      "productId": "prod-dj-91",
      "rating": 5,
      "reviewText": "Awesome product!",
      "reviewerName": "Logan Lee",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-92": [
    {
      "id": "fb-dj-92-0",
      "productId": "prod-dj-92",
      "rating": 4,
      "reviewText": "Excellent quality!",
      "reviewerName": "Aurora Lawson",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-92-1",
      "productId": "prod-dj-92",
      "rating": 5,
      "reviewText": "Great value for money!",
      "reviewerName": "Gabriel Mitchell",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-92-2",
      "productId": "prod-dj-92",
      "rating": 1,
      "reviewText": "Not worth the price!",
      "reviewerName": "Eli Bennett",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-185": [
    {
      "id": "fb-dj-185-0",
      "productId": "prod-dj-185",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Isaac Lawrence",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-185-1",
      "productId": "prod-dj-185",
      "rating": 2,
      "reviewText": "Not worth the price!",
      "reviewerName": "William Gonzalez",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-185-2",
      "productId": "prod-dj-185",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Sophia Jones",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-186": [
    {
      "id": "fb-dj-186-0",
      "productId": "prod-dj-186",
      "rating": 5,
      "reviewText": "Great value for money!",
      "reviewerName": "Maya Reed",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-186-1",
      "productId": "prod-dj-186",
      "rating": 5,
      "reviewText": "Great value for money!",
      "reviewerName": "Grace Perry",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-186-2",
      "productId": "prod-dj-186",
      "rating": 1,
      "reviewText": "Not as described!",
      "reviewerName": "Eleanor Collins",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-187": [
    {
      "id": "fb-dj-187-0",
      "productId": "prod-dj-187",
      "rating": 4,
      "reviewText": "Excellent quality!",
      "reviewerName": "Nolan Gonzalez",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-187-1",
      "productId": "prod-dj-187",
      "rating": 5,
      "reviewText": "Very pleased!",
      "reviewerName": "Brayden Fleming",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-187-2",
      "productId": "prod-dj-187",
      "rating": 4,
      "reviewText": "Very pleased!",
      "reviewerName": "Eleanor Tyler",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-188": [
    {
      "id": "fb-dj-188-0",
      "productId": "prod-dj-188",
      "rating": 4,
      "reviewText": "Highly recommended!",
      "reviewerName": "Nathan Reed",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-188-1",
      "productId": "prod-dj-188",
      "rating": 4,
      "reviewText": "Would buy again!",
      "reviewerName": "Connor Baker",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-188-2",
      "productId": "prod-dj-188",
      "rating": 5,
      "reviewText": "Awesome product!",
      "reviewerName": "Noah Lewis",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-189": [
    {
      "id": "fb-dj-189-0",
      "productId": "prod-dj-189",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Isabella Anderson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-189-1",
      "productId": "prod-dj-189",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "Luna Perez",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-189-2",
      "productId": "prod-dj-189",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Savannah Gomez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-93": [
    {
      "id": "fb-dj-93-0",
      "productId": "prod-dj-93",
      "rating": 1,
      "reviewText": "Very unhappy with my purchase!",
      "reviewerName": "James Garcia",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-93-1",
      "productId": "prod-dj-93",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Avery Barnes",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-93-2",
      "productId": "prod-dj-93",
      "rating": 4,
      "reviewText": "Would buy again!",
      "reviewerName": "David Martinez",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-94": [
    {
      "id": "fb-dj-94-0",
      "productId": "prod-dj-94",
      "rating": 4,
      "reviewText": "Highly impressed!",
      "reviewerName": "Eli Ward",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-94-1",
      "productId": "prod-dj-94",
      "rating": 3,
      "reviewText": "Very disappointed!",
      "reviewerName": "Owen Fisher",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-94-2",
      "productId": "prod-dj-94",
      "rating": 5,
      "reviewText": "Great product!",
      "reviewerName": "Nathan Reed",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-95": [
    {
      "id": "fb-dj-95-0",
      "productId": "prod-dj-95",
      "rating": 3,
      "reviewText": "Not worth the price!",
      "reviewerName": "Owen Sullivan",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-95-1",
      "productId": "prod-dj-95",
      "rating": 4,
      "reviewText": "Very satisfied!",
      "reviewerName": "Jonathan Pierce",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-95-2",
      "productId": "prod-dj-95",
      "rating": 1,
      "reviewText": "Would not buy again!",
      "reviewerName": "Adrian Flores",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-96": [
    {
      "id": "fb-dj-96-0",
      "productId": "prod-dj-96",
      "rating": 3,
      "reviewText": "Poor quality!",
      "reviewerName": "Ella Adams",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-96-1",
      "productId": "prod-dj-96",
      "rating": 5,
      "reviewText": "Very satisfied!",
      "reviewerName": "Leo Rivera",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-96-2",
      "productId": "prod-dj-96",
      "rating": 4,
      "reviewText": "Very pleased!",
      "reviewerName": "Emma Miller",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-97": [
    {
      "id": "fb-dj-97-0",
      "productId": "prod-dj-97",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Alice Smith",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-97-1",
      "productId": "prod-dj-97",
      "rating": 4,
      "reviewText": "Very pleased!",
      "reviewerName": "Abigail Rivera",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-97-2",
      "productId": "prod-dj-97",
      "rating": 3,
      "reviewText": "Waste of money!",
      "reviewerName": "Daniel Cook",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-98": [
    {
      "id": "fb-dj-98-0",
      "productId": "prod-dj-98",
      "rating": 4,
      "reviewText": "Great value for money!",
      "reviewerName": "Luna Perez",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-98-1",
      "productId": "prod-dj-98",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Hannah Robinson",
      "timestamp": 1746006062053
    },
    {
      "id": "fb-dj-98-2",
      "productId": "prod-dj-98",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Aaliyah Hanson",
      "timestamp": 1746006062053
    }
  ],
  "prod-dj-190": [
    {
      "id": "fb-dj-190-0",
      "productId": "prod-dj-190",
      "rating": 3,
      "reviewText": "Disappointing product!",
      "reviewerName": "Gabriel Adams",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-190-1",
      "productId": "prod-dj-190",
      "rating": 5,
      "reviewText": "Great value for money!",
      "reviewerName": "Evan Reed",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-190-2",
      "productId": "prod-dj-190",
      "rating": 3,
      "reviewText": "Would not buy again!",
      "reviewerName": "Clara Berry",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-191": [
    {
      "id": "fb-dj-191-0",
      "productId": "prod-dj-191",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Gabriel Hayes",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-191-1",
      "productId": "prod-dj-191",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Logan Torres",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-191-2",
      "productId": "prod-dj-191",
      "rating": 1,
      "reviewText": "Disappointing product!",
      "reviewerName": "Isabella Jackson",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-192": [
    {
      "id": "fb-dj-192-0",
      "productId": "prod-dj-192",
      "rating": 3,
      "reviewText": "Not as described!",
      "reviewerName": "Benjamin Wilson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-192-1",
      "productId": "prod-dj-192",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Madison Collins",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-192-2",
      "productId": "prod-dj-192",
      "rating": 4,
      "reviewText": "Very satisfied!",
      "reviewerName": "Lucas Gray",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-193": [
    {
      "id": "fb-dj-193-0",
      "productId": "prod-dj-193",
      "rating": 4,
      "reviewText": "Highly impressed!",
      "reviewerName": "Elena Baker",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-193-1",
      "productId": "prod-dj-193",
      "rating": 4,
      "reviewText": "Would buy again!",
      "reviewerName": "Avery Barnes",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-193-2",
      "productId": "prod-dj-193",
      "rating": 5,
      "reviewText": "Great product!",
      "reviewerName": "Evelyn Sanchez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-194": [
    {
      "id": "fb-dj-194-0",
      "productId": "prod-dj-194",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Harper Kelly",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-194-1",
      "productId": "prod-dj-194",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Gabriel Bailey",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-194-2",
      "productId": "prod-dj-194",
      "rating": 5,
      "reviewText": "Fast shipping!",
      "reviewerName": "Natalie Price",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-172": [
    {
      "id": "fb-dj-172-0",
      "productId": "prod-dj-172",
      "rating": 3,
      "reviewText": "Waste of money!",
      "reviewerName": "Grace Perry",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-172-1",
      "productId": "prod-dj-172",
      "rating": 3,
      "reviewText": "Not worth the price!",
      "reviewerName": "Evelyn Sanchez",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-172-2",
      "productId": "prod-dj-172",
      "rating": 4,
      "reviewText": "Highly impressed!",
      "reviewerName": "Eli Ward",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-173": [
    {
      "id": "fb-dj-173-0",
      "productId": "prod-dj-173",
      "rating": 5,
      "reviewText": "Excellent quality!",
      "reviewerName": "Hunter Gordon",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-173-1",
      "productId": "prod-dj-173",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "Mason Parker",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-173-2",
      "productId": "prod-dj-173",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "William Gonzalez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-174": [
    {
      "id": "fb-dj-174-0",
      "productId": "prod-dj-174",
      "rating": 2,
      "reviewText": "Would not buy again!",
      "reviewerName": "Caleb Perkins",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-174-1",
      "productId": "prod-dj-174",
      "rating": 4,
      "reviewText": "Great value for money!",
      "reviewerName": "Carter Baker",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-174-2",
      "productId": "prod-dj-174",
      "rating": 5,
      "reviewText": "Highly recommended!",
      "reviewerName": "Lucas Ramirez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-175": [
    {
      "id": "fb-dj-175-0",
      "productId": "prod-dj-175",
      "rating": 4,
      "reviewText": "Awesome product!",
      "reviewerName": "Ava Harrison",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-175-1",
      "productId": "prod-dj-175",
      "rating": 1,
      "reviewText": "Not as described!",
      "reviewerName": "Liam Garcia",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-175-2",
      "productId": "prod-dj-175",
      "rating": 5,
      "reviewText": "Great value for money!",
      "reviewerName": "Cameron Perez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-176": [
    {
      "id": "fb-dj-176-0",
      "productId": "prod-dj-176",
      "rating": 4,
      "reviewText": "Very pleased!",
      "reviewerName": "Natalie Price",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-176-1",
      "productId": "prod-dj-176",
      "rating": 5,
      "reviewText": "Great product!",
      "reviewerName": "Emily Johnson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-176-2",
      "productId": "prod-dj-176",
      "rating": 1,
      "reviewText": "Waste of money!",
      "reviewerName": "Henry Hill",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-154": [
    {
      "id": "fb-dj-154-0",
      "productId": "prod-dj-154",
      "rating": 3,
      "reviewText": "Would not recommend!",
      "reviewerName": "Jonathan Pierce",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-154-1",
      "productId": "prod-dj-154",
      "rating": 2,
      "reviewText": "Disappointing product!",
      "reviewerName": "Owen Fisher",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-154-2",
      "productId": "prod-dj-154",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Samantha Martinez",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-155": [
    {
      "id": "fb-dj-155-0",
      "productId": "prod-dj-155",
      "rating": 5,
      "reviewText": "Very satisfied!",
      "reviewerName": "Logan Lee",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-155-1",
      "productId": "prod-dj-155",
      "rating": 3,
      "reviewText": "Very dissatisfied!",
      "reviewerName": "Jack Ward",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-155-2",
      "productId": "prod-dj-155",
      "rating": 4,
      "reviewText": "Very happy with my purchase!",
      "reviewerName": "Julian James",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-156": [
    {
      "id": "fb-dj-156-0",
      "productId": "prod-dj-156",
      "rating": 3,
      "reviewText": "Waste of money!",
      "reviewerName": "Ava Taylor",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-156-1",
      "productId": "prod-dj-156",
      "rating": 3,
      "reviewText": "Disappointing product!",
      "reviewerName": "Owen Sullivan",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-156-2",
      "productId": "prod-dj-156",
      "rating": 5,
      "reviewText": "Highly impressed!",
      "reviewerName": "Victoria McDonald",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-157": [
    {
      "id": "fb-dj-157-0",
      "productId": "prod-dj-157",
      "rating": 5,
      "reviewText": "Very pleased!",
      "reviewerName": "Levi Hicks",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-157-1",
      "productId": "prod-dj-157",
      "rating": 5,
      "reviewText": "Excellent quality!",
      "reviewerName": "Ariana Ross",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-157-2",
      "productId": "prod-dj-157",
      "rating": 4,
      "reviewText": "Great product!",
      "reviewerName": "Samantha Howard",
      "timestamp": 1746006062054
    }
  ],
  "prod-dj-158": [
    {
      "id": "fb-dj-158-0",
      "productId": "prod-dj-158",
      "rating": 5,
      "reviewText": "Would buy again!",
      "reviewerName": "Olivia Wilson",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-158-1",
      "productId": "prod-dj-158",
      "rating": 2,
      "reviewText": "Not worth the price!",
      "reviewerName": "Lillian Bishop",
      "timestamp": 1746006062054
    },
    {
      "id": "fb-dj-158-2",
      "productId": "prod-dj-158",
      "rating": 4,
      "reviewText": "Fast shipping!",
      "reviewerName": "Leah Henderson",
      "timestamp": 1746006062054
    }
  ]
};
