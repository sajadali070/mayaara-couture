export const siteConfig = {
  name: "Mayaara Couture",
  shortName: "Mayaara",
  tagline: "The Art of Fine Weaves & Contemporary Elegance",
  description:
    "Luxury South Indian handloom sarees, designer bridal lehengas, festive kurtis, and contemporary Indo-Western wear in Chennai.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mayaaracouture.com",
  phone: "+91 98765 43210",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210", // No plus sign or spaces for wa.me
  email: "concierge@mayaaracouture.com",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  address: {
    street: "142, Cathedral Road, Opposite vehab petrol bunk, kuniyamuthur",
    city: "Coimbatore",
    state: "Tamil Nadu",
    postalCode: "641008",
    country: "India",
  },
  openingHours: "Monday – Sunday: 10:00 AM – 9:00 PM IST",
  announcement: {
    textEn: "✨ Festive Grandeur: Enjoy 15% off Bridal Collections | Free Express Shipping across India",
    textTa: "✨ பண்டிகை சிறப்பு சலுகை: மணப்பெண் ஆடைகளுக்கு 15% தள்ளுபடி | தமிழ்நாடு முழுவதும் இலவச டெலிவரி",
  },
  socials: {
    instagram: "https://instagram.com/mayaaracouture",
    facebook: "https://facebook.com/mayaaracouture",
    pinterest: "https://pinterest.com/mayaaracouture",
    youtube: "https://youtube.com/@mayaaracouture",
  },
  categories: [
    {
      id: "sarees",
      name: "Handloom Sarees",
      nameTa: "கைத்தறி புடவைகள்",
      slug: "sarees",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      description: "Authentic Kanchipuram pure silk, Banarasi weaves, Chanderi, and ethereal organza.",
    },
    {
      id: "kurtis",
      name: "Designer Kurtis & Sets",
      nameTa: "வடிவமைப்பு குர்திகள்",
      slug: "kurtis",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      description: "Hand-embroidered Chikankari, festive Anarkalis, and breathable everyday silks.",
    },
    {
      id: "indo-western",
      name: "Indo-Western & Fusion",
      nameTa: "இந்தோ-வெஸ்டர்ன் ஆடைகள்",
      slug: "indo-western",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      description: "Pre-draped saree gowns, contemporary cape sets, and modern festive co-ords.",
    },
    {
      id: "lehengas",
      name: "Bridal & Festive Lehengas",
      nameTa: "மணப்பெண் லெஹங்காக்கள்",
      slug: "lehengas",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80",
      description: "Opulent Zardozi, mirror embellishments, and royal velvet bridal ensembles.",
    },
  ],
};
