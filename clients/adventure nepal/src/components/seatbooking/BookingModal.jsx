import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'react-hot-toast';
import { User, Phone, CheckCircle2, X } from 'lucide-react';

const BookingModal = ({ vehicle, selectedSeats, isOpen, onClose, onBook }) => {
  if (!isOpen || !vehicle || selectedSeats.length === 0) return null;

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const totalPrice = selectedSeats.length * vehicle.pricePerSeat;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || selectedSeats.length === 0) {
      toast.error('Please fill all fields and select seats');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const bookingId = 'MUST' + Date.now().toString().slice(-6);
      console.log('Booking created:', { vehicleId: vehicle.id, seats: selectedSeats, customer: formData, total: totalPrice, id: bookingId });
      onBook(bookingId);
      toast.success(`Booked successfully! Reference: ${bookingId}`);
      setFormData({ customerName: '', customerPhone: '', customerEmail: '' });
    } catch (error) {
      toast.error('Booking failed. Try again.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in zoom-in duration-200"
      onClick={handleBackdropClick}
    >
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Confirm Booking - {vehicle.name}
            </CardTitle>
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete your booking for {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="98xxxxxxxx"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-md space-y-1">
              <div className="flex justify-between text-sm">
                <span>{vehicle.name} × {selectedSeats.length} seats</span>
                <span>NPR {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-primary">NPR {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Booking...' : `Book Now`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingModal;
