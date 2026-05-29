import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import api from '@/lib/api'; 
import axios from 'axios'; 

const passwordRequirements = [
  { id: 'length', label: 'Al menos 8 caracteres', test: (p) => p.length >= 8 },
  { id: 'upper', label: 'Una letra mayúscula', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', label: 'Una letra minúscula', test: (p) => /[a-z]/.test(p) },
  { id: 'number', label: 'Un número', test: (p) => /\d/.test(p) },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    confirmPassword: '',
    direccion: '',
    telefono: '',
  });

  const passwordValid = passwordRequirements.every((r) => r.test(formData.contrasena));
  const passwordsMatch = formData.contrasena === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!passwordValid) {
      setError('Por favor, cumple con todos los requisitos de la contraseña.');
      return;
    }

    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    const payload = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      contrasena: formData.contrasena,
      direccion: formData.direccion,
      telefono: formData.telefono,
    };

    try {
      await api.post('/auth/register', payload);

      try {
        await axios.post(`${import.meta.env.VITE_NOTIF_API_URL}/api/notificaciones/correo`, {
          correo: formData.email,
          asunto: "🎉 Bienvenido a NovaShop",
          contenido: `Hola ${formData.nombre}, gracias por registrarte en NovaShop. Estamos felices de tenerte con nosotros.`
        });
      } catch (notifError) {
        console.warn("El usuario se registró, pero falló el envío del correo:", notifError);
      }

      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Error en el registro:", err);
      const serverMessage = err.response?.data?.message || err.response?.data?.error;
      setError(serverMessage || 'Ocurrió un error al intentar crear la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Crear una cuenta</h1>
        <p className="text-muted-foreground">Únete para una experiencia de compra premium</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600">
            {success}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Input label="Nombre" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="John" icon={User} />
          <Input label="Apellido" required value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} placeholder="Doe" icon={User} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="correo@ejemplo.com" icon={Mail} />
          <Input label="Teléfono" type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="+51 999 999 999" icon={Phone} />
        </div>

        <Input label="Dirección Completa" required value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} placeholder="Calle, número, distrito" icon={MapPin} />

        <div className="relative">
          <Input label="Contraseña" type={showPassword ? 'text' : 'password'} required value={formData.contrasena} onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} placeholder="Crea una contraseña" icon={Lock} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Requisitos de Contraseña */}
        {formData.contrasena && (
          <div className="space-y-2 bg-secondary/20 p-3 rounded-lg border border-border">
            {passwordRequirements.map((req) => (
              <div key={req.id} className={`flex items-center gap-2 text-xs transition-colors ${req.test(formData.contrasena) ? 'text-green-500' : 'text-muted-foreground'}`}>
                <Check className={`w-3 h-3 ${req.test(formData.contrasena) ? 'opacity-100' : 'opacity-30'}`} />
                {req.label}
              </div>
            ))}
          </div>
        )}

        <Input 
          label="Confirmar Contraseña" type="password" required 
          value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
          placeholder="Confirma tu contraseña" icon={Lock} 
          error={formData.confirmPassword && !passwordsMatch ? 'Las contraseñas no coinciden' : undefined} 
        />

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={success !== ''}>
          {success ? 'Cuenta Creada' : 'Crear Cuenta'}
          {!success && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="text-foreground font-medium hover:underline">
          Inicia sesión
        </Link>
      </p>
    </motion.div>
  );
}
