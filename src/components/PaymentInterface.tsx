import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  DollarSign, 
  Gift,
  Shield,
  Clock,
  CheckCircle,
  Star,
  TrendingDown,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'cash';
  name: string;
  details: string;
  icon: React.ReactNode;
  discount?: number;
  processingTime: string;
  preferred?: boolean;
}

interface RideBooking {
  rideId: string;
  driverName: string;
  pickup: string;
  destination: string;
  distance: string;
  basePrice: number;
  surgeFactor: number;
  discount: number;
  finalPrice: number;
}

export const PaymentInterface = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('upi');
  const [promoCode, setPromoCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [walletBalance] = useState(450);
  
  const { toast } = useToast();

  const rideDetails: RideBooking = {
    rideId: "MBU2024001",
    driverName: "Ravi Kumar",
    pickup: "MBU Main Gate",
    destination: "Tirupati Railway Station",
    distance: "8.5 km",
    basePrice: 120,
    surgeFactor: 1.2,
    discount: 25,
    finalPrice: 119
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      type: 'upi',
      name: 'UPI Payment',
      details: 'Pay using Google Pay, PhonePe, Paytm',
      icon: <Smartphone className="h-5 w-5" />,
      discount: 5,
      processingTime: 'Instant',
      preferred: true
    },
    {
      id: 'wallet',
      type: 'wallet',
      name: 'MBU Wallet',
      details: `Available balance: ₹${walletBalance}`,
      icon: <Wallet className="h-5 w-5" />,
      discount: 10,
      processingTime: 'Instant',
      preferred: walletBalance >= rideDetails.finalPrice
    },
    {
      id: 'card',
      type: 'card',
      name: 'Credit/Debit Card',
      details: 'Visa, Mastercard, RuPay',
      icon: <CreditCard className="h-5 w-5" />,
      processingTime: '2-3 seconds'
    },
    {
      id: 'cash',
      type: 'cash',
      name: 'Cash Payment',
      details: 'Pay driver directly',
      icon: <DollarSign className="h-5 w-5" />,
      processingTime: 'On delivery'
    }
  ];

  const promoCodes = [
    { code: 'STUDENT20', discount: 20, description: 'Student Discount' },
    { code: 'WEEKEND15', discount: 15, description: 'Weekend Special' },
    { code: 'FIRST50', discount: 50, description: 'First Ride Bonus' }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setPaymentComplete(true);
    
    toast({
      title: "🎉 Payment Successful!",
      description: `₹${rideDetails.finalPrice} paid successfully. Your ride is confirmed.`
    });
  };

  const applyPromoCode = () => {
    const validPromo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    if (validPromo) {
      toast({
        title: "🎫 Promo Applied!",
        description: `${validPromo.description} - ₹${validPromo.discount} off applied.`
      });
    } else {
      toast({
        title: "❌ Invalid Code",
        description: "The promo code you entered is not valid.",
        variant: "destructive"
      });
    }
  };

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod);
  const finalAmount = rideDetails.finalPrice - (selectedPaymentMethod?.discount || 0);

  if (paymentComplete) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="border-none shadow-lg bg-gradient-success/10">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-transport-success" />
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your ride has been confirmed and the driver has been notified.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Ride ID:</span>
                <span className="font-mono">{rideDetails.rideId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-bold text-transport-success">₹{finalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{selectedPaymentMethod?.name}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-primary mb-3">
              Track Your Ride
            </Button>
            <Button variant="outline" className="w-full">
              Download Receipt
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Complete Payment</h2>
        <p className="text-muted-foreground">
          Secure and fast payment for your ride
        </p>
      </div>

      {/* Ride Summary */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-transport-success" />
            Ride Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{rideDetails.pickup}</div>
              <div className="text-sm text-muted-foreground">to</div>
              <div className="font-medium">{rideDetails.destination}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">{rideDetails.distance}</div>
              <div className="text-sm text-muted-foreground">
                with {rideDetails.driverName}
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹{rideDetails.basePrice}</span>
            </div>
            {rideDetails.surgeFactor > 1 && (
              <div className="flex justify-between text-transport-warning">
                <span>Surge ({rideDetails.surgeFactor}x)</span>
                <span>+₹{Math.round(rideDetails.basePrice * (rideDetails.surgeFactor - 1))}</span>
              </div>
            )}
            {rideDetails.discount > 0 && (
              <div className="flex justify-between text-transport-success">
                <span>Student Discount</span>
                <span>-₹{rideDetails.discount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{rideDetails.finalPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promo Code */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-transport-warning" />
            Promo Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button onClick={applyPromoCode} variant="outline">
              Apply
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            {promoCodes.map((promo) => (
              <Button
                key={promo.code}
                variant="outline"
                size="sm"
                onClick={() => setPromoCode(promo.code)}
                className="text-xs"
              >
                {promo.code}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-transport-primary" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Choose your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label 
                    htmlFor={method.id} 
                    className="flex-1 cursor-pointer"
                  >
                    <div className={`p-4 rounded-lg border transition-colors ${
                      selectedMethod === method.id 
                        ? 'border-transport-primary bg-transport-primary/5' 
                        : 'border-muted hover:border-transport-primary/50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-transport-primary">
                            {method.icon}
                          </div>
                          <div>
                            <div className="font-medium flex items-center space-x-2">
                              <span>{method.name}</span>
                              {method.preferred && (
                                <Badge className="bg-transport-success text-white text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {method.details}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {method.discount && (
                            <div className="text-transport-success font-medium text-sm">
                              {method.discount}% off
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {method.processingTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Final Amount */}
      <Card className="border-none shadow-lg bg-gradient-card">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Final Amount</div>
              <div className="text-3xl font-bold text-transport-primary">
                ₹{finalAmount}
              </div>
              {selectedPaymentMethod?.discount && (
                <div className="text-sm text-transport-success flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  You save ₹{selectedPaymentMethod.discount}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-transport-success">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Instant Processing</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-primary text-lg py-6"
            onClick={handlePayment}
            disabled={isProcessing || (selectedMethod === 'wallet' && walletBalance < finalAmount)}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Pay ₹${finalAmount} with ${selectedPaymentMethod?.name}`
            )}
          </Button>

          <div className="text-center mt-4">
            <div className="text-xs text-muted-foreground">
              By proceeding, you agree to our Terms & Conditions
            </div>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-transport-warning" />
                <span className="text-xs">256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-transport-success" />
                <span className="text-xs">PCI Compliant</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};