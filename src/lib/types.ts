export interface Container {
  name: string;
  waterGrams: number;
  diameter: number;
  wicks: string[];
}

export interface Temperature {
  F: string;
  C: string;
}

export interface Wax {
  name: string;
  specificGravity: number;
  meltPoint: Temperature;
  pourTemperature: Temperature;
  addFragranceTemperature: Temperature;
  maxFrangranceLoad: string;
  cureTime: string;
}

export type TempUnit = 'F' | 'C';

export interface TempScale {
  name: string;
  value: TempUnit;
}
