import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Dumbbell,
  Flame,
  HeartPulse,
  Users,
  Sparkles,
  UserCheck,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Star,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Menu,
  X,
  Sliders,
  Info,
  Instagram,
  Facebook,
  Youtube,
  Copy,
  CheckCircle2,
  AlertCircle,
  Compass,
  Award,
  Activity,
  Zap,
  Maximize2,
  Code2,
  ExternalLink,
  Calendar,
} from "lucide-react";

/**
 * ============================================================================
 * CENTRALIZED GYM DATA CONFIGURATION (src/data/gymData.js equivalent)
 * ============================================================================
 * All business facts, contact details, membership pricing placeholders,
 * opening hours, trainer profiles, and imagery are stored in this single
 * configuration object so the gym owner can update them in one place.
 */
const initialGymData = {
  brand: {
    name: "INFINITY FITNESS",
    tagline: "Train stronger. Move better. Become unstoppable.",
    heroHeadlineLine1: "YOUR LIMITS.",
    heroHeadlineLine2: "OUR PLAYGROUND.",
    city: "Nipani, Karnataka",
    neighborhood: "Old PB Road, Basavannagar",
    fullAddress: "Old PB Road, Basavannagar, Nipani, Karnataka 591237, India",
    googleMapsQuery:
      "https://www.google.com/maps/search/?api=1&query=INFINITY+FITNESS+Old+PB+Road+Basavannagar+Nipani+Karnataka+591237+India",
    mapEmbedVerified: true,
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Old%20PB%20Road,%20Basavannagar,%20Nipani,%20Karnataka%20591237,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  rating: {
    score: "4.9",
    maxScore: "5.0",
    disclaimer: "Rating supplied by the business",
    verificationNote:
      "Review count & external verification link to be confirmed by owner.",
    sourceUrl: "", // Configurable link once verified
  },
  contact: {
    // Left empty by default per strict data-integrity rules (no fabricated numbers)
    phone: "",
    whatsappNumber: "",
    phonePlaceholderLabel: "Phone number pending owner configuration",
    whatsappPlaceholderLabel: "WhatsApp number pending owner configuration",
    email: "",
  },
  openingHours: {
    statusNote: "Pending Owner Confirmation",
    weekdayLabel: "Monday – Saturday",
    weekdayHours: "Hours to be confirmed by owner",
    sundayLabel: "Sunday",
    sundayHours: "Hours to be confirmed by owner",
  },
  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  specialOffer: {
    enabled: true,
    badge: "OPTIONAL PROMO BANNER (OWNER CONFIGURABLE)",
    title: "Seasonal Membership Offer — Details Pending Owner Confirmation",
    discountPlaceholder: "Discount % / Benefit to be confirmed",
    expiryPlaceholder: "Valid until: Date to be confirmed",
    termsPlaceholder:
      "Terms & eligibility subject to gym management confirmation.",
  },
  billingCycles: [
    { id: "monthly", label: "Monthly", note: "Proposed Option" },
    { id: "quarterly", label: "Quarterly", note: "Proposed Option" },
    { id: "halfYearly", label: "Half-Yearly", note: "Proposed Option" },
    { id: "annual", label: "Annual", note: "Proposed Option" },
  ],
  memberships: [
    {
      id: "starter",
      name: "STARTER",
      subtitle: "Foundational gym access & essential equipment",
      popular: false,
      ctaText: "ENQUIRE FOR STARTER",
      prices: {
        monthly: "Price to be confirmed",
        quarterly: "Price to be confirmed",
        halfYearly: "Price to be confirmed",
        annual: "Price to be confirmed",
      },
      features: [
        "Regular gym access",
        "Access to available standard equipment",
        "General fitness support",
      ],
    },
    {
      id: "pro",
      name: "PRO",
      subtitle: "Complete strength, cardio & group energy",
      popular: true,
      popularBadge: "POPULAR CHOICE",
      ctaText: "ENQUIRE FOR PRO",
      prices: {
        monthly: "Price to be confirmed",
        quarterly: "Price to be confirmed",
        halfYearly: "Price to be confirmed",
        annual: "Price to be confirmed",
      },
      features: [
        "Gym access",
        "Cardio and strength training",
        "Group classes where included",
      ],
    },
    {
      id: "elite",
      name: "ELITE",
      subtitle: "Dedicated coaching & priority training support",
      popular: false,
      ctaText: "ENQUIRE FOR ELITE",
      prices: {
        monthly: "Price to be confirmed",
        quarterly: "Price to be confirmed",
        halfYearly: "Price to be confirmed",
        annual: "Price to be confirmed",
      },
      features: [
        "Premium membership option",
        "Personalized training support where available",
        "Priority guidance where offered",
      ],
    },
  ],
  images: {
    visualDisclaimer:
      "Illustrative high-resolution fitness concept imagery shown for layout demonstration. Replaceable with official INFINITY FITNESS Nipani photography.",
    hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85",
    about:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=85",
    cta: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=85",
  },
  facilities: [
    {
      id: "machinery",
      title: "Modern Machinery",
      category: "STRENGTH & BIOMECHANICS",
      verificationStatus: "Verified Core Offering",
      verified: true,
      span: "md:col-span-7",
      description:
        "Train with modern selectorized and plate-loaded machines engineered for smooth resistance profiles and progressive overload.",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "cardio",
      title: "Cardio Sessions",
      category: "ENDURANCE & CONDITIONING",
      verificationStatus: "Verified Core Offering",
      verified: true,
      span: "md:col-span-5",
      description:
        "Dedicated cardiovascular training zone featuring treadmills, ellipticals, and stationary bikes for stamina and heart health.",
      image:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "hiit",
      title: "HIIT Training",
      category: "METABOLIC ATHLETICISM",
      verificationStatus: "Schedule & Format Pending Owner Confirmation",
      verified: false,
      span: "md:col-span-4",
      description:
        "Structured high-intensity interval training sessions balancing explosive work intervals with tactical recovery.",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "zumba",
      title: "Zumba",
      category: "RHYTHM & MOVEMENT",
      verificationStatus: "Batch Timings Pending Owner Confirmation",
      verified: false,
      span: "md:col-span-4",
      description:
        "High-energy, dance-inspired group workouts that turn full-body cardiovascular conditioning into an uplifting studio experience.",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "group-classes",
      title: "Group Classes",
      category: "COMMUNITY ENERGY",
      verificationStatus: "Batch Details Pending Owner Confirmation",
      verified: false,
      span: "md:col-span-4",
      description:
        "Train alongside driven members in motivating group sessions designed to build accountability and shared momentum.",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "personal-attention",
      title: "Personalized Attention",
      category: "INDIVIDUAL FOCUS",
      verificationStatus: "Verified Core Offering",
      verified: true,
      span: "md:col-span-4",
      description:
        "Attentive floor supervision and tailored workout guidance aligned with your current fitness level and personal goals.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "trainer-support",
      title: "Professional Trainer Support",
      category: "COACHING EXCELLENCE",
      verificationStatus: "Verified Core Offering",
      verified: true,
      span: "md:col-span-4",
      description:
        "Practical form correction, equipment orientation, and structured training progression from experienced floor coaches.",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "helpful-staff",
      title: "Helpful Staff",
      category: "MEMBER EXPERIENCE",
      verificationStatus: "Verified Core Offering",
      verified: true,
      span: "md:col-span-4",
      description:
        "A welcoming, respectful, and supportive team committed to keeping the training floor approachable for beginners and athletes alike.",
      image:
        "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=80",
    },
  ],
  programs: [
    {
      id: "strength",
      code: "01",
      title: "Strength & Conditioning",
      description: "Build strength, improve technique, and train consistently.",
      focusTag: "Progressive Resistance & Form",
      iconName: "Dumbbell",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1100&q=80",
    },
    {
      id: "cardio-program",
      code: "02",
      title: "Cardio Training",
      description: "Make cardiovascular exercise part of your routine.",
      focusTag: "Stamina & Daily Vitality",
      iconName: "HeartPulse",
      image:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1100&q=80",
    },
    {
      id: "hiit-program",
      code: "03",
      title: "HIIT Training",
      description:
        "High-intensity interval training designed around effort and recovery.",
      focusTag: "Work-to-Rest Conditioning",
      iconName: "Flame",
      image:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1100&q=80",
    },
    {
      id: "zumba-program",
      code: "04",
      title: "Zumba",
      description: "Dance-inspired group fitness with energetic movement.",
      focusTag: "Rhythm & Full-Body Motion",
      iconName: "Sparkles",
      image:
        "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1100&q=80",
    },
    {
      id: "group-program",
      code: "05",
      title: "Group Training",
      description: "Train alongside others in a motivating environment.",
      focusTag: "Shared Momentum & Pace",
      iconName: "Users",
      image:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1100&q=80",
    },
    {
      id: "personal-program",
      code: "06",
      title: "Personal Attention",
      description:
        "Support your fitness journey with guidance tailored to your goals.",
      focusTag: "Individualized Coaching Support",
      iconName: "UserCheck",
      image:
        "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1100&q=80",
    },
  ],
  trainers: [
    {
      id: "trainer-1",
      isDemoPlaceholder: true,
      name: "DEMO PLACEHOLDER — COACH PROFILE #01",
      specialization:
        "Strength & Conditioning Specialist (To be confirmed by owner)",
      experience: "Experience years pending owner input",
      qualifications: "Certifications & qualifications pending verification",
      bio: "Editable trainer biography placeholder. Once the owner of INFINITY FITNESS supplies verified coach profiles, this card will highlight their real coaching philosophy and specialties.",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "trainer-2",
      isDemoPlaceholder: true,
      name: "DEMO PLACEHOLDER — COACH PROFILE #02",
      specialization:
        "HIIT, Mobility & Functional Training (To be confirmed by owner)",
      experience: "Experience years pending owner input",
      qualifications: "Certifications & qualifications pending verification",
      bio: "Editable trainer biography placeholder. Designed to showcase coach credentials, movement assessment expertise, and member support approach without inventing unverified details.",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "trainer-3",
      isDemoPlaceholder: true,
      name: "DEMO PLACEHOLDER — COACH PROFILE #03",
      specialization:
        "Group Fitness, Zumba & Cardio Conditioning (To be confirmed by owner)",
      experience: "Experience years pending owner input",
      qualifications: "Certifications & qualifications pending verification",
      bio: "Editable trainer biography placeholder. Ready for the gym owner to insert real instructor names, class schedules, and verified training backgrounds.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      category: "Gym interiors",
      title: "Atmospheric Main Training Floor",
      alt: "Illustrative dark luxury gym interior with modern strength machines and dramatic lighting",
      aspect: "aspect-[16/10]",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "gal-2",
      category: "Strength equipment",
      title: "Precision Free-Weight & Rack Zone",
      alt: "Illustrative strength training zone with dumbbells, barbells, and benches",
      aspect: "aspect-[4/5]",
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-3",
      category: "Cardio area",
      title: "Dedicated Endurance Lineup",
      alt: "Illustrative row of modern treadmills and cardio machines in a sleek fitness club",
      aspect: "aspect-[16/10]",
      image:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-4",
      category: "HIIT workouts",
      title: "High-Intensity Functional Turf",
      alt: "Illustrative athlete performing battle rope HIIT conditioning drill",
      aspect: "aspect-[4/5]",
      image:
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-5",
      category: "Zumba sessions",
      title: "Vibrant Group Rhythm Studio",
      alt: "Illustrative energetic group fitness and dance workout session",
      aspect: "aspect-[16/10]",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "gal-6",
      category: "Group training",
      title: "Coach-Led Small Group Training",
      alt: "Illustrative members training together during a guided group workout",
      aspect: "aspect-[16/10]",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      isDemo: true,
      memberName: "DEMO MEMBER SLOT #01",
      memberTag: "Awaiting Verified Member Review",
      quote:
        "[DEMO PLACEHOLDER — No fabricated customer quotations are displayed. Once the owner of INFINITY FITNESS supplies verified member testimonials, real feedback regarding the modern machinery and supportive staff will appear here.]",
    },
    {
      id: "test-2",
      isDemo: true,
      memberName: "DEMO MEMBER SLOT #02",
      memberTag: "Awaiting Verified Member Review",
      quote:
        "[DEMO PLACEHOLDER — Reserved for authentic member feedback covering personal attention, training consistency, and group classes at Old PB Road, Basavannagar, Nipani.]",
    },
    {
      id: "test-3",
      isDemo: true,
      memberName: "DEMO MEMBER SLOT #03",
      memberTag: "Awaiting Verified Member Review",
      quote:
        "[DEMO PLACEHOLDER — Reserved for verified member stories. Edit `src/data/gymData.js` or use the live Owner Config button to populate real quotes.]",
    },
  ],
};

/**
 * Helper to render dynamic Lucide icons by name
 */
const ProgramIcon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case "Dumbbell":
      return <Dumbbell className={className} />;
    case "HeartPulse":
      return <HeartPulse className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Users":
      return <Users className={className} />;
    case "UserCheck":
      return <UserCheck className={className} />;
    default:
      return <Activity className={className} />;
  }
};

