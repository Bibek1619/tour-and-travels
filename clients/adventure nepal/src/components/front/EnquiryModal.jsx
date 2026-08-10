import React, { useState, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createEnquiryApi } from "@/api/enquiryApi";
import { getAllToursApi } from "@/api/tourApi";
import toast from "react-hot-toast";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  MessageSquare,
  Send,
  CheckCircle2,
  Package,
} from "lucide-react";

const EnquiryModal = ({ isOpen, onClose, packageName, packageId, packageType = "tour" }) => {
  const [submitted, setSubmitted] = useState(false);
  // Currently selected package (auto-filled from the page, but user can change it)
  const [selected, setSelected] = useState({
    id: packageId || "",
    name: packageName || "",
    type: packageType || "tour",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    startDate: "",
    endDate: "",
    numberOfPeople: 1,
    comment: "",
  });

  // Fetch tours & treks for the dropdown (only when modal is open)
  const { data: toursData } = useQuery({
    queryKey: ["enquiryTours"],
    queryFn: () => getAllToursApi({ category: "tour", limit: 100 }),
    enabled: isOpen,
  });
  const { data: treksData } = useQuery({
    queryKey: ["enquiryTreks"],
    queryFn: () => getAllToursApi({ category: "trek", limit: 100 }),
    enabled: isOpen,
  });

  const tourOptions = toursData?.data || [];
  const trekOptions = treksData?.data || [];

  // Build a combined value key so tours and treks with different ids stay unique
  const makeKey = (type, id) => `${type}:${id}`;

  // Auto-select the package from the page when the modal opens / props change
  useEffect(() => {
    setSelected({
      id: packageId || "",
      name: packageName || "",
      type: packageType || "tour",
    });
  }, [packageId, packageName, packageType, isOpen]);

  // If the current package isn't part of the fetched tour/trek lists
  // (e.g. an adventure package), keep it as an extra option so it stays selected.
  const extraOption = useMemo(() => {
    if (!selected.id && !selected.name) return null;
    const inTours = tourOptions.some((t) => t._id === selected.id);
    const inTreks = trekOptions.some((t) => t._id === selected.id);
    if (inTours || inTreks) return null;
    return { _id: selected.id, title: selected.name, type: selected.type };
  }, [selected, tourOptions, trekOptions]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setSelected({ id: "", name: "", type: "tour" });
      return;
    }
    const [type, id] = value.split(":");
    let found;
    if (type === "tour") found = tourOptions.find((t) => t._id === id);
    else if (type === "trek") found = trekOptions.find((t) => t._id === id);
    else if (extraOption && extraOption._id === id) found = extraOption;

    setSelected({
      id,
      name: found?.title || "",
      type,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createEnquiryApi,
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    mutate({
      ...form,
      numberOfPeople: Number(form.numberOfPeople),
      packageName: selected.name,
      packageId: selected.id,
      packageType: selected.type,
    });
  };

  const handleClose = () => {
    // reset for next open
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      startDate: "",
      endDate: "",
      numberOfPeople: 1,
      comment: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Send an Enquiry</h3>
            {packageName && (
              <p className="text-orange-100 text-sm mt-0.5 line-clamp-1">{packageName}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Success State */
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h4>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your enquiry has been received. Our team will reach out to you
              shortly to help plan your perfect trip.
            </p>
            <button
              onClick={handleClose}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Package Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Tour / Trek
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selected.id ? makeKey(selected.type, selected.id) : ""}
                  onChange={handleSelectChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white appearance-none"
                >
                  <option value="">-- Not sure yet / General enquiry --</option>

                  {/* Keep the current page's package selectable if it's not a tour/trek */}
                  {extraOption && (
                    <option value={makeKey(extraOption.type, extraOption._id)}>
                      {extraOption.title}
                    </option>
                  )}

                  {tourOptions.length > 0 && (
                    <optgroup label="Tour Packages">
                      {tourOptions.map((t) => (
                        <option key={t._id} value={makeKey("tour", t._id)}>
                          {t.title}
                        </option>
                      ))}
                    </optgroup>
                  )}

                  {trekOptions.length > 0 && (
                    <optgroup label="Trek Packages">
                      {trekOptions.map((t) => (
                        <option key={t._id} value={makeKey("trek", t._id)}>
                          {t.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+977 ..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location / Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Where would you like to go?"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Starting Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ending Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Number of People
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="numberOfPeople"
                  min="1"
                  value={form.numberOfPeople}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Additional Comments
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Tell us anything else about your trip..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
