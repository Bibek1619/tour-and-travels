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
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      packages: 3,
      slug: 'rafting'
    },
    {
      id: 2,
      name: 'Kayaking',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      packages: 2,
      slug: 'kayaking'
    },
    {
      id: 3,
      name: 'Paragliding',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      packages: 2,
      slug: 'paragliding'
    },
    {
      id: 4,
      name: 'Bungee Jumping',
      image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?w=800',
      packages: 2,
      slug: 'bungee-jumping'
    },
    {
      id: 5,
      name: 'Ziplining',
      image: 'https://images.unsplash.com/photo-1570552626352-8b0d6f5fcf5b?w=800',
      packages: 1,
      slug: 'ziplining'
    },
    {
      id: 6,
      name: 'Canyoning',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      packages: 2,
      slug: 'canyoning'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((adventure) => (
              <Link
                key={adventure.id}
                to={`/adventures/${adventure.slug}`}
                className="group relative block h-96 rounded-3xl overflow-hidden"
              >
                <img
                  src={adventure.image}
                  alt={adventure.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-[2px] bg-orange-500"></div>
                    <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">
                      {adventure.packages} {adventure.packages === 1 ? 'Package' : 'Packages'}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    {adventure.name}
                  </h3>
                  <div className="flex items-center text-white font-medium group-hover:text-orange-400 transition-colors duration-300">
                    Explore Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
