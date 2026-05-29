import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Home, Download } from 'lucide-react';
import { Container } from '@/components/Brand';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => `NS-${Date.now().toString(36).toUpperCase()}`);
  const [deliveryDate] = useState(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
  
  const [orderData] = useState({
    subtotal: 349.00,
    shipping: 0,
    total: 349.00,
    items: [
      { id: '1', name: 'Aero Wireless Headphones', price: 349.00, quantity: 1, image: '/products/headphones.png' },
    ]
  });

  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#171717', '#525252', '#a3a3a3'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#171717', '#525252', '#a3a3a3'] });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <Container className="max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          
          {/* Success Icon */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-semibold text-foreground mb-4">Transacción Completada!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Gracias por tu compra. Hemos enviado un correo de confirmación con los detalles de tu pedido.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8 text-left">
            {/* Order Info Card */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-sm text-muted-foreground block mb-1">Número de Pedido</span>
                <span className="font-mono font-bold text-lg text-foreground block mb-6">{orderNumber}</span>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Entrega Estimada</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {deliveryDate.toLocaleDateString('es-PE', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Receipt Card */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Resumen de Compra</h3>
              <ul className="space-y-3 mb-4 max-h-[100px] overflow-y-auto pr-2">
                {orderData.items.map(item => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate pr-2">{item.quantity}x {item.name}</span>
                    <span className="text-foreground font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatPrice(orderData.subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>{orderData.shipping === 0 ? 'Gratis' : formatPrice(orderData.shipping)}</span></div>
                <div className="flex justify-between text-foreground font-bold pt-2 mt-2 border-t border-border">
                  <span>Total Pagado</span><span>{formatPrice(orderData.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-foreground mb-4">¿Qué sigue ahora?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center shrink-0"><span className="text-xs font-medium text-accent">1</span></span>
                Recibirás la confirmación en tu bandeja de entrada.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center shrink-0"><span className="text-xs font-medium text-accent">2</span></span>
                Te notificaremos en cuanto tu pedido sea enviado.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center shrink-0"><span className="text-xs font-medium text-accent">3</span></span>
                Podrás rastrearlo desde tu panel de usuario.
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" /> Descargar Boleta
            </Button>
            <Button className="flex-1" onClick={() => navigate('/catalog')}>
              Seguir Comprando <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="mt-8">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Home className="w-4 h-4 mr-2" /> Volver al Inicio
            </Link>
          </div>

        </motion.div>
      </Container>
    </div>
  );
}
