import React, { useState } from 'react';
import { Button } from '../ui/button';

interface OTPVerificationProps {
  onVerify: (otp: string) => void;
  onResend: () => void;
  length?: number;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  onVerify,
  onResend,
  length = 6,
}) => {
  const [otp, setOtp] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= length) {
      setOtp(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === length) {
      onVerify(otp);
    }
  };

  return (
    <div className="my-6">
      <h3 className="text-md font-medium mb-3 text-gray-800">Enter Verification Code</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-2 text-center text-xl font-bold tracking-widest border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder={''.padStart(length, '-')}
            maxLength={length}
            inputMode="numeric"
          />
          <div className="flex justify-between w-full mt-4">
            <Button 
              type="button" 
              onClick={onResend} 
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Resend OTP
            </Button>
            <Button 
              type="submit" 
              disabled={otp.length !== length}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Verify
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
