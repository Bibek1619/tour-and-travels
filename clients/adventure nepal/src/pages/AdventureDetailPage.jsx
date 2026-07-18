import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import { ArrowLeft, MapPin, Clock, Users, Star, Calendar } from 'lucide-react';

const AdventureDetailPage = () => {
  const { slug } = useParams();

  // Adventure data with packages
  const adventureData = {
    'rafting': {
      name: 'Rafting',
      location: 'Trishuli River',
      heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200',
      description: 'Experience the thrill of white water rafting on the Trishuli River, one of Nepal\'s most popular rafting destinations. Navigate through exciting rapids while enjoying stunning mountain scenery.',
      packages: [
        {
          id: 1,
          title: 'Half Day Rafting - Trishuli River',
          image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
          duration: '3-4 Hours',
          difficulty: 'Moderate',
          groupSize: '6-12 people',
          rating: 4.8,
          reviews: 156,
          price: 2500,
          highlights: ['Grade 2-3 rapids', 'Professional guide', 'Safety equipment included', 'Riverside lunch']
        },
        {
          id: 2,
          title: 'Full Day Rafting - Trishuli River',
          image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
          duration: '6-7 Hours',
          difficulty: 'Moderate',
          groupSize: '6-12 people',
          rating: 4.9,
          reviews: 203,
          price: 4500,
          highlights: ['Grade 3-4 rapids', 'Expert guide', 'All equipment included', 'Lunch & refreshments', 'Transport from Kathmandu']
        },
        {
          id: 3,
          title: 'Multi-day Rafting Adventure',
          image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
          duration: '2 Days 1 Night',
          difficulty: 'Challenging',
          groupSize: '8-16 people',
          rating: 5.0,
          reviews: 89,
          price: 9500,
          highlights: ['Grade 3-4+ rapids', 'Riverside camping', 'All meals included', 'Professional team', 'Complete equipment']
        }
      ]
    },
    'kayaking': {
      name: 'Kayaking',
      location: 'Fewa Lake, Pokhara',
      heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
      description: 'Paddle through the serene waters of Fewa Lake with stunning views of the Annapurna mountain range. Perfect for beginners and experienced kayakers alike.',
      packages: [
        {
          id: 1,
          title: 'Fewa Lake Kayaking - 2 Hours',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          duration: '2 Hours',
          difficulty: 'Easy',
          groupSize: '1-6 people',
          rating: 4.7,
          reviews: 98,
          price: 1500,
          highlights: ['Scenic lake views', 'Basic instruction', 'Equipment included', 'Mountain backdrop']
        },
        {
          id: 2,
          title: 'Half Day Kayaking with Training',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          duration: '4 Hours',
          difficulty: 'Easy',
          groupSize: '2-8 people',
          rating: 4.9,
          reviews: 134,
          price: 2500,
          highlights: ['Professional training', 'Safety briefing', 'All equipment', 'Refreshments', 'Photo opportunities']
        }
      ]
    },
    'paragliding': {
      name: 'Paragliding',
      location: 'Sarangkot, Pokhara',
      heroImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200',
      description: 'Soar like a bird over the beautiful Pokhara valley with breathtaking panoramic views of the Himalayas including Annapurna, Dhaulagiri, and Machhapuchhre.',
      packages: [
        {
          id: 1,
          title: 'Standard Paragliding Flight',
          image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
          duration: '30 Minutes',
          difficulty: 'Easy',
          groupSize: '1 person',
          rating: 5.0,
          reviews: 412,
          price: 8500,
          highlights: ['Tandem flight', 'Experienced pilot', 'Stunning views', 'Safety equipment', 'Hotel pickup']
        },
        {
          id: 2,
          title: 'Extended Paragliding with Photos',
          image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
          duration: '45 Minutes',
          difficulty: 'Easy',
          groupSize: '1 person',
          rating: 5.0,
          reviews: 278,
          price: 11500,
          highlights: ['Longer flight time', 'Professional photos', 'Video recording', 'Acrobatic maneuvers', 'Certificate']
        }
      ]
    },
    'bungee-jumping': {
      name: 'Bungee Jumping',
      location: 'Hemja & Kushma',
      heroImage: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=1200',
      description: 'Take the ultimate leap of faith from Nepal\'s highest bungee jumping points. Experience pure adrenaline as you free fall over stunning gorges.',
      packages: [
        {
          id: 1,
          title: 'Hemja Bungee Jump - 160m',
          image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800',
          duration: '2-3 Hours',
          difficulty: 'Extreme',
          groupSize: '1 person',
          rating: 4.9,
          reviews: 189,
          price: 11000,
          highlights: ['160m free fall', 'Professional team', 'Safety certified', 'Certificate', 'Photos & videos available']
        },
        {
          id: 2,
          title: 'Kushma Bungee - 228m (Highest)',
          image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800',
          duration: '3-4 Hours',
          difficulty: 'Extreme',
          groupSize: '1 person',
          rating: 5.0,
          reviews: 145,
          price: 14000,
          highlights: ['World\'s highest', '228m drop', 'Gorge view', 'Expert supervision', 'Certificate & photos']
        }
      ]
    },
    'ziplining': {
      name: 'Ziplining',
      location: 'Pokhara',
      heroImage: 'https://images.unsplash.com/photo-1570552626352-8b0d6f5fcf5b?w=1200',
      description: 'Fly through the air at speeds up to 120 km/h on one of the world\'s longest and steepest ziplines. An unforgettable adrenaline experience!',
      packages: [
        {
          id: 1,
          title: ' zipFlyer Nepal - The Extreme Zipline',
          image: 'https://images.unsplash.com/photo-1570552626352-8b0d6f5fcf5b?w=800',
          duration: '3-4 Hours',
          difficulty: 'Moderate',
          groupSize: '1-2 people',
          rating: 5.0,
          reviews: 324,
          price: 9000,
          highlights: ['1.8 km long', 'Speed up to 120 km/h', '600m descent', 'Mountain views', 'Safety certified', 'Transport included']
        }
      ]
    },
    'canyoning': {
      name: 'Canyoning',
      location: 'Pokhara',
      heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
      description: 'Experience the thrill of canyoning - rappelling down waterfalls, natural rock slides, cliff jumping, and swimming through pristine canyons.',
      packages: [
        {
          id: 1,
          title: 'Half Day Canyoning Adventure',
          image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
          duration: '4-5 Hours',
          difficulty: 'Moderate',
          groupSize: '4-10 people',
          rating: 4.8,
          reviews: 167,
          price: 7500,
          highlights: ['Multiple waterfalls', 'Cliff jumping', 'Natural slides', 'Expert guides', 'Full equipment']
        },
        {
          id: 2,
          title: 'Full Day Extreme Canyoning',
          image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
          duration: '6-7 Hours',
          difficulty: 'Challenging',
          groupSize: '4-8 people',
          rating: 4.9,
          reviews: 112,
          price: 11500,
          highlights: ['Advanced rappelling', 'Higher jumps', 'Remote canyons', 'Lunch included', 'Professional team']
        }
      ]
    }
  };

  const adventure = adventureData[slug];

  if (!adventure) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Adventure Not Found</h1>
          <Link to="/adventures" className="text-orange-600 hover:text-orange-700 font-semibold">
            ← Back to Adventures
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px]">
        <img
          src={adventure.heroImage}
          alt={adventure.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <Link
            to="/adventures"
            className="inline-flex items-center gap-2 text-white hover:text-orange-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Adventures
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{adventure.name}</h1>
          <div className="flex items-center gap-2 text-xl">
            <MapPin className="w-6 h-6" />
            <span>{adventure.location}</span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-lg text-gray-700">
            {adventure.description}
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Available Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventure.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {/* Difficulty Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    pkg.difficulty === 'Easy' 
                      ? 'bg-green-500 text-white'
                      : pkg.difficulty === 'Moderate'
                      ? 'bg-yellow-500 text-white'
                      : pkg.difficulty === 'Challenging'
                      ? 'bg-orange-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {pkg.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {pkg.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">{pkg.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({pkg.reviews} reviews)</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Highlights:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Button */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-sm text-gray-500">From</div>
                        <div className="text-2xl font-bold text-gray-900">
                          NPR {pkg.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdventureDetailPage;
