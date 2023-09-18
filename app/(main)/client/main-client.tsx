"use client";

import Card from "@/components/card";
import CarsList from "@/components/cars-list";
import Filters from "@/components/filters";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";
import { Color } from "@/types/data";
import { useState } from "react";

interface Props {
  cars: Car[];
  colors: Color[];
  brands: string[];
  hasMore: boolean;
}

const MainClient = ({ cars, colors, brands, hasMore }: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="max-w-[300px] mx-auto"
        onClick={() => setFiltersOpen(true)}
      >
        Фильтры
      </Button>
      <Filters
        colors={colors}
        brands={brands}
        isOpen={filtersOpen}
        close={() => setFiltersOpen(false)}
      />
      <CarsList carsInitial={cars} hasMoreInitial={hasMore} />
    </div>
  );
};

export default MainClient;
