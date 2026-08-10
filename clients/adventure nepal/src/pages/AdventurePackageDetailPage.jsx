import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import {
  Clock, Users, Star, ChevronLeft, MapPin, MessageCircle, Mail, Send
} from 'lucide-react';
import EnquiryModal from '@/components/front/EnquiryModal';

const AdventurePackageDetailPage = () => {
  const { slug, packageId } = useParams();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const adventureData = {
    'rafting': {
      name: 'Rafting',
      packages: [
        {
          id: 1,
          title: 'Half Day Rafting',
          image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
          images: [
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
            'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=800'
          ],
          duration: '3-4 Hours',
          difficulty: 'Moderate',
          groupSize: '6-12 people',
          rating: 4.8,
          reviews: 156,
          price: 2500,
          location: 'Trishuli River',
          bestSeason: 'September to May',
          description: 'Experience the thrill of rafting through Grade 2-3 rapids on the beautiful Trishuli River. Perfect for beginners and families looking for adventure. Our experienced guides ensure your safety while you enjoy the excitement of white water rafting through stunning Himalayan landscapes.',
          highlights: [
            'Grade 2-3 rapids perfect for beginners',
            'Professional and experienced river guide',
            'Complete safety equipment included',
            'Riverside lunch with scenic views',
            'Transport from Kathmandu available',
            'Safety briefing before start'
          ],
          included: [
            'Professional rafting guide',
            'All safety equipment (helmet, life jacket, paddle)',
            'Riverside lunch',
            'Transportation (if booked)',
            'Safety briefing and training'
          ],
          excluded: [
            'Personal expenses',
            'Travel insurance',
            'Tips for guide (optional)',
            'Photos and videos'
          ],
          itinerary: [
            { time: '07:00 AM', activity: 'Pickup from hotel (Kathmandu)' },
            { time: '10:00 AM', activity: 'Arrival at rafting starting point' },
            { time: '10:30 AM', activity: 'Safety briefing and equipment distribution' },
            { time: '11:00 AM', activity: 'Start rafting adventure' },
            { time: '01:00 PM', activity: 'Riverside lunch break' },
            { time: '02:00 PM', activity: 'Return journey to Kathmandu' }
          ]
        },
        {
          id: 2,
          title: 'Full Day Rafting',
          image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
          images: [
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
            'https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=800'
          ],
          duration: '6-7 Hours',
          difficulty: 'Moderate',
          groupSize: '6-12 people',
          rating: 4.9,
          reviews: 203,
          price: 4500,
          location: 'Trishuli River',
          bestSeason: 'September to May',
          description: 'Full day adventure through Grade 3-4 rapids with experienced guides. Navigate through challenging rapids, enjoy stunning river views, and experience the thrill of white water rafting at its best. Includes lunch, refreshments, and all safety equipment for a memorable adventure.',
          highlights: [
            'Grade 3-4 rapids for more excitement',
            'Expert guide with 10+ years experience',
            'All equipment and gear included',
            'Delicious lunch and refreshments',
            'Round-trip transport from Kathmandu',
            'Photos and videos available'
          ],
          included: [
            'Expert rafting guide',
            'Complete safety equipment',
            'Full lunch and snacks',
            'Round-trip transportation',
            'First aid kit and safety backup'
          ],
          excluded: [
            'Personal insurance',
            'Tips for guides',
            'Extra beverages',
            'Professional photo package'
          ],
          itinerary: [
            { time: '06:00 AM', activity: 'Hotel pickup from Kathmandu' },
            { time: '09:00 AM', activity: 'Reach rafting point, safety briefing' },
            { time: '09:30 AM', activity: 'Start full day rafting' },
            { time: '12:30 PM', activity: 'Lunch break at riverside camp' },
            { time: '01:30 PM', activity: 'Continue rafting adventure' },
            { time: '03:00 PM', activity: 'Complete rafting, return journey' },
            { time: '06:00 PM', activity: 'Drop at hotel' }
          ]
        }
      ]
    },
    'kayaking': {
      name: 'Kayaking',
      packages: [
        {
          id: 1,
          title: 'Fewa Lake Kayaking - 2 Hours',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
            'https://images.unsplash.com/photo-1503457574462-bd27054394c1?w=800'
          ],
          duration: '2 Hours',
          difficulty: 'Easy',
          groupSize: '1-6 people',
          rating: 4.7,
          reviews: 98,
          price: 1500,
          location: 'Fewa Lake, Pokhara',
          bestSeason: 'Year Round',
          description: 'Enjoy a peaceful kayaking experience on the stunning Fewa Lake with breathtaking views of the Annapurna range and Machhapuchhre mountain. Perfect for beginners, this relaxing adventure offers incredible photo opportunities and a unique perspective of Pokhara\'s natural beauty.',
          highlights: [
            'Scenic views of Fewa Lake and mountains',
            'Basic kayaking instruction included',
            'All equipment provided',
            'Perfect for beginners',
            'Mountain backdrop photography',
            'Peaceful water experience'
          ],
          included: [
            'Kayak and paddle',
            'Life jacket and safety gear',
            'Basic instruction',
            'Professional guide',
            'Waterproof storage'
          ],
          excluded: [
            'Hotel pickup/drop',
            'Food and drinks',
            'Photos',
            'Personal expenses'
          ],
          itinerary: [
            { time: '09:00 AM', activity: 'Meet at Fewa Lake lakeside' },
            { time: '09:15 AM', activity: 'Safety briefing and kayaking basics' },
            { time: '09:30 AM', activity: 'Start kayaking on the lake' },
            { time: '10:30 AM', activity: 'Photo break at scenic spot' },
            { time: '11:00 AM', activity: 'Return to starting point' }
          ]
        },
        {
          id: 2,
          title: 'Half Day Kayaking with Training',
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
            'https://images.unsplash.com/photo-1503457574462-bd27054394c1?w=800'
          ],
          duration: '4 Hours',
          difficulty: 'Easy',
          groupSize: '2-8 people',
          rating: 4.9,
          reviews: 134,
          price: 2500,
          location: 'Fewa Lake, Pokhara',
          bestSeason: 'Year Round',
          description: 'Comprehensive kayaking training session with professional instruction, safety briefing, and extended time on the water. Learn proper techniques, safety procedures, and gain confidence on the water with expert guidance. Perfect for those who want to master kayaking skills.',
          highlights: [
            'Professional kayaking training',
            'Detailed safety briefing',
            'All equipment provided',
            'Refreshments included',
            'Extended water time',
            'Photo opportunities'
          ],
          included: [
            'Professional instructor',
            'Kayak, paddle, life jacket',
            'Safety equipment',
            'Refreshments',
            'Training certificate'
          ],
          excluded: [
            'Hotel transport',
            'Meals',
            'Travel insurance',
            'Professional photos'
          ],
          itinerary: [
            { time: '08:00 AM', activity: 'Meeting at lakeside' },
            { time: '08:15 AM', activity: 'Theory and safety training' },
            { time: '09:00 AM', activity: 'Practical training on shore' },
            { time: '09:30 AM', activity: 'Begin kayaking session' },
            { time: '11:30 AM', activity: 'Refreshment break' },
            { time: '12:00 PM', activity: 'Session complete' }
          ]
        }
      ]
    }
  };

  const adventure = adventureData[slug];
  const pkg = adventure?.packages.find(p => p.id === parseInt(packageId));

  if (!adventure || !pkg) {
    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-700">Package Not Found</h2>
          <Link to={`/adventures/${slug}`} className="mt-4 text-orange-600 hover:underline">
            ← Back to {adventure?.name || 'Adventures'}
          </Link>
        </div>
      </MainLayout>
    );
  }

  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-600">Home</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <Link to="/adventures" className="hover:text-orange-600">Adventures</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <Link to={`/adventures/${slug}`} className="hover:text-orange-600">{adventure.name}</Link>
              <ChevronLeft className="w-4 h-4 rotate-180" />
              <span className="text-gray-800 font-medium">{pkg.title}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            {/* Title & Rating */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{pkg.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{pkg.rating}</span>
                  <span className="text-gray-500">({pkg.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{pkg.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{pkg.groupSize}</span>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4">
                {pkg.images.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-lg h-[300px]">
                    <img
                      src={img}
                      alt={`${pkg.title} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Adventure</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{pkg.description}</p>
            </div>

            {/* Booking Card */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 shadow-lg border border-orange-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-gray-600 mb-2">Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-orange-600">NPR {pkg.price.toLocaleString()}</span>
                    <span className="text-gray-500">/person</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </button>

                  <button 
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Hi! I'm interested in booking ${pkg.title}.\n\n` +
                        `⏱️ Duration: ${pkg.duration}\n` +
                        `💰 Price: NPR ${pkg.price.toLocaleString()}\n\n` +
                        `Can you provide more details?`
                      );
                      window.open(`https://wa.me/9779841480794?text=${message}`, '_blank');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book Now
                  </button>

                  <a 
                    href={`mailto:info@adventurenepal.com?subject=Inquiry - ${pkg.title}&body=Hi, I'm interested in ${pkg.title}.%0D%0A%0D%0ADuration: ${pkg.duration}%0D%0APrice: NPR ${pkg.price.toLocaleString()}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        packageName={pkg?.title}
        packageId={packageId}
        packageType="adventure"
      />
    </MainLayout>
  );
};

export default AdventurePackageDetailPage;
