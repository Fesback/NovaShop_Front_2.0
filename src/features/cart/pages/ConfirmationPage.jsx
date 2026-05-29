import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import { Container } from '@/components/Brand';
import { Button } from '@/components/ui/Button';
import confetti from 'canvas-confetti';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const [orderNumber] = useState(() => `NS-${Date.now().toString(36).toUpperCase()}`);
  const [deliveryDate] = useState(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));

  useEffect(() => {
    // Celebration confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#171717', '#525252', '#a3a3a3'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#171717', '#525252', '#a3a3a3'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12">
      <Container className="max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 bg-accent/10 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </motion.div>

          <h1 className="text-3xl font-semibold text-foreground mb-4">
            Order Confirmed!
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            Thank you for your purchase. We&apos;ve sent a confirmation email with your order details.
          </p>

          {/* Order Info Card */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="font-mono font-medium text-foreground">
                {orderNumber}
              </span>
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  {deliveryDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold text-foreground mb-4">What&apos;s Next?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-accent">1</span>
                </span>
                You&apos;ll receive an email confirmation shortly.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-accent">2</span>
                </span>
                We&apos;ll notify you when your order ships.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-accent">3</span>
                </span>
                Track your package with the link in your email.
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button className="flex-1" onClick={() => navigate('/catalog')}>
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
