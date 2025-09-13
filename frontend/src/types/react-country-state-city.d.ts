declare module 'react-country-state-city' {
  import { ComponentType } from 'react';

  interface Country {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    phone_code: string;
    capital: string;
    currency: string;
    native: string;
    emoji: string;
    emojiU: string;
  }

  interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    type: string;
  }

  interface City {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    country_code: string;
    state_code: string;
  }

  interface CountrySelectProps {
    value?: Country;
    defaultValue?: { isoCode: string; name: string };
    onChange?: (country: Country) => void;
    placeHolder?: string;
    className?: string;
    style?: React.CSSProperties;
    required?: boolean;
  }

  interface StateSelectProps {
    countryid?: number;
    value?: State;
    onChange?: (state: State) => void;
    placeHolder?: string;
    className?: string;
    style?: React.CSSProperties;
    required?: boolean;
  }

  interface CitySelectProps {
    countryid?: number;
    stateid?: number;
    value?: City;
    onChange?: (city: City) => void;
    placeHolder?: string;
    className?: string;
    style?: React.CSSProperties;
    required?: boolean;
  }

  export const CountrySelect: ComponentType<CountrySelectProps>;
  export const StateSelect: ComponentType<StateSelectProps>;
  export const CitySelect: ComponentType<CitySelectProps>;
  export const Country: Country[];
  export const State: State[];
  export const City: City[];
}