/**
 * Custom Infinity Emblem SVG component
 */
const InfinityLogo = ({ className = "w-9 h-9" }) => (
  <svg
    viewBox="0 0 64 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M18.5 6C11.5964 6 6 11.3726 6 18C6 24.6274 11.5964 30 18.5 30C23.62 30 27.62 26.86 32 21.5L35.5 17.2C39.2 12.6 42.2 10 45.5 10C49.9183 10 53.5 13.5817 53.5 18C53.5 22.4183 49.9183 26 45.5 26C42.4 26 39.6 23.8 36.5 20"
      stroke="#CCFF00"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M45.5 6C52.4036 6 58 11.3726 58 18C58 24.6274 52.4036 30 45.5 30C40.38 30 36.38 26.86 32 21.5L28.5 17.2C24.8 12.6 21.8 10 18.5 10C14.0817 10 10.5 13.5817 10.5 18C10.5 22.4183 14.0817 26 18.5 26C21.6 26 24.4 23.8 27.5 20"
      stroke="#F8FAFC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.65"
    />
  </svg>
);

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // Centralized editable state initialized from initialGymData
  const [gymData, setGymData] = useState(initialGymData);

  // Navigation & UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState("monthly");
  const [activeGalleryCategory, setActiveGalleryCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Modals & Drawers
  const [configDrawerOpen, setConfigDrawerOpen] = useState(false);
  const [activeConfigTab, setActiveConfigTab] = useState("contact");
  const [enquiryModal, setEnquiryModal] = useState({
    isOpen: false,
    subject: "",
    prefilledMessage: "",
    mode: "whatsapp", // 'whatsapp' or 'call'
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    goal: "PRO Membership Enquiry",
    preferredTime: "Morning Session",
    notes: "",
  });
  const [formError, setFormError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Inject Google Fonts & SEO Metadata
  useEffect(() => {
    document.title =
      "INFINITY FITNESS | Premium Gym in Nipani, Karnataka (Old PB Road, Basavannagar)";

    const fontId = "infinity-fitness-google-fonts";
    if (!document.getElementById(fontId)) {
      const link = document.createElement("link");
      link.id = fontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Scroll listener for compact glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtered gallery items
  const galleryCategories = useMemo(() => {
    const cats = [
      "All",
      ...new Set(gymData.gallery.map((item) => item.category)),
    ];
    return cats;
  }, [gymData.gallery]);

  const filteredGallery = useMemo(() => {
    if (activeGalleryCategory === "All") return gymData.gallery;
    return gymData.gallery.filter(
      (item) => item.category === activeGalleryCategory,
    );
  }, [gymData.gallery, activeGalleryCategory]);

  // Keyboard navigation for Lightbox, Mobile Menu, and Modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setLightboxIndex(null);
        setConfigDrawerOpen(false);
        setEnquiryModal((prev) => ({ ...prev, isOpen: false }));
      }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex(
            (prev) =>
              (prev - 1 + filteredGallery.length) % filteredGallery.length,
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  // Smooth section navigation helper
  const scrollToSection = useCallback((sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Trigger WhatsApp enquiry (opens real wa.me link if configured, or interactive preview/config modal if number is pending)
  const triggerWhatsAppEnquiry = useCallback(
    (subject, customMessage) => {
      const cleanNumber = (gymData.contact.whatsappNumber || "").replace(
        /[^0-9]/g,
        "",
      );
      const messageText =
        customMessage ||
        `Hello INFINITY FITNESS (${gymData.brand.city}), I would like to enquire about: ${subject}. Please share verified details and timings.`;

      if (cleanNumber.length >= 10) {
        const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
      } else {
        setEnquiryModal({
          isOpen: true,
          subject,
          prefilledMessage: messageText,
          mode: "whatsapp",
        });
      }
    },
    [gymData.contact.whatsappNumber, gymData.brand.city],
  );

  // Trigger Call action
  const triggerCallAction = useCallback(() => {
    const cleanPhone = (gymData.contact.phone || "").trim();
    if (cleanPhone.length >= 6) {
      window.location.href = `tel:${cleanPhone}`;
    } else {
      setEnquiryModal({
        isOpen: true,
        subject: "Direct Phone Call to INFINITY FITNESS",
        prefilledMessage:
          "Phone number is currently set to a configurable placeholder so no fake contact details are invented. Enter the gym phone number below to enable instant click-to-call.",
        mode: "call",
      });
    }
  }, [gymData.contact.phone]);

  // Handle contact form submission
  const handleEnquiryFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      setFormError(
        "Please enter your name so our team can address you properly.",
      );
      return;
    }
    setFormError("");
    setFormSubmitted(true);
    const composedMessage = `Hello INFINITY FITNESS Nipani!
Name: ${formState.name.trim()}
Enquiry Topic: ${formState.goal}
Preferred Training Slot: ${formState.preferredTime}
${formState.notes.trim() ? `Notes: ${formState.notes.trim()}` : ""}
Please share membership details and batch availability.`;

    triggerWhatsAppEnquiry(formState.goal, composedMessage);
  };

  // Generate exportable src/data/gymData.js file string
  const generatedGymDataCode = useMemo(() => {
    return `// src/data/gymData.js — INFINITY FITNESS (Nipani, Karnataka)
// Centralized configuration file for contact details, pricing, hours, and content.

export const gymData = ${JSON.stringify(gymData, null, 2)};
`;
  }, [gymData]);

  const handleCopyGymData = () => {
    navigator.clipboard.writeText(generatedGymDataCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyPrefilledMessage = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  // Animation variants respecting reduced motion
  const fadeUpVariant = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Facilities", id: "facilities" },
    { label: "Classes", id: "classes" },
    { label: "Trainers", id: "trainers" },
    { label: "Membership", id: "membership" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div
      className="min-h-screen bg-[#070709] text-[#F8FAFC] selection:bg-[#CCFF00] selection:text-[#070709] overflow-x-hidden relative"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Custom utility styles for athletic display typography and subtle film grain */}
      <style>{`
        .font-display {
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 0.03em;
        }
        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }
        .bg-film-grain {
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Subtle Ambient Lime Glow & Film Grain Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-film-grain opacity-35"
        aria-hidden="true"
      />

      {/* =====================================================================
          4. STICKY NAVIGATION BAR
      ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-[#070709]/90 border-b border-white/10 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
            : "bg-gradient-to-b from-[#070709]/90 via-[#070709]/50 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Wordmark & Custom Infinity Emblem */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded-sm"
            aria-label="INFINITY FITNESS Home"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-sm bg-[#101114] border border-white/15 group-hover:border-[#CCFF00]/60 transition-colors">
              <InfinityLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div>
              <span className="font-display text-2xl sm:text-[28px] leading-none tracking-wider text-white block">
                {gymData.brand.name}
              </span>
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#94A3B8] block">
                NIPANI • KARNATAKA
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="relative text-xs font-semibold uppercase tracking-[0.16em] text-[#94A3B8] hover:text-white transition-colors py-1 group focus:outline-none focus-visible:text-[#CCFF00]"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#CCFF00] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions: Owner Config + JOIN NOW CTA */}
          {/* <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setConfigDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-sm bg-[#16181D] hover:bg-white/10 text-[#F8FAFC] border border-white/15 text-xs font-mono-tech uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
              title="Open Editable gymData.js Configuration"
            >
              <Sliders className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span className="hidden xl:inline">gymData.js</span>
              <span className="xl:hidden">Config</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("membership")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] font-extrabold text-xs uppercase tracking-[0.16em] transition-all duration-200 shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:shadow-[0_0_35px_rgba(204,255,0,0.45)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>JOIN NOW</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div> */}

          {/* Mobile Hamburger Control */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* <button
              type="button"
              onClick={() => setConfigDrawerOpen(true)}
              className="p-2.5 rounded-sm bg-[#16181D] border border-white/15 text-[#CCFF00] sm:hidden"
              aria-label="Configure Gym Data"
            >
              <Sliders className="w-5 h-5" />
            </button> */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-sm bg-[#101114] border border-white/15 text-white hover:border-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#CCFF00]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Animated Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="lg:hidden bg-[#070709]/98 backdrop-blur-2xl border-b border-white/15 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 pt-4 pb-6 space-y-3">
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center justify-between w-full px-4 py-3.5 text-left rounded-sm hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                    >
                      <span className="font-display text-2xl tracking-wider text-white">
                        {item.label}
                      </span>
                      <span className="font-mono-tech text-xs text-[#CCFF00]">
                        0{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection("membership")}
                    className="w-full py-3.5 px-5 rounded-sm bg-[#CCFF00] text-[#070709] font-extrabold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2"
                  >
                    <span>JOIN NOW</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setConfigDrawerOpen(true);
                    }}
                    className="w-full py-3.5 px-5 rounded-sm bg-[#16181D] text-white border border-white/15 font-mono-tech text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Sliders className="w-4 h-4 text-[#CCFF00]" />
                    <span>Edit Owner Config (gymData.js)</span>
                  </button> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {/* ===================================================================
            5. CINEMATIC HERO SECTION (#home)
        =================================================================== */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden border-b border-white/10"
        >
          {/* Background Image with Cinematic Scale & Intentional Dark Gradient Overlays */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              initial={{ scale: prefersReducedMotion ? 1 : 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.55 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={gymData.images.hero}
              alt="Dramatic luxury gym interior with modern strength machines and atmospheric lighting"
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-layered directional vignette for razor-sharp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/85 to-[#070709]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/70" />
            <div
              className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(204,255,0,0.12) 0%, rgba(7,7,9,0) 70%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              {/* Left Column: Brand Badges, Oversized Headline, Supporting Copy & CTAs */}
              <div className="lg:col-span-8 space-y-7">
                {/* Top Metadata Bar: Brand + Location + Business-Supplied 4.9 Rating Badge */}
                <motion.div
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  custom={0.05}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] font-mono-tech text-xs uppercase tracking-[0.18em]">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    {gymData.brand.name}
                  </span>

                  <a
                    href={gymData.brand.googleMapsQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#101114]/90 hover:bg-[#16181D] border border-white/15 text-[#F8FAFC] font-mono-tech text-xs transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>{gymData.brand.city}</span>
                    <span className="text-[#94A3B8] hidden sm:inline">
                      • {gymData.brand.neighborhood}
                    </span>
                  </a>
                </motion.div>

                {/* Oversized Athletic Headline */}
                <motion.div
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  custom={0.15}
                >
                  <h1 className="font-display text-6xl sm:text-8xl lg:text-[116px] leading-[0.88] tracking-tight text-white uppercase">
                    <span className="block">
                      {gymData.brand.heroHeadlineLine1}
                    </span>
                    <span className="block text-[#CCFF00] drop-shadow-[0_0_35px_rgba(204,255,0,0.2)]">
                      {gymData.brand.heroHeadlineLine2}
                    </span>
                  </h1>
                </motion.div>

                {/* Supporting Text */}
                <motion.p
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  custom={0.25}
                  className="text-lg sm:text-2xl text-[#F8FAFC]/90 font-medium max-w-2xl leading-relaxed"
                >
                  {gymData.brand.tagline}
                </motion.p>

                {/* Primary & Secondary CTAs */}
                <motion.div
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  custom={0.35}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection("membership")}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] font-extrabold text-sm uppercase tracking-[0.16em] transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] hover:shadow-[0_0_45px_rgba(204,255,0,0.5)]"
                  >
                    <span>EXPLORE MEMBERSHIPS</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection("about")}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-[#101114]/90 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-bold text-sm uppercase tracking-[0.16em] transition-all"
                  >
                    <span>DISCOVER THE GYM</span>
                    <Compass className="w-4 h-4 text-[#CCFF00] transition-transform duration-300 group-hover:rotate-45" />
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Rating Badge Card & Address Verification Panel */}
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
                custom={0.45}
                className="lg:col-span-4"
              >
                <div className="bg-[#101114]/90 backdrop-blur-xl border border-white/15 p-6 rounded-sm space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CCFF00] via-[#CCFF00]/40 to-transparent" />

                  {/* 4.9 Star Rating Badge with transparent note */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#CCFF00] mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]"
                          />
                        ))}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl text-white leading-none">
                          {gymData.rating.score}
                        </span>
                        <span className="font-mono-tech text-xs text-[#94A3B8]">
                          / {gymData.rating.maxScore} STAR RATING
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 font-mono-tech text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      BUSINESS SUPPLIED
                    </span>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed border-t border-white/10 pt-3">
                    <strong className="text-white font-semibold">
                      Transparency Note:
                    </strong>{" "}
                    {gymData.rating.disclaimer}.{" "}
                    {gymData.rating.verificationNote}
                  </p>

                  {/* Location Quick Summary */}
                  <div className="bg-[#16181D] border border-white/10 p-4 rounded-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#CCFF00]">
                        CLUB LOCATION
                      </span>
                      <a
                        href={gymData.brand.googleMapsQuery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-white hover:text-[#CCFF00] transition-colors"
                      >
                        <span>Directions</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-[#F8FAFC] leading-relaxed">
                      {gymData.brand.fullAddress}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Scroll Indicator & Visual Disclaimer */}
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="inline-flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.2em] text-[#94A3B8] hover:text-[#CCFF00] transition-colors group"
              >
                <span className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1 group-hover:border-[#CCFF00]">
                  <motion.span
                    animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"
                  />
                </span>
                <span>SCROLL TO EXPLORE INFINITY FITNESS</span>
              </button>

              {/* <p className="text-[11px] font-mono-tech text-[#94A3B8]">
                [VISUAL NOTE: Illustrative concept photography shown —
                replaceable in gymData.js]
              </p> */}
            </div>
          </div>
        </section>

        {/* ===================================================================
            6. GYM INTRODUCTION (#about)
        =================================================================== */}
        <section
          id="about"
          className="py-24 sm:py-32 bg-[#070709] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: High-Contrast Editorial Image Composition */}
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-sm overflow-hidden border border-white/15 bg-[#101114] aspect-[4/5]">
                  <img
                    src={gymData.images.about}
                    alt="Athlete training with strength equipment in a modern dark athletic club"
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />

                  {/* Floating Overlay Caption */}
                  <div className="absolute bottom-5 left-5 right-5 bg-[#070709]/90 backdrop-blur-md border border-white/15 p-4 rounded-sm flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#CCFF00] block">
                        BASAVANNAGAR • NIPANI
                      </span>
                      <p className="text-sm font-semibold text-white mt-0.5">
                        Built around movement, consistency, and personal
                        progress.
                      </p>
                    </div>
                    <InfinityLogo className="w-8 h-8 shrink-0" />
                  </div>
                </div>

                {/* Decorative Corner Frame */}
                <div
                  className="hidden sm:block absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-[#CCFF00] pointer-events-none"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Right Column: Editorial Copy & Minimalist Core Pillars Area */}
              <motion.div
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-6 space-y-8"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                    <span>01 // ABOUT INFINITY FITNESS</span>
                  </div>
                  <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                    MORE THAN A GYM.{" "}
                    <span className="text-[#CCFF00]">A MOVEMENT.</span>
                  </h2>
                </div>

                <p className="text-lg sm:text-xl text-[#F8FAFC]/90 leading-relaxed font-normal">
                  Your fitness journey deserves more than ordinary. At{" "}
                  <strong className="text-white font-semibold">
                    INFINITY FITNESS
                  </strong>
                  , discover an environment built around movement, consistency,
                  and personal progress.
                </p>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  Located on Old PB Road in Basavannagar, Nipani, our training
                  floor is designed for individuals who value quality equipment,
                  attentive guidance, and an atmosphere where every session
                  moves you closer to your strongest self.
                </p>

                {/* Minimalist Core Pillars Grid (Strictly no invented member counts or founding years) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      code: "PILLAR 01",
                      title: "Modern training environment",
                      desc: "Clean, well-organized strength and conditioning zones built for focused workouts.",
                    },
                    {
                      code: "PILLAR 02",
                      title: "Personalized attention",
                      desc: "Guidance tailored to your fitness starting point, technique, and pace.",
                    },
                    {
                      code: "PILLAR 03",
                      title: "Helpful staff",
                      desc: "Approachable team members ready to assist with equipment and floor support.",
                    },
                    {
                      code: "PILLAR 04",
                      title: "Affordable membership options",
                      desc: "Accessible membership structures designed to deliver genuine training value.",
                    },
                  ].map((pillar) => (
                    <div
                      key={pillar.code}
                      className="p-5 rounded-sm bg-[#101114] border border-white/10 hover:border-[#CCFF00]/50 transition-colors group"
                    >
                      <span className="font-mono-tech text-[11px] text-[#CCFF00] tracking-wider block mb-1.5">
                        {pillar.code}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#CCFF00] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection("facilities")}
                    className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.18em] text-[#CCFF00] hover:text-white transition-colors"
                  >
                    <span>EXPLORE ALL 8 CORE FACILITIES</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            7. FACILITIES SECTION (#facilities)
        =================================================================== */}
        <section
          id="facilities"
          className="py-24 sm:py-32 bg-[#101114] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>02 // CLUB INFRASTRUCTURE & SERVICES</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                  EVERYTHING YOU NEED{" "}
                  <span className="text-[#CCFF00]">TO LEVEL UP.</span>
                </h2>
              </div>

              {/* Legend distinguishing verified facilities from items awaiting schedule confirmation */}
              <div className="flex flex-wrap items-center gap-3 bg-[#070709] border border-white/10 p-3.5 rounded-sm">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-[#CCFF00]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Core Offering
                </span>
                <span className="text-white/20">|</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  Batch / Schedule Pending Owner Confirmation
                </span>
              </div>
            </div>

            {/* Editorial Asymmetric Grid for the 8 Required Facilities */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {gymData.facilities.map((facility, idx) => (
                <motion.article
                  key={facility.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`${facility.span} group relative rounded-sm overflow-hidden bg-[#070709] border border-white/10 hover:border-[#CCFF00]/60 transition-all duration-300 min-h-[320px] flex flex-col justify-between`}
                >
                  {/* Background Image with Dark Gradient Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={`${facility.title} at INFINITY FITNESS`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center opacity-50 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 to-[#070709]/30" />
                  </div>

                  {/* Top Row: Index + Verification Badge */}
                  <div className="relative z-10 p-6 flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-xs text-white/70 bg-[#070709]/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                      0{idx + 1} // {facility.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono-tech text-[10px] uppercase tracking-wider border backdrop-blur-md ${
                        facility.verified
                          ? "bg-[#CCFF00]/15 border-[#CCFF00]/40 text-[#CCFF00]"
                          : "bg-amber-500/15 border-amber-400/40 text-amber-300"
                      }`}
                    >
                      {facility.verified ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {facility.verificationStatus}
                    </span>
                  </div>

                  {/* Bottom Row: Title, Description & Quick Enquire */}
                  <div className="relative z-10 p-6 pt-12 space-y-2.5">
                    <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wide group-hover:text-[#CCFF00] transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-sm text-[#F8FAFC]/80 leading-relaxed max-w-xl">
                      {facility.description}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          triggerWhatsAppEnquiry(
                            `Facility Enquiry: ${facility.title}`,
                          )
                        }
                        className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-wider text-[#CCFF00] hover:underline"
                      >
                        <span>Ask about {facility.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            8. TRAINING PROGRAMS (#classes)
        =================================================================== */}
        <section
          id="classes"
          className="py-24 sm:py-32 bg-[#070709] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>03 // TRAINING DISCIPLINES</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                  FIND YOUR{" "}
                  <span className="text-[#CCFF00]">TRAINING STYLE.</span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-md">
                Whether you prefer progressive barbell training, high-energy
                Zumba, or structured cardio conditioning, choose the discipline
                that fits your routine.
              </p>
            </div>

            {/* 6 Required Training Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gymData.programs.map((program, idx) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="group bg-[#101114] border border-white/10 hover:border-[#CCFF00]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Program Image Header */}
                    <div className="relative h-56 overflow-hidden bg-[#16181D]">
                      <img
                        src={program.image}
                        alt={`${program.title} workout session`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-[#101114]/30 to-transparent" />

                      <div className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-[#070709]/85 backdrop-blur-md border border-white/15 font-mono-tech text-xs text-[#CCFF00]">
                        PROGRAM // {program.code}
                      </div>

                      <div className="absolute bottom-4 right-4 w-11 h-11 rounded-sm bg-[#CCFF00] text-[#070709] flex items-center justify-center shadow-lg">
                        <ProgramIcon
                          name={program.iconName}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    {/* Program Copy */}
                    <div className="p-6 space-y-3">
                      <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#94A3B8] block">
                        {program.focusTag}
                      </span>
                      <h3 className="font-display text-3xl text-white tracking-wide group-hover:text-[#CCFF00] transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-sm text-[#F8FAFC]/85 leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  {/* ENQUIRE NOW CTA */}
                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerWhatsAppEnquiry(
                          `${program.title} Program`,
                          `Hello INFINITY FITNESS Nipani, I would like to enquire about the ${program.title} program ("${program.description}"). Please share session timings and membership details.`,
                        )
                      }
                      className="w-full py-3.5 px-4 rounded-sm bg-[#16181D] group-hover:bg-[#CCFF00] text-white group-hover:text-[#070709] border border-white/15 group-hover:border-[#CCFF00] font-extrabold text-xs uppercase tracking-[0.16em] flex items-center justify-between transition-all duration-200"
                    >
                      <span>ENQUIRE NOW</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            9. TRAINERS & PERSONAL ATTENTION (#trainers)
        =================================================================== */}
        <section
          id="trainers"
          className="py-24 sm:py-32 bg-[#101114] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>04 // COACHING & FLOOR GUIDANCE</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                  BETTER GUIDANCE.{" "}
                  <span className="text-[#CCFF00]">STRONGER YOU.</span>
                </h2>
              </div>

              {/* Explicit Honesty Notice about Demo Trainer Placeholders */}
              <div className="bg-[#070709] border border-amber-400/30 p-4 rounded-sm max-w-md flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-xs text-[#94A3B8] leading-relaxed">
                  <strong className="text-amber-300 font-mono-tech uppercase block mb-0.5">
                    Demo Trainer Placeholders Active
                  </strong>
                  Real trainer names, qualifications, and biographies are never
                  fabricated. Click{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveConfigTab("trainers");
                      setConfigDrawerOpen(true);
                    }}
                    className="text-[#CCFF00] underline font-semibold"
                  >
                    Owner Config
                  </button>{" "}
                  to test inserting verified coach details.
                </div>
              </div>
            </div>

            {/* Trainer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {gymData.trainers.map((trainer, idx) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-[#070709] border border-white/10 hover:border-white/25 rounded-sm overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Portrait Image */}
                    <div className="relative h-80 overflow-hidden bg-[#16181D]">
                      <img
                        src={trainer.image}
                        alt={`Illustrative fitness coach portrait ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/25 to-transparent" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-sm bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono-tech text-[10px] uppercase tracking-wider">
                          {trainer.isDemoPlaceholder
                            ? "DEMO PLACEHOLDER"
                            : "VERIFIED COACH"}
                        </span>
                        <span className="px-2.5 py-1 rounded-sm bg-[#070709]/80 border border-white/10 font-mono-tech text-[10px] text-[#94A3B8]">
                          SLOT 0{idx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Structured Editable Fields: Name, Specialization, Experience, Qualifications, Short Bio */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#CCFF00] block">
                          {trainer.specialization}
                        </span>
                        <h3 className="font-display text-3xl text-white tracking-wide mt-1">
                          {trainer.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/10 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono-tech text-[#94A3B8] uppercase">
                            Experience:
                          </span>
                          <span className="text-white font-medium text-right">
                            {trainer.experience}
                          </span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono-tech text-[#94A3B8] uppercase">
                            Qualifications:
                          </span>
                          <span className="text-white font-medium text-right">
                            {trainer.qualifications}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#94A3B8] leading-relaxed border-t border-white/10 pt-3">
                        {trainer.bio}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      type="button"
                      onClick={() =>
                        triggerWhatsAppEnquiry(
                          "Personal Training & Coach Guidance Enquiry",
                        )
                      }
                      className="w-full py-3 px-4 rounded-sm bg-[#16181D] hover:bg-white/10 text-white border border-white/15 font-mono-tech text-xs uppercase tracking-wider flex items-center justify-between transition-colors"
                    >
                      <span>Enquire About Personal Coaching</span>
                      <ChevronRight className="w-4 h-4 text-[#CCFF00]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            10. MEMBERSHIP PRICING — HIGH-CONVERSION SECTION (#membership)
        =================================================================== */}
        <section
          id="membership"
          className="py-24 sm:py-32 bg-[#070709] border-b border-white/10 relative overflow-hidden"
        >
          {/* Subtle radial lime glow behind Pro card */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, rgba(204,255,0,0.18) 0%, rgba(7,7,9,0) 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Heading & Proposed Billing Duration Switcher */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>05 // MEMBERSHIP TIERS</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                  INVEST IN YOUR{" "}
                  <span className="text-[#CCFF00]">STRONGEST SELF.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8]">
                  Select a membership tier and proposed duration below to send
                  an instant WhatsApp enquiry directly to INFINITY FITNESS.
                </p>
              </div>

              {/* Proposed Billing Cycle Selector */}
              <div className="space-y-2">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] block">
                  PROPOSED BILLING DURATIONS (PENDING OWNER CONFIRMATION)
                </span>
                <div
                  className="inline-flex flex-wrap bg-[#101114] p-1.5 rounded-sm border border-white/15 gap-1"
                  role="tablist"
                  aria-label="Proposed membership billing durations"
                >
                  {gymData.billingCycles.map((cycle) => {
                    const active = selectedBilling === cycle.id;
                    return (
                      <button
                        key={cycle.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedBilling(cycle.id)}
                        className={`px-4 py-2 rounded-sm font-mono-tech text-xs uppercase tracking-wider transition-all ${
                          active
                            ? "bg-[#CCFF00] text-[#070709] font-bold shadow"
                            : "text-[#94A3B8] hover:text-white"
                        }`}
                      >
                        {cycle.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Optional Configurable Special Offer Banner (No fake countdowns) */}
            {gymData.specialOffer.enabled && (
              <div className="bg-gradient-to-r from-[#16181D] via-[#101114] to-[#16181D] border border-[#CCFF00]/35 rounded-sm p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-[#CCFF00]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{gymData.specialOffer.badge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {gymData.specialOffer.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-tech text-[#94A3B8]">
                    <span>
                      • Benefit: {gymData.specialOffer.discountPlaceholder}
                    </span>
                    <span>
                      • Expiry: {gymData.specialOffer.expiryPlaceholder}
                    </span>
                    <span>
                      • Terms: {gymData.specialOffer.termsPlaceholder}
                    </span>
                  </div>
                </div>

                {/* <button
                  type="button"
                  onClick={() => {
                    setActiveConfigTab("pricing");
                    setConfigDrawerOpen(true);
                  }}
                  className="shrink-0 px-4 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/15 font-mono-tech text-xs text-[#CCFF00] uppercase tracking-wider transition-colors"
                >
                  Customize Offer in gymData.js
                </button> */}
              </div>
            )}

            {/* 3 Membership Cards: STARTER, PRO (POPULAR CHOICE), ELITE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
              {gymData.memberships.map((plan) => {
                const currentCycleObj =
                  gymData.billingCycles.find((c) => c.id === selectedBilling) ||
                  gymData.billingCycles[0];
                const displayedPrice =
                  plan.prices[selectedBilling] || "Price to be confirmed";

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-sm p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      plan.popular
                        ? "bg-[#101114] border-2 border-[#CCFF00] shadow-[0_0_50px_rgba(204,255,0,0.12)] lg:-translate-y-2"
                        : "bg-[#101114]/90 border border-white/15 hover:border-white/30"
                    }`}
                  >
                    {/* Popular Choice Ribbon */}
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-sm bg-[#CCFF00] text-[#070709] font-mono-tech font-extrabold text-[11px] uppercase tracking-[0.18em] shadow">
                        {plan.popularBadge}
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Plan Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                        <div>
                          <span className="font-mono-tech text-xs uppercase tracking-widest text-[#94A3B8]">
                            MEMBERSHIP TIER
                          </span>
                          <h3 className="font-display text-5xl text-white tracking-wide mt-1">
                            {plan.name}
                          </h3>
                          <p className="text-xs text-[#94A3B8] mt-1">
                            {plan.subtitle}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-sm bg-[#16181D] border border-white/10 flex items-center justify-center text-[#CCFF00]">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Configurable Price Box */}
                      <div className="bg-[#070709] border border-white/10 p-4 rounded-sm">
                        <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#94A3B8] uppercase">
                          <span>Selected Cycle: {currentCycleObj.label}</span>
                          <span className="text-[#CCFF00]">Editable Field</span>
                        </div>
                        <div className="font-display text-3xl sm:text-4xl text-white tracking-wide mt-1">
                          {displayedPrice}
                        </div>
                        <p className="text-[11px] text-[#94A3B8] mt-1">
                          No unverified prices or joining fees are invented.
                          Confirm current tariff via WhatsApp.
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 pt-1">
                        <span className="font-mono-tech text-xs uppercase tracking-wider text-white block">
                          INCLUDED IN {plan.name}:
                        </span>
                        <ul className="space-y-3">
                          {plan.features.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-start gap-3 text-sm text-[#F8FAFC]"
                            >
                              <span className="w-5 h-5 rounded-full bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* WhatsApp Enquiry CTA */}
                    <div className="pt-8 mt-8 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() =>
                          triggerWhatsAppEnquiry(
                            `${plan.name} Membership (${currentCycleObj.label})`,
                            `Hello INFINITY FITNESS Nipani! I would like to enquire about the ${plan.name} Membership plan (${currentCycleObj.label} option). Please share the confirmed fee structure and joining process.`,
                          )
                        }
                        className={`w-full py-4 px-5 rounded-sm font-extrabold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all ${
                          plan.popular
                            ? "bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] shadow-[0_0_25px_rgba(204,255,0,0.25)]"
                            : "bg-[#16181D] hover:bg-[#CCFF00] text-white hover:text-[#070709] border border-white/15 hover:border-[#CCFF00]"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{plan.ctaText}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            11. GALLERY SECTION (#gallery) WITH ACCESSIBLE LIGHTBOX
        =================================================================== */}
        <section
          id="gallery"
          className="py-24 sm:py-32 bg-[#101114] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Heading & Category Filters */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>06 // VISUAL ATMOSPHERE</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                  INSIDE THE{" "}
                  <span className="text-[#CCFF00]">INFINITY EXPERIENCE.</span>
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter gallery by theme"
              >
                {galleryCategories.map((category) => {
                  const active = activeGalleryCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setLightboxIndex(null);
                        setActiveGalleryCategory(category);
                      }}
                      className={`px-3.5 py-2 rounded-sm font-mono-tech text-xs uppercase tracking-wider border transition-all ${
                        active
                          ? "bg-[#CCFF00] text-[#070709] border-[#CCFF00] font-bold"
                          : "bg-[#070709] text-[#94A3B8] border-white/10 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Honest Disclaimer Banner for Illustrative Gallery Visuals */}
            {/* <div className="bg-[#070709] border border-white/10 px-4 py-3 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#94A3B8]">
              <span>
                <strong className="text-white font-mono-tech uppercase mr-2">
                  [ILLUSTRATIVE CONCEPT GALLERY]:
                </strong>
                {gymData.images.visualDisclaimer}
              </span>
              <span className="font-mono-tech text-[11px] text-[#CCFF00] shrink-0">
                Click any visual to open Lightbox
              </span>
            </div> */}

            {/* Editorial Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="group relative rounded-sm overflow-hidden bg-[#070709] border border-white/10 hover:border-[#CCFF00]/60 aspect-[16/11] cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.title} in full-screen lightbox`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-4 right-4 w-9 h-9 rounded-sm bg-[#070709]/80 border border-white/15 text-white group-hover:bg-[#CCFF00] group-hover:text-[#070709] flex items-center justify-center transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#CCFF00] block">
                      {item.category}
                    </span>
                    <h3 className="font-display text-2xl text-white tracking-wide mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            12. WHY CHOOSE INFINITY FITNESS?
        =================================================================== */}
        <section className="py-24 sm:py-28 bg-[#070709] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span>07 // THE INFINITY ADVANTAGE</span>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl leading-[0.92] text-white uppercase">
                WHY CHOOSE{" "}
                <span className="text-[#CCFF00]">INFINITY FITNESS?</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                Focused on real training fundamentals in Nipani — combining
                modern equipment, multiple training modalities, and a welcoming
                floor team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
              {[
                {
                  icon: Dumbbell,
                  title: "Modern machinery",
                  desc: "Well-maintained strength and resistance machines built for smooth biomechanics.",
                },
                {
                  icon: Users,
                  title: "Supportive and helpful staff",
                  desc: "A welcoming environment where members receive courteous assistance every day.",
                },
                {
                  icon: UserCheck,
                  title: "Personalized attention",
                  desc: "Practical guidance tailored to individual movement capability and goals.",
                },
                {
                  icon: Sparkles,
                  title: "Group fitness options",
                  desc: "High-energy Zumba and group workouts that make staying active enjoyable.",
                },
                {
                  icon: Flame,
                  title: "Multiple training styles",
                  desc: "Combine strength training, cardio conditioning, and HIIT under one roof.",
                },
                {
                  icon: Award,
                  title: "Affordable membership options",
                  desc: "Straightforward membership tiers structured for sustainable long-term fitness.",
                },
              ].map((reason, index) => {
                const IconComp = reason.icon;
                return (
                  <div
                    key={reason.title}
                    className="p-7 sm:p-8 bg-[#070709] hover:bg-[#101114] border-r border-b border-white/10 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-sm bg-[#16181D] border border-white/10 group-hover:border-[#CCFF00] flex items-center justify-center text-[#CCFF00] transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono-tech text-xs text-[#94A3B8]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl text-white tracking-wide group-hover:text-[#CCFF00] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            13. TESTIMONIALS & RATING
        =================================================================== */}
        <section className="py-24 sm:py-28 bg-[#101114] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                  <span>08 // MEMBER FEEDBACK & RATING</span>
                </div>
                <h2 className="font-display text-5xl sm:text-6xl leading-[0.92] text-white uppercase">
                  COMMUNITY TRUST &{" "}
                  <span className="text-[#CCFF00]">RATING.</span>
                </h2>
              </div>

              {/* Supplied 4.9 Rating Card with Configurable Source Link */}
              <div className="bg-[#070709] border border-white/15 p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl text-[#CCFF00] leading-none">
                    {gymData.rating.score}
                  </span>
                  <div>
                    <div className="flex items-center gap-1 text-[#CCFF00]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]"
                        />
                      ))}
                    </div>
                    <span className="font-mono-tech text-[11px] text-white block mt-1">
                      {gymData.rating.disclaimer}
                    </span>
                  </div>
                </div>

                {/* <div className="sm:border-l border-white/10 sm:pl-5 text-xs text-[#94A3B8] max-w-xs">
                  {gymData.rating.sourceUrl ? (
                    <a
                      href={gymData.rating.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#CCFF00] hover:underline font-mono-tech"
                    >
                      <span>View Verified Rating Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span>
                      Review count & external verification link configurable in{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveConfigTab("contact");
                          setConfigDrawerOpen(true);
                        }}
                        className="text-[#CCFF00] underline"
                      >
                        gymData.js
                      </button>
                      .
                    </span>
                  )}
                </div> */}
              </div>
            </div>

            {/* Demo Testimonial Slots (Clearly marked as demo data) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gymData.testimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#070709] border border-white/10 p-6 sm:p-7 rounded-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-sm bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono-tech text-[10px] uppercase tracking-wider">
                        DEMO PLACEHOLDER DATA
                      </span>
                      <div className="flex items-center gap-1 text-[#CCFF00]/60">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-3.5 h-3.5 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed italic">
                      {item.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="font-display text-2xl text-white tracking-wide">
                      {item.memberName}
                    </div>
                    <div className="font-mono-tech text-[11px] text-[#CCFF00]">
                      {item.memberTag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            14. LOCATION & CONTACT (#contact)
        =================================================================== */}
        <section
          id="contact"
          className="py-24 sm:py-32 bg-[#070709] border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span>09 // VISIT OR ENQUIRE</span>
              </div>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.92] text-white uppercase">
                VISIT INFINITY FITNESS{" "}
                <span className="text-[#CCFF00]">IN NIPANI.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Address Card, Direct Actions, Opening Hours & Verified Map Embed */}
              <div className="lg:col-span-7 space-y-6">
                {/* Prominent Address & Direct Action Buttons */}
                <div className="bg-[#101114] border border-white/15 p-6 sm:p-8 rounded-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="space-y-2">
                      <span className="font-mono-tech text-xs uppercase tracking-widest text-[#CCFF00] block">
                        VERIFIED CLUB ADDRESS
                      </span>
                      <h3 className="font-display text-4xl text-white tracking-wide">
                        {gymData.brand.name}
                      </h3>
                      <p className="text-base sm:text-lg text-[#F8FAFC] leading-relaxed">
                        Old PB Road, Basavannagar,
                        <br />
                        Nipani, Karnataka 591237, India.
                      </p>
                    </div>

                    <a
                      href={gymData.brand.googleMapsQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-sm bg-[#16181D] hover:bg-[#CCFF00] text-white hover:text-[#070709] border border-white/15 font-mono-tech text-xs uppercase tracking-wider transition-all shrink-0"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>GET DIRECTIONS</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Contact Details & Hours Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#CCFF00]">
                        <Phone className="w-4 h-4" />
                        <span>DIRECT CONTACT</span>
                      </div>
                      <p className="text-sm text-white font-semibold">
                        {gymData.contact.phone ||
                          gymData.contact.phonePlaceholderLabel}
                      </p>
                      <p className="text-xs text-[#94A3B8]">
                        WhatsApp:{" "}
                        {gymData.contact.whatsappNumber ||
                          gymData.contact.whatsappPlaceholderLabel}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[#CCFF00]">
                        <Clock className="w-4 h-4" />
                        <span>
                          OPENING HOURS ({gymData.openingHours.statusNote})
                        </span>
                      </div>
                      <p className="text-xs text-[#F8FAFC]">
                        <strong className="text-white">
                          {gymData.openingHours.weekdayLabel}:
                        </strong>{" "}
                        {gymData.openingHours.weekdayHours}
                      </p>
                      <p className="text-xs text-[#F8FAFC]">
                        <strong className="text-white">
                          {gymData.openingHours.sundayLabel}:
                        </strong>{" "}
                        {gymData.openingHours.sundayHours}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: WhatsApp, Click-to-Call, Google Maps */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerWhatsAppEnquiry(
                          "General Club & Membership Enquiry",
                        )
                      }
                      className="py-3.5 px-4 rounded-sm bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WHATSAPP US</span>
                    </button>

                    <button
                      type="button"
                      onClick={triggerCallAction}
                      className="py-3.5 px-4 rounded-sm bg-[#16181D] hover:bg-white/10 text-white border border-white/15 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#CCFF00]" />
                      <span>CALL GYM</span>
                    </button>

                    <a
                      href={gymData.brand.googleMapsQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3.5 px-4 rounded-sm bg-[#16181D] hover:bg-white/10 text-white border border-white/15 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <MapPin className="w-4 h-4 text-[#CCFF00]" />
                      <span>GOOGLE MAPS</span>
                    </a>
                  </div>
                </div>

                {/* Clean Map Embed Section for Old PB Road, Basavannagar, Nipani */}
                <div className="bg-[#101114] border border-white/15 rounded-sm overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-xs text-[#94A3B8]">
                      MAP VIEW // OLD PB ROAD, BASAVANNAGAR, NIPANI 591237
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setGymData((prev) => ({
                          ...prev,
                          brand: {
                            ...prev.brand,
                            mapEmbedVerified: !prev.brand.mapEmbedVerified,
                          },
                        }))
                      }
                      className="font-mono-tech text-[11px] text-[#CCFF00] hover:underline"
                    >
                      {gymData.brand.mapEmbedVerified
                        ? "Hide Map Embed"
                        : "Show Map Embed"}
                    </button>
                  </div>

                  {gymData.brand.mapEmbedVerified ? (
                    <div className="h-72 w-full bg-[#16181D] relative">
                      <iframe
                        title="INFINITY FITNESS Location Map - Old PB Road, Basavannagar, Nipani"
                        src={gymData.brand.mapEmbedUrl}
                        className="w-full h-full border-0 filter grayscale contrast-125 opacity-90"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-3">
                      <p className="text-xs text-[#94A3B8]">
                        Map embed paused pending owner pin verification. Use the
                        direct Google Maps link below.
                      </p>
                      <a
                        href={gymData.brand.googleMapsQuery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#16181D] border border-white/15 text-xs font-mono-tech text-[#CCFF00]"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5 Columns: Accessible Quick WhatsApp Enquiry Form */}
              <div className="lg:col-span-5 bg-[#101114] border border-white/15 p-6 sm:p-8 rounded-sm space-y-6">
                <div>
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[#CCFF00] block">
                    INSTANT WHATSAPP DISPATCH
                  </span>
                  <h3 className="font-display text-4xl text-white tracking-wide mt-1">
                    SEND AN ENQUIRY
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Fill out your training preference below to generate a
                    prefilled WhatsApp enquiry for INFINITY FITNESS.
                  </p>
                </div>

                <form
                  onSubmit={handleEnquiryFormSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="member-name"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#F8FAFC] mb-2"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="member-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => {
                        setFormState((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                        if (formError) setFormError("");
                      }}
                      placeholder="e.g., Rohan Patil"
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="member-goal"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#F8FAFC] mb-2"
                    >
                      Interested Membership or Program
                    </label>
                    <select
                      id="member-goal"
                      value={formState.goal}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          goal: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm focus:outline-none"
                    >
                      <option value="STARTER Membership Enquiry">
                        STARTER Membership
                      </option>
                      <option value="PRO Membership Enquiry (Popular)">
                        PRO Membership (Popular Choice)
                      </option>
                      <option value="ELITE Membership Enquiry">
                        ELITE Membership
                      </option>
                      <option value="Strength & Conditioning Program">
                        Strength & Conditioning
                      </option>
                      <option value="HIIT & Cardio Training">
                        HIIT & Cardio Training
                      </option>
                      <option value="Zumba & Group Classes">
                        Zumba & Group Classes
                      </option>
                      <option value="Personal Training Attention">
                        Personal Attention
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="member-time"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#F8FAFC] mb-2"
                    >
                      Preferred Visit / Batch Timing
                    </label>
                    <select
                      id="member-time"
                      value={formState.preferredTime}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          preferredTime: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm focus:outline-none"
                    >
                      <option value="Morning Session">Morning Session</option>
                      <option value="Afternoon Session">
                        Afternoon Session
                      </option>
                      <option value="Evening Session">Evening Session</option>
                      <option value="Weekend Visit">Weekend Visit</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="member-notes"
                      className="block font-mono-tech text-xs uppercase tracking-wider text-[#F8FAFC] mb-2"
                    >
                      Questions for the Team (Optional)
                    </label>
                    <textarea
                      id="member-notes"
                      rows={3}
                      value={formState.notes}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      placeholder="Ask about membership fees, batch timings, or trial visit..."
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="p-3 rounded-sm bg-red-500/15 border border-red-400/40 text-red-200 text-xs flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {formSubmitted && !formError && (
                    <div className="p-3 rounded-sm bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Enquiry prepared! Opening WhatsApp dispatch...
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-sm bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] font-extrabold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(204,255,0,0.25)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>CONTINUE TO WHATSAPP</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            15. FINAL CONVERSION SECTION
        =================================================================== */}
        <section className="relative py-28 sm:py-36 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0">
            <img
              src={gymData.images.cta}
              alt="Atmospheric fitness training backdrop"
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-[#CCFF00] font-mono-tech text-xs uppercase tracking-[0.2em]">
              <InfinityLogo className="w-5 h-5" />
              <span>INFINITY FITNESS • NIPANI</span>
            </div>

            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9] text-white uppercase">
              YOUR NEXT CHAPTER{" "}
              <span className="text-[#CCFF00]">STARTS HERE.</span>
            </h2>

            <p className="text-lg sm:text-2xl text-[#F8FAFC]/90 max-w-2xl mx-auto">
              Take the first step toward a stronger, more confident you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection("membership")}
                className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#CCFF00] hover:bg-[#d8ff33] text-[#070709] font-extrabold text-sm uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(204,255,0,0.3)]"
              >
                <span>EXPLORE MEMBERSHIPS</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() =>
                  triggerWhatsAppEnquiry(
                    "Starting My Fitness Journey at INFINITY FITNESS",
                  )
                }
                className="w-full sm:w-auto px-8 py-4 rounded-sm bg-[#101114] hover:bg-white/10 text-white border border-white/25 font-bold text-sm uppercase tracking-[0.16em] inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#CCFF00]" />
                <span>CHAT ON WHATSAPP</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          PREMIUM FOOTER
      ===================================================================== */}
      <footer className="bg-[#070709] text-[#94A3B8] pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#101114] border border-white/15 flex items-center justify-center">
                  <InfinityLogo className="w-7 h-7" />
                </div>
                <span className="font-display text-3xl text-white tracking-wider">
                  {gymData.brand.name}
                </span>
              </div>
              <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
                {gymData.brand.tagline} Located at {gymData.brand.fullAddress}.
              </p>
              <div className="pt-1 flex items-center gap-3">
                {[
                  {
                    icon: Instagram,
                    label: "Instagram",
                    url: gymData.socials.instagram,
                  },
                  {
                    icon: Facebook,
                    label: "Facebook",
                    url: gymData.socials.facebook,
                  },
                  {
                    icon: Youtube,
                    label: "YouTube",
                    url: gymData.socials.youtube,
                  },
                ].map((soc) => {
                  const SocIcon = soc.icon;
                  return soc.url ? (
                    <a
                      key={soc.label}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className="w-10 h-10 rounded-sm bg-[#101114] border border-white/10 hover:border-[#CCFF00] text-white flex items-center justify-center transition-colors"
                    >
                      <SocIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      key={soc.label}
                      type="button"
                      onClick={() => {
                        setActiveConfigTab("contact");
                        setConfigDrawerOpen(true);
                      }}
                      title={`${soc.label} link pending owner configuration`}
                      className="w-10 h-10 rounded-sm bg-[#101114] border border-white/10 hover:border-[#CCFF00]/50 text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors"
                    >
                      <SocIcon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-white block">
                NAVIGATION
              </span>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-[#CCFF00] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address & Config */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono-tech text-xs uppercase tracking-widest text-white block">
                CLUB LOCATION & DATA CONFIG
              </span>
              <p className="text-sm text-[#F8FAFC] leading-relaxed">
                {gymData.brand.fullAddress}
              </p>
              <p className="text-xs text-[#94A3B8]">
                Rating: {gymData.rating.score} / 5.0 (
                {gymData.rating.disclaimer})
              </p>
              <div className="pt-2">
                {/* <button
                  type="button"
                  onClick={() => setConfigDrawerOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-[#101114] hover:bg-[#16181D] text-white border border-white/15 font-mono-tech text-xs uppercase tracking-wider"
                >
                  <Code2 className="w-4 h-4 text-[#CCFF00]" />
                  <span>Inspect / Edit gymData.js</span>
                </button> */}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
            <span>
              © {new Date().getFullYear()} {gymData.brand.name} — Nipani,
              Karnataka. All rights reserved.
            </span>
            <span>Built with React + Tailwind CSS + Framer Motion</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          ACCESSIBLE GALLERY LIGHTBOX MODAL
      ===================================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            <div className="max-w-5xl w-full space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono-tech text-xs text-[#CCFF00] uppercase">
                    {filteredGallery[lightboxIndex].category} // IMAGE{" "}
                    {lightboxIndex + 1} OF {filteredGallery.length}
                  </span>
                  <h3 className="font-display text-3xl text-white tracking-wide">
                    {filteredGallery[lightboxIndex].title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 rounded-sm bg-[#16181D] border border-white/15 text-white hover:border-[#CCFF00]"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative rounded-sm overflow-hidden border border-white/15 bg-[#101114] max-h-[70vh] flex items-center justify-center">
                <img
                  src={filteredGallery[lightboxIndex].image}
                  alt={filteredGallery[lightboxIndex].alt}
                  className="w-full max-h-[70vh] object-contain"
                />

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (prev) =>
                        (prev - 1 + filteredGallery.length) %
                        filteredGallery.length,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#070709]/85 border border-white/20 text-white hover:border-[#CCFF00]"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (prev) => (prev + 1) % filteredGallery.length,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#070709]/85 border border-white/20 text-white hover:border-[#CCFF00]"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#101114] border border-white/10 p-4 rounded-sm">
                <p className="text-xs text-[#94A3B8]">
                  {filteredGallery[lightboxIndex].alt}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const item = filteredGallery[lightboxIndex];
                    setLightboxIndex(null);
                    triggerWhatsAppEnquiry(`Facility Enquiry: ${item.title}`);
                  }}
                  className="shrink-0 px-4 py-2 rounded-sm bg-[#CCFF00] text-[#070709] font-extrabold text-xs uppercase tracking-wider"
                >
                  Enquire About This Area
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          WHATSAPP / CALL ENQUIRY PREVIEW & CONFIGURATION MODAL
          (Shown when owner has not yet entered their verified phone/WhatsApp number)
      ===================================================================== */}
      <AnimatePresence>
        {enquiryModal.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070709]/90 backdrop-blur-xl flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp Enquiry Dispatch"
          >
            <div className="bg-[#101114] border border-white/20 rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[#CCFF00] block">
                    {enquiryModal.mode === "whatsapp"
                      ? "WHATSAPP ENQUIRY DISPATCH"
                      : "CLICK-TO-CALL CONFIGURATION"}
                  </span>
                  <h3 className="font-display text-3xl text-white tracking-wide mt-0.5">
                    {enquiryModal.subject}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEnquiryModal((prev) => ({ ...prev, isOpen: false }))
                  }
                  className="p-2 rounded-sm bg-[#16181D] text-[#94A3B8] hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {enquiryModal.mode === "whatsapp" ? (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-sm bg-[#070709] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[11px] text-[#CCFF00] uppercase">
                        Prefilled WhatsApp Message:
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPrefilledMessage(
                            enquiryModal.prefilledMessage,
                          )
                        }
                        className="inline-flex items-center gap-1 font-mono-tech text-[11px] text-white hover:text-[#CCFF00]"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>
                          {copiedMessage ? "Copied!" : "Copy Message"}
                        </span>
                      </button>
                    </div>
                    <p className="text-xs text-[#F8FAFC] whitespace-pre-line leading-relaxed">
                      {enquiryModal.prefilledMessage}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="modal-wa-input"
                      className="block font-mono-tech text-xs text-[#94A3B8]"
                    >
                      Configure Owner WhatsApp Number (with country code, e.g.
                      919876543210) to open WhatsApp directly:
                    </label>
                    <input
                      id="modal-wa-input"
                      type="text"
                      value={gymData.contact.whatsappNumber}
                      onChange={(e) =>
                        setGymData((prev) => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            whatsappNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g., 919876543210"
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm font-mono-tech focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const clean = (
                          gymData.contact.whatsappNumber || ""
                        ).replace(/[^0-9]/g, "");
                        const url = clean
                          ? `https://wa.me/${clean}?text=${encodeURIComponent(
                              enquiryModal.prefilledMessage,
                            )}`
                          : `https://wa.me/?text=${encodeURIComponent(
                              enquiryModal.prefilledMessage,
                            )}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="flex-1 py-3.5 px-5 rounded-sm bg-[#CCFF00] text-[#070709] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>LAUNCH WHATSAPP NOW</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {enquiryModal.prefilledMessage}
                  </p>
                  <div>
                    <label
                      htmlFor="modal-phone-input"
                      className="block font-mono-tech text-xs text-white mb-2"
                    >
                      Gym Phone Number:
                    </label>
                    <input
                      id="modal-phone-input"
                      type="tel"
                      value={gymData.contact.phone}
                      onChange={(e) =>
                        setGymData((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, phone: e.target.value },
                        }))
                      }
                      placeholder="e.g., +91 98765 43210"
                      className="w-full px-4 py-3 rounded-sm bg-[#070709] border border-white/15 focus:border-[#CCFF00] text-white text-sm font-mono-tech focus:outline-none"
                    />
                  </div>
                  {gymData.contact.phone && (
                    <a
                      href={`tel:${gymData.contact.phone}`}
                      className="w-full py-3.5 px-5 rounded-sm bg-[#CCFF00] text-[#070709] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>CALL {gymData.contact.phone}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          OWNER CONFIG & PROJECT SOURCE INSPECTOR DRAWER (src/data/gymData.js)
      ===================================================================== */}
      <AnimatePresence>
        {configDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070709]/85 backdrop-blur-md flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Owner Configuration Drawer"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-2xl bg-[#101114] border-l border-white/15 h-full flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-[#070709]">
                <div>
                  <span className="font-mono-tech text-[11px] text-[#CCFF00] uppercase tracking-widest block">
                    CENTRALIZED CONFIGURATION FILE
                  </span>
                  <h3 className="font-display text-3xl text-white tracking-wide">
                    src/data/gymData.js — LIVE EDITOR
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigDrawerOpen(false)}
                  className="p-2.5 rounded-sm bg-[#16181D] text-white hover:border-[#CCFF00] border border-white/10"
                  aria-label="Close configuration drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Tabs */}
              <div className="px-6 pt-4 bg-[#070709] border-b border-white/10 flex flex-wrap gap-2">
                {[
                  { id: "contact", label: "Contact & Hours" },
                  { id: "pricing", label: "Membership Pricing" },
                  { id: "trainers", label: "Trainers" },
                  { id: "export", label: "Export Code & Setup" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveConfigTab(tab.id)}
                    className={`px-3.5 py-2 rounded-t-sm font-mono-tech text-xs uppercase tracking-wider border-t border-x transition-colors ${
                      activeConfigTab === tab.id
                        ? "bg-[#101114] text-[#CCFF00] border-white/15 font-bold"
                        : "bg-transparent text-[#94A3B8] border-transparent hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {activeConfigTab === "contact" && (
                  <div className="space-y-4">
                    <p className="text-xs text-[#94A3B8]">
                      Update contact numbers, opening hours, and rating
                      verification link in real time. Changes reflect
                      immediately across all buttons on the website.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono-tech text-xs text-white mb-1.5">
                          WhatsApp Number (with country code)
                        </label>
                        <input
                          type="text"
                          value={gymData.contact.whatsappNumber}
                          onChange={(e) =>
                            setGymData((prev) => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                whatsappNumber: e.target.value,
                              },
                            }))
                          }
                          placeholder="e.g., 919876543210"
                          className="w-full px-3.5 py-2.5 rounded-sm bg-[#070709] border border-white/15 text-white text-xs font-mono-tech"
                        />
                      </div>

                      <div>
                        <label className="block font-mono-tech text-xs text-white mb-1.5">
                          Phone Number (for Click-to-Call)
                        </label>
                        <input
                          type="text"
                          value={gymData.contact.phone}
                          onChange={(e) =>
                            setGymData((prev) => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                phone: e.target.value,
                              },
                            }))
                          }
                          placeholder="e.g., +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-sm bg-[#070709] border border-white/15 text-white text-xs font-mono-tech"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono-tech text-xs text-white mb-1.5">
                          Monday – Saturday Hours
                        </label>
                        <input
                          type="text"
                          value={gymData.openingHours.weekdayHours}
                          onChange={(e) =>
                            setGymData((prev) => ({
                              ...prev,
                              openingHours: {
                                ...prev.openingHours,
                                weekdayHours: e.target.value,
                                statusNote: "Owner Configured",
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-sm bg-[#070709] border border-white/15 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-mono-tech text-xs text-white mb-1.5">
                          Sunday Hours
                        </label>
                        <input
                          type="text"
                          value={gymData.openingHours.sundayHours}
                          onChange={(e) =>
                            setGymData((prev) => ({
                              ...prev,
                              openingHours: {
                                ...prev.openingHours,
                                sundayHours: e.target.value,
                                statusNote: "Owner Configured",
                              },
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-sm bg-[#070709] border border-white/15 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono-tech text-xs text-white mb-1.5">
                        4.9 Rating Verification URL (Google Business Profile
                        link once verified)
                      </label>
                      <input
                        type="url"
                        value={gymData.rating.sourceUrl}
                        onChange={(e) =>
                          setGymData((prev) => ({
                            ...prev,
                            rating: {
                              ...prev.rating,
                              sourceUrl: e.target.value,
                            },
                          }))
                        }
                        placeholder="https://..."
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#070709] border border-white/15 text-white text-xs font-mono-tech"
                      />
                    </div>
                  </div>
                )}

                {activeConfigTab === "pricing" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between bg-[#070709] p-3.5 rounded-sm border border-white/10">
                      <span className="font-mono-tech text-xs text-white">
                        Show Optional Promotional Banner
                      </span>
                      <input
                        type="checkbox"
                        checked={gymData.specialOffer.enabled}
                        onChange={(e) =>
                          setGymData((prev) => ({
                            ...prev,
                            specialOffer: {
                              ...prev.specialOffer,
                              enabled: e.target.checked,
                            },
                          }))
                        }
                        className="w-4 h-4 accent-[#CCFF00]"
                      />
                    </div>

                    {gymData.memberships.map((plan, pIdx) => (
                      <div
                        key={plan.id}
                        className="p-4 rounded-sm bg-[#070709] border border-white/10 space-y-3"
                      >
                        <h4 className="font-display text-2xl text-[#CCFF00]">
                          {plan.name}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {gymData.billingCycles.map((cycle) => (
                            <div key={cycle.id}>
                              <label className="block font-mono-tech text-[10px] uppercase text-[#94A3B8] mb-1">
                                {cycle.label} Price
                              </label>
                              <input
                                type="text"
                                value={plan.prices[cycle.id]}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setGymData((prev) => {
                                    const updated = [...prev.memberships];
                                    updated[pIdx] = {
                                      ...updated[pIdx],
                                      prices: {
                                        ...updated[pIdx].prices,
                                        [cycle.id]: val,
                                      },
                                    };
                                    return { ...prev, memberships: updated };
                                  });
                                }}
                                className="w-full px-3 py-2 rounded-sm bg-[#101114] border border-white/15 text-white text-xs font-mono-tech"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeConfigTab === "trainers" && (
                  <div className="space-y-5">
                    {gymData.trainers.map((tr, tIdx) => (
                      <div
                        key={tr.id}
                        className="p-4 rounded-sm bg-[#070709] border border-white/10 space-y-3"
                      >
                        <span className="font-mono-tech text-xs text-[#CCFF00]">
                          Trainer Slot #0{tIdx + 1}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-mono-tech text-[10px] text-[#94A3B8] mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={tr.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setGymData((prev) => {
                                  const list = [...prev.trainers];
                                  list[tIdx] = {
                                    ...list[tIdx],
                                    name: val,
                                    isDemoPlaceholder: false,
                                  };
                                  return { ...prev, trainers: list };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-sm bg-[#101114] border border-white/15 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block font-mono-tech text-[10px] text-[#94A3B8] mb-1">
                              Specialization
                            </label>
                            <input
                              type="text"
                              value={tr.specialization}
                              onChange={(e) => {
                                const val = e.target.value;
                                setGymData((prev) => {
                                  const list = [...prev.trainers];
                                  list[tIdx] = {
                                    ...list[tIdx],
                                    specialization: val,
                                  };
                                  return { ...prev, trainers: list };
                                });
                              }}
                              className="w-full px-3 py-2 rounded-sm bg-[#101114] border border-white/15 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeConfigTab === "export" && (
                  <div className="space-y-4">
                    <div className="bg-[#070709] border border-white/10 p-4 rounded-sm space-y-2">
                      <span className="font-mono-tech text-xs text-[#CCFF00] uppercase block">
                        Vite + React Local Setup & Vercel Deployment Commands
                      </span>
                      <pre className="text-xs font-mono-tech text-[#F8FAFC] overflow-x-auto leading-relaxed">
                        {`# 1. Create Vite React project & install dependencies
npm create vite@latest infinity-fitness -- --template react
cd infinity-fitness
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Run local development server
npm run dev

# 3. Build for production (Vercel ready)
npm run build`}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-xs text-white uppercase">
                          Generated src/data/gymData.js
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyGymData}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#CCFF00] text-[#070709] font-mono-tech font-bold text-xs"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>
                            {copiedCode
                              ? "Copied gymData.js!"
                              : "Copy gymData.js"}
                          </span>
                        </button>
                      </div>
                      <pre className="p-4 rounded-sm bg-[#070709] border border-white/10 text-[11px] font-mono-tech text-[#94A3B8] max-h-72 overflow-y-auto">
                        {generatedGymDataCode}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-[#070709] border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setGymData(initialGymData)}
                  className="text-xs font-mono-tech text-[#94A3B8] hover:text-white underline"
                >
                  Reset to Default Placeholders
                </button>
                <button
                  type="button"
                  onClick={() => setConfigDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-sm bg-[#CCFF00] text-[#070709] font-extrabold text-xs uppercase tracking-wider"
                >
                  Apply & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
