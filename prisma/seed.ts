import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MuscleBlaze-inspired fitness supplement database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.newsletterSubscription.deleteMany();

  // 1. Create Brands
  const mbBrand = await prisma.brand.create({
    data: {
      name: "MuscleBlaze",
      slug: "muscleblaze",
      logo: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80",
    },
  });

  const bGreenBrand = await prisma.brand.create({
    data: {
      name: "bGreen",
      slug: "bgreen",
      logo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80",
    },
  });

  const mbFuelOne = await prisma.brand.create({
    data: {
      name: "MB Fuel One",
      slug: "mb-fuel-one",
      logo: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&auto=format&fit=crop&q=80",
    },
  });

  const koshaveda = await prisma.brand.create({
    data: {
      name: "Koshaveda",
      slug: "koshaveda",
      logo: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=80",
    },
  });

  // 2. Create Categories
  const categoriesData = [
    {
      name: "Proteins",
      slug: "proteins",
      description: "Biozyme Whey, Isolate, PR & Clean Concentrates engineered for Indian bodies.",
      image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 1,
    },
    {
      name: "Gainers",
      slug: "gainers",
      description: "High calorie complex carb & multi-source protein mass gainers for hard-gainers.",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 2,
    },
    {
      name: "Pre/Post Workout",
      slug: "pre-post-workout",
      description: "Explosive energy pre-workouts, CreAMP creatine monohydrate & instant recovery BCAAs.",
      image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 3,
    },
    {
      name: "Ayurveda",
      slug: "ayurveda",
      description: "Pure Himalayan Shilajit, Ashwagandha & vitality boosters crafted with Ayurvedic precision.",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 4,
    },
    {
      name: "Fit Foods",
      slug: "fit-foods",
      description: "High Protein Oats, Crunchy Dark Chocolate Peanut Butter, Protein Bars & Muesli.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 5,
    },
    {
      name: "Vitamin Supplements",
      slug: "vitamin-supplements",
      description: "MB-Vite multivitamins, Triple Strength Omega 3 Fish Oil & essential micronutrients.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
      featured: true,
      order: 6,
    },
    {
      name: "Fitness Accessories",
      slug: "fitness-accessories",
      description: "Cyclone Shakers, Heavy-duty lifting wrist straps, Gym duffle bags & workout gear.",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
      featured: false,
      order: 7,
    },
    {
      name: "Apparel",
      slug: "apparel",
      description: "Athletic performance t-shirts, dry-fit hoodies, stringers & training joggers.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      featured: false,
      order: 8,
    },
  ];

  const categoryMap: Record<string, string> = {};
  for (const c of categoriesData) {
    const created = await prisma.category.create({ data: c });
    categoryMap[c.slug] = created.id;
  }

  // 3. Create Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        discountType: "PERCENTAGE",
        discountValue: 10,
        minOrderValue: 999,
        maxDiscount: 500,
        isActive: true,
      },
      {
        code: "FIT150",
        discountType: "FLAT",
        discountValue: 150,
        minOrderValue: 1299,
        maxDiscount: 150,
        isActive: true,
      },
      {
        code: "FREESHIP",
        discountType: "FLAT",
        discountValue: 99,
        minOrderValue: 499,
        maxDiscount: 99,
        isActive: true,
      },
    ],
  });

  // 4. Create Demo Customer & Admin
  const customerPasswordHash = await bcrypt.hash("Password123!", 10);
  const demoUser = await prisma.user.create({
    data: {
      name: "Vikram Sharma",
      email: "demo@muscleblaze.test",
      passwordHash: customerPasswordHash,
      phone: "+91 9876543210",
      role: "CUSTOMER",
      addresses: {
        create: {
          fullName: "Vikram Sharma",
          phone: "+91 9876543210",
          addressLine: "Flat 402, Tower 4, DLF Phase 5, Golf Course Road",
          landmark: "Near One Horizon Center",
          city: "Gurugram",
          state: "Haryana",
          pincode: "122002",
          isDefault: true,
        },
      },
    },
  });

  const adminPasswordHash = await bcrypt.hash("Admin123!", 10);
  await prisma.user.create({
    data: {
      name: "Store Administrator",
      email: "admin@muscleblaze.test",
      passwordHash: adminPasswordHash,
      phone: "+91 9999988888",
      role: "ADMIN",
    },
  });

  // 5. Seed Products Catalog (35+ Detailed Products)
  const products = [
    // --- PROTEINS ---
    {
      name: "MuscleBlaze Biozyme Performance Whey",
      slug: "muscleblaze-biozyme-performance-whey",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "India's first clinically tested whey protein specifically formulated for Indian bodies. Delivers 50% higher protein absorption and 60% higher BCAA absorption with patented Enhanced Absorption Formula (EAF®). Tested and certified by Labdoor USA and Trustified Gold.",
      shortDesc: "25g Protein | 5.51g BCAA | Clinically Tested for 50% Higher Absorption",
      rating: 4.8,
      reviewCount: 15668,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "50% Higher Protein Absorption with EAF® Patented Enzymes",
        "25g Pure Whey Protein per 36g scoop",
        "5.51g BCAA & 11.75g EAA for rapid muscle recovery",
        "Labdoor USA Tested & Certified for accurate label claims",
        "Scoop-on-top hygienic design preventing digging"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "36g",
        protein: "25g",
        bcaa: "5.51g",
        eaa: "11.75g",
        calories: "144 kcal",
        carbs: "2.4g",
        fat: "1.8g"
      }),
      ingredients: "Whey Protein Concentrate (89%), Cocoa Powder, Sodium Chloride, EAF® Enzyme Blend (Protease, Papain), Sweetener (INS 955), Nature Identical Flavouring Substances.",
      usageDirections: "Add 1 level scoop (36g) in 200ml cold water. Shake vigorously in a shaker for 20-30 seconds until completely dissolved. Consume immediately post-workout or first thing in the morning.",
      images: [
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BPW-2KG-CHOC", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Rich Chocolate", price: 7199, mrp: 9699, discountPercent: 25, stock: 45, freebieText: "Free Cyclone Shaker worth ₹699" },
        { sku: "MB-BPW-2KG-MANGO", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Magical Mango", price: 7199, mrp: 9699, discountPercent: 25, stock: 28, freebieText: "Free Cyclone Shaker worth ₹699" },
        { sku: "MB-BPW-1KG-CHOC", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Rich Chocolate", price: 4249, mrp: 5698, discountPercent: 25, stock: 60, freebieText: "Free Shaker worth ₹699" },
        { sku: "MB-BPW-4KG-CHOC", sizeOrWeight: "4 kg (8.8 lb)", flavor: "Rich Chocolate", price: 13499, mrp: 18999, discountPercent: 29, stock: 15, freebieText: "Free 100g CreAMP Creatine + Shaker" }
      ]
    },
    {
      name: "MuscleBlaze Biozyme Iso-Zero 100% Whey Isolate",
      slug: "muscleblaze-biozyme-iso-zero",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "Ultra-pure 100% Isolate Whey protein with zero added carbs, zero lactose and zero sugar. Engineered for professional bodybuilders and lean cut athletes who demand the absolute cleanest protein source.",
      shortDesc: "27g Isolate Protein | Zero Carbs | Zero Lactose | Enhanced Absorption",
      rating: 4.9,
      reviewCount: 8420,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "27g Ultra-pure Whey Protein Isolate per serving",
        "Zero added sugar and zero carbs",
        "Instant mixability with virtually zero fat",
        "Patented EAF® enzyme blend for rapid gastric transit"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "32g",
        protein: "27g",
        bcaa: "6.1g",
        eaa: "12.8g",
        calories: "116 kcal",
        carbs: "0.2g",
        fat: "0.4g"
      }),
      ingredients: "Whey Protein Isolate (96%), EAF® Enzyme Blend, Cocoa Powder, Flavors, Stevia Extract.",
      usageDirections: "Mix 1 scoop with 200ml iced water. Drink within 30 minutes of resistance training.",
      images: [
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-ISOZ-2KG-CHOC", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Low Carb Ice Cream Chocolate", price: 10499, mrp: 13099, discountPercent: 19, stock: 30, freebieText: "Price Dropped By ₹1300 + Free Shaker" },
        { sku: "MB-ISOZ-1KG-CHOC", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Low Carb Ice Cream Chocolate", price: 5489, mrp: 6799, discountPercent: 19, stock: 40, freebieText: "Free Shaker worth ₹699" },
        { sku: "MB-ISOZ-1KG-MANGO", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Tropical Mango", price: 5489, mrp: 6799, discountPercent: 19, stock: 25, freebieText: "Free Shaker worth ₹699" }
      ]
    },
    {
      name: "MuscleBlaze Whey PR Extreme",
      slug: "muscleblaze-biozyme-whey-pr",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "Formulated for peak PR breakers! Packed with 30g protein, added AstraGin® for nutrient bioavailability and 3g CreAMP Creatine monohydrate to smash personal records in the gym.",
      shortDesc: "30g Protein | 3g Creatine | AstraGin® Infused PR Formula",
      rating: 4.7,
      reviewCount: 3890,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "30g high-grade protein to fuel high volume lifting",
        "3g CreAMP Creatine for explosive strength output",
        "AstraGin® for cellular level amino absorption"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "40g",
        protein: "30g",
        bcaa: "6.5g",
        creatine: "3.0g",
        calories: "155 kcal",
        carbs: "3.1g",
        fat: "1.9g"
      }),
      ingredients: "Whey Protein Blend (Concentrate & Isolate), Micronized Creatine Monohydrate, AstraGin®, Cocoa, Flavorings.",
      usageDirections: "Mix 1 scoop with 250ml water immediately post heavy session.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-WPR-2KG-CAKE", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Molten Chocolate Cake", price: 6999, mrp: 9699, discountPercent: 27, stock: 20, freebieText: "Price Dropped By ₹600 + Free Shaker" },
        { sku: "MB-WPR-2KG-CARAMEL", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Salted Caramel", price: 6999, mrp: 9699, discountPercent: 27, stock: 15, freebieText: "Price Dropped By ₹600 + Free Shaker" }
      ]
    },
    {
      name: "MuscleBlaze Whey Gold 100% Whey Isolate with DigeZyme",
      slug: "muscleblaze-whey-gold-100-whey-protein-isolate",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "The gold standard in premium bodybuilding nutrition. Imported US whey isolate with DigeZyme 5-enzyme matrix for effortless digestion and rapid nitrogen retention.",
      shortDesc: "26g Whey Isolate | 5.5g BCAA | Zero Added Sugar | DigeZyme",
      rating: 4.8,
      reviewCount: 9230,
      isFeatured: true,
      isBestseller: false,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "26g pure isolate protein per serving",
        "DigeZyme 5 digestive enzyme matrix",
        "Guaranteed clean label, zero fillers"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "33g",
        protein: "26g",
        bcaa: "5.5g",
        calories: "128 kcal",
        carbs: "1.2g",
        fat: "1.0g"
      }),
      ingredients: "Whey Protein Isolate, DigeZyme® Multi-Enzyme Complex, Cocoa, Sucralose.",
      usageDirections: "Mix 1 scoop with 200ml cold water.",
      images: [
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-WGOLD-2KG-MILKCHOC", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Rich Milk Chocolate", price: 11029, mrp: 14699, discountPercent: 24, stock: 35, freebieText: "Free Shaker worth ₹699" },
        { sku: "MB-WGOLD-2KG-VANILLA", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Gourmet Vanilla", price: 11029, mrp: 15599, discountPercent: 29, stock: 22, freebieText: "Free Shaker worth ₹699" },
        { sku: "MB-WGOLD-4KG-MILKCHOC", sizeOrWeight: "4 kg (8.8 lb)", flavor: "Rich Milk Chocolate", price: 21749, mrp: 28999, discountPercent: 25, stock: 12, freebieText: "Free Cyclone Shaker & Wrist Wraps" }
      ]
    },
    {
      name: "MuscleBlaze Raw Whey Isolate 90%",
      slug: "muscleblaze-raw-whey-isolate",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "100% unflavored, unsweetened and unprocessed whey protein isolate for athletes who want complete control over their flavor, recipes, and protein macros without artificial additives.",
      shortDesc: "27g Raw Isolate Protein | Unflavoured | 100% Clean",
      rating: 4.6,
      reviewCount: 4120,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "90% Protein concentration with zero additives",
        "Perfect for custom smoothies, protein pancakes and baking",
        "Lab-tested for zero heavy metals and zero fillers"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "30g",
        protein: "27g",
        bcaa: "5.9g",
        calories: "110 kcal",
        carbs: "0.5g",
        fat: "0.2g"
      }),
      ingredients: "Whey Protein Isolate (100%).",
      usageDirections: "Add 1 scoop into your favorite fruit smoothie or cold water.",
      images: [
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-RWI-1KG-UNFLV", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Unflavoured", price: 5599, mrp: 6499, discountPercent: 13, stock: 40, freebieText: "100% Clean Certified" },
        { sku: "MB-RWI-2KG-UNFLV", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Unflavoured", price: 11099, mrp: 12599, discountPercent: 11, stock: 25, freebieText: "100% Clean Certified" }
      ]
    },
    {
      name: "MuscleBlaze Beginner's Protein Powder",
      slug: "muscleblaze-beginners-protein-powder",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "The ideal starter protein for beginners stepping into the fitness journey. Packed with 12g protein per scoop, essential vitamins and easy on the stomach.",
      shortDesc: "12g Protein | Gentle Digestion | Pocket-Friendly Entry Pack",
      rating: 4.5,
      reviewCount: 6540,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Pocket friendly daily fitness protein",
        "Gentle digestive profile formulated for new lifters",
        "Delicious thick chocolate milkshake consistency"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "30g",
        protein: "12g",
        carbs: "14g",
        calories: "120 kcal",
        fat: "1.2g"
      }),
      ingredients: "Whey Protein Concentrate, Skimmed Milk Powder, Cocoa, Maltodextrin, Vitamin Pre-mix.",
      usageDirections: "Shake 1 scoop with 200ml milk or water post workout.",
      images: [
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BEG-1KG-CHOC", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Chocolate Crunch", price: 1299, mrp: 1899, discountPercent: 31, stock: 80, freebieText: "Beginner's Essential" }
      ]
    },

    // --- GAINERS ---
    {
      name: "MuscleBlaze Super Gainer XXL Weight Gainer",
      slug: "muscleblaze-super-gainer-xxl-weight-gainer",
      brandId: mbBrand.id,
      categoryId: categoryMap["gainers"],
      description: "High calorie complex carb & multi-source protein gainer designed specifically for hard-gainers with rapid metabolisms. Provides 177g complex carbs, 60g protein per day in 1:3 ratio, and 27 micronutrients.",
      shortDesc: "177g Carbs | 60g Protein | Multi-source Protein Complex",
      rating: 4.7,
      reviewCount: 11200,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "weight_gain",
      benefits: JSON.stringify([
        "Ideal 1:3 Protein-to-Carb ratio for lean muscle hypertrophy",
        "6 Protein Sources including Whey, Casein, and Egg Albumin",
        "Enriched with 27 essential vitamins and minerals",
        "Zero added refined sugar"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "100g",
        protein: "20g",
        carbs: "72g",
        calories: "385 kcal",
        fat: "2.5g"
      }),
      ingredients: "Maltodextrin, Whey Protein Concentrate, Calcium Caseinate, Cocoa Powder, DigeZyme®, Vitamin & Mineral Blend.",
      usageDirections: "Blend 1 scoop (100g) in 300ml whole milk with banana or peanut butter for maximum mass gain.",
      images: [
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-SGXXL-5KG-CHOC", sizeOrWeight: "5 kg (11 lb)", flavor: "Chocolate", price: 4449, mrp: 4899, discountPercent: 9, stock: 40, freebieText: "Price Dropped By ₹260 + Free Shaker worth ₹699" },
        { sku: "MB-SGXXL-2KG-CHOC", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Chocolate", price: 1999, mrp: 2499, discountPercent: 20, stock: 65, freebieText: "Free Shaker worth ₹699" },
        { sku: "MB-SGXXL-2KG-KULFI", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Kesar Kulfi", price: 1999, mrp: 2499, discountPercent: 20, stock: 30, freebieText: "Free Shaker worth ₹699" }
      ]
    },
    {
      name: "MB Fuel One Mass Gainer Pro",
      slug: "mb-fuel-one-mass-gainer-pro",
      brandId: mbFuelOne.id,
      categoryId: categoryMap["gainers"],
      description: "Value-focused high caloric mass gainer designed to provide clean sustained energy and muscle bulk for athletic trainees looking for high caloric surplus.",
      shortDesc: "Clean Calorie Surplus | 1:4 Macro Ratio | Digestive Enzymes",
      rating: 4.5,
      reviewCount: 3200,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "weight_gain",
      benefits: JSON.stringify([
        "High caloric density for bulking phases",
        "Quality complex carbohydrates",
        "Fortified with digestive enzymes for smooth digestion"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "100g",
        protein: "15g",
        carbs: "75g",
        calories: "375 kcal",
        fat: "2.0g"
      }),
      ingredients: "Carbohydrate blend, Milk Protein, Cocoa, Vitamins.",
      usageDirections: "Take 1 scoop twice daily between meals.",
      images: [
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "FO-MG-3KG-CHOC", sizeOrWeight: "3 kg (6.6 lb)", flavor: "Rich Chocolate", price: 2399, mrp: 3199, discountPercent: 25, stock: 35, freebieText: "High Value Bulk Pack" }
      ]
    },

    // --- PRE / POST WORKOUT & CREATINE ---
    {
      name: "MuscleBlaze Pre Workout WrathX",
      slug: "muscleblaze-pre-workout-wrathx",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "The ultimate pre-workout weapon engineered for fierce focus, spine-tingling pumps, and relentless gym intensity. Formulated with 350mg Caffeine, 4000mg L-Citrulline, Beta-Alanine, and EnXtra for crash-free sustained adrenaline.",
      shortDesc: "4000mg L-Citrulline | 350mg Caffeine | 3200mg Beta-Alanine | EnXtra",
      rating: 4.8,
      reviewCount: 5410,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "Massive skin-splitting nitric oxide vascular pumps",
        "350mg Caffeine + EnXtra for 5 hours of sustained mental drive without crash",
        "3200mg CarnoSyn® Beta-Alanine to delay lactic acid build-up",
        "Electrolyte balance for intense endurance sessions"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "15g",
        caffeine: "350mg",
        lCitrulline: "4000mg",
        betaAlanine: "3200mg",
        enxtra: "300mg",
        calories: "5 kcal"
      }),
      ingredients: "L-Citrulline, Beta-Alanine, L-Tyrosine, Caffeine Anhydrous, EnXtra® Alpinia Galanga Extract, Taurine, Natural & Artificial Flavors, Sucralose.",
      usageDirections: "Mix 1 scoop (15g) in 250ml chilled water 20-30 minutes before working out. Assess tolerance with half scoop first.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-WRATHX-540G-FRUIT", sizeOrWeight: "540 g (36 Servings)", flavor: "Fruit Fury", price: 1699, mrp: 2349, discountPercent: 27, stock: 50, freebieText: "Price Dropped By ₹300 + Free Shaker" },
        { sku: "MB-WRATHX-270G-COLA", sizeOrWeight: "270 g (18 Servings)", flavor: "Cola Frost", price: 999, mrp: 1399, discountPercent: 28, stock: 70, freebieText: "High Demand Formula" }
      ]
    },
    {
      name: "MuscleBlaze Creatine Monohydrate CreAMP",
      slug: "muscleblaze-creatine-monohydrate-creamp",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "India's highest selling CreAMP Creatine Monohydrate. Supercharged with MB CreAMP technology for enhanced cellular saturation, raw ATP replenishment, and maximal muscle cell volumization.",
      shortDesc: "3g CreAMP Creatine | Enhanced ATP Synthesis | Zero Sugar",
      rating: 4.9,
      reviewCount: 22400,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Rapid ATP regeneration for heavy lifting sets",
        "Enhances intracellular hydration and muscle fullness",
        "100% micronized mesh for instant solubility",
        "CreAMP formulation reduces stomach cramping"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "4g",
        creatineMonohydrate: "3g",
        calories: "0 kcal"
      }),
      ingredients: "CreAMP Micronized Creatine Monohydrate, Citric Acid, Flavorings (in flavored variants).",
      usageDirections: "Consume 1 scoop daily with 250ml water, grape juice or protein shake. Maintain 3-4 liters of water intake daily.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-CREAMP-320G-WM", sizeOrWeight: "320 g (80 Servings)", flavor: "Watermelon Kool Aid", price: 879, mrp: 1349, discountPercent: 34, stock: 120, freebieText: "People's Choice - Best Seller" },
        { sku: "MB-CREAMP-100G-UNFLV", sizeOrWeight: "100 g (33 Servings)", flavor: "Unflavoured", price: 449, mrp: 649, discountPercent: 30, stock: 150, freebieText: "Pocket-sized Power" },
        { sku: "MB-CREAMP-640G-DUO", sizeOrWeight: "640 g Mega Tub", flavor: "Watermelon & Citrus Blast", price: 1599, mrp: 2698, discountPercent: 40, stock: 40, freebieText: "Price Dropped By ₹399 + Free Shaker" }
      ]
    },
    {
      name: "MuscleBlaze Pre Workout 200 Xtreme",
      slug: "muscleblaze-pre-workout-200-xtreme",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "Crisp, fast-hitting 200mg caffeine pre-workout engineered for everyday gym warriors looking for pure alertness, laser pump and stamina.",
      shortDesc: "200mg Caffeine | 2000mg L-Citrulline | Pocket Friendly",
      rating: 4.6,
      reviewCount: 3950,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "200mg clean caffeine kick",
        "2000mg L-Citrulline pump activator",
        "Great taste and rapid dissolution"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "5g",
        caffeine: "200mg",
        lCitrulline: "2000mg"
      }),
      ingredients: "L-Citrulline, Caffeine, Beta-Alanine, Flavor.",
      usageDirections: "Mix 1 scoop in 200ml water 20 mins pre workout.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-PRE200-100G-PUNCH", sizeOrWeight: "100 g", flavor: "Fruit Punch", price: 499, mrp: 669, discountPercent: 25, stock: 90, freebieText: "Grab @ ₹474 | Code: SAVE" },
        { sku: "MB-PRE200-100G-BERRY", sizeOrWeight: "100 g", flavor: "Berry Bolt", price: 499, mrp: 669, discountPercent: 25, stock: 75, freebieText: "Grab @ ₹474 | Code: SAVE" }
      ]
    },
    {
      name: "MuscleBlaze Liquid L-Carnitine PRO 3300mg",
      slug: "muscleblaze-liquid-l-carnitine-pro-3300mg",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "Triple strength liquid L-Carnitine delivering 3300mg pure free-form L-Carnitine per serving to transport long-chain fatty acids into mitochondria for fat burning and muscular energy.",
      shortDesc: "3300mg Liquid L-Carnitine | Fast Liquid Absorption | Fat To Energy",
      rating: 4.7,
      reviewCount: 4680,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "fat_loss",
      benefits: JSON.stringify([
        "3300mg potent liquid L-Carnitine per spoon",
        "Converts stored body fat into usable aerobic fuel",
        "Enhanced with Vitamin B5 for cellular metabolic rate"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "15ml",
        lCarnitine: "3300mg",
        vitaminB5: "5mg",
        calories: "0 kcal"
      }),
      ingredients: "Purified Water, L-Carnitine Base, Acidity Regulators, Flavor, Vitamin B5.",
      usageDirections: "Take 1 tablespoon (15ml) daily on empty stomach or 15 mins prior to cardio training.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-LCARN-450ML-ORANGE", sizeOrWeight: "450 ml (30 Servings)", flavor: "Tangy Orange", price: 1529, mrp: 1849, discountPercent: 17, stock: 45, freebieText: "Price Dropped By ₹200 + Free Shaker" },
        { sku: "MB-LCARN-450ML-LIME", sizeOrWeight: "450 ml (30 Servings)", flavor: "Key Lime", price: 659, mrp: 799, discountPercent: 17, stock: 60, freebieText: "Standard 1100mg Strength" }
      ]
    },
    {
      name: "MuscleBlaze BCAA Pro 7g Amino Recovery",
      slug: "muscleblaze-bcaa-pro",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "High-yield intra-workout recovery drink supplying 7g of 2:1:1 BCAAs, 2.5g L-Glutamine and essential hydration electrolytes to prevent catabolic breakdown during grueling sessions.",
      shortDesc: "7g BCAAs | 2.5g Glutamine | 1g Citrulline | Zero Sugar",
      rating: 4.7,
      reviewCount: 6800,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Prevents catabolic breakdown during prolonged training",
        "Replenishes sodium and potassium lost through sweat",
        "Crisp refreshing fruity hydration"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "15g",
        bcaa: "7g",
        glutamine: "2.5g",
        citrulline: "1g"
      }),
      ingredients: "Instantized BCAA Blend, L-Glutamine, Citrulline Malate, Electrolytes, Sucralose.",
      usageDirections: "Sip 1 scoop during your workout in 400ml water.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BCAA-450G-WM", sizeOrWeight: "450 g (30 Servings)", flavor: "Watermelon", price: 1449, mrp: 1899, discountPercent: 23, stock: 55, freebieText: "Intra-Workout Essential" }
      ]
    },

    // --- VITAMIN SUPPLEMENTS & FISH OIL ---
    {
      name: "MuscleBlaze MB-VITE Daily Multivitamin",
      slug: "muscleblaze-mb-vite-daily-multivitamin",
      brandId: mbBrand.id,
      categoryId: categoryMap["vitamin-supplements"],
      description: "Daily athletic multivitamin engineered with 24 vital vitamins and minerals, blend of 6 botanical extracts and essential amino acids to reinforce immune barriers, joint mobility, and cellular repair.",
      shortDesc: "24 Vitamins & Minerals | 6 Herbal Extracts | Amino Acid Complex",
      rating: 4.8,
      reviewCount: 14200,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "100% RDA of essential fat-soluble and water-soluble vitamins",
        "Fortified with Ginseng, Ginkgo Biloba, and Grape Seed extract",
        "Supports muscle metabolism and keeps fatigue away"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "1 Tablet",
        vitamins: "12 Vitamins (A, C, D, E, B-Complex)",
        minerals: "12 Minerals (Zinc, Magnesium, Iron, Calcium)"
      }),
      ingredients: "Vitamin & Mineral Pre-mix, Botanical Extracts, Microcrystalline Cellulose.",
      usageDirections: "Take 1 tablet daily after breakfast with water.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-VITE-120TAB", sizeOrWeight: "120 Tablets", flavor: "Unflavoured", price: 975, mrp: 1099, discountPercent: 11, stock: 100, freebieText: "4 Month Supply" },
        { sku: "MB-VITE-60TAB", sizeOrWeight: "60 Tablets", flavor: "Unflavoured", price: 529, mrp: 649, discountPercent: 18, stock: 140, freebieText: "Daily Wellness" },
        { sku: "MB-VITE-30TAB", sizeOrWeight: "30 Tablets", flavor: "Unflavoured", price: 329, mrp: 399, discountPercent: 17, stock: 80, freebieText: "Starter Pack" }
      ]
    },
    {
      name: "MuscleBlaze Omega 3 Fish Oil Gold 3X Triple Strength",
      slug: "muscleblaze-omega-3-fish-oil-gold-3x",
      brandId: mbBrand.id,
      categoryId: categoryMap["vitamin-supplements"],
      description: "Triple strength molecularly distilled fish oil delivering 560mg EPA and 400mg DHA per softgel. Molecular distillation removes all heavy metals, mercury, and PCB contaminants. Features enteric anti-fish-burp coating.",
      shortDesc: "Triple Strength (560mg EPA + 400mg DHA) | Anti-Fish Burp",
      rating: 4.8,
      reviewCount: 9600,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "960mg combined Omega 3 (560mg EPA + 400mg DHA)",
        "Enteric coated to prevent fishy aftertaste and reflux",
        "Supports cardiovascular health, brain cognition, and joint lubrication"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "1 Softgel",
        fishOil: "1250mg",
        epa: "560mg",
        dha: "400mg"
      }),
      ingredients: "Purified Deep Sea Sardine & Anchovy Fish Oil, Gelatin, Glycerin, Enteric Coating.",
      usageDirections: "Take 1 softgel daily after your highest fat meal.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-FISHGOLD-60CAP", sizeOrWeight: "60 Softgels", flavor: "Enteric Coated", price: 1099, mrp: 1899, discountPercent: 42, stock: 85, freebieText: "42% Off - Triple Strength" },
        { sku: "MB-FISHSTD-90CAP", sizeOrWeight: "90 Softgels (1000mg)", flavor: "Standard", price: 719, mrp: 779, discountPercent: 7, stock: 95, freebieText: "Classic Formula" },
        { sku: "MB-FISHSTD-30CAP", sizeOrWeight: "30 Softgels", flavor: "Standard", price: 395, mrp: 449, discountPercent: 12, stock: 60, freebieText: "Trial Pack" }
      ]
    },
    {
      name: "MuscleBlaze Biozyme 5-in-1 Daily Performance Multivitamin",
      slug: "muscleblaze-biozyme-5-in-1-multivitamin",
      brandId: mbBrand.id,
      categoryId: categoryMap["vitamin-supplements"],
      description: "Advanced 5-tier multivitamin complex pairing essential micronutrients with enzyme blends, joint matrix, vitality herbals, and prebiotics for total metabolic fortification.",
      shortDesc: "5-in-1 System | Joint Matrix | Vitality Herbal Blend | 90 Tabs",
      rating: 4.7,
      reviewCount: 2800,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      goal: "endurance",
      benefits: JSON.stringify([
        "5 focused matrices in one daily tablet",
        "Glucosamine & Boswellia for heavy squatting knee support",
        "Digestive enzymes for enhanced protein assimilation"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "1 Tablet",
        vitamins: "Complete A-Z",
        jointBlend: "500mg"
      }),
      ingredients: "Vitamins, Minerals, Glucosamine Sulphate, Boswellia, DigeZyme.",
      usageDirections: "1 tablet daily after main meal.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BIOVITE-90TAB", sizeOrWeight: "90 Tablets", flavor: "Unflavoured", price: 949, mrp: 1099, discountPercent: 13, stock: 65, freebieText: "Biozyme Enhanced" }
      ]
    },

    // --- AYURVEDA ---
    {
      name: "Koshaveda Pure Himalayan Shilajit Resin",
      slug: "koshaveda-pure-himalayan-shilajit-resin",
      brandId: koshaveda.id,
      categoryId: categoryMap["ayurveda"],
      description: "100% pure Himalayan Shilajit resin harvested at 18,000+ feet in the Gilgit and Ladakh mountains. Standardized to >75% Fulvic Acid and 84+ trace ionic minerals to ignite natural stamina, testosterone support, and cellular energy.",
      shortDesc: "Standardized >75% Fulvic Acid | 84+ Ionic Minerals | 18,000 ft Himalayan",
      rating: 4.9,
      reviewCount: 8120,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        ">75% Fulvic Acid for supreme nutrient absorption",
        "Boosts ATP energy synthesis and stamina",
        "100% Labdoor Certified free from lead and arsenic",
        "Includes precision brass spoon"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "Pea-sized (250mg-500mg)",
        fulvicAcid: ">75%",
        humicAcid: "10%"
      }),
      ingredients: "100% Pure Himalayan Shilajit Resin (Asphaltum punjabianum).",
      usageDirections: "Dissolve a pea-sized portion (approx 300mg) in warm milk or green tea once daily in the morning.",
      images: [
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "KV-SHIL-20G", sizeOrWeight: "20 g Glass Jar", flavor: "Original Earthy Resin", price: 1199, mrp: 1599, discountPercent: 25, stock: 75, freebieText: "Includes Free Brass Measuring Spoon" },
        { sku: "KV-SHIL-40G", sizeOrWeight: "40 g Glass Jar", flavor: "Original Earthy Resin", price: 1999, mrp: 2899, discountPercent: 31, stock: 40, freebieText: "Mega Value Resin Jar" }
      ]
    },
    {
      name: "Koshaveda Ashwagandha 1000mg Vigor & Recovery",
      slug: "koshaveda-ashwagandha-1000mg",
      brandId: koshaveda.id,
      categoryId: categoryMap["ayurveda"],
      description: "High potency Ashwagandha root extract standardized to 5% withanolides to regulate cortisol stress levels, elevate natural testosterone synthesis, and accelerate deep REM sleep muscle repair.",
      shortDesc: "Standardized 5% Withanolides | Cortisol Reducer | 60 Veg Tablets",
      rating: 4.7,
      reviewCount: 4100,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Reduces high exercise-induced cortisol stress",
        "Promotes deeper restorative sleep and nighttime recovery",
        "Enhances natural power output and VO2 max"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "2 Tablets",
        ashwagandhaExtract: "1000mg",
        withanolides: "50mg"
      }),
      ingredients: "Standardized Withania Somnifera (Ashwagandha) Root Extract, BioPerine® Black Pepper Extract.",
      usageDirections: "Take 1-2 tablets before bedtime with warm milk.",
      images: [
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "KV-ASH-60TAB", sizeOrWeight: "60 Tablets", flavor: "Unflavoured", price: 549, mrp: 749, discountPercent: 26, stock: 90, freebieText: "Ayurvedic Potency" }
      ]
    },
    {
      name: "Koshaveda Gokshura Tribulus Testosterone Booster",
      slug: "koshaveda-gokshura-testosterone-booster",
      brandId: koshaveda.id,
      categoryId: categoryMap["ayurveda"],
      description: "Pure Gokshura (Tribulus Terrestris) standardized to 40% saponins. Traditional Ayurvedic tonic for male vigor, nitric oxide enhancement, and athletic endurance.",
      shortDesc: "40% Saponins | Male Vigor & Endurance | 60 Tablets",
      rating: 4.6,
      reviewCount: 2310,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Promotes vitality and vigor",
        "Aids in natural testosterone pathway stimulation",
        "100% natural herbs, zero synthetic hormones"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "1 Tablet",
        gokshuraExtract: "500mg"
      }),
      ingredients: "Gokshura (Tribulus Terrestris) fruit extract.",
      usageDirections: "1 tablet twice daily after meals.",
      images: [
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "KV-GOK-60TAB", sizeOrWeight: "60 Tablets", flavor: "Unflavoured", price: 479, mrp: 649, discountPercent: 26, stock: 70, freebieText: "Vigor Tonic" }
      ]
    },

    // --- FIT FOODS ---
    {
      name: "MuscleBlaze High Protein Rolled Oats Dark Chocolate",
      slug: "muscleblaze-high-protein-oats",
      brandId: mbBrand.id,
      categoryId: categoryMap["fit-foods"],
      description: "Start every morning with 22g clean protein per 100g serving. 100% wholegrain rolled oats blended with premium whey protein concentrate and rich dark chocolate cocoa chunks.",
      shortDesc: "22g Protein per 100g | Wholegrain Rolled Oats | Rich Dark Chocolate",
      rating: 4.8,
      reviewCount: 13500,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "22g high quality protein per 100g serving",
        "Complex slow-digesting dietary fiber for all-day fullness",
        "Zero trans fats and sweetened with unrefined raw cocoa",
        "Cooks in just 3 minutes in hot water or milk"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "50g",
        protein: "11g",
        carbs: "29g",
        fiber: "5g",
        calories: "192 kcal",
        fat: "3.5g"
      }),
      ingredients: "Rolled Oats (75%), Whey Protein Concentrate, Cocoa Solids, Chia Seeds, Flax Seeds, Sucralose.",
      usageDirections: "Boil 50g oats in 200ml milk or water for 3 minutes. Garnish with almonds or bananas.",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-OATS-1KG-CHOC", sizeOrWeight: "1 kg", flavor: "Dark Chocolate", price: 569, mrp: 699, discountPercent: 18, stock: 150, freebieText: "Eat. Fit. Repeat." },
        { sku: "MB-OATS-2KG-CHOC", sizeOrWeight: "2 kg", flavor: "Dark Chocolate", price: 1029, mrp: 1299, discountPercent: 20, stock: 90, freebieText: "Super Saver Pack" }
      ]
    },
    {
      name: "MuscleBlaze High Protein Dark Chocolate Peanut Butter",
      slug: "muscleblaze-high-protein-peanut-butter",
      brandId: mbBrand.id,
      categoryId: categoryMap["fit-foods"],
      description: "Decadent crunchy dark chocolate peanut butter made from 100% slow-roasted premium peanuts and fortified with whey protein isolate. Gives 27g protein per 100g with zero hydrogenated vegetable oils.",
      shortDesc: "27g Protein | Roasted Peanuts & Whey Isolate | Zero Added Salt",
      rating: 4.8,
      reviewCount: 9800,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "27g Protein per 100g powered by Whey Isolate",
        "No hydrogenated oils, no trans fats, no high fructose corn syrup",
        "Rich chocolate taste with satisfying crunchy peanut bits"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "32g (2 tbsp)",
        protein: "8.6g",
        healthyFats: "15g",
        calories: "198 kcal",
        carbs: "6g"
      }),
      ingredients: "Roasted Peanuts (80%), Whey Protein Isolate, Cocoa Mass, Cocoa Butter.",
      usageDirections: "Spread 2 tablespoons over multigrain toast, oatmeal, or blend in your protein shake.",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-PB-1KG-CRUNCHY", sizeOrWeight: "1 kg Jar", flavor: "Dark Chocolate Creamy Crunchy", price: 599, mrp: 749, discountPercent: 20, stock: 110, freebieText: "20% Off Healthy Spread" }
      ]
    },
    {
      name: "MuscleBlaze High Protein Energy Bar 20g Protein",
      slug: "muscleblaze-high-protein-energy-bar",
      brandId: mbBrand.id,
      categoryId: categoryMap["fit-foods"],
      description: "Convenient on-the-go snack delivering 20g clean protein, 7g prebiotic fiber, 27 vitamins and minerals with zero added sugars. Perfect mid-day craving crusher.",
      shortDesc: "20g Protein | 7g Prebiotic Fiber | Zero Added Sugar | Box of 6",
      rating: 4.6,
      reviewCount: 4200,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "20g protein in a portable, pocket-sized bar",
        "Gluten-free and zero refined sugar",
        "Satisfies sweet cravings with zero guilt"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "1 Bar (67g)",
        protein: "20g",
        fiber: "7g",
        calories: "220 kcal",
        netCarbs: "9g"
      }),
      ingredients: "Protein blend (Whey Protein Isolate, Whey Crisp, Milk Protein), Prebiotic Chicory Root Fiber, Dark Chocolate Coating, Almonds.",
      usageDirections: "Unwrap and enjoy between meals or as a pre-workout fuel.",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BAR-6PK-COOKIE", sizeOrWeight: "Pack of 6 Bars", flavor: "Cookies & Cream", price: 675, mrp: 780, discountPercent: 13, stock: 75, freebieText: "Guilt Free Snacking" },
        { sku: "MB-BAR-12PK-COOKIE", sizeOrWeight: "Pack of 12 Bars", flavor: "Cookies & Cream", price: 1249, mrp: 1560, discountPercent: 20, stock: 45, freebieText: "Value Box of 12" }
      ]
    },
    {
      name: "MuscleBlaze High Protein Muesli Dark Chocolate Cranberry",
      slug: "muscleblaze-high-protein-muesli",
      brandId: mbBrand.id,
      categoryId: categoryMap["fit-foods"],
      description: "Crispy high protein muesli packed with rolled barley, wheat flakes, pumpkin seeds, cranberries, and whey isolate puffs. Delivers 25g protein per 100g.",
      shortDesc: "25g Protein | Dark Chocolate & Tart Cranberries | Seeds & Nuts",
      rating: 4.7,
      reviewCount: 3100,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "Crunchy nutrient-dense breakfast cereal",
        "Antioxidant rich cranberries and seeds",
        "Keeps hunger hormones ghrelin in check"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "100g",
        protein: "25g",
        carbs: "50g",
        fiber: "8g",
        calories: "410 kcal"
      }),
      ingredients: "Multigrain Flakes, Soy Protein Nuggets, Dried Cranberries, Cocoa, Almonds.",
      usageDirections: "Add 50g muesli to cold milk or Greek yogurt.",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-MUS-1KG-CHOC", sizeOrWeight: "1 kg", flavor: "Dark Chocolate & Cranberry", price: 649, mrp: 799, discountPercent: 18, stock: 65, freebieText: "High Protein Breakfast" },
        { sku: "MB-MUS-2KG-CHOC", sizeOrWeight: "2 kg", flavor: "Dark Chocolate & Cranberry", price: 1159, mrp: 1399, discountPercent: 17, stock: 40, freebieText: "Mega Tub" }
      ]
    },

    // --- PLANT PROTEIN (bGreen) ---
    {
      name: "bGreen Plant Protein by MuscleBlaze",
      slug: "bgreen-plant-protein",
      brandId: bGreenBrand.id,
      categoryId: categoryMap["proteins"],
      description: "100% Vegan plant-based protein crafted from golden yellow peas and brown rice protein. Formulated with green tea extract, digestive enzymes, 4.5g BCAAs, and natural vitamins C and E for athletes who are lactose-intolerant or vegan.",
      shortDesc: "25g Pea & Rice Vegan Protein | 4.5g BCAA | Dairy & Soy Free",
      rating: 4.6,
      reviewCount: 3450,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "25g pure organic plant protein per serving",
        "Green tea extracts for natural fat metabolism support",
        "Zero dairy, zero soy, zero lactose, zero gluten"
      ]),
      nutritionFacts: JSON.stringify({
        servingSize: "35g",
        protein: "25g",
        bcaa: "4.5g",
        eaa: "9.8g",
        calories: "135 kcal"
      }),
      ingredients: "Pea Protein Isolate, Brown Rice Protein, Cocoa Powder, Green Tea Extract, Papain Enzyme, Stevia.",
      usageDirections: "Shake 1 scoop with 250ml cold water or almond milk.",
      images: [
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "BG-PLANT-1KG-CHOC", sizeOrWeight: "1 kg (2.2 lb)", flavor: "Cafe Mocha", price: 2399, mrp: 3199, discountPercent: 25, stock: 40, freebieText: "100% Certified Vegan" },
        { sku: "BG-PLANT-2KG-CHOC", sizeOrWeight: "2 kg (4.4 lb)", flavor: "Cafe Mocha", price: 4399, mrp: 5999, discountPercent: 26, stock: 25, freebieText: "Free Shaker worth ₹699" }
      ]
    },

    // --- FITNESS ACCESSORIES & GEAR ---
    {
      name: "MuscleBlaze Cyclone Shaker Bottle 700ml",
      slug: "muscleblaze-cyclone-shaker-bottle-700ml",
      brandId: mbBrand.id,
      categoryId: categoryMap["fitness-accessories"],
      description: "Heavy-duty 100% leakproof cyclone shaker bottle equipped with surgical grade cyclone blender wire technology to dissolve clumps within 10 seconds. BPA-free, freezer-safe, and embossed with volume markers.",
      shortDesc: "700ml Capacity | 100% Leakproof | Cyclone Wire Blender | BPA Free",
      rating: 4.8,
      reviewCount: 18200,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "Lump-free smooth protein shake in seconds",
        "Ergonomic flip-cap with click-lock seal",
        "BPA-free food-grade non-toxic polymer",
        "Fits securely in standard car cup holders"
      ]),
      nutritionFacts: JSON.stringify({
        material: "BPA Free Polypropylene",
        capacity: "700 ml"
      }),
      ingredients: "Polypropylene, Surgical Steel Cyclone Ball.",
      usageDirections: "Rinse with warm soapy water after each protein shake.",
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-SHAKE-700ML-BLACK", sizeOrWeight: "700 ml", flavor: "Matte Black", price: 399, mrp: 699, discountPercent: 43, stock: 200, freebieText: "Bestselling Shaker" },
        { sku: "MB-SHAKE-700ML-NEON", sizeOrWeight: "700 ml", flavor: "Electric Neon Yellow", price: 399, mrp: 699, discountPercent: 43, stock: 150, freebieText: "Bestselling Shaker" }
      ]
    },
    {
      name: "MuscleBlaze Heavy Duty Lifting Straps & Wrist Wraps",
      slug: "muscleblaze-lifting-straps-wrist-wraps",
      brandId: mbBrand.id,
      categoryId: categoryMap["fitness-accessories"],
      description: "Premium heavy-duty cotton lifting straps with neoprene wrist padding and reinforced cross-stitching for heavy deadlifts, shrugs, and bent-over rows.",
      shortDesc: "Heavy Duty Cotton | Neoprene Padded | Anti-Slip Grip",
      rating: 4.7,
      reviewCount: 3900,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Eliminates grip fatigue on heavy pulls",
        "Cushioned neoprene protects wrist skin from bruising",
        "Reinforced cross-stitching tested to 300kg deadlifts"
      ]),
      nutritionFacts: JSON.stringify({
        material: "100% Heavy Duty Cotton + Neoprene"
      }),
      ingredients: "Reinforced Cotton Webbing.",
      usageDirections: "Wrap tightly around bar twice and cinch down.",
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-STRAP-STD", sizeOrWeight: "Pair (2 Wraps)", flavor: "Black & Orange", price: 449, mrp: 799, discountPercent: 44, stock: 100, freebieText: "PR Breaker Gear" }
      ]
    },
    {
      name: "MuscleBlaze Iconic Gym Duffle Bag",
      slug: "muscleblaze-gym-duffle-bag",
      brandId: mbBrand.id,
      categoryId: categoryMap["fitness-accessories"],
      description: "Spacious water-resistant gym duffle with dedicated ventilated shoe compartment, shaker holder, and reinforced shoulder straps. Built for daily training grit.",
      shortDesc: "Ventilated Shoe Pocket | Water Resistant | Heavy Duty Zippers",
      rating: 4.7,
      reviewCount: 2100,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "Separate odor-free ventilated compartment for gym shoes",
        "Water resistant fabric shields gear from rain",
        "Padded ergonomic shoulder strap"
      ]),
      nutritionFacts: JSON.stringify({
        dimensions: "50cm x 26cm x 26cm",
        volume: "35 Liters"
      }),
      ingredients: "Durable Ballistic Polyester.",
      usageDirections: "Wipe with damp cloth.",
      images: [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-BAG-DUFFLE-BLK", sizeOrWeight: "35 Liters", flavor: "Obsidian Black", price: 1299, mrp: 2199, discountPercent: 41, stock: 50, freebieText: "Free Shaker with Bag" }
      ]
    },

    // --- APPAREL ---
    {
      name: "MuscleBlaze Dry-Fit Athletic Training T-Shirt",
      slug: "muscleblaze-dry-fit-athletic-tshirt",
      brandId: mbBrand.id,
      categoryId: categoryMap["apparel"],
      description: "Sweat-wicking 4-way stretch active dry-fit t-shirt designed for unhindered range of motion during squats, presses, and high intensity workouts. Anti-odor silver thread finish.",
      shortDesc: "4-Way Stretch | Sweat-Wicking Dry Fit | Anti-Odor | Athletic Fit",
      rating: 4.7,
      reviewCount: 1950,
      isFeatured: false,
      isBestseller: false,
      isNewArrival: true,
      goal: "endurance",
      benefits: JSON.stringify([
        "Rapid moisture evaporation keeps you dry during intense sets",
        "Raglan sleeves allow unrestricted shoulder mobility",
        "Tapered fit accentuates athletic chest and V-taper"
      ]),
      nutritionFacts: JSON.stringify({
        material: "88% Polyester, 12% Spandex",
        fit: "Athletic Tapered"
      }),
      ingredients: "Polyester Spandex Blend.",
      usageDirections: "Machine wash cold. Do not iron directly on print.",
      images: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-TSHIRT-M-BLK", sizeOrWeight: "Medium (M)", flavor: "Carbon Black", price: 699, mrp: 1299, discountPercent: 46, stock: 60, freebieText: "Gym Ready Fit" },
        { sku: "MB-TSHIRT-L-BLK", sizeOrWeight: "Large (L)", flavor: "Carbon Black", price: 699, mrp: 1299, discountPercent: 46, stock: 70, freebieText: "Gym Ready Fit" },
        { sku: "MB-TSHIRT-XL-BLK", sizeOrWeight: "Extra Large (XL)", flavor: "Carbon Black", price: 699, mrp: 1299, discountPercent: 46, stock: 45, freebieText: "Gym Ready Fit" }
      ]
    },

    // --- SUPER SAVER STACKS / COMBOS ---
    {
      name: "Biozyme Performance Whey 2kg + CreAMP Creatine 100g Combo",
      slug: "biozyme-performance-whey-creamp-combo",
      brandId: mbBrand.id,
      categoryId: categoryMap["proteins"],
      description: "The ultimate power stack! Pair India's #1 clinically absorbed Biozyme Performance Whey with CreAMP Creatine Monohydrate for massive strength spikes and rapid muscular hypertrophy.",
      shortDesc: "2kg Whey + 100g Creatine + Free Shaker | Maximum Synergy Stack",
      rating: 4.9,
      reviewCount: 4890,
      isFeatured: true,
      isBestseller: true,
      isNewArrival: false,
      goal: "muscle_building",
      benefits: JSON.stringify([
        "Complete foundational bodybuilding stack",
        "Synergistic muscle protein synthesis & ATP regeneration",
        "Includes complimentary Cyclone Shaker worth ₹699"
      ]),
      nutritionFacts: JSON.stringify({
        stackIncludes: "Biozyme Performance Whey 2kg + CreAMP Creatine 100g + Cyclone Shaker"
      }),
      ingredients: "Whey Protein Concentrate + CreAMP Creatine Monohydrate.",
      usageDirections: "Take 1 scoop whey + 1 scoop creatine post workout in chilled water.",
      images: [
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-COMBO-WHEY-CREAT", sizeOrWeight: "2.1 kg Stack", flavor: "Rich Chocolate & Unflavoured", price: 7679, mrp: 10398, discountPercent: 26, stock: 35, freebieText: "Super Saver Stack: Free Shaker worth ₹699" }
      ]
    },
    {
      name: "WrathX Pre-Workout 270g + CreAMP Creatine 100g Combo",
      slug: "wrathx-creamp-creatine-combo",
      brandId: mbBrand.id,
      categoryId: categoryMap["pre-post-workout"],
      description: "Explosive workout amplifier stack combining WrathX extreme pre-workout with CreAMP pure micronized creatine for unstoppable gym endurance and skin-splitting pumps.",
      shortDesc: "WrathX 270g + CreAMP 100g | Explosive Training Stack",
      rating: 4.8,
      reviewCount: 2210,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "Dual nitric oxide and ATP booster",
        "Unrivaled focus, vascularity and power",
        "Save ₹649 compared to buying separately"
      ]),
      nutritionFacts: JSON.stringify({
        stackIncludes: "WrathX 270g + CreAMP 100g"
      }),
      ingredients: "L-Citrulline, Beta Alanine, Caffeine, Micronized Creatine.",
      usageDirections: "WrathX 20 mins pre-workout, Creatine immediately post-workout.",
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-COMBO-WRATH-CREAT", sizeOrWeight: "370 g Combo", flavor: "Cola Frost & Unflavoured", price: 1299, mrp: 1948, discountPercent: 33, stock: 45, freebieText: "Save ₹649 on Stack" }
      ]
    },
    {
      name: "High Protein Oats 1kg + Dark Chocolate Peanut Butter 1kg Combo",
      slug: "high-protein-oats-peanut-butter-combo",
      brandId: mbBrand.id,
      categoryId: categoryMap["fit-foods"],
      description: "The ultimate power breakfast stack! Combine High Protein Rolled Oats with Crunchy Dark Chocolate Peanut Butter for an energizing breakfast delivering 30g+ complete protein.",
      shortDesc: "1kg Oats + 1kg Peanut Butter | 30g Breakfast Protein Power Stack",
      rating: 4.9,
      reviewCount: 3890,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "lean_muscle",
      benefits: JSON.stringify([
        "Pure athletic breakfast synergy",
        "Slow-release complex carbs plus healthy monounsaturated fats",
        "Satisfies sweet tooth with healthy raw cocoa"
      ]),
      nutritionFacts: JSON.stringify({
        stackIncludes: "Oats 1kg + Peanut Butter 1kg"
      }),
      ingredients: "Rolled Oats, Whey Protein, Roasted Peanuts, Cocoa.",
      usageDirections: "Add 2 spoons of peanut butter into hot cooked oats.",
      images: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-COMBO-OATS-PB", sizeOrWeight: "2 kg Combo", flavor: "Dark Chocolate Duo", price: 1099, mrp: 1448, discountPercent: 24, stock: 80, freebieText: "Eat. Fit. Repeat. Stack" }
      ]
    },
    {
      name: "Omega 3 Fish Oil 60 Caps + MB-Vite Multivitamin 60 Tabs Combo",
      slug: "omega-3-fish-oil-mb-vite-combo",
      brandId: mbBrand.id,
      categoryId: categoryMap["vitamin-supplements"],
      description: "Essential daily foundation micronutrient stack. Pairs triple strength EPA/DHA Omega 3 with 24-vitamin MB-Vite for joint lubrication, cardio protection and sustained immune defense.",
      shortDesc: "60 Softgels Fish Oil + 60 Multivitamins | Daily Health Foundation",
      rating: 4.8,
      reviewCount: 5120,
      isFeatured: false,
      isBestseller: true,
      isNewArrival: false,
      goal: "endurance",
      benefits: JSON.stringify([
        "Total health insurance for active lifters",
        "Reduces systemic inflammation and joint wear",
        "Keeps metabolic and hormonal enzymes optimized"
      ]),
      nutritionFacts: JSON.stringify({
        stackIncludes: "Fish Oil 60 Caps + MB-Vite 60 Tabs"
      }),
      ingredients: "Omega 3 Fish Oil + 24 Vitamins & Minerals.",
      usageDirections: "1 softgel and 1 multivitamin tablet after lunch.",
      images: [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80"
      ],
      variants: [
        { sku: "MB-COMBO-FISH-VITE", sizeOrWeight: "120 Units (2 Bottles)", flavor: "Unflavoured", price: 1219, mrp: 1548, discountPercent: 21, stock: 70, freebieText: "Complete Daily Health Stack" }
      ]
    }
  ];

  // Insert all products, variants, images, and sample reviews
  for (const p of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        brandId: p.brandId,
        categoryId: p.categoryId,
        description: p.description,
        shortDesc: p.shortDesc,
        rating: p.rating,
        reviewCount: p.reviewCount,
        benefits: p.benefits,
        nutritionFacts: p.nutritionFacts,
        ingredients: p.ingredients,
        usageDirections: p.usageDirections,
        isFeatured: p.isFeatured,
        isBestseller: p.isBestseller,
        isNewArrival: p.isNewArrival,
        goal: p.goal,
      },
    });

    // Add Images
    for (let i = 0; i < p.images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: p.images[i],
          alt: `${p.name} image ${i + 1}`,
          isPrimary: i === 0,
          order: i,
        },
      });
    }

    // Add Variants
    for (const v of p.variants) {
      await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          sku: v.sku,
          sizeOrWeight: v.sizeOrWeight,
          flavor: v.flavor,
          price: v.price,
          mrp: v.mrp,
          discountPercent: v.discountPercent,
          stock: v.stock,
          freebieText: v.freebieText,
        },
      });
    }

    // Add Sample Reviews
    await prisma.review.createMany({
      data: [
        {
          productId: createdProduct.id,
          userName: "Rohit Deshmukh",
          rating: 5,
          title: "Outstanding results and zero bloating!",
          comment: "Been using this for 3 months now. Digestion is super smooth and I can visibly see the recovery speed between my push/pull workouts.",
          verifiedPurchase: true,
        },
        {
          productId: createdProduct.id,
          userName: "Ankit Verma",
          rating: 5,
          title: "Genuine product with authentic batch code",
          comment: "Checked the batch code on the website and it showed 100% genuine with NABL lab report. Taste is amazing and mixes easily in cold water.",
          verifiedPurchase: true,
        },
        {
          productId: createdProduct.id,
          userName: "Sahil Mehta",
          rating: 4,
          title: "Great value for money",
          comment: "Delivered in 2 days to Bangalore. The free shaker was also sturdy and leakproof. Will reorder again.",
          verifiedPurchase: true,
        },
      ],
    });
  }

  // 6. Create Seed Past Order for demo customer
  const sampleProduct = await prisma.product.findFirst({
    where: { slug: "muscleblaze-biozyme-performance-whey" },
    include: { variants: true, images: true },
  });

  if (sampleProduct && sampleProduct.variants.length > 0) {
    const sampleVariant = sampleProduct.variants[0];
    const createdOrder = await prisma.order.create({
      data: {
        orderNumber: "MB-2026-981042",
        userId: demoUser.id,
        customerName: demoUser.name,
        customerEmail: demoUser.email,
        customerPhone: "+91 9876543210",
        shippingAddressJson: JSON.stringify({
          fullName: "Vikram Sharma",
          phone: "+91 9876543210",
          addressLine: "Flat 402, Tower 4, DLF Phase 5, Golf Course Road",
          landmark: "Near One Horizon Center",
          city: "Gurugram",
          state: "Haryana",
          pincode: "122002",
        }),
        subtotal: sampleVariant.price,
        discountAmount: 150,
        shippingFee: 0,
        totalAmount: sampleVariant.price - 150,
        couponCode: "FIT150",
        paymentMethod: "ONLINE_SIMULATED",
        status: "DELIVERED",
        items: {
          create: [
            {
              productId: sampleProduct.id,
              variantId: sampleVariant.id,
              productName: sampleProduct.name,
              variantName: `${sampleVariant.sizeOrWeight} - ${sampleVariant.flavor}`,
              price: sampleVariant.price,
              quantity: 1,
              imageUrl: sampleProduct.images[0]?.url,
            },
          ],
        },
      },
    });

    console.log(`Created sample historical order: ${createdOrder.orderNumber}`);
  }

  console.log("Database seeded successfully with 28+ products, categories, coupons, and demo user!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
