import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Container } from '@/components/Brand';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { formatPrice } from '@/lib/utils';

const steps = [
  { id: 1, name: 'Shipping' },
  { id: 2, name: 'Payment' },
  { id: 3, name: 'Review' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    notes: '',
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const shipping = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    navigate('/confirmation');
  };

  if (items.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground mb-8">Add some items to checkout.</p>
        <Button onClick={() => navigate('/catalog')}>Continue Shopping</Button>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <nav className="mb-12">
          <ol className="flex items-center gap-4">
            {steps.map((s, i) => (
              <li key={s.id} className="flex items-center gap-4">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  disabled={s.id > step}
                  className={`flex items-center gap-2 ${
                    s.id <= step
                      ? 'text-foreground'
                      : 'text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                      s.id < step
                        ? 'bg-accent border-accent text-background'
                        : s.id === step
                        ? 'border-accent text-accent'
                        : 'border-border text-muted'
                    }`}
                  >
                    {s.id}
                  </span>
                  <span className="hidden sm:inline text-sm font-medium">
                    {s.name}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 ${
                      s.id < step ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <Truck className="w-5 h-5" />
                      Shipping Information
                    </h2>

                    <div className="space-y-4">
                      <Input
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="your@email.com"
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          required
                          value={formData.firstName}
                          onChange={(e) => updateField('firstName', e.target.value)}
                        />
                        <Input
                          label="Last Name"
                          required
                          value={formData.lastName}
                          onChange={(e) => updateField('lastName', e.target.value)}
                        />
                      </div>

                      <Input
                        label="Address"
                        required
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder="123 Main St"
                      />

                      <div className="grid sm:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          required
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                        />
                        <Input
                          label="State"
                          required
                          value={formData.state}
                          onChange={(e) => updateField('state', e.target.value)}
                        />
                        <Input
                          label="ZIP Code"
                          required
                          value={formData.zip}
                          onChange={(e) => updateField('zip', e.target.value)}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Select
                          label="Country"
                          value={formData.country}
                          onChange={(e) => updateField('country', e.target.value)}
                          options={[
                            { value: 'US', label: 'United States' },
                            { value: 'CA', label: 'Canada' },
                            { value: 'UK', label: 'United Kingdom' },
                          ]}
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Details
                    </h2>

                    <div className="space-y-4">
                      <Input
                        label="Cardholder Name"
                        required
                        value={formData.cardName}
                        onChange={(e) => updateField('cardName', e.target.value)}
                        placeholder="Name on card"
                      />

                      <Input
                        label="Card Number"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => updateField('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          required
                          value={formData.cardExpiry}
                          onChange={(e) => updateField('cardExpiry', e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        <Input
                          label="CVC"
                          required
                          value={formData.cardCvc}
                          onChange={(e) => updateField('cardCvc', e.target.value)}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      Review Your Order
                    </h2>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-foreground mb-2">
                        Shipping Address
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.zip}
                        <br />
                        {formData.country}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-accent hover:underline mt-2"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-foreground mb-2">
                        Payment Method
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Card ending in {formData.cardNumber.slice(-4) || '****'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-sm text-accent hover:underline mt-2"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-4">
                        Items ({items.length})
                      </h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 text-sm"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg bg-muted/10"
                            />
                            <div className="flex-1">
                              <p className="text-foreground">{item.name}</p>
                              <p className="text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-foreground font-medium">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div className="mt-6">
                      <Textarea
                        label="Order Notes (optional)"
                        value={formData.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        placeholder="Any special instructions..."
                        rows={3}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit" className="flex-1" isLoading={isProcessing}>
                  {step < 3 ? 'Continue' : 'Place Order'}
                </Button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg bg-muted/10"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-background text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-sm text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="text-xl font-semibold text-foreground">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
