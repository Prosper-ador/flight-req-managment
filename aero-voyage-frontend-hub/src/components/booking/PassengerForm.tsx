
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface PassengerFormProps {
  passenger: Passenger;
  onChange: (passenger: Passenger) => void;
}

const PassengerForm = ({ passenger, onChange }: PassengerFormProps) => {
  const handleChange = (field: keyof Passenger, value: string) => {
    onChange({
      ...passenger,
      [field]: value
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Name *
        </label>
        <Input
          value={passenger.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          placeholder="Enter first name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Last Name *
        </label>
        <Input
          value={passenger.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          placeholder="Enter last name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <Input
          type="email"
          value={passenger.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <Input
          type="tel"
          value={passenger.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth *
        </label>
        <Input
          type="date"
          value={passenger.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default PassengerForm;
