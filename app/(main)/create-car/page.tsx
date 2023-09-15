"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { EngineType, TransmissionType } from "@/types/car";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "lucide-react";

interface Form {
  imageUrl: string;
  brand: string;
  model: string;
  color: string;
  colorUrl: string;
  price: string;
  year: string;
  engineType: EngineType;
  transmission?: TransmissionType;
  powerReserve?: number;
}

const defaultForm: Form = {
  imageUrl: "",
  brand: "",
  model: "",
  color: "",
  colorUrl: "",
  price: "",
  year: "",
  engineType: "gasoline",
};

const CreateCarPage = () => {
  const [form, setForm] = useState<Form>(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSelectChange = (value: string, name: keyof Form) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const transmission =
        form.engineType !== "electric" ? form.transmission : undefined;
      const powerReserve =
        form.engineType === "electric" ? form.powerReserve : undefined;

      const data = {
        ...form,
        transmission,
        powerReserve,
      };

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cars`, data);

      setForm(defaultForm);
    } catch (e) {
      console.log(e);
    }

    setSubmitting(false);
  };

  return (
    <>
      {submitting && (
        <div className="fixed inset-0 bg-white/50">
          <Loader className="absolute left-[50%] top-[50%] animate-spin text-blue-500 w-14 h-14" />
        </div>
      )}
      <form
        className="flex flex-col gap-3 pt-4 pb-4 w-full items-center"
        onSubmit={onSubmit}
      >
        <label className="flex flex-col gap-1">
          Ссылка на изображение
          <Input
            className="w-[400px]"
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Бренд
          <Input
            className="w-[400px]"
            type="text"
            name="brand"
            value={form.brand}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Модель
          <Input
            className="w-[400px]"
            type="text"
            name="model"
            value={form.model}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Цвет
          <Input
            className="w-[400px]"
            type="text"
            name="color"
            value={form.color}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Url цвета (цвет на английском)
          <Input
            className="w-[400px]"
            type="text"
            name="colorUrl"
            value={form.colorUrl}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Цена
          <Input
            className="w-[400px]"
            type="text"
            name="price"
            value={form.price}
            onChange={onInputChange}
          />
        </label>
        <label className="flex flex-col gap-1">
          Год
          <Input
            className="w-[400px]"
            type="text"
            name="year"
            value={form.year}
            onChange={onInputChange}
          />
        </label>
        <Select
          value={form.engineType}
          onValueChange={(value) => onSelectChange(value, "engineType")}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Тип двигателя" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gasoline">Бензиновый</SelectItem>
            <SelectItem value="diesel">Дизельный</SelectItem>
            <SelectItem value="electric">Электрический</SelectItem>
          </SelectContent>
        </Select>
        {form.engineType === "electric" ? (
          <label className="flex flex-col gap-1">
            Запас хода (в км)
            <Input
              className="w-[400px]"
              type="text"
              value={form.powerReserve || ""}
              name="powerReserve"
              onChange={onInputChange}
            />
          </label>
        ) : (
          <Select
            value={form.transmission}
            onValueChange={(value) => onSelectChange(value, "transmission")}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Тип трансмиссии" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Ручная</SelectItem>
              <SelectItem value="auto">Автоматическая</SelectItem>
              <SelectItem value="robotic">Роботизированная</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Button type="submit">Создать</Button>
      </form>
    </>
  );
};

export default CreateCarPage;
