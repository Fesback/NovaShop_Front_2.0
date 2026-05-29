import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export function ProfileInfoPage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock Data (Este estado se llenará con tu Contexto/API en el futuro)
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Minimalist Ave, Apt 4B',
    city: 'New York',
    country: 'United States',
    zip: '10001'
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    setIsEditing(false);
    // Aquí iría tu llamada axios.put('/api/users/profile', formData)
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl space-y-8"
    >
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Personal Information</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Update your personal details and shipping address.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Info Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Basic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-muted-foreground" /> First Name
              </label>
              {isEditing ? (
                <Input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.firstName}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-muted-foreground opacity-0" /> Last Name
              </label>
              {isEditing ? (
                <Input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.lastName}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
              </label>
              {isEditing ? (
                <Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.email}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                <Phone className="w-4 h-4 text-muted-foreground" /> Phone Number
              </label>
              {isEditing ? (
                <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
        </section>

        <div className="h-px w-full bg-border" />

        {/* Default Shipping Address Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Default Shipping Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-muted-foreground" /> Street Address
              </label>
              {isEditing ? (
                <Input required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.address}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground pl-6">City</label>
              {isEditing ? (
                <Input required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.city}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground pl-6">Country</label>
              {isEditing ? (
                <Input required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.country}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground pl-6">Postal Code</label>
              {isEditing ? (
                <Input required value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
              ) : (
                <p className="h-10 px-3 py-2 text-sm text-foreground bg-secondary/30 rounded-md border border-transparent">{profile.zip}</p>
              )}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-3 pt-6 border-t border-border"
          >
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit">
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}