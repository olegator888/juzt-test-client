import { Car } from "@/types/car";

export interface Color {
  color: string;
  // this color names will be used in query to request filtered data,
  // russian words are bad for this
  colorUrl: string;
}

export interface ServerResponse {
  hasMore: boolean;
  cars: Car[];
  colors: Color[];
  brands: string[];
}
