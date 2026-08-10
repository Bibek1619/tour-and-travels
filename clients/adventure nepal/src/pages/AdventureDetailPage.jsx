import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/front/Navbar';
import { Footer } from '@/components/front/Footer';
import { ArrowLeft, Clock, Users, Star, MapPin, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllAdventuresApi } from '@/api/adventureApi';
import { getCardImage } from '@/utils/cloudinaryHelper';

const AdventureDetailPage = () => {
  const { slug } = useParams();

  // Fetch adventures filtered by category (slug)
  const { data, isLoading } = useQuery({
    queryKey: ['adventures', slug],
    queryFn: () => getAllAdventuresApi({ category: slug }),
  });

  const adventures = data?.data || [];

  // Category names mapping
  const categoryNames = {
    rafting: 'Rafting',
    kayaking: 'Kayaking',
    paragliding: 'Paragliding',
    bungee: 'Bungee Jumping',
    zipline: 'Zip Lining',
    canyoning: 'Canyoning'
  };

  const categoryName = categoryNames[slug] || slug;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Compact Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/adventures"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Adventures
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
              <p className="text-gray-600">
                {adventures.length} {adventures.length === 1 ? 'Package' : 'Packages'} Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          )}

          {!isLoading && adventures.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-900 mb-2">No Adventures Found</p>
              <p className="text-gray-600 mb-6">
                There are no adventure packages available in this category yet.
              </p>
              <Link
                to="/adventures"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                ← Back to Adventures
              </Link>
            </div>
          )}

          {!isLoading && adventures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adventures.map((pkg) => (
              <div
                key={pkg._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getCardImage(pkg.images?.[0])}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    pkg.difficulty === 'Easy' 
                      ? 'bg-emerald-500 text-white'
                      : pkg.difficulty === 'Moderate'
                      ? 'bg-amber-500 text-white'
                      : pkg.difficulty === 'Hard'
                      ? 'bg-orange-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {pkg.difficulty}
                  </div>
                  {pkg.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {pkg.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{pkg.location}</span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{pkg.groupSizeMin}-{pkg.groupSizeMax} people</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {pkg.shortDescription || pkg.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="pt-5 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">From</span>
                        <div className="text-2xl font-bold text-gray-900">
                          ${pkg.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/adventures/${slug}/${pkg._id}`}
                      className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdventureDetailPage;
