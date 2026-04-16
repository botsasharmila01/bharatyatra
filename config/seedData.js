
const Place = require("../models/Place");

const seedPlaces = [
  // ===== HYDERABAD =====
  {
    name: "Charminar",
    category: "tourist",
    description: "Iconic 16th century monument and mosque, symbol of Hyderabad with stunning architecture.",
    city: "Hyderabad", state: "Telangana", country: "India",
    address: "Charminar Rd, Char Kaman, Ghansi Bazaar, Hyderabad",
    phone: "+91-40-24524053",
    timings: "9:30 AM - 5:30 PM (Closed Friday)",
    price: 25, priceRange: "₹25 entry",
    rating: 4.5, totalReviews: 12450,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/960px-Charminar_Hyderabad_1.jpg"
    ],
    latitude: 17.3616, longitude: 78.4747,
    isPreBookable: false, featured: true,
    tags: ["heritage", "mosque", "monument"],
    reviews: [
      { user: "Ravi Kumar", comment: "Magnificent structure! Best visited in evening light.", rating: 5 },
      { user: "Priya Sharma", comment: "Historic and beautiful. The bazaar around is lively.", rating: 4 }
    ]
  },
  {
    name: "Golconda Fort",
    category: "tourist",
    description: "Majestic medieval fort with impressive sound and light show in evenings.",
    city: "Hyderabad", state: "Telangana", country: "India",
    address: "Ibrahim Bagh, Hyderabad",
    phone: "+91-40-23510271",
    timings: "8:00 AM - 5:30 PM | Light Show: 7:00 PM",
    price: 15, priceRange: "₹15 - ₹100",
    rating: 4.4, totalReviews: 9800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/500px-Golconda_Fort_005.jpg"
    ],
    latitude: 17.3833, longitude: 78.4011,
    isPreBookable: true, featured: true,
    tags: ["fort", "history", "lightshow"],
    amenities: ["Parking", "Guide Available", "Water"]
  },

  // ===== MUMBAI =====
  {
    name: "Gateway of India",
    category: "tourist",
    description: "Iconic arch monument overlooking the Arabian Sea, built during British colonial era.",
    city: "Mumbai", state: "Maharashtra", country: "India",
    address: "Apollo Bandar, Colaba, Mumbai",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 28000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/960px-Mumbai_03-2016_30_Gateway_of_India.jpg"
    ],
    latitude: 18.9220, longitude: 72.8347,
    isPreBookable: false, featured: true,
    tags: ["heritage", "landmark", "waterfront"]
  },
  {
    name: "Elephanta Caves",
    category: "tourist",
    description: "UNESCO World Heritage cave temples dedicated to Lord Shiva on Elephanta Island.",
    city: "Mumbai", state: "Maharashtra", country: "India",
    address: "Elephanta Island, Mumbai Harbour",
    timings: "9:30 AM - 5:30 PM (Closed Monday)",
    price: 40, priceRange: "₹40 - ₹600",
    rating: 4.3, totalReviews: 14500,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Elephanta_Caves_Panorama.jpg/500px-Elephanta_Caves_Panorama.jpg"
    ],
    latitude: 18.9633, longitude: 72.9315,
    isPreBookable: false, featured: true,
    tags: ["UNESCO", "caves", "heritage", "island"]
  },

  // ===== DELHI =====
  {
    name: "Red Fort",
    category: "tourist",
    description: "UNESCO World Heritage Site, magnificent Mughal fort built by Shah Jahan.",
    city: "Delhi", state: "Delhi", country: "India",
    address: "Netaji Subhash Marg, Chandni Chowk, New Delhi",
    timings: "9:30 AM - 4:30 PM (Closed Monday)",
    price: 35, priceRange: "₹35 - ₹500",
    rating: 4.5, totalReviews: 22000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/960px-Delhi_fort.jpg"
    ],
    latitude: 28.6562, longitude: 77.2410,
    isPreBookable: false, featured: true,
    tags: ["heritage", "mughal", "UNESCO"]
  },
  {
    name: "Qutub Minar",
    category: "tourist",
    description: "UNESCO Heritage minaret from 12th century, tallest brick minaret in the world.",
    city: "Delhi", state: "Delhi", country: "India",
    address: "Mehrauli, New Delhi",
    timings: "7:00 AM - 5:00 PM",
    price: 35, priceRange: "₹35 - ₹550",
    rating: 4.5, totalReviews: 19000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/960px-Qutb_Minar_2022.jpg"
    ],
    latitude: 28.5245, longitude: 77.1855,
    isPreBookable: false, featured: true,
    tags: ["UNESCO", "heritage", "minaret"]
  },

  // ===== BENGALURU =====
  {
    name: "Lalbagh Botanical Garden",
    category: "park",
    description: "Historic botanical garden with rare plants and an iconic glasshouse.",
    city: "Bengaluru", state: "Karnataka", country: "India",
    address: "Mavalli, Bengaluru",
    timings: "6:00 AM - 7:00 PM",
    price: 20, priceRange: "₹20 per person",
    rating: 4.5, totalReviews: 11200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg/500px-Glasshouse_and_fountain_at_lalbagh.jpg"
    ],
    latitude: 12.9507, longitude: 77.5848,
    isPreBookable: false, featured: true,
    tags: ["garden", "nature", "botanical"]
  },
  {
    name: "Bangalore Palace",
    category: "tourist",
    description: "Royal palace inspired by Windsor Castle with Tudor-style architecture.",
    city: "Bengaluru", state: "Karnataka", country: "India",
    address: "Vasanth Nagar, Bengaluru",
    timings: "10:00 AM - 5:30 PM",
    price: 230, priceRange: "₹230 - ₹460",
    rating: 4.1, totalReviews: 7800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bangalore_Mysore_Maharaja_Palace.jpg/960px-Bangalore_Mysore_Maharaja_Palace.jpg"
    ],
    latitude: 12.9987, longitude: 77.5929,
    isPreBookable: false, featured: true,
    tags: ["palace", "heritage", "royal"]
  },

  // ===== CHENNAI =====
  {
    name: "Marina Beach",
    category: "tourist",
    description: "One of the longest urban beaches in the world.",
    city: "Chennai", state: "Tamil Nadu", country: "India",
    address: "Marina Beach Rd, Chennai",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free Entry",
    rating: 4.3, totalReviews: 24500,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chennai_-_bird%27s-eye_view.jpg/960px-Chennai_-_bird%27s-eye_view.jpg"
    ],
    latitude: 13.0500, longitude: 80.2824,
    isPreBookable: false, featured: true,
    tags: ["beach", "sunrise", "promenade"]
  },
  {
    name: "Kapaleeshwarar Temple",
    category: "temple",
    description: "Ancient Dravidian-style Shiva temple with a colorful gopuram.",
    city: "Chennai", state: "Tamil Nadu", country: "India",
    address: "Mylapore, Chennai",
    timings: "5:30 AM - 12:00 PM | 4:00 PM - 9:30 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.5, totalReviews: 9200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Kapaleeswarar1.jpg/500px-Kapaleeswarar1.jpg"
    ],
    latitude: 13.0338, longitude: 80.2686,
    isPreBookable: false, featured: true,
    tags: ["temple", "Dravidian", "Shiva", "heritage"]
  },

  // ===== KOLKATA =====
  {
    name: "Victoria Memorial",
    category: "tourist",
    description: "Majestic white marble memorial and museum surrounded by gardens.",
    city: "Kolkata", state: "West Bengal", country: "India",
    address: "1 Queens Way, Maidan, Kolkata",
    timings: "10:00 AM - 6:00 PM (Closed Monday)",
    price: 30, priceRange: "₹30 - ₹500",
    rating: 4.6, totalReviews: 18700,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/960px-Victoria_Memorial_situated_in_Kolkata.jpg"
    ],
    latitude: 22.5448, longitude: 88.3426,
    isPreBookable: false, featured: true,
    tags: ["heritage", "museum", "garden"]
  },
  {
    name: "Howrah Bridge",
    category: "tourist",
    description: "Iconic cantilever bridge over the Hooghly River.",
    city: "Kolkata", state: "West Bengal", country: "India",
    address: "Howrah Bridge, Kolkata",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.4, totalReviews: 15200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Howrah_bridge_at_night.jpg/960px-Howrah_bridge_at_night.jpg"
    ],
    latitude: 22.5851, longitude: 88.3468,
    isPreBookable: false, featured: true,
    tags: ["bridge", "landmark", "heritage"]
  },

  // ===== JAIPUR =====
  {
    name: "Amber Fort",
    category: "tourist",
    description: "Magnificent Rajput fort overlooking Maota Lake.",
    city: "Jaipur", state: "Rajasthan", country: "India",
    address: "Devisinghpura, Amer, Jaipur",
    timings: "8:00 AM - 5:30 PM",
    price: 100, priceRange: "₹100 - ₹500",
    rating: 4.7, totalReviews: 16800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/500px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg"
    ],
    latitude: 26.9855, longitude: 75.8513,
    isPreBookable: true, featured: true,
    tags: ["fort", "Rajput", "UNESCO", "palace"]
  },
  {
    name: "Hawa Mahal",
    category: "tourist",
    description: "Palace of Winds with iconic pink sandstone facade.",
    city: "Jaipur", state: "Rajasthan", country: "India",
    address: "Hawa Mahal Rd, Badi Chaupad, Jaipur",
    timings: "9:00 AM - 5:00 PM",
    price: 50, priceRange: "₹50 - ₹200",
    rating: 4.4, totalReviews: 12300,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg"
    ],
    latitude: 26.9239, longitude: 75.8267,
    isPreBookable: false, featured: true,
    tags: ["palace", "pink city", "landmark"]
  },

  // ===== AGRA =====
  {
    name: "Taj Mahal",
    category: "tourist",
    description: "UNESCO World Heritage mausoleum and one of the Seven Wonders of the World.",
    city: "Agra", state: "Uttar Pradesh", country: "India",
    address: "Dharmapuri, Tajganj, Agra",
    timings: "6:00 AM - 7:00 PM (Closed Friday)",
    price: 50, priceRange: "₹50 - ₹1,100",
    rating: 4.9, totalReviews: 52000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/500px-Taj_Mahal_%28Edited%29.jpeg"
    ],
    latitude: 27.1751, longitude: 78.0421,
    isPreBookable: true, featured: true,
    tags: ["UNESCO", "wonder", "mughal", "marble"]
  },
  {
    name: "Agra Fort",
    category: "tourist",
    description: "UNESCO Heritage red sandstone fort of the Mughal emperors.",
    city: "Agra", state: "Uttar Pradesh", country: "India",
    address: "Rakabganj, Agra",
    timings: "6:00 AM - 6:00 PM",
    price: 40, priceRange: "₹40 - ₹550",
    rating: 4.5, totalReviews: 18600,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Agra_03-2016_10_Agra_Fort.jpg/960px-Agra_03-2016_10_Agra_Fort.jpg"
    ],
    latitude: 27.1800, longitude: 78.0219,
    isPreBookable: false, featured: true,
    tags: ["UNESCO", "fort", "mughal", "heritage"]
  },

  // ===== GOA / PANAJI =====
  {
    name: "Baga Beach",
    category: "tourist",
    description: "Popular beach known for water sports, shacks, and nightlife.",
    city: "Panaji", state: "Goa", country: "India",
    address: "Baga, Goa",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free Entry",
    rating: 4.3, totalReviews: 18500,
    photos: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600",
      "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=600"
    ],
    latitude: 15.5524, longitude: 73.7517,
    isPreBookable: false, featured: true,
    tags: ["beach", "watersports", "nightlife", "shacks"]
  },
  {
    name: "Basilica of Bom Jesus",
    category: "tourist",
    description: "UNESCO World Heritage church in Old Goa.",
    city: "Panaji", state: "Goa", country: "India",
    address: "Old Goa Rd, Goa",
    timings: "9:00 AM - 6:30 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 11800,
    photos: [
      "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=600",
      "https://images.unsplash.com/photo-1609766857413-5a38e7bc0a6c?w=600"
    ],
    latitude: 15.5009, longitude: 73.9116,
    isPreBookable: false, featured: true,
    tags: ["UNESCO", "church", "heritage", "colonial"]
  },

  // ===== Varanasi =====
  {
    name: "Dashashwamedh Ghat",
    category: "tourist",
    description: "Famous ghat on the Ganges known for the evening Ganga Aarti.",
    city: "Varanasi", state: "Uttar Pradesh", country: "India",
    address: "Dashashwamedh Ghat Rd, Varanasi",
    timings: "Ganga Aarti: 6:30 PM daily",
    price: 0, priceRange: "Free Entry",
    rating: 4.8, totalReviews: 21000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/500px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg"
    ],
    latitude: 25.3062, longitude: 83.0112,
    isPreBookable: false, featured: true,
    tags: ["ghat", "spiritual", "aarti", "ganges"]
  },
  {
    name: "Kashi Vishwanath Temple",
    category: "temple",
    description: "One of the most revered Shiva temples in India.",
    city: "Varanasi", state: "Uttar Pradesh", country: "India",
    address: "Lahori Tola, Varanasi",
    timings: "3:00 AM - 11:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.7, totalReviews: 19500,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashi_Vishwanath.jpg/500px-Kashi_Vishwanath.jpg"
    ],
    latitude: 25.3109, longitude: 83.0107,
    isPreBookable: false, featured: true,
    tags: ["temple", "Shiva", "pilgrimage", "spiritual"]
  },

  // ===== SHIMLA =====
  {
    name: "The Ridge",
    category: "tourist",
    description: "Large open space in central Shimla with panoramic views.",
    city: "Shimla", state: "Himachal Pradesh", country: "India",
    address: "The Ridge, Shimla",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.4, totalReviews: 9800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/500px-The_Ridge_Shimla_5.jpg"
    ],
    latitude: 31.1048, longitude: 77.1734,
    isPreBookable: false, featured: true,
    tags: ["viewpoint", "hills", "promenade"]
  },
  {
    name: "Jakhu Temple",
    category: "temple",
    description: "Hilltop Hanuman temple with scenic valley views.",
    city: "Shimla", state: "Himachal Pradesh", country: "India",
    address: "Jakhu Hill, Shimla",
    timings: "5:00 AM - 8:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.3, totalReviews: 7600,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jakhoo_temple.jpg/500px-Jakhoo_temple.jpg"
    ],
    latitude: 31.1024, longitude: 77.1842,
    isPreBookable: false, featured: false,
    tags: ["temple", "Hanuman", "hilltop", "trekking"]
  },

  // ===== MANALI =====
  {
    name: "Rohtang Pass",
    category: "tourist",
    description: "High mountain pass known for snow activities and Himalayan views.",
    city: "Manali", state: "Himachal Pradesh", country: "India",
    address: "Rohtang Pass, Manali",
    timings: "9:00 AM - 6:00 PM (May to Nov)",
    price: 0, priceRange: "Permit: ₹550",
    rating: 4.6, totalReviews: 14200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Panorama_at_the_other_side_of_Rohtang_Pass_%2810441463105%29.jpg/3840px-Panorama_at_the_other_side_of_Rohtang_Pass_%2810441463105%29.jpg"
    ],
    latitude: 32.3720, longitude: 77.2507,
    isPreBookable: false, featured: true,
    tags: ["snow", "mountain", "pass", "adventure"]
  },
  {
    name: "Hadimba Devi Temple",
    category: "temple",
    description: "Unique wooden temple surrounded by cedar forest.",
    city: "Manali", state: "Himachal Pradesh", country: "India",
    address: "Old Manali, Manali",
    timings: "8:00 AM - 6:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.4, totalReviews: 11500,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF/lossy-page1-500px-Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF.jpg"
    ],
    latitude: 32.2415, longitude: 77.1892,
    isPreBookable: false, featured: true,
    tags: ["temple", "wooden", "forest", "heritage"]
  },

  // ===== AMRITSAR =====
  {
    name: "Golden Temple",
    category: "temple",
    description: "The holiest gurdwara in Sikhism, surrounded by the sacred Amrit Sarovar.",
    city: "Amritsar", state: "Punjab", country: "India",
    address: "Golden Temple Rd, Amritsar",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free Entry",
    rating: 4.9, totalReviews: 48000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/500px-The_Golden_Temple_of_Amrithsar_7.jpg"
    ],
    latitude: 31.6200, longitude: 74.8765,
    isPreBookable: false, featured: true,
    tags: ["Sikhism", "gurdwara", "pilgrimage", "sacred"]
  },
  {
    name: "Jallianwala Bagh",
    category: "tourist",
    description: "Historic memorial of the 1919 massacre, a symbol of India's freedom movement.",
    city: "Amritsar", state: "Punjab", country: "India",
    address: "Golden Temple Rd, Amritsar",
    timings: "6:30 AM - 7:30 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.5, totalReviews: 12600,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Jallianwala_Bagh_in_Day_light.JPG/500px-Jallianwala_Bagh_in_Day_light.JPG"
    ],
    latitude: 31.6197, longitude: 74.8793,
    isPreBookable: false, featured: true,
    tags: ["memorial", "history", "freedom", "heritage"]
  },

  // ===== KOCHI =====
  {
    name: "Fort Kochi Beach",
    category: "tourist",
    description: "Historic seafront with Chinese fishing nets and colonial charm.",
    city: "Kochi", state: "Kerala", country: "India",
    address: "Fort Kochi, Ernakulam, Kerala",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.5, totalReviews: 14200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/%E0%B4%AB%E0%B5%8B%E0%B4%B0%E0%B5%8D%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D-%E0%B4%95%E0%B5%8A%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%BF-%E0%B4%9A%E0%B5%80%E0%B4%A8%E0%B4%B5%E0%B4%B2%E0%B4%95%E0%B5%BE.jpg/500px-%E0%B4%AB%E0%B5%8B%E0%B4%B0%E0%B5%8D%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D-%E0%B4%95%E0%B5%8A%E0%B4%9A%E0%B5%8D%E0%B4%9A%E0%B4%BF-%E0%B4%9A%E0%B5%80%E0%B4%A8%E0%B4%B5%E0%B4%B2%E0%B4%95%E0%B5%BE.jpg"
    ],
    latitude: 9.9665, longitude: 76.2433,
    isPreBookable: false, featured: true,
    tags: ["beach", "Chinese nets", "heritage", "colonial"]
  },
  {
    name: "Mattancherry Palace",
    category: "tourist",
    description: "Historic palace known for Kerala murals and royal collections.",
    city: "Kochi", state: "Kerala", country: "India",
    address: "Palace Rd, Mattancherry, Kochi",
    timings: "10:00 AM - 5:00 PM (Closed Friday)",
    price: 5, priceRange: "₹5 entry",
    rating: 4.2, totalReviews: 6800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mattancherry_Palace_DSC_0899.JPG/500px-Mattancherry_Palace_DSC_0899.JPG"
    ],
    latitude: 9.9567, longitude: 76.2591,
    isPreBookable: false, featured: false,
    tags: ["palace", "murals", "heritage", "Dutch"]
  },

  // ===== THIRUVANANTHAPURAM =====
  {
    name: "Padmanabhaswamy Temple",
    category: "temple",
    description: "Famous Vishnu temple known for its wealth and Dravidian architecture.",
    city: "Thiruvananthapuram", state: "Kerala", country: "India",
    address: "East Fort, Thiruvananthapuram",
    timings: "3:30 AM - 12:00 PM | 5:00 PM - 8:00 PM",
    price: 0, priceRange: "Free (Hindus only)",
    rating: 4.7, totalReviews: 13400,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sree_Padmanabhaswamy_temple_01.jpg/500px-Sree_Padmanabhaswamy_temple_01.jpg"
    ],
    latitude: 8.4827, longitude: 76.9471,
    isPreBookable: false, featured: true,
    tags: ["temple", "Vishnu", "Dravidian", "heritage"]
  },
  {
    name: "Kovalam Beach",
    category: "tourist",
    description: "Popular crescent-shaped beach with lighthouse and calm surf.",
    city: "Thiruvananthapuram", state: "Kerala", country: "India",
    address: "Kovalam, Thiruvananthapuram",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.4, totalReviews: 15800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kovalam_01_by_Tanweer.JPG/960px-Kovalam_01_by_Tanweer.JPG"
    ],
    latitude: 8.3988, longitude: 76.9787,
    isPreBookable: false, featured: true,
    tags: ["beach", "lighthouse", "Ayurveda", "sunset"]
  },

  // ===== ALAPPUZHA =====
  {
    name: "Alleppey Houseboat",
    category: "tourist",
    description: "Traditional Kerala backwater houseboat cruise experience.",
    city: "Alappuzha", state: "Kerala", country: "India",
    address: "Boat Jetty, Alappuzha",
    timings: "12:00 PM - 9:00 AM next day",
    price: 8000, priceRange: "₹8,000 - ₹25,000 per night",
    rating: 4.6, totalReviews: 18900,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Alappuzha_Boat_Beauty_W.jpg/960px-Alappuzha_Boat_Beauty_W.jpg"
    ],
    latitude: 9.4981, longitude: 76.3388,
    isPreBookable: true, featured: true,
    tags: ["backwaters", "houseboat", "Kerala", "nature"]
  },
  {
    name: "Alappuzha Beach",
    category: "tourist",
    description: "Scenic beach with an old pier and sunset views.",
    city: "Alappuzha", state: "Kerala", country: "India",
    address: "Beach Rd, Alappuzha",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.2, totalReviews: 7600,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Alleppey_beach.jpg/500px-Alleppey_beach.jpg"
    ],
    latitude: 9.4900, longitude: 76.3375,
    isPreBookable: false, featured: false,
    tags: ["beach", "pier", "sunset", "coast"]
  },

  // ===== MYSURU =====
  {
    name: "Mysore Palace",
    category: "tourist",
    description: "Royal palace of the Wadiyars and one of India's most visited monuments.",
    city: "Mysuru", state: "Karnataka", country: "India",
    address: "Sayyaji Rao Rd, Mysuru",
    timings: "10:00 AM - 5:30 PM",
    price: 70, priceRange: "₹70 - ₹200",
    rating: 4.7, totalReviews: 24500,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/960px-Mysore_Palace_Morning.jpg"
    ],
    latitude: 12.3052, longitude: 76.6552,
    isPreBookable: false, featured: true,
    tags: ["palace", "royal", "heritage", "illumination"]
  },
  {
    name: "Chamundeshwari Temple",
    category: "temple",
    description: "Hilltop temple dedicated to Goddess Chamundeshwari with panoramic city views.",
    city: "Mysuru", state: "Karnataka", country: "India",
    address: "Chamundi Hills, Mysuru",
    timings: "7:30 AM - 2:00 PM | 3:30 PM - 9:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.5, totalReviews: 14800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Chamundeshwari_Temple_Mysore.jpg/500px-Chamundeshwari_Temple_Mysore.jpg"
    ],
    latitude: 12.2723, longitude: 76.6710,
    isPreBookable: false, featured: true,
    tags: ["temple", "hilltop", "Goddess", "views"]
  },

  // ===== LUCKNOW =====
  {
    name: "Bara Imambara",
    category: "tourist",
    description: "Historic monument famous for Bhool Bhulaiya and Nawabi architecture.",
    city: "Lucknow", state: "Uttar Pradesh", country: "India",
    address: "Husainabad, Lucknow",
    timings: "6:00 AM - 5:00 PM",
    price: 25, priceRange: "₹25 - ₹500",
    rating: 4.5, totalReviews: 11200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bara_Imambara_Lucknow.jpg/960px-Bara_Imambara_Lucknow.jpg"
    ],
    latitude: 26.8693, longitude: 80.9120,
    isPreBookable: false, featured: true,
    tags: ["heritage", "labyrinth", "Nawabi", "landmark"]
  },
  {
    name: "Rumi Darwaza",
    category: "tourist",
    description: "Iconic gateway and a symbol of Lucknow.",
    city: "Lucknow", state: "Uttar Pradesh", country: "India",
    address: "Husainabad, Lucknow",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.4, totalReviews: 8900,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rumi_Darwaza_-_DSC2797-01.jpg/960px-Rumi_Darwaza_-_DSC2797-01.jpg"
    ],
    latitude: 26.8708, longitude: 80.9105,
    isPreBookable: false, featured: true,
    tags: ["gateway", "heritage", "landmark"]
  },

  // ===== BHUBANESWAR =====
  {
    name: "Lingaraj Temple",
    category: "temple",
    description: "Famous Shiva temple and prime example of Kalinga architecture.",
    city: "Bhubaneswar", state: "Odisha", country: "India",
    address: "Old Town, Bhubaneswar",
    timings: "6:00 AM - 9:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 11800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lingaraj_Temple_%2C_Bhubaneswar.jpg/500px-Lingaraj_Temple_%2C_Bhubaneswar.jpg"
    ],
    latitude: 20.2366, longitude: 85.8335,
    isPreBookable: false, featured: true,
    tags: ["temple", "Kalinga", "Shiva", "ancient"]
  },
  {
    name: "Udayagiri and Khandagiri Caves",
    category: "tourist",
    description: "Ancient rock-cut caves with Jain heritage and hilltop views.",
    city: "Bhubaneswar", state: "Odisha", country: "India",
    address: "Khandagiri, Bhubaneswar",
    timings: "8:00 AM - 6:00 PM",
    price: 25, priceRange: "₹25 entry",
    rating: 4.3, totalReviews: 7300,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Khandagari_and_Udaygiri_featured_image.jpg/960px-Khandagari_and_Udaygiri_featured_image.jpg"
    ],
    latitude: 20.2518, longitude: 85.7793,
    isPreBookable: false, featured: false,
    tags: ["caves", "Jain", "heritage", "viewpoint"]
  },

  // ===== GUWAHATI =====
  {
    name: "Kamakhya Temple",
    category: "temple",
    description: "Major Shakti Peetha located on Nilachal Hill.",
    city: "Guwahati", state: "Assam", country: "India",
    address: "Nilachal Hills, Guwahati",
    timings: "8:00 AM - 1:00 PM | 2:30 PM - 5:30 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 19800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/500px-Kamakhya_Temple_-_DEV_8829.jpg"
    ],
    latitude: 26.1660, longitude: 91.7093,
    isPreBookable: false, featured: true,
    tags: ["Shakti", "temple", "pilgrimage", "hilltop"]
  },
  {
    name: "Umananda Temple",
    category: "temple",
    description: "Small Shiva temple on Peacock Island in the Brahmaputra River.",
    city: "Guwahati", state: "Assam", country: "India",
    address: "Peacock Island, Guwahati",
    timings: "7:00 AM - 6:00 PM",
    price: 30, priceRange: "Boat + Entry approx ₹30 - ₹100",
    rating: 4.4, totalReviews: 5200,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Entrance_of_Umananda_Devalaya.jpg/500px-Entrance_of_Umananda_Devalaya.jpg"
    ],
    latitude: 26.1915, longitude: 91.7448,
    isPreBookable: false, featured: false,
    tags: ["temple", "island", "Brahmaputra", "Shiva"]
  },

  // ===== VIZAG =====
  {
    name: "RK Beach",
    category: "tourist",
    description: "Popular beach in Visakhapatnam with seaside road, food stalls, and sunrise views.",
    city: "Visakhapatnam", state: "Andhra Pradesh", country: "India",
    address: "Beach Rd, Visakhapatnam",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.4, totalReviews: 11600,
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600"
    ],
    latitude: 17.7108, longitude: 83.3237,
    isPreBookable: false, featured: true,
    tags: ["beach", "sunrise", "coast", "family"]
  },
  {
    name: "Kailasagiri",
    category: "tourist",
    description: "Hilltop park with panoramic city and sea views.",
    city: "Visakhapatnam", state: "Andhra Pradesh", country: "India",
    address: "Kailasagiri, Visakhapatnam",
    timings: "10:00 AM - 8:00 PM",
    price: 20, priceRange: "₹20 - ₹100",
    rating: 4.5, totalReviews: 9300,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kailasagiri.jpg/500px-Kailasagiri.jpg"
    ],
    latitude: 17.7498, longitude: 83.3426,
    isPreBookable: false, featured: true,
    tags: ["hilltop", "viewpoint", "park", "ropeway"]
  },

  // ===== VIJAYAWADA =====
  {
    name: "Kanaka Durga Temple",
    category: "temple",
    description: "Renowned temple of Goddess Durga on Indrakeeladri Hill.",
    city: "Vijayawada", state: "Andhra Pradesh", country: "India",
    address: "Indrakeeladri, Vijayawada",
    timings: "4:00 AM - 9:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.7, totalReviews: 15400,
    photos: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600",
      "https://images.unsplash.com/photo-1609766118824-a72cd45b7f22?w=600"
    ],
    latitude: 16.5184, longitude: 80.6161,
    isPreBookable: false, featured: true,
    tags: ["temple", "Durga", "hilltop", "pilgrimage"]
  },
  {
    name: "Prakasam Barrage",
    category: "tourist",
    description: "Famous barrage across the Krishna River and a scenic evening spot.",
    city: "Vijayawada", state: "Andhra Pradesh", country: "India",
    address: "Krishna River, Vijayawada",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.3, totalReviews: 6800,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Prakasam_Barrage_from_Vijayawada_to_Guntur_2_%28November_2018%29.jpg/500px-Prakasam_Barrage_from_Vijayawada_to_Guntur_2_%28November_2018%29.jpg"
    ],
    latitude: 16.5062, longitude: 80.6167,
    isPreBookable: false, featured: false,
    tags: ["river", "bridge", "landmark", "evening"]
  },

  // ===== TIRUPATI =====
  {
    name: "Tirumala Venkateswara Temple",
    category: "temple",
    description: "One of the richest and most visited temples in the world.",
    city: "Tirupati", state: "Andhra Pradesh", country: "India",
    address: "Tirumala, Tirupati",
    timings: "Open nearly 24 Hours",
    price: 0, priceRange: "Free - Special Darshan available",
    rating: 4.9, totalReviews: 65000,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tirumala_090615.jpg/500px-Tirumala_090615.jpg"
    ],
    latitude: 13.6833, longitude: 79.3470,
    isPreBookable: true, featured: true,
    tags: ["temple", "Balaji", "pilgrimage", "famous"]
  },
  {
    name: "Sri Venkateswara Zoological Park",
    category: "park",
    description: "Large zoological park with diverse wildlife and nature trails.",
    city: "Tirupati", state: "Andhra Pradesh", country: "India",
    address: "Tirupati, Andhra Pradesh",
    timings: "8:30 AM - 5:00 PM (Closed Monday)",
    price: 50, priceRange: "₹50 - ₹100",
    rating: 4.2, totalReviews: 5100,
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Indian_peafowl_SVZoopark_Tirupathi.JPG/500px-Indian_peafowl_SVZoopark_Tirupathi.JPG"
    ],
    latitude: 13.6288, longitude: 79.4192,
    isPreBookable: false, featured: false,
    tags: ["zoo", "wildlife", "family", "nature"]
  },

  // ===== WARANGAL =====
  {
    name: "Warangal Fort",
    category: "tourist",
    description: "Historic fort complex of the Kakatiya dynasty.",
    city: "Warangal", state: "Telangana", country: "India",
    address: "Warangal Fort, Warangal",
    timings: "10:00 AM - 7:00 PM",
    price: 20, priceRange: "₹20 - ₹50",
    rating: 4.3, totalReviews: 5400,
    photos: [
      "https://en.wikipedia.org/wiki/File:Shiv_Linga_at_Warangal_Fort_Complex.jpg"
    ],
    latitude: 17.9689, longitude: 79.5941,
    isPreBookable: false, featured: true,
    tags: ["fort", "Kakatiya", "heritage", "history"]
  },
  {
    name: "Thousand Pillar Temple",
    category: "temple",
    description: "Historic Kakatiya-era temple known for intricate stone work.",
    city: "Warangal", state: "Telangana", country: "India",
    address: "Hanamkonda, Warangal",
    timings: "6:00 AM - 8:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.5, totalReviews: 6200,
    photos: [
      "https://en.wikipedia.org/wiki/File:1000pillar_temple_warangal.jpg"
    ],
    latitude: 18.0037, longitude: 79.5748,
    isPreBookable: false, featured: false,
    tags: ["temple", "Kakatiya", "stone", "heritage"]
  },

  // ===== PUNE =====
  {
    name: "Shaniwar Wada",
    category: "tourist",
    description: "Historic fortification and former seat of the Peshwas.",
    city: "Pune", state: "Maharashtra", country: "India",
    address: "Shaniwar Peth, Pune",
    timings: "8:00 AM - 6:30 PM",
    price: 25, priceRange: "₹25 entry",
    rating: 4.3, totalReviews: 10100,
    photos: [
      "https://en.wikipedia.org/wiki/File:Front_view_of_Shaniwar_Wada_illuminated.jpg"
    ],
    latitude: 18.5196, longitude: 73.8553,
    isPreBookable: false, featured: true,
    tags: ["fort", "Maratha", "heritage", "history"]
  },
  {
    name: "Aga Khan Palace",
    category: "tourist",
    description: "Historic palace linked to Mahatma Gandhi and the freedom movement.",
    city: "Pune", state: "Maharashtra", country: "India",
    address: "Nagar Rd, Pune",
    timings: "9:00 AM - 5:30 PM",
    price: 25, priceRange: "₹25 entry",
    rating: 4.4, totalReviews: 8300,
    photos: [
      "https://en.wikipedia.org/wiki/File:Pune_Palace.jpg"
    ],
    latitude: 18.5523, longitude: 73.9010,
    isPreBookable: false, featured: false,
    tags: ["palace", "Gandhi", "history", "museum"]
  },

  // ===== AHMEDABAD =====
  {
    name: "Sabarmati Ashram",
    category: "tourist",
    description: "Historic home of Mahatma Gandhi on the banks of the Sabarmati River.",
    city: "Ahmedabad", state: "Gujarat", country: "India",
    address: "Ashram Rd, Ahmedabad",
    timings: "8:30 AM - 6:30 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 12700,
    photos: [
      "https://en.wikipedia.org/wiki/File:GANDHI_ASHRAM_03.jpg"
    ],
    latitude: 23.0609, longitude: 72.5809,
    isPreBookable: false, featured: true,
    tags: ["Gandhi", "museum", "history", "riverfront"]
  },
  {
    name: "Adalaj Stepwell",
    category: "tourist",
    description: "Architectural stepwell known for intricate carvings and Indo-Islamic design.",
    city: "Ahmedabad", state: "Gujarat", country: "India",
    address: "Adalaj, Ahmedabad",
    timings: "6:00 AM - 6:00 PM",
    price: 25, priceRange: "₹25 entry",
    rating: 4.5, totalReviews: 9400,
    photos: [
      "https://en.wikipedia.org/wiki/File:Adalaj_ki_Vav_Gujarat_240A1370_72.jpg"
    ],
    latitude: 23.1645, longitude: 72.5808,
    isPreBookable: false, featured: true,
    tags: ["stepwell", "architecture", "heritage", "carvings"]
  },

  // ===== SURAT =====
  {
    name: "Dumas Beach",
    category: "tourist",
    description: "Popular black-sand beach near Surat.",
    city: "Surat", state: "Gujarat", country: "India",
    address: "Dumas Rd, Surat",
    timings: "Open 24 Hours",
    price: 0, priceRange: "Free",
    rating: 4.1, totalReviews: 7200,
    photos: [
      "https://en.wikipedia.org/wiki/File:Dumasbeach1.jpg"
    ],
    latitude: 21.0830, longitude: 72.7147,
    isPreBookable: false, featured: false,
    tags: ["beach", "coast", "sunset", "family"]
  },
  {
    name: "Science Centre Surat",
    category: "museum",
    description: "Interactive science museum and planetarium for families and students.",
    city: "Surat", state: "Gujarat", country: "India",
    address: "City Light Rd, Surat",
    timings: "10:00 AM - 6:00 PM",
    price: 50, priceRange: "₹50 - ₹200",
    rating: 4.3, totalReviews: 4100,
    photos: [
      "https://en.wikipedia.org/wiki/File:Science-center-and-science.jpg"
    ],
    latitude: 21.1696, longitude: 72.7934,
    isPreBookable: false, featured: false,
    tags: ["science", "museum", "planetarium", "family"]
  },

  // ===== NAGPUR =====
  {
    name: "Deekshabhoomi",
    category: "tourist",
    description: "Important Buddhist monument associated with Dr. B. R. Ambedkar.",
    city: "Nagpur", state: "Maharashtra", country: "India",
    address: "Ramdaspeth, Nagpur",
    timings: "8:00 AM - 8:00 PM",
    price: 0, priceRange: "Free Entry",
    rating: 4.6, totalReviews: 8700,
    photos: [
      "https://en.wikipedia.org/wiki/File:Dheekshabhoomi_in_Nagpur.jpg"
    ],
    latitude: 21.1281, longitude: 79.0677,
    isPreBookable: false, featured: true,
    tags: ["Buddhist", "Ambedkar", "monument", "heritage"]
  },
  {
    name: "Ambazari Lake",
    category: "tourist",
    description: "Popular lake and garden area ideal for evening visits.",
    city: "Nagpur", state: "Maharashtra", country: "India",
    address: "Ambazari, Nagpur",
    timings: "6:00 AM - 8:00 PM",
    price: 20, priceRange: "₹20 - ₹50",
    rating: 4.2, totalReviews: 5200,
    photos: [
      "https://en.wikipedia.org/wiki/File:AmbazariLake.JPG"
    ],
    latitude: 21.1518, longitude: 79.0363,
    isPreBookable: false, featured: false,
    tags: ["lake", "garden", "family", "evening"]
  },
  // ===== NASHIK =====
{
  name: "Trimbakeshwar Temple",
  category: "temple",
  description: "One of the 12 Jyotirlingas dedicated to Lord Shiva.",
  city: "Nashik", state: "Maharashtra", country: "India",
  address: "Trimbak, Nashik",
  timings: "5:30 AM - 9:00 PM",
  price: 0, priceRange: "Free Entry",
  rating: 4.7, totalReviews: 14000,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg/500px-Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg"
  ],
  latitude: 19.9320, longitude: 73.5290,
  isPreBookable: false, featured: true,
  tags: ["temple", "Jyotirlinga", "Shiva"]
},
{
  name: "Sula Vineyards",
  category: "tourist",
  description: "Famous vineyard known for wine tasting and scenic views.",
  city: "Nashik", state: "Maharashtra", country: "India",
  address: "Gangapur, Nashik",
  timings: "11:00 AM - 10:00 PM",
  price: 600, priceRange: "₹600 - ₹2000",
  rating: 4.5, totalReviews: 8500,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sula_Vineyards_Updated_View.jpg/500px-Sula_Vineyards_Updated_View.jpg"
  ],
  latitude: 19.9980, longitude: 73.7330,
  isPreBookable: true, featured: false,
  tags: ["vineyard", "wine", "tour"]
},
// ===== AURANGABAD =====
{
  name: "Ajanta Caves",
  category: "tourist",
  description: "UNESCO World Heritage rock-cut Buddhist caves.",
  city: "Aurangabad", state: "Maharashtra", country: "India",
  address: "Ajanta, Aurangabad",
  timings: "9:00 AM - 5:00 PM",
  price: 40,
  rating: 4.8, totalReviews: 21000,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ajanta_%2863%29.jpg/960px-Ajanta_%2863%29.jpg"
  ],
  latitude: 20.5519, longitude: 75.7033,
  isPreBookable: false,
  tags: ["UNESCO", "caves"]
},
{
  name: "Bibi Ka Maqbara",
  category: "tourist",
  description: "Mini Taj Mahal built in memory of Aurangzeb's wife.",
  city: "Aurangabad",
  state: "Maharashtra",
  country: "India",
  address: "Begumpura, Aurangabad",
  timings: "8:00 AM - 8:00 PM",
  price: 25,
  rating: 4.4,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/The_Tomb_of_Dilras_Banu_Begum.jpg/960px-The_Tomb_of_Dilras_Banu_Begum.jpg"
  ],
  latitude: 19.9010,
  longitude: 75.3200
},
// ===== INDORE =====
{
  name: "Rajwada Palace",
  category: "tourist",
  description: "Historic palace of Holkar dynasty.",
  city: "Indore", state: "Madhya Pradesh", country: "India",
  address: "Rajwada, Indore",
  timings: "10:00 AM - 5:00 PM",
  price: 20,
  rating: 4.3,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Indore_Rajwada01.jpg/960px-Indore_Rajwada01.jpg"
  ],
  latitude: 22.7170,
  longitude: 75.8550
},
{
  name: "Sarafa Bazaar",
  category: "tourist",
  description: "Famous night street food market.",
  city: "Indore",
  state: "Madhya Pradesh",
  country: "India",
  address: "Sarafa, Indore",
  timings: "8:00 PM - 2:00 AM",
  price: 0,
  rating: 4.6,
  photos: [
    "data:image/jpeg;base64,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"
  ],
  latitude: 22.7196,
  longitude: 75.8577
},
// ===== PATNA =====
{
  name: "Golghar",
  category: "tourist",
  description: "Granary with panoramic city views.",
  city: "Patna", state: "Bihar", country: "India",
  address: "West Gandhi Maidan, Patna",
  timings: "9:00 AM - 5:00 PM",
  price: 0,
  rating: 4.2,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Golghar_%E0%A5%AA.jpg/960px-Golghar_%E0%A5%AA.jpg"
  ],
  latitude: 25.6150,
  longitude: 85.1410
},
{
  name: "Mahavir Mandir",
  category: "temple",
  description: "Famous Hanuman temple in Patna.",
  city: "Patna",
  state: "Bihar",
  country: "India",
  address: "Patna Junction",
  timings: "5:00 AM - 10:00 PM",
  price: 0,
  rating: 4.7,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Mahavir_Mandir_from_Buddha_Smriti_Park.JPG/500px-Mahavir_Mandir_from_Buddha_Smriti_Park.JPG"
  ],
  latitude: 25.6090,
  longitude: 85.1350
},
{
  name: "Amaravati Stupa",
  category: "tourist",
  description: "Ancient Buddhist site with historical significance.",
  city: "Guntur", state: "Andhra Pradesh", country: "India",
  address: "Amaravati, Guntur",
  timings: "9:00 AM - 5:00 PM",
  price: 20, priceRange: "₹20",
  rating: 4.3, totalReviews: 3200,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/British_Museum_Asia_14.jpg/960px-British_Museum_Asia_14.jpg"
  ],
  latitude: 16.5735, longitude: 80.3575,
  isPreBookable: false, featured: false,
  tags: ["buddhist", "heritage"]
},
{
  name: "Uppalapadu Bird Sanctuary",
  category: "tourist",
  description: "Famous bird sanctuary near Guntur.",
  city: "Guntur", state: "Andhra Pradesh", country: "India",
  address: "Uppalapadu, Guntur",
  timings: "6:00 AM - 6:00 PM",
  price: 10, priceRange: "₹10",
  rating: 4.2, totalReviews: 2100,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Uppalapadu_Bird_Sanctuary_Entrance.jpg/500px-Uppalapadu_Bird_Sanctuary_Entrance.jpg"
  ],
  latitude: 16.2800, longitude: 80.4500,
  isPreBookable: false,
  tags: ["birds", "nature"]
},
{
  name: "Nellapattu Bird Sanctuary",
  category: "tourist",
  description: "Major bird sanctuary with pelicans.",
  city: "Nellore", state: "Andhra Pradesh", country: "India",
  address: "Nellapattu, Nellore",
  timings: "7:00 AM - 5:00 PM",
  price: 20,
  rating: 4.3,
  photos: [
    "https://roamingowls.com/wp-content/uploads/pelican-nesting-treetop.jpg"
  ],
  latitude: 13.6000, longitude: 79.9000
},
{
  name: "Mypadu Beach",
  category: "tourist",
  description: "Peaceful beach near Nellore.",
  city: "Nellore", state: "Andhra Pradesh", country: "India",
  address: "Mypadu, Nellore",
  timings: "Open 24 Hours",
  price: 0,
  rating: 4.2,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Mypadu_Beach.jpg/500px-Mypadu_Beach.jpg"
  ],
  latitude: 14.0000, longitude: 80.1500
},
{
  name: "Belum Caves",
  category: "tourist",
  description: "Second largest cave system in India.",
  city: "Kurnool", state: "Andhra Pradesh", country: "India",
  address: "Belum, Kurnool",
  timings: "10:00 AM - 5:00 PM",
  price: 50,
  rating: 4.5,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Outside_Of_Belum_Caves.jpg/500px-Outside_Of_Belum_Caves.jpg"
  ],
  latitude: 15.1000, longitude: 78.1000
},
{
  name: "Oravakallu Rock Garden",
  category: "tourist",
  description: "Unique rock formations and scenic spot.",
  city: "Kurnool",
  state: "Andhra Pradesh",
  country: "India",
  address: "Oravakallu, Kurnool",
  timings: "9:00 AM - 6:00 PM",
  price: 20,
  rating: 4.3,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Orvakal_Rock_Formations.jpg/120px-Orvakal_Rock_Formations.jpg"
  ],
  latitude: 15.6000,
  longitude: 78.0500
},
{
  name: "Godavari Bridge",
  category: "tourist",
  description: "Famous rail-cum-road bridge on Godavari river.",
  city: "Rajahmundry", state: "Andhra Pradesh", country: "India",
  address: "Godavari River",
  timings: "Open 24 Hours",
  price: 0,
  rating: 4.5,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Nwgbridge.JPG/500px-Nwgbridge.JPG"
  ],
  latitude: 17.0000,
  longitude: 81.8000
},
{
  name: "Papi Hills",
  category: "tourist",
  description: "Beautiful hills along Godavari river.",
  city: "Rajahmundry",
  state: "Andhra Pradesh",
  country: "India",
  address: "Papi Hills",
  timings: "Daytime",
  price: 500,
  rating: 4.7,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/3/30/Papikondalu_view_16.jpg"
  ],
  latitude: 17.3000,
  longitude: 81.7000
},
// ===== NIZAMABAD =====
{
  name: "Nizamabad Fort",
  category: "tourist",
  description: "Historic fort with scenic views.",
  city: "Nizamabad", state: "Telangana", country: "India",
  address: "Nizamabad",
  timings: "9:00 AM - 5:00 PM",
  price: 20,
  rating: 4.2,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Fort_Entrance%2CNizamabad.jpeg/960px-Fort_Entrance%2CNizamabad.jpeg"
  ],
  latitude: 18.6725, longitude: 78.0941
},
{
  name: "Ali Sagar Reservoir",
  category: "tourist",
  description: "Beautiful reservoir with garden and boating.",
  city: "Nizamabad",
  state: "Telangana",
  country: "India",
  address: "Ali Sagar",
  timings: "8:00 AM - 6:00 PM",
  price: 10,
  rating: 4.3,
  photos: [
    "data:image/jpeg;base64,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"
  ],
  latitude: 18.7500,
  longitude: 78.1000
},
// ===== KHAMMAM =====
{
  name: "Khammam Fort",
  category: "tourist",
  description: "Historic fort built during Kakatiya period.",
  city: "Khammam", state: "Telangana", country: "India",
  address: "Khammam",
  timings: "9:00 AM - 6:00 PM",
  price: 0,
  rating: 4.4,
  photos: [
    "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqmQ0-dIChvfUaF6b_FBNeAqV1lq2JbUbZ_w4BxcI1_siiEmLm5Vv-p6U8oX1PrWRWm5h0QTAkM9z4Ktpny4kJIDOzn-3_Wbazdb82OxgZHdEJoUcj9CtIhVV25TKxum6LLMbAF=w270-h312-n-k-no"
  ],
  latitude: 17.2473, longitude: 80.1514
},
{
  name: "Kinnerasani Dam",
  category: "tourist",
  description: "Scenic dam surrounded by forest.",
  city: "Khammam",
  state: "Telangana",
  country: "India",
  address: "Kinnerasani",
  timings: "8:00 AM - 6:00 PM",
  price: 20,
  rating: 4.3,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Kinnarsani_Dam_08.JPG"
  ],
  latitude: 17.3000,
  longitude: 80.5000
},
// ===== KARIMNAGAR =====
{
  name: "Lower Manair Dam",
  category: "tourist",
  description: "Popular dam and park for visitors.",
  city: "Karimnagar", state: "Telangana", country: "India",
  address: "Karimnagar",
  timings: "8:00 AM - 6:00 PM",
  price: 10,
  rating: 4.3,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Manair_Reservoir%2C_India.jpg/500px-Manair_Reservoir%2C_India.jpg"
  ],
  latitude: 18.4386, longitude: 79.1288
},
{
  name: "Elgandal Fort",
  category: "tourist",
  description: "Ancient fort with historical importance.",
  city: "Karimnagar",
  state: "Telangana",
  country: "India",
  address: "Elgandal",
  timings: "9:00 AM - 5:00 PM",
  price: 0,
  rating: 4.2,
  photos: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Teen_minar_Elgandal_fort_Karimnagar.jpg/500px-Teen_minar_Elgandal_fort_Karimnagar.jpg"
  ],
  latitude: 18.4000,
  longitude: 79.1500
},
{
  name: "Sawai Man Singh Hospital",
  category: "hospital",
  description: "One of the biggest government hospitals in Jaipur, well known for emergency and specialty care.",
  city: "Jaipur",
  state: "Rajasthan",
  country: "India",
  address: "Jawahar Lal Nehru Marg, Jaipur, Rajasthan",
  phone: "+91-141-2518383",
  timings: "Open 24 Hours",
  price: 0,
  priceRange: "Consultation charges vary",
  rating: 4.2,
  totalReviews: 5400,
  photos: [
    "edata:image/jpeg;base64,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"
  ],
  latitude: 26.8937,
  longitude: 75.8153,
  isPreBookable: false,
  featured: true,
  tags: ["hospital", "emergency", "medical", "24x7"],
  amenities: ["Emergency", "Pharmacy", "Parking", "Ambulance"],
  reviews: [
    { user: "Rakesh", comment: "Large hospital with many departments.", rating: 4 },
    { user: "Priya", comment: "Good for emergency treatment.", rating: 4 }
  ]
},
// ===== JAIPUR HOTELS =====
{
  name: "Rambagh Palace",
  category: "hotel",
  description: "Luxury heritage hotel once home to Jaipur royalty.",
  city: "Jaipur", state: "Rajasthan", country: "India",
  address: "Bhawani Singh Rd, Jaipur",
  timings: "Check-in: 2:00 PM - Check-out: 12:00 PM",
  price: 25000, priceRange: "₹25,000 - ₹60,000",
  rating: 4.8, totalReviews: 6200,
  photos: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"
  ],
  latitude: 26.8986, longitude: 75.8074,
  isPreBookable: true, featured: true,
  tags: ["luxury", "heritage", "palace", "5-star"],
  amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking"]
},
{
  name: "ITC Rajputana",
  category: "hotel",
  description: "Premium hotel blending Rajasthani heritage with modern comfort.",
  city: "Jaipur", state: "Rajasthan", country: "India",
  address: "Palace Road, Jaipur",
  timings: "Check-in: 3:00 PM - Check-out: 12:00 PM",
  price: 12000, priceRange: "₹12,000 - ₹25,000",
  rating: 4.6, totalReviews: 5400,
  photos: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
  ],
  latitude: 26.9160, longitude: 75.8000,
  isPreBookable: true, featured: false,
  tags: ["hotel", "luxury", "heritage"],
  amenities: ["Free WiFi", "Gym", "Restaurant", "Parking"]
},
{
  name: "Holiday Inn Jaipur City Centre",
  category: "hotel",
  description: "Modern hotel located in the heart of Jaipur city.",
  city: "Jaipur", state: "Rajasthan", country: "India",
  address: "Commercial Area, Jaipur",
  timings: "Check-in: 2:00 PM - Check-out: 12:00 PM",
  price: 8000, priceRange: "₹8,000 - ₹15,000",
  rating: 4.5, totalReviews: 4100,
  photos: [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600"
  ],
  latitude: 26.9124, longitude: 75.7873,
  isPreBookable: true, featured: false,
  tags: ["hotel", "business", "city"],
  amenities: ["Free WiFi", "Restaurant", "Parking"]
},
{
  name: "Umaid Bhawan Heritage House Hotel",
  category: "hotel",
  description: "Budget-friendly heritage hotel with traditional Rajasthani feel.",
  city: "Jaipur", state: "Rajasthan", country: "India",
  address: "Bani Park, Jaipur",
  timings: "Check-in: 1:00 PM - Check-out: 11:00 AM",
  price: 3500, priceRange: "₹3,500 - ₹7,000",
  rating: 4.4, totalReviews: 2900,
  photos: [
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600"
  ],
  latitude: 26.9286, longitude: 75.7873,
  isPreBookable: true, featured: false,
  tags: ["hotel", "budget", "heritage"],
  amenities: ["Free WiFi", "Parking", "Restaurant"]
}
];

const seedDatabase = async () => {
  try {
    await Place.deleteMany({});
    await Place.insertMany(seedPlaces);
    console.log(`✅ Seeded ${seedPlaces.length} places successfully`);
  } catch (error) {
    console.error("❌ Error seeding places:", error.message);
    throw error;
  }
};

module.exports = {
  seedPlaces,
  seedDatabase
};
