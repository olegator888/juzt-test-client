import { engineMap, transmissionMap } from "@/const";
import fetchCarById from "@/lib/fetching/fetchCarById";
import axios from "axios";
import Image from "next/image";

export default async function CarPage({
  params,
}: {
  params: { carId: string };
}) {
  const car = await fetchCarById(params.carId);

  if (!car) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <div className="flex gap-8">
      <div className="h-[500px] w-[40%] relative">
        <Image
          src={car.imageUrl}
          fill
          alt="Car image"
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-xl">Характеристики автомобиля</h1>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Бренд:</div>
          <div>{car.brand}</div>
        </div>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Модель:</div>
          <div>{car.model}</div>
        </div>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Цвет:</div>
          <div>{car.color}</div>
        </div>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Цена:</div>
          <div>
            {car.price}
            <span className="text-sm">₽</span>
          </div>
        </div>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Год выпуска:</div>
          <div>{car.year}</div>
        </div>
        <div className="grid gap-2 grid-cols-2 items-center text-lg">
          <div className="text-zinc-500">Тип двигателя:</div>
          <div>{engineMap[car.engineType]}</div>
        </div>
        {car.transmission && (
          <div className="grid gap-2 grid-cols-2 items-center text-lg">
            <div className="text-zinc-500">Трансмиссия:</div>
            <div>{transmissionMap[car.transmission]}</div>
          </div>
        )}
        {car.powerReserve && (
          <div className="flex gap-2 items-center text-lg">
            <div className="text-zinc-500">Запас хода (в км):</div>
            <div>{car.powerReserve}</div>
          </div>
        )}
      </div>
    </div>
  );
}
