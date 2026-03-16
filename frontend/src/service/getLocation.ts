import { locationApi, addressApi } from './api';

export const fetchingStatesData = async () => {
  const response = await locationApi.get('/estados');
  return response.data;
};

export const fetchingCityByState = async (state: string) => {
  const response = await locationApi.get(`/estados/${state}/municipios`);
  return response.data;
};

export const fetchingAddressByCep = async (cep: string) => {
  const response = await addressApi.get(`/${cep}/json`);
  return response.data;
};
