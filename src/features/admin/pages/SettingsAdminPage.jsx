import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, CreditCard, Truck, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export function SettingsAdminPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your store configuration and preferences.
          </p>
        </div>
        <Button onClick={handleSave} isLoading={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-accent text-background'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeTab === 'general' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Basic information about your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Store Name"
                  defaultValue="NovaShop"
                  placeholder="Your store name"
                />
                <Textarea
                  label="Store Description"
                  defaultValue="Premium essentials for modern living."
                  placeholder="Brief description of your store"
                  rows={3}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Contact Email"
                    type="email"
                    defaultValue="hello@novashop.com"
                  />
                  <Input
                    label="Contact Phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Address</CardTitle>
                <CardDescription>
                  Your business address for invoices and correspondence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Street Address"
                  defaultValue="123 Design Street"
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" defaultValue="San Francisco" />
                  <Input label="State" defaultValue="CA" />
                  <Input label="ZIP Code" defaultValue="94102" />
                </div>
                <Select
                  label="Country"
                  defaultValue="US"
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'UK', label: 'United Kingdom' },
                  ]}
                />
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'payments' && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure payment methods and processing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Accepted Payment Methods</h3>
                <div className="space-y-3">
                  {['Credit/Debit Cards', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={method === 'Credit/Debit Cards'}
                        className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                      />
                      <span className="text-foreground">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Currency Settings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Default Currency"
                    defaultValue="USD"
                    options={[
                      { value: 'USD', label: 'US Dollar (USD)' },
                      { value: 'EUR', label: 'Euro (EUR)' },
                      { value: 'GBP', label: 'British Pound (GBP)' },
                    ]}
                  />
                  <Select
                    label="Currency Position"
                    defaultValue="before"
                    options={[
                      { value: 'before', label: 'Before amount ($100)' },
                      { value: 'after', label: 'After amount (100$)' },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'shipping' && (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure shipping rates and delivery options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Free Shipping Threshold"
                  type="number"
                  defaultValue="100"
                  placeholder="Minimum order for free shipping"
                />
                <Input
                  label="Standard Shipping Rate"
                  type="number"
                  defaultValue="9.99"
                  placeholder="Flat rate shipping cost"
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Shipping Zones</h3>
                <div className="space-y-3">
                  {['Domestic (US)', 'Canada', 'International'].map((zone) => (
                    <div key={zone} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <span className="text-foreground">{zone}</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: 'orders', label: 'New orders', description: 'Get notified when a new order is placed' },
                  { id: 'inventory', label: 'Low inventory', description: 'Alert when product stock is running low' },
                  { id: 'reviews', label: 'New reviews', description: 'Notification when customers leave reviews' },
                  { id: 'customers', label: 'New customers', description: 'Alert when new customers sign up' },
                ].map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted/30 peer-focus:ring-2 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage account security and access.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Set Up</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
