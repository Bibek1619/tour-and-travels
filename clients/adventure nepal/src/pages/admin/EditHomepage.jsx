import React, { useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useHomepageContent } from '@/contexts/HomepageContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Save, RotateCcw, Plus, Trash2, Video, Image, Type, FileText, Star, Upload, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

// Media Uploader Component
const MediaUploader = ({ type, onUpload, currentSrc }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const isVideo = type === 'video';
  const accept = isVideo ? 'video/*' : 'image/*';

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create local preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Upload to Cloudinary via backend
    setUploading(true);
    try {
      const formData = new FormData();
      const endpoint = isVideo ? '/homepage/upload-video' : '/homepage/upload-image';
      const fieldName = isVideo ? 'video' : 'image';
      formData.append(fieldName, file);

      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        timeout: 120000, // 2 minutes for large video uploads
      });

      if (response.data.success) {
        onUpload(response.data.url);
        toast.success(`${isVideo ? 'Video' : 'Image'} uploaded successfully!`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.code === 'ECONNABORTED') {
        toast.error('Upload timed out. Please try a smaller file.');
      } else {
        toast.error(error?.response?.data?.message || `Failed to upload ${isVideo ? 'video' : 'image'}`);
      }
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id={`upload-${Math.random().toString(36).slice(2)}`}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? 'Uploading...' : `Upload ${isVideo ? 'Video' : 'Image'}`}
        </Button>
        {preview && (
          <Button type="button" variant="ghost" size="sm" onClick={clearPreview} className="text-red-500">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {(preview || currentSrc) && (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          {isVideo ? (
            <video
              src={preview || currentSrc}
              className="w-full h-40 object-cover"
              controls
              muted
            />
          ) : (
            <img
              src={preview || currentSrc}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

const EditHomepage = () => {
  const { content, updateHero, updateIntro, updateWhyUs, resetToDefaults, defaultContent } = useHomepageContent();
  const [activeTab, setActiveTab] = useState('hero');

  const handleSave = (section) => {
    toast.success(`${section} content saved successfully!`);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      resetToDefaults();
      toast.success('Content reset to defaults');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Homepage Content</h1>
            <p className="text-gray-500 mt-1">Customize the text, videos, and sections displayed on your homepage</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Hero Section
            </TabsTrigger>
            <TabsTrigger value="intro" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Welcome Section
            </TabsTrigger>
            <TabsTrigger value="whyUs" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Why Us Section
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero">
            <HeroSectionEditor
              content={content.hero}
              onUpdate={updateHero}
              onSave={() => handleSave('Hero')}
            />
          </TabsContent>

          {/* Intro Section Tab */}
          <TabsContent value="intro">
            <IntroSectionEditor
              content={content.intro}
              onUpdate={updateIntro}
              onSave={() => handleSave('Welcome')}
            />
          </TabsContent>

          {/* Why Us Section Tab */}
          <TabsContent value="whyUs">
            <WhyUsSectionEditor
              content={content.whyUs}
              onUpdate={updateWhyUs}
              onSave={() => handleSave('Why Us')}
            />
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <ContentPreview content={content} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

// Hero Section Editor
const HeroSectionEditor = ({ content, onUpdate, onSave }) => {
  const [local, setLocal] = useState(content);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(local);
    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-orange-600" />
          Hero Section
        </CardTitle>
        <CardDescription>Edit the main hero section with video background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Main Title</Label>
              <Input
                id="hero-title"
                value={local.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={local.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="hero-video">Video Path/URL</Label>
              <Input
                id="hero-video"
                value={local.videoSrc}
                onChange={(e) => handleChange('videoSrc', e.target.value)}
                placeholder="/hero video.mp4"
              />
              <p className="text-sm text-gray-500 mt-1">Path to video file or URL</p>
              <div className="mt-3">
                <Label className="text-xs">Or upload video to Cloudinary</Label>
                <MediaUploader
                  type="video"
                  currentSrc={local.videoSrc}
                  onUpload={(url) => handleChange('videoSrc', url)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-cta">CTA Button Text</Label>
              <Input
                id="hero-cta"
                value={local.ctaText}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                placeholder="View All Packages"
              />
            </div>
            <Separator />
            <div>
              <Label>Dropdown Menu Links</Label>
              <div className="space-y-3 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={local.tourLinkText}
                    onChange={(e) => handleChange('tourLinkText', e.target.value)}
                    placeholder="Tour Packages"
                  />
                  <Input
                    value={local.tourLink}
                    onChange={(e) => handleChange('tourLink', e.target.value)}
                    placeholder="/tour-packages"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={local.trekLinkText}
                    onChange={(e) => handleChange('trekLinkText', e.target.value)}
                    placeholder="Trek Packages"
                  />
                  <Input
                    value={local.trekLink}
                    onChange={(e) => handleChange('trekLink', e.target.value)}
                    placeholder="/trek-packages"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            <Save className="h-4 w-4 mr-2" />
            Save Hero Section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Intro Section Editor
const IntroSectionEditor = ({ content, onUpdate, onSave }) => {
  const [local, setLocal] = useState(content);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const handleHighlightChange = (index, field, value) => {
    const newHighlights = [...local.highlights];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    handleChange('highlights', newHighlights);
  };

  const addHighlight = () => {
    handleChange('highlights', [...local.highlights, { icon: 'MapPin', text: 'New Highlight' }]);
  };

  const removeHighlight = (index) => {
    handleChange('highlights', local.highlights.filter((_, i) => i !== index));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...local.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    handleChange('stats', newStats);
  };

  const handleSave = () => {
    onUpdate(local);
    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="h-5 w-5 text-orange-600" />
          Welcome / Intro Section
        </CardTitle>
        <CardDescription>Edit the welcome message and introduction content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="intro-welcome">Welcome Title</Label>
              <Input
                id="intro-welcome"
                value={local.welcomeTitle}
                onChange={(e) => handleChange('welcomeTitle', e.target.value)}
                placeholder="Dear Travelers, Namaste and Welcome"
              />
            </div>
            <div>
              <Label htmlFor="intro-highlight">Highlighted Word</Label>
              <Input
                id="intro-highlight"
                value={local.welcomeHighlight}
                onChange={(e) => handleChange('welcomeHighlight', e.target.value)}
                placeholder="Namaste"
              />
              <p className="text-sm text-gray-500 mt-1">This word will be highlighted in orange</p>
            </div>
            <div>
              <Label htmlFor="intro-subtitle">Subtitle</Label>
              <Input
                id="intro-subtitle"
                value={local.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Your Gateway to the Majestic Himalayas"
              />
            </div>
            <div>
              <Label htmlFor="intro-image">Image URL</Label>
              <Input
                id="intro-image"
                value={local.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              <div className="mt-3">
                <Label className="text-xs">Or upload image to Cloudinary</Label>
                <MediaUploader
                  type="image"
                  currentSrc={local.image}
                  onUpload={(url) => handleChange('image', url)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="intro-desc1">Description Paragraph 1</Label>
              <Textarea
                id="intro-desc1"
                value={local.description1}
                onChange={(e) => handleChange('description1', e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="intro-desc2">Description Paragraph 2</Label>
              <Textarea
                id="intro-desc2"
                value={local.description2}
                onChange={(e) => handleChange('description2', e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="intro-desc3">Description Paragraph 3</Label>
              <Textarea
                id="intro-desc3"
                value={local.description3}
                onChange={(e) => handleChange('description3', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Call to Action</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <Input
                value={local.ctaText}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                placeholder="Discover Our Story"
              />
              <Input
                value={local.ctaLink}
                onChange={(e) => handleChange('ctaLink', e.target.value)}
                placeholder="/about"
              />
            </div>
          </div>
          <div>
            <Label>Why Choose Title</Label>
            <Input
              value={local.whyChooseTitle}
              onChange={(e) => handleChange('whyChooseTitle', e.target.value)}
              placeholder="Why Choose Us?"
              className="mt-2"
            />
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Highlights (Image Overlay)</Label>
            <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
              <Plus className="h-4 w-4 mr-1" />
              Add Highlight
            </Button>
          </div>
          <div className="space-y-3">
            {local.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={highlight.icon}
                  onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
                  placeholder="Icon name"
                  className="w-32"
                />
                <Input
                  value={highlight.text}
                  onChange={(e) => handleHighlightChange(index, 'text', e.target.value)}
                  placeholder="Highlight text"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHighlight(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label>Stats</Label>
          <div className="space-y-3 mt-2">
            {local.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-3 gap-3">
                <Input
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  placeholder="10,000+"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  placeholder="Happy Travelers"
                />
                <Input
                  value={stat.icon}
                  onChange={(e) => handleStatChange(index, 'icon', e.target.value)}
                  placeholder="Icon name"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            <Save className="h-4 w-4 mr-2" />
            Save Welcome Section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Why Us Section Editor
const WhyUsSectionEditor = ({ content, onUpdate, onSave }) => {
  const [local, setLocal] = useState(content);

  const handleChange = (field, value) => {
    setLocal((prev) => ({ ...prev, [field]: value }));
  };

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...local.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    handleChange('slides', newSlides);
  };

  const addSlide = () => {
    handleChange('slides', [
      ...local.slides,
      { type: 'image', src: '', title: 'New Slide', subtitle: 'Slide description' },
    ]);
  };

  const removeSlide = (index) => {
    handleChange('slides', local.slides.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...local.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    handleChange('features', newFeatures);
  };

  const addFeature = () => {
    handleChange('features', [
      ...local.features,
      { icon: 'Star', title: 'New Feature', badge: 'New', description: 'Feature description' },
    ]);
  };

  const removeFeature = (index) => {
    handleChange('features', local.features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdate(local);
    onSave();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-orange-600" />
          Why Choose Adventure Nepal Section
        </CardTitle>
        <CardDescription>Edit the "Why Choose Us" section with slides and feature cards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="why-title">Section Badge Text</Label>
              <Input
                id="why-title"
                value={local.sectionTitle}
                onChange={(e) => handleChange('sectionTitle', e.target.value)}
                placeholder="Why Adventure Nepal"
              />
            </div>
            <div>
              <Label htmlFor="why-heading">Main Heading</Label>
              <Input
                id="why-heading"
                value={local.sectionHeading}
                onChange={(e) => handleChange('sectionHeading', e.target.value)}
                placeholder="Why Choose Adventure Nepal?"
              />
            </div>
            <div>
              <Label htmlFor="why-highlight">Heading Highlight</Label>
              <Input
                id="why-highlight"
                value={local.headingHighlight}
                onChange={(e) => handleChange('headingHighlight', e.target.value)}
                placeholder="Adventure Nepal?"
              />
              <p className="text-sm text-gray-500 mt-1">This text will be highlighted in green</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="why-subheading">Subheading</Label>
              <Input
                id="why-subheading"
                value={local.subheading}
                onChange={(e) => handleChange('subheading', e.target.value)}
                placeholder="Travel with confidence, every step of the way"
              />
            </div>
            <div>
              <Label htmlFor="why-subhighlight">Subheading Highlight</Label>
              <Input
                id="why-subhighlight"
                value={local.subheadingHighlight}
                onChange={(e) => handleChange('subheadingHighlight', e.target.value)}
                placeholder="every step of the way"
              />
            </div>
            <div>
              <Label htmlFor="why-desc">Description</Label>
              <Textarea
                id="why-desc"
                value={local.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Media Slides (Carousel)</Label>
            <Button type="button" variant="outline" size="sm" onClick={addSlide}>
              <Plus className="h-4 w-4 mr-1" />
              Add Slide
            </Button>
          </div>
          <div className="space-y-4">
            {local.slides.map((slide, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={slide.type === 'video' ? 'default' : 'secondary'}>
                      {slide.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : <Image className="h-3 w-3 mr-1" />}
                      {slide.type}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSlide(index)}
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Type</Label>
                      <select
                        value={slide.type}
                        onChange={(e) => handleSlideChange(index, 'type', e.target.value)}
                        className="w-full mt-1 rounded-md border border-gray-200 px-3 py-2 text-sm"
                      >
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs">Source URL/Path</Label>
                      <Input
                        value={slide.src}
                        onChange={(e) => handleSlideChange(index, 'src', e.target.value)}
                        placeholder="URL or /path/to/file"
                        className="mt-1"
                      />
                      <div className="mt-2">
                        <Label className="text-xs">Or upload to Cloudinary</Label>
                        <MediaUploader
                          type={slide.type === 'video' ? 'video' : 'image'}
                          currentSrc={slide.src}
                          onUpload={(url) => handleSlideChange(index, 'src', url)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={slide.title}
                        onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                        placeholder="Slide title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Subtitle</Label>
                      <Input
                        value={slide.subtitle}
                        onChange={(e) => handleSlideChange(index, 'subtitle', e.target.value)}
                        placeholder="Slide subtitle"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Feature Cards</Label>
            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {local.features.map((feature, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{feature.icon}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Icon Name</Label>
                        <Input
                          value={feature.icon}
                          onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                          placeholder="MapPin"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Badge Text</Label>
                        <Input
                          value={feature.badge}
                          onChange={(e) => handleFeatureChange(index, 'badge', e.target.value)}
                          placeholder="20+"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        placeholder="Feature title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Description</Label>
                      <Input
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Feature description"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700">
            <Save className="h-4 w-4 mr-2" />
            Save Why Us Section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Content Preview
const ContentPreview = ({ content }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">{content.hero.title}</h2>
            <p className="text-white/80 mb-4">{content.hero.subtitle}</p>
            <div className="flex gap-3">
              <Badge className="bg-green-500">{content.hero.ctaText}</Badge>
              <Badge variant="outline" className="text-white border-white/30">{content.hero.tourLinkText}</Badge>
              <Badge variant="outline" className="text-white border-white/30">{content.hero.trekLinkText}</Badge>
            </div>
            <p className="text-sm text-white/60 mt-3">Video: {content.hero.videoSrc}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Welcome Section Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {content.intro.welcomeTitle.replace(content.intro.welcomeHighlight, `***${content.intro.welcomeHighlight}***`)}
            </h1>
            <p className="text-lg text-gray-600">{content.intro.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {content.intro.highlights.map((h, i) => (
              <Badge key={i} variant="outline">{h.text}</Badge>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {content.intro.stats.map((s, i) => (
              <div key={i} className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-xl font-bold text-orange-600">{s.value}</p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Us Section Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Badge className="mb-2">{content.whyUs.sectionTitle}</Badge>
            <h2 className="text-2xl font-bold text-gray-900">{content.whyUs.sectionHeading}</h2>
          </div>
          <p className="text-gray-600 text-center mb-6">{content.whyUs.description}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {content.whyUs.slides.map((s, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <Badge variant={s.type === 'video' ? 'default' : 'secondary'} className="mb-2">{s.type}</Badge>
                <p className="font-medium text-sm">{s.title}</p>
                <p className="text-xs text-gray-500">{s.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {content.whyUs.features.map((f, i) => (
              <div key={i} className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{f.title}</span>
                  <Badge className="bg-green-500 text-xs">{f.badge}</Badge>
                </div>
                <p className="text-xs text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditHomepage;
