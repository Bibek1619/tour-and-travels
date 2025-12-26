import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"; // Adjust path
import { Badge } from "../ui/badge"; // Adjust path
import { MapPin, Clock, Shield, Star, Headphones, CreditCard } from "lucide-react";

export default function Whyus() {
  const features = [
    {
      icon: MapPin,
      title: "Popular Destinations",
      description: "Mustang, Rara Lake, Dhorpatan, Pokhara sightseeing and more",
      badge: "20+ Destinations",
    },
    {
      icon: Clock,
      title: "Real-time Booking",
      description: "Live seat availability and instant confirmation",
      badge: "24/7 Available",
    },
    {
      icon: Shield,
      title: "Safe & Reliable",
      description: "Licensed vehicles and experienced drivers",
      badge: "100% Safe",
    },
    {
      icon: Star,
      title: "Rated Experience",
      description: "Customer reviews and ratings for all services",
      badge: "4.8/5 Rating",
    },
    {
      icon: Headphones,
      title: "Live Support",
      description: "24/7 customer support in Nepali and English",
      badge: "Always Here",
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Khalti, eSewa, Cards, and Bank transfers accepted",
      badge: "Secure",
    },
  ];

  return (
    <section className="py-16 bg-[var(--color-muted)/30]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--color-foreground)]">
            Why Choose Adventure Nepal?
          </h2>
          <p className="text-lg text-[(--color-muted-foreground)] max-w-2xl mx-auto">
            We provide comprehensive travel solutions with the highest standards of safety, comfort, and customer
            service in Nepal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-[(--color-card)] text-[(--color-card-foreground)]">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-[(--color-primary)]" />
                 <Badge className="bg-[(--color-secondary)] text-[(--color-secondary-foreground)] hover:bg-green-400 transition-colors">
  {feature.badge}
</Badge>

                </div>
                <CardTitle className="text-xl text-[(--color-foreground)]">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[(--color-muted-foreground)]">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
