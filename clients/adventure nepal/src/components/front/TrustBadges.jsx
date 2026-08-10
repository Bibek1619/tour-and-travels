import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';

const TrustBadges = () => {
  const stats = [
    {
      icon: Clock,
      number: '26+',
      label: 'Years Experience',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      icon: Users,
      number: '10,000+',
      label: 'Happy Customers',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Award,
      number: '100+',
      label: 'Successful Trips',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'Customer Rating',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`${stat.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</h3>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
