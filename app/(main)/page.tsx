import { ParsedQuery } from "query-string";
import MainClient from "./client/main-client";
import fetchCars from "@/lib/fetching/fetchCars";

interface Props {
  searchParams: ParsedQuery<string>;
}

export default async function MainPage({ searchParams }: Props) {
  const data = await fetchCars({ query: searchParams });

  if (!data || !data.cars) {
    return <div>Произошла ошибка</div>;
  }

  const { cars, colors, brands, hasMore } = data;

  return (
    <MainClient cars={cars} colors={colors} brands={brands} hasMore={hasMore} />
  );
}
