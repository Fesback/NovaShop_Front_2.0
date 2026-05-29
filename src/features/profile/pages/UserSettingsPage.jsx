import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ShieldCheck, Eye, EyeOff, Bell, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function UserSettingsPage() {
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  
  const [preferences, setPreferences] = useState({ orderUpdates: true, marketingEmails: false, securityAlerts: true });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      setIsLoading(false);
      return;
    }

    setSuccessMessage('Password updated successfully.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsLoading(false);
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl space-y-10"
    >
      {/* Header */}
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-semibold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account security and notification preferences.
        </p>
      </div>

      {/* Mensaje de Éxito Flotante */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-2.5 text-sm text-green-600 dark:text-green-400"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección 1: Seguridad (Cambio de Contraseña) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-2">
          <ShieldCheck className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">Security</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Contraseña Actual */}
          <div className="relative">
            <Input 
              label="Current Password" type={showPassword.current ? 'text' : 'password'} required
              value={passwordData.currentPassword} icon={KeyRound}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
            <button
              type="button" onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Nueva Contraseña */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Input 
                label="New Password" type={showPassword.new ? 'text' : 'password'} required
                value={passwordData.newPassword} icon={KeyRound}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <button
                type="button" onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="relative">
              <Input 
                label="Confirm New Password" type={showPassword.confirm ? 'text' : 'password'} required
                value={passwordData.confirmPassword} icon={KeyRound}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
              <button
                type="button" onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isLoading}>Update Password</Button>
          </div>
        </form>
      </section>

      <div className="h-px w-full bg-border" />

      {/* Sección 2: Preferencias de Notificación */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/50 pb-2">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          {/* Opción 1: Actualización de Pedidos */}
          <label className="flex items-start justify-between p-4 rounded-xl border border-border bg-secondary/20 cursor-pointer hover:bg-secondary/40 transition-colors">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-foreground/5 rounded-lg flex items-center justify-center text-muted-foreground mt-0.5"><CheckCircle2 className="w-4 h-4" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">Order Updates</p>
                <p className="text-xs text-muted-foreground mt-0.5">Receive real-time notifications about your shipment status.</p>
              </div>
            </div>
            <input 
              type="checkbox" checked={preferences.orderUpdates} onChange={() => handlePreferenceChange('orderUpdates')}
              className="w-4 h-4 mt-1 rounded border-border text-foreground focus:ring-foreground accent-foreground"
            />
          </label>

          {/* Opción 2: Correos de Marketing */}
          <label className="flex items-start justify-between p-4 rounded-xl border border-border bg-secondary/20 cursor-pointer hover:bg-secondary/40 transition-colors">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-foreground/5 rounded-lg flex items-center justify-center text-muted-foreground mt-0.5"><Mail className="w-4 h-4" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">Marketing & Offers</p>
                <p className="text-xs text-muted-foreground mt-0.5">Discounts, exclusive product drops and curated style lookbooks.</p>
              </div>
            </div>
            <input 
              type="checkbox" checked={preferences.marketingEmails} onChange={() => handlePreferenceChange('marketingEmails')}
              className="w-4 h-4 mt-1 rounded border-border text-foreground focus:ring-foreground accent-foreground"
            />
          </label>
        </div>
      </section>
    </motion.div>
  );
}