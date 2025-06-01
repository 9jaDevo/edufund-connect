import React from 'react';
import Select, { components, OptionProps, SingleValueProps } from 'react-select';
import { Country, countries, useCountryDetection } from '../../utils/countries';

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const countryOptions: CountryOption[] = countries.map(country => ({
  value: country.code,
  label: country.name,
  flag: country.flag,
}));

const CustomOption = ({ children, ...props }: OptionProps<CountryOption>) => (
  <components.Option {...props}>
    <div className="flex items-center">
      <span className="mr-2">{props.data.flag}</span>
      {children}
    </div>
  </components.Option>
);

const CustomSingleValue = ({ children, ...props }: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <div className="flex items-center">
      <span className="mr-2">{props.data.flag}</span>
      {children}
    </div>
  </components.SingleValue>
);

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, className }) => {
  const { detectedCountry, loading } = useCountryDetection();

  const selectedOption = value 
    ? countryOptions.find(option => option.value === value)
    : detectedCountry 
      ? countryOptions.find(option => option.value === detectedCountry.code)
      : null;

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onChange(option?.value || '')}
      options={countryOptions}
      components={{
        Option: CustomOption,
        SingleValue: CustomSingleValue,
      }}
      className={className}
      classNamePrefix="country-select"
      isLoading={loading}
      placeholder="Select a country"
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e5e7eb',
          '&:hover': {
            borderColor: '#d1d5db',
          },
          boxShadow: 'none',
          '&:focus-within': {
            borderColor: '#2563eb',
            boxShadow: '0 0 0 1px #2563eb',
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected 
            ? '#2563eb' 
            : state.isFocused 
              ? '#f3f4f6'
              : undefined,
          color: state.isSelected ? 'white' : undefined,
          cursor: 'pointer',
        }),
      }}
    />
  );
};

export default CountrySelect;