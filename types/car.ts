export type EngineType = "gasoline" | "diesel" | "electric";
export type TransmissionType = "manual" | "auto" | "robotic";

export interface CarBase {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  color: string;
  colorUrl: string;
  price: number;
  year: number;
}

export interface CarClassic extends CarBase {
  engineType: Exclude<EngineType, "electric">;
  transmission: TransmissionType;
  powerReserve: null;
}

export interface CarElectric extends CarBase {
  engineType: Extract<EngineType, "electric">;
  transmission: null;
  powerReserve: number;
}

export type Car = CarClassic | CarElectric;
