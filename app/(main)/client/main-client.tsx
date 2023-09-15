"use client";

import Card from "@/components/card";
import CarsList from "@/components/cars-list";
import Filters from "@/components/filters";
import { Car } from "@/types/car";
import { Color } from "@/types/data";

interface Props {
  cars: Car[];
  colors: Color[];
  brands: string[];
  hasMore: boolean;
}

const MainClient = ({ cars, colors, brands, hasMore }: Props) => {
  return (
    <div className="flex gap-4">
      <Filters colors={colors} brands={brands} />
      <CarsList carsInitial={cars} hasMoreInitial={hasMore} />
    </div>
  );
};

export default MainClient;
