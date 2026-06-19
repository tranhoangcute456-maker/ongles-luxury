// ── Ongles Luxury Nails — Business Information ──
// Edit this file to update all contact info across the site

export const SITE_NAME       = "Ongles Luxury Nails";
export const ARTIST_NAME     = "Celina Nguyen";
export const TAGLINE         = "Crafting Elegant Nail Art, One Client At A Time";
export const SUBTAGLINE      = "Originally from Vietnam and now based in Canada, I specialize in luxury nail designs that blend creativity, precision, and personal style.";
export const LOCATION        = "Canada";
export const ADDRESS         = "71 Sainte Anne St";

// Contact
export const PHONE           = "437-602-1646";
export const PHONE_URL       = "tel:4376021646";
export const FACEBOOK_URL    = "https://www.facebook.com/mai.kimthao.7";
export const MESSENGER_URL   = "https://m.me/mai.kimthao.7";
export const INSTAGRAM_URL   = "https://www.instagram.com/jkwquynh";
export const INSTAGRAM_HANDLE = "@jkwquynh";

// Google Maps embed
export const MAPS_EMBED_URL = "https://maps.google.com/maps?q=Ongles+Luxury+Sainte+Anne&output=embed&z=15";

// Working info
export const WORKING_HOURS   = "Mon – Sat: 10:00 AM – 8:00 PM";

// Stats
export const STATS = [
  { value: "500+",  label: "Satisfied Clients" },
  { value: "1000+", label: "Nail Designs" },
  { value: "3+",    label: "Years Experience" },
];

// Categories — includes "Custom Category" for admin
export const CATEGORIES = [
  { value: "all",            label: "All" },
  { value: "gel",            label: "Gel" },
  { value: "ombre",          label: "Ombré" },
  { value: "3d",             label: "3D" },
  { value: "bridal",         label: "Bridal" },
  { value: "french",         label: "French" },
  { value: "nailart",        label: "Nail Art" },
  { value: "luxury",         label: "Luxury Collection" },
];

// Admin editable categories (includes Custom)
export const ADMIN_CATEGORIES = [
  ...CATEGORIES.filter(c => c.value !== "all"),
  { value: "custom", label: "Custom Category" },
];

// Image tags for admin
export const IMAGE_TAGS = [
  { value: "featured", label: "⭐ Featured" },
  { value: "popular",  label: "🔥 Popular" },
  { value: "new",      label: "✨ New" },
];

// Timeline
export const TIMELINE = [
  { year: "2021", title: "Started My Journey", desc: "Began learning the art of nail design in Canada, focusing on gel and basic nail art techniques." },
  { year: "2022", title: "Developed My Style", desc: "Mastered 3D nail art, ombré techniques, and bridal nail design. Served my first 100 clients." },
  { year: "2023", title: "Built My Brand", desc: "Launched Ongles Luxury Nails. Grew client base through Instagram and word-of-mouth referrals." },
  { year: "2024", title: "Growing & Thriving", desc: "Over 500 satisfied clients. Specializing in custom luxury nail designs for every occasion." },
  { year: "2025+", title: "Continuing The Story", desc: "Continuing to push creative boundaries and deliver unforgettable nail experiences." },
];

// Testimonials
export const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Loyal Client",
    content: "Celina is incredibly talented. My bridal nails were absolutely perfect — everyone at the wedding complimented them. She truly listened to what I wanted.",
    rating: 5,
  },
  {
    name: "Jessica L.",
    role: "Regular Client",
    content: "I've been coming to Ongles Luxury Nails for over a year. The attention to detail is unmatched. Every set is a work of art. Highly recommend!",
    rating: 5,
  },
  {
    name: "Mei C.",
    role: "Client",
    content: "The 3D nail art she created for me was breathtaking. She's a true artist. My nails lasted 4 weeks without any chips. Worth every penny.",
    rating: 5,
  },
  {
    name: "Amanda R.",
    role: "New Client",
    content: "Found her through Instagram and booked immediately. The experience was luxurious from start to finish. My ombré set is absolutely stunning.",
    rating: 5,
  },
];

// Artistic Philosophy content
export const PHILOSOPHY = {
  quote: "Nails are the smallest canvas, but they hold the biggest stories.",
  paragraphs: [
    "Every client who sits in my chair brings a unique vision, personality, and story. My job is not just to paint nails — it is to translate who you are into a work of art that you wear every day.",
    "I believe in the power of details. The curve of a line, the depth of a color, the placement of a gem — each decision matters. This meticulous attention to craft is what transforms a nail appointment into a luxury experience.",
    "My inspiration comes from fashion, nature, architecture, and the beauty I see in everyday moments. I am constantly learning, experimenting, and pushing the boundaries of what is possible on such a tiny canvas.",
  ],
  values: [
    { icon: "✦", title: "Personalized", desc: "Every design is custom-made for you" },
    { icon: "◈", title: "Craftsmanship", desc: "Precision and care in every stroke" },
    { icon: "❋", title: "Luxury Quality", desc: "Only premium products used" },
    { icon: "✿", title: "Creative Vision", desc: "Art inspired by your personality" },
  ],
};
