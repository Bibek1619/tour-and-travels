import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import { ArrowRight } from 'lucide-react';

const AdventuresPage = () => {
  const adventures = [
    {
      id: 1,
      name: 'Rafting',
      location: 'Trishuli River',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      description: 'Experience thrilling white water rafting in the pristine waters of Trishuli River with rapids ranging from grade 2 to 4',
      activitiesCount: 3,
      slug: 'rafting'
    },
    {
      id: 2,
      name: 'Kayaking',
      location: 'Fewa Lake, Pokhara',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      description: 'Paddle through the serene waters of Fewa Lake with stunning Annapurna mountain range views',
      activitiesCount: 2,
      slug: 'kayaking'
    },
    {
      id: 3,
      name: 'Paragliding',
      location: 'Sarangkot, Pokhara',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      description: 'Soar like a bird over Pokhara valley with breathtaking panoramic views of the Himalayas',
      activitiesCount: 2,
      slug: 'paragliding'
    },
    {
      id: 4,
      name: 'Bungee Jumping',
      location: 'Hemja & Kushma',
      image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800',
      description: 'Take the ultimate leap of faith from Nepal\'s highest bungee jumping points at 160m and 228m',
      activitiesCount: 2,
      slug: 'bungee-jumping'
    },
    {
      id: 5,
      name: 'Ziplining',
      location: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1570552626352-8b0d6f5fcf5b?w=800',
      description: 'Fly through the air at high speeds on one of the world\'s longest and steepest ziplines',
      activitiesCount: 1,
      slug: 'ziplining'
    },
    {
      id: 6,
      name: 'Canyoning',
      location: 'Pokhara',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      description: 'Experience the thrill of rappelling down waterfalls, natural rock slides, and cliff jumping',
      activitiesCount: 2,
      slug: 'canyoning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Adventure Activities</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Choose Your Adrenaline Rush in the Heart of the Himalayas
          </p>
        </div>
      </section>

      {/* Adventure Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Adventure Activities
            </h2>
            <p className="text-lg text-gray-600">
              Select an activity to view available packages and book your adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <Link
                key={adventure.id}
                to={`/adventures/${adventure.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={adventure.image}
                    alt={adventure.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Activity Count Badge */}
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {adventure.activitiesCount} {adventure.activitiesCount === 1 ? 'Package' : 'Packages'}
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {adventure.name}
                  </h3>

                  {/* Location */}
                  <p className="text-orange-600 font-medium mb-3">
                    {adventure.location}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">
                    {adventure.description}
                  </p>

                  {/* View Details Button */}
                  <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                    View Packages
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help Planning Your Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact our adventure specialists to create a customized package or get expert advice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+9779841480794"
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 transition-colors"
            >
              Call +977 984-1480794
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdventuresPage;
