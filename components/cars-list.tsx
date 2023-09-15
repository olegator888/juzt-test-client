"use client";

import Card from "@/components/card";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { Car } from "@/types/car";
import { useRef, MutableRefObject, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchNextPage } from "@/store/fetchNextPage";
import { setCars, setHasMore, setPage, setStatus } from "@/store/reducers/main";
import qs from "query-string";
import fetchCars from "@/lib/fetching/fetchCars";

interface Props {
  carsInitial: Car[];
  hasMoreInitial: boolean;
}

const CarsList = ({ carsInitial, hasMoreInitial }: Props) => {
  const dispatch = useAppDispatch();

  const params = useSearchParams();

  const paramsParsed = qs.parse(params.toString());

  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [inited, setInited] = useState(false);
  const { cars, status, hasMore } = useAppSelector((state) => state.main);

  const onScrollEnd = async () => {
    // checks to reduce amount of rerenders
    if (hasMore && status !== "fetching" && status !== "loading") {
      dispatch(fetchNextPage(paramsParsed));
    }
  };

  useEffect(() => {
    // pass cars data to redux state
    if (!cars.length) {
      dispatch(setCars(carsInitial));
    }

    if (hasMoreInitial) {
      dispatch(setHasMore(true));
    }

    setInited(true);

    /**
     * here I reset all data for app to work properly when user comes back to page
     * I used redux to store cars data for these reasons:
     * 1. state and logic separated from page, code is clean
     * 2. now redux is the only source of truth, instead of multiple states for each entity (cars, status, hasMore, page)
     * 3. when using redux it's easier to avoid extra rerenders when changing all these states
     *
     * so, now we have cars that are stored globally, but user needs them only on this page,
     * that's why here we reset data
     */
    return () => {
      dispatch(setCars([]));
      dispatch(setHasMore(true));
      dispatch(setPage(1));
    };
  }, []);

  useEffect(() => {
    /**
     * I could use just ssr for this but i'm using infinite scroll and for this i need
     * data to be in client state (maybe I'm wrong but I did't find another solution)
     * If I would use pagination instead, I could use ssr for sure
     * but for me infinite scroll is more interesting)
     */
    if (inited) {
      dispatch(setStatus("loading"));
      fetchCars({ query: paramsParsed }).then((data) => {
        if (data) {
          dispatch(setCars(data.cars));
          dispatch(setHasMore(data.hasMore));
          dispatch(setStatus("idle"));
        }
      });
    }
  }, [params]);

  // observe visibility of trigger element
  useInfiniteScroll({
    triggerRef,
    callback: onScrollEnd,
  });

  // show initialCars on page render, so user always sees something
  // without it list is empty for 1 second on page mount before setCars() finishes
  const carsToRender = cars.length ? cars : carsInitial;

  let content = (
    <>
      {carsToRender.length > 0 ? (
        <div className="w-full grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
          {carsToRender.map((car) => (
            <Card key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center font-lg text-zinc-500">
          автомобили не найдены
        </div>
      )}
    </>
  );

  // showing loader when loading filtered cars
  if (status === "loading") {
    content = (
      <div className="w-full h-full flex items-center justify-center">
        <Loader className="animate-spin text-blue-400 w-14 h-14" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {content}
      <div ref={triggerRef} className="h-1 my-4" />
      {status === "fetching" && (
        <div className="m-y-4 mb-8 flex justify-center">
          <Loader className="animate-spin text-blue-400 w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default CarsList;
