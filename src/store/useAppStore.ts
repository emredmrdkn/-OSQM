import { create } from 'zustand';
import { CityConfig } from '@/types/city';
import { RealityCheckResult } from '@/types/calculator';
import { MerchProduct } from '@/types/merch';
import { CITIES_DATA } from '@/data/cities';
import rawProducts from '@/data/products.json';
import { computeReality } from '@/lib/calculator';

const cities: CityConfig[] = CITIES_DATA;
const products: MerchProduct[] = rawProducts as MerchProduct[];
const defaultCity: CityConfig = cities[0]; // Sydney
const defaultDeposit = 25000;
const initialResult = computeReality(defaultCity, defaultDeposit);

export interface AppState {
  // Cities & Calculator
  cities: CityConfig[];
  selectedCityId: string;
  depositAmount: number;
  result: RealityCheckResult;
  currencyMode: 'AUD' | 'USD';
  isReceiptVisible: boolean;

  // Merch
  products: MerchProduct[];

  // Modals & Social
  isShareModalOpen: boolean;
  isWaitlistOpen: boolean;
  selectedProduct: MerchProduct | null;
  submittedTicketId: string | null;

  // Actions
  setSelectedCityId: (cityId: string) => void;
  setDepositAmount: (amount: number) => void;
  setCurrencyMode: (mode: 'AUD' | 'USD') => void;
  calculate: () => void;
  openShareModal: () => void;
  closeShareModal: () => void;
  openWaitlistModal: (product?: MerchProduct) => void;
  closeWaitlistModal: () => void;
  setSubmittedTicketId: (ticketId: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  cities,
  selectedCityId: defaultCity.id,
  depositAmount: defaultDeposit,
  result: initialResult,
  currencyMode: 'AUD',
  isReceiptVisible: false,

  products,

  isShareModalOpen: false,
  isWaitlistOpen: false,
  selectedProduct: null,
  submittedTicketId: null,

  setSelectedCityId: (cityId: string) => {
    const state = get();
    const city = state.cities.find((c) => c.id === cityId) || state.cities[0];
    const newResult = computeReality(city, state.depositAmount);
    set({
      selectedCityId: city.id,
      result: newResult,
    });
  },

  setDepositAmount: (amount: number) => {
    const state = get();
    const city = state.cities.find((c) => c.id === state.selectedCityId) || state.cities[0];
    const safeAmount = Math.max(0, Number.isFinite(amount) ? amount : 0);
    const newResult = computeReality(city, safeAmount);
    set({
      depositAmount: safeAmount,
      result: newResult,
    });
  },

  setCurrencyMode: (mode: 'AUD' | 'USD') => {
    set({ currencyMode: mode });
  },

  calculate: () => {
    const state = get();
    const city = state.cities.find((c) => c.id === state.selectedCityId) || state.cities[0];
    const newResult = computeReality(city, state.depositAmount);
    set({
      result: newResult,
      isReceiptVisible: true,
    });
  },

  openShareModal: () => set({ isShareModalOpen: true }),
  closeShareModal: () => set({ isShareModalOpen: false }),

  openWaitlistModal: (product?: MerchProduct) =>
    set({
      isWaitlistOpen: true,
      selectedProduct: product || null,
      submittedTicketId: null,
    }),

  closeWaitlistModal: () =>
    set({
      isWaitlistOpen: false,
      selectedProduct: null,
      submittedTicketId: null,
    }),

  setSubmittedTicketId: (ticketId: string | null) => set({ submittedTicketId: ticketId }),
}));
