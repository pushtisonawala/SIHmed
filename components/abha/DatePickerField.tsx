import React from 'react';

interface DatePickerFieldProps {
  label: string;
  id: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  required?: boolean;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  id,
  date,
  setDate,
  required = false,
  error,
}) => {
  // Format the date as YYYY-MM-DD for the input
  const formattedDate = date ? 
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : 
    '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setDate(new Date(value));
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-green-600">*</span>}
      </label>
      <input
        type="date"
        id={id}
        name={id}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors`}
        value={formattedDate}
        onChange={handleChange}
        max={new Date().toISOString().split('T')[0]} // Limit to current date
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DatePickerField;
