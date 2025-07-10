
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface PaymentFormProps {
  paymentData: PaymentData;
  onChange: (data: PaymentData) => void;
}

const PaymentForm = ({ paymentData, onChange }: PaymentFormProps) => {
  const handleChange = (field: keyof PaymentData, value: string) => {
    onChange({
      ...paymentData,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name *
        </label>
        <Input
          value={paymentData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          placeholder="Enter cardholder name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number *
        </label>
        <Input
          value={paymentData.cardNumber}
          onChange={(e) => handleChange('cardNumber', e.target.value)}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date *
          </label>
          <Input
            value={paymentData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV *
          </label>
          <Input
            value={paymentData.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)}
            placeholder="123"
            maxLength={4}
            required
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            🔒 Your payment information is secure and encrypted. We never store your card details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
