import { locationApi } from './api';

export const fetchingStatesData = async () => {
  const response = await locationApi.get('/estados');
  return response.data;
};

export const fetchingCityByState = async (state: string) => {
  const response = await locationApi.get(`/estados/${state}/municipios`);
  return response.data;
};
