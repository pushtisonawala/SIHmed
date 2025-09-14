'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InputField from '@/components/abha/InputField';
import OTPVerification from '@/components/abha/OTPVerification';
import DocumentUpload from '@/components/abha/DocumentUpload';
import SelectField from '@/components/abha/SelectField';
import DatePickerField from '@/components/abha/DatePickerField';

// Define auth steps
enum AadhaarAuthStep {
  ENTER_AADHAAR,
  VERIFY_OTP,
  SUCCESS,
}

enum OtherAuthStep {
  ENTER_DETAILS,
  VERIFY_MOBILE_OTP,
  UPLOAD_DOCUMENTS,
  SUCCESS,
}

export default function AbhaRegistration() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [authMethod, setAuthMethod] = useState<'aadhaar' | 'other'>('aadhaar');
  
  // Aadhaar authentication states
  const [aadhaarStep, setAadhaarStep] = useState<AadhaarAuthStep>(AadhaarAuthStep.ENTER_AADHAAR);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [abhaNumber, setAbhaNumber] = useState('');

  // Other documents authentication states
  const [otherStep, setOtherStep] = useState<OtherAuthStep>(OtherAuthStep.ENTER_DETAILS);
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [documentType, setDocumentType] = useState<'dl' | 'pan'>('dl');
  const [frontDocument, setFrontDocument] = useState<File | null>(null);
  const [backDocument, setBackDocument] = useState<File | null>(null);
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  
  // Handle Aadhaar OTP request
  const handleRequestAadhaarOtp = () => {
    console.log('Requesting OTP for Aadhaar:', aadhaarNumber);
    // Call Aadhaar OTP API here
    setAadhaarStep(AadhaarAuthStep.VERIFY_OTP);
  };
  
  // Handle Aadhaar OTP verification
  const handleVerifyAadhaarOtp = (otp: string) => {
    console.log('Verifying OTP:', otp, 'for Aadhaar:', aadhaarNumber);
    // Call Aadhaar OTP verification API here
    
    // Generate mock ABHA number
    const mockAbhaNumber = '12-3456-7890-1234';
    setAbhaNumber(mockAbhaNumber);
    setAadhaarStep(AadhaarAuthStep.SUCCESS);
  };
  
  // Handle Mobile OTP request
  const handleRequestMobileOtp = () => {
    console.log('Requesting OTP for mobile:', mobile);
    // Call Mobile OTP API here
    setOtherStep(OtherAuthStep.VERIFY_MOBILE_OTP);
  };
  
  // Handle Mobile OTP verification
  const handleVerifyMobileOtp = (otp: string) => {
    console.log('Verifying OTP:', otp, 'for mobile:', mobile);
    // Call Mobile OTP verification API here
    setOtherStep(OtherAuthStep.UPLOAD_DOCUMENTS);
  };
  
  // Handle document upload
  const handleSubmitDocuments = () => {
    console.log('Submitting documents:', {
      documentType,
      frontDocument,
      backDocument,
    });
    // Call Document upload API here
    
    // Generate mock enrollment number
    const mockEnrollmentNumber = 'ENR' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    setEnrollmentNumber(mockEnrollmentNumber);
    setOtherStep(OtherAuthStep.SUCCESS);
  };
  
  // Handle method change
  const handleAuthMethodChange = (method: 'aadhaar' | 'other') => {
    setAuthMethod(method);
    // Reset steps when changing auth method
    if (method === 'aadhaar') {
      setAadhaarStep(AadhaarAuthStep.ENTER_AADHAAR);
    } else {
      setOtherStep(OtherAuthStep.ENTER_DETAILS);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">ABHA (Ayushman Bharat Health Account) Registration</h1>
          <p className="text-gray-600 mt-2">Create your health ID to access healthcare services digitally</p>
        </div>
        
        <Card className="w-full shadow-lg border-green-200">
          <CardHeader className="bg-white rounded-t-lg border-b border-green-100">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Signup</TabsTrigger>
              </TabsList>
            </Tabs>
            <CardDescription className="pt-4">
              Choose your preferred method for {activeTab === 'login' ? 'logging in' : 'signing up'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                variant={authMethod === 'aadhaar' ? 'default' : 'outline'} 
                onClick={() => handleAuthMethodChange('aadhaar')}
                className={`${authMethod === 'aadhaar' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'} border-2 h-auto py-3`}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  </svg>
                  Via Aadhaar
                </div>
              </Button>
              
              <Button 
                variant={authMethod === 'other' ? 'default' : 'outline'} 
                onClick={() => handleAuthMethodChange('other')}
                className={`${authMethod === 'other' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'} border-2 h-auto py-3`}
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Via Other Documents
                </div>
              </Button>
            </div>
            
            {/* Aadhaar authentication section */}
            {authMethod === 'aadhaar' && (
              <div>
                {aadhaarStep === AadhaarAuthStep.ENTER_AADHAAR && (
                  <div>
                    <div className="mb-6">
                      <InputField
                        label="Aadhaar Number"
                        type="text"
                        id="aadhaar"
                        placeholder="Enter your 12-digit Aadhaar number"
                        value={aadhaarNumber}
                        onChange={(e) => {
                          // Only allow numbers and limit to 12 digits
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 12) setAadhaarNumber(value);
                        }}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleRequestAadhaarOtp} 
                        disabled={aadhaarNumber.length !== 12}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Send OTP
                      </Button>
                    </div>
                  </div>
                )}
                
                {aadhaarStep === AadhaarAuthStep.VERIFY_OTP && (
                  <OTPVerification
                    onVerify={handleVerifyAadhaarOtp}
                    onResend={() => console.log('Resending OTP')}
                  />
                )}
                
                {aadhaarStep === AadhaarAuthStep.SUCCESS && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentication Successful!</h3>
                    <p className="text-gray-600 mb-4">Your ABHA number has been successfully created</p>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 inline-block">
                      <p className="text-sm text-gray-600">Your ABHA Number</p>
                      <p className="text-xl font-bold text-green-800">{abhaNumber}</p>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Download ABHA Card
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Other documents authentication section */}
            {authMethod === 'other' && (
              <div>
                {otherStep === OtherAuthStep.ENTER_DETAILS && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name"
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      
                      <SelectField
                        label="Gender"
                        id="gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' }
                        ]}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      />
                      
                      <div className="md:col-span-2">
                        <DatePickerField
                          label="Date of Birth"
                          id="dob"
                          date={dob}
                          setDate={setDob}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <InputField
                          label="Mobile Number"
                          type="tel"
                          id="mobile"
                          placeholder="Enter your 10-digit mobile number"
                          value={mobile}
                          onChange={(e) => {
                            // Only allow numbers and limit to 10 digits
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 10) setMobile(value);
                          }}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="mt-2 mb-6">
                          <p className="text-sm font-medium text-gray-700 mb-1">Document Type</p>
                          <div className="flex space-x-4">
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="dl" 
                                name="docType" 
                                value="dl" 
                                checked={documentType === 'dl'}
                                onChange={() => setDocumentType('dl')}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                              />
                              <label htmlFor="dl" className="ml-2 block text-sm text-gray-700">
                                Driving License
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input 
                                type="radio" 
                                id="pan" 
                                name="docType" 
                                value="pan"
                                checked={documentType === 'pan'} 
                                onChange={() => setDocumentType('pan')}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                              />
                              <label htmlFor="pan" className="ml-2 block text-sm text-gray-700">
                                PAN Card
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        onClick={handleRequestMobileOtp}
                        disabled={!name || !dob || !gender || mobile.length !== 10}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Proceed & Verify Mobile
                      </Button>
                    </div>
                  </div>
                )}
                
                {otherStep === OtherAuthStep.VERIFY_MOBILE_OTP && (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a verification code to +91 {mobile}
                    </p>
                    
                    <OTPVerification
                      onVerify={handleVerifyMobileOtp}
                      onResend={() => console.log('Resending OTP')}
                    />
                  </div>
                )}
                
                {otherStep === OtherAuthStep.UPLOAD_DOCUMENTS && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Upload {documentType === 'dl' ? 'Driving License' : 'PAN Card'} Images
                    </h3>
                    
                    <DocumentUpload
                      label={`Upload Front of ${documentType === 'dl' ? 'Driving License' : 'PAN Card'}`}
                      id="frontDoc"
                      onUpload={(file) => setFrontDocument(file)}
                    />
                    
                    {documentType === 'dl' && (
                      <DocumentUpload
                        label="Upload Back of Driving License"
                        id="backDoc"
                        onUpload={(file) => setBackDocument(file)}
                      />
                    )}
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        onClick={handleSubmitDocuments}
                        disabled={!frontDocument || (documentType === 'dl' && !backDocument)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Submit Documents
                      </Button>
                    </div>
                  </div>
                )}
                
                {otherStep === OtherAuthStep.SUCCESS && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Documents Submitted Successfully!</h3>
                    <p className="text-gray-600 mb-4">Your ABHA registration is under process</p>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 inline-block">
                      <p className="text-sm text-gray-600">Your Enrollment Number</p>
                      <p className="text-xl font-bold text-green-800">{enrollmentNumber}</p>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <p>You will receive your ABHA number on your registered mobile number once verification is complete.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>For any queries, contact our support team at <span className="text-green-700">support@abha.gov.in</span></p>
        </div>
      </div>
    </div>
  );
}
