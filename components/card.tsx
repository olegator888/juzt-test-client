"use client";

import { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";

interface Props {
  car: Car;
}

const Card = ({ car }: Props) => {
  return (
    <Link href={`/cars/${car.id}`} className="h-[300px] flex flex-col rounded-xl cursor-pointer transition group shadow-xl border-transparent hover:border-zinc-200 border-2 p-2 relative">
      <div className="h-[220px] w-full relative overflow-hidden rounded-lg">
        <Image
          src={car.imageUrl}
          fill
          alt="Car image"
          className="object-cover group-hover:scale-110 transition"
        />
      </div>
      <div className="mt-2 px-3 flex flex-col space-y-0.5">
        <div className="text-zinc-600 text-lg">
          {car.brand} {car.model}
        </div>
        <div className="text-sm text-zinc-500">{car.year}</div>
      </div>
      <div className="absolute right-3 bottom-3 text-zinc-600 text-md">
        {car.price}
        <span className="text-xs">₽</span>
      </div>
    </Link>
  );
};

export default Card;
