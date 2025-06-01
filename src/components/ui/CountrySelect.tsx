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
      <span className="mr-2 text-xl">{props.data.flag}</span>
      {children}
    </div>
  </components.Option>
);

const CustomSingleValue = ({ children, ...props }: SingleValueProps<CountryOption>) => (
  <components.SingleValue {...props}>
    <div className="flex items-center">
      <span className="mr-2 text-xl">{props.data.flag}</span>
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
  const { detectedCountry, loading, error } = useCountryDetection();

  const selectedOption = value 
    ? countryOptions.find(option => option.value === value)
    : detectedCountry 
      ? countryOptions.find(option => option.value === detectedCountry.code)
      : null;

  return (
    <div className="space-y-1">
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
        placeholder={loading ? "Detecting your country..." : "Select a country"}
        isClearable
        isSearchable
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#0F766E' : '#e5e7eb',
            boxShadow: state.isFocused ? '0 0 0 1px #0F766E' : 'none',
            '&:hover': {
              borderColor: state.isFocused ? '#0F766E' : '#d1d5db',
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected 
              ? '#0F766E' 
              : state.isFocused 
                ? '#f3f4f6'
                : undefined,
            color: state.isSelected ? 'white' : undefined,
            cursor: 'pointer',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
        }}
      />
      {error && <p className="text-sm text-error-600">{error}</p>}
    </div>
  );
};

export default CountrySelect;