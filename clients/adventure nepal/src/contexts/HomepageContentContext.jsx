import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/api/axiosInstance';

const defaultContent = {
  hero: {
    title: 'Discover the Magic of Nepal',
    subtitle: 'Book your adventure with confidence - Vehicle rentals, seat reservations, tour packages, and hotels all in one place',
    mediaType: 'video',
    videoSrc: '/hero video.mp4',
    imageSrc: '',
    ctaText: 'View All Packages',
    tourLink: '/tour-packages',
    tourLinkText: 'Tour Packages',
    trekLink: '/trek-packages',
    trekLinkText: 'Trek Packages',
  },
  intro: {
    welcomeTitle: 'Dear Travelers, Namaste and Welcome',
    welcomeHighlight: 'Namaste',
    subtitle: 'Your Gateway to the Majestic Himalayas',
    description1: 'Adventure Nepal is a trusted travel agency with over 26 years of experience in crafting unforgettable journeys across Nepal. From the towering Himalayas to ancient temples, we bring you the best of this incredible land.',
    description2: 'Explore diverse landscapes, vibrant cultures, and warm hospitality. Our expertly designed tours cover trekking, wildlife safaris, cultural tours, and adventure sports - all tailored to your preferences.',
    description3: 'Whether you seek thrilling mountain treks, peaceful spiritual retreats, or cultural immersion, Nepal has something extraordinary waiting for you. Let us be your guide to this magical destination.',
    ctaText: 'Discover Our Story',
    ctaLink: '/about',
    whyChooseTitle: 'Why Choose Us?',
    highlights: [
      { icon: 'Mountain', text: 'Expert Local Guides' },
      { icon: 'Compass', text: 'Customizable Itineraries' },
      { icon: 'Heart', text: '100% Customer Satisfaction' },
    ],
    stats: [
      { value: '10,000+', label: 'Happy Travelers', icon: 'Users' },
      { value: '26+ Years', label: 'Experience', icon: 'Award' },
    ],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  },
  whyUs: {
    sectionTitle: 'Why Adventure Nepal',
    sectionHeading: 'Why Choose Adventure Nepal?',
    headingHighlight: 'Adventure Nepal?',
    subheading: 'Travel with confidence, every step of the way',
    subheadingHighlight: 'every step of the way',
    description: 'We provide comprehensive travel solutions with the highest standards of safety, comfort, and customer service in Nepal - from planning to the road, we have got you covered.',
    ctaText: 'Explore Tours',
    ctaLink: '/tours',
    slides: [
      {
        type: 'video',
        src: 'https://res.cloudinary.com/djded5kbg/video/upload/v1786779670/tour-travels/homepage/videos/ofzrs8x9rurlewujjyas.mp4',
        title: 'Adventure Awaits',
        subtitle: 'Experience the very best of Nepal',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
        title: 'Majestic Himalayas',
        subtitle: 'Trek the world\'s highest peaks',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=80',
        title: 'Ancient Kathmandu',
        subtitle: 'Culture, heritage & timeless temples',
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&q=80',
        title: 'Uncharted Trails',
        subtitle: 'Remote valleys & hidden mountain lakes',
      },
    ],
    features: [
      {
        icon: 'MapPin',
        title: 'Popular Destinations',
        badge: '20+',
        description: 'Mustang, Rara Lake, Dhorpatan, Pokhara and more',
      },
      {
        icon: 'Clock',
        title: 'Real-time Booking',
        badge: '24/7',
        description: 'Live seat availability and instant confirmation',
      },
      {
        icon: 'Shield',
        title: 'Safe & Reliable',
        badge: '100%',
        description: 'Licensed vehicles and experienced drivers',
      },
      {
        icon: 'Star',
        title: 'Rated Experience',
        badge: '4.8/5',
        description: 'Verified reviews and ratings for every service',
      },
      {
        icon: 'Headphones',
        title: 'Live Support',
        badge: 'Always Here',
        description: '24/7 support in Nepali and English',
      },
      {
        icon: 'CreditCard',
        title: 'Easy Payment',
        badge: 'Secure',
        description: 'Khalti, eSewa, cards and bank transfers accepted',
      },
    ],
  },
};

const HomepageContentContext = createContext(null);

export const useHomepageContent = () => {
  const context = useContext(HomepageContentContext);
  if (!context) {
    throw new Error('useHomepageContent must be used within a HomepageContentProvider');
  }
  return context;
};

const mergeWithDefaults = (stored) => ({
  hero: { ...defaultContent.hero, ...(stored?.hero || {}) },
  intro: { ...defaultContent.intro, ...(stored?.intro || {}) },
  whyUs: { ...defaultContent.whyUs, ...(stored?.whyUs || {}) },
});

export const HomepageContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const saveTimerRef = useRef(null);

  // Fetch content from backend on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axiosInstance.get('/homepage');
        if (res.data.success && res.data.data) {
          setContent(mergeWithDefaults(res.data.data));
        }
      } catch (err) {
        console.error('Failed to load homepage content from server:', err);
        // Fallback to localStorage if server fails
        try {
          const stored = localStorage.getItem('adventure_nepal_homepage_content');
          if (stored) {
            setContent(mergeWithDefaults(JSON.parse(stored)));
          }
        } catch (e) {
          // use defaults
        }
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Debounced save to backend
  const saveToBackend = useCallback((newContent) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await axiosInstance.put('/homepage', newContent);
      } catch (err) {
        console.error('Failed to save homepage content to server:', err);
      }
    }, 800);
  }, []);

  // Also save to localStorage as backup
  const saveToLocal = useCallback((newContent) => {
    try {
      localStorage.setItem('adventure_nepal_homepage_content', JSON.stringify(newContent));
    } catch (e) {
      // ignore
    }
  }, []);

  // Save to both backend and localStorage whenever content changes
  useEffect(() => {
    if (!loading) {
      saveToBackend(content);
      saveToLocal(content);
    }
  }, [content, loading, saveToBackend, saveToLocal]);

  const updateHero = useCallback((updates) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...updates },
    }));
  }, []);

  const updateIntro = useCallback((updates) => {
    setContent((prev) => ({
      ...prev,
      intro: { ...prev.intro, ...updates },
    }));
  }, []);

  const updateWhyUs = useCallback((updates) => {
    setContent((prev) => ({
      ...prev,
      whyUs: { ...prev.whyUs, ...updates },
    }));
  }, []);

  const updateAllContent = useCallback((newContent) => {
    setContent({
      hero: { ...defaultContent.hero, ...newContent.hero },
      intro: { ...defaultContent.intro, ...newContent.intro },
      whyUs: { ...defaultContent.whyUs, ...newContent.whyUs },
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setContent(defaultContent);
  }, []);

  const value = {
    content,
    loading,
    updateHero,
    updateIntro,
    updateWhyUs,
    updateAllContent,
    resetToDefaults,
    defaultContent,
  };

  return (
    <HomepageContentContext.Provider value={value}>
      {children}
    </HomepageContentContext.Provider>
  );
};

export default HomepageContentContext;
