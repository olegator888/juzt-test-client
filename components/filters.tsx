"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Color } from "@/types/data";
import { useRouter, useSearchParams } from "next/navigation";
import qs, { ParsedQuery } from "query-string";
import { ChangeEvent, useCallback } from "react";

interface Props {
  colors: Color[];
  brands: string[];
}

/**
 * we do filtering with query string and not with state
 * because it gives us benefits:
 * 1. we can navigate through requests with browser history arrows
 * 2. we can share link with other users
 * 3. we can save the link and go back to it later
 */

const Filters = ({ colors, brands }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const paramsParsed = qs.parse(params.toString());

  let brandQuery = paramsParsed.brand;
  let colorQuery = paramsParsed.color;

  const sortByDefault = paramsParsed.sortBy;
  const sortMethodDefault = paramsParsed.sortMethod;

  const handleSortSelectChange = (value: string, type: string) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      [type]: value,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const onFilterSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    let currentQuery: ParsedQuery<string> = {};
    let values: string[] = [];

    if (params) {
      currentQuery = qs.parse(params.toString());

      if (checked) {
        values = Array.isArray(currentQuery[name])
          ? (currentQuery[name] as string[])
          : [currentQuery[name] as string];
      } else {
        values = Array.isArray(currentQuery[name])
          ? (currentQuery[name] as string[]).filter(
              (curValue) => curValue !== value
            )
          : [];
      }
    }

    if (checked) {
      values.push(value);
    }

    const updatedQuery = {
      ...currentQuery,
      [name]: Array.from(new Set(values)),
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const getBrandChecked = useCallback(
    (brand: string) => {
      if (!brandQuery) {
        return false;
      }

      if (Array.isArray(brandQuery)) {
        return brandQuery.includes(brand);
      }

      return brandQuery === brand;
    },
    [params]
  );

  const getColorChecked = useCallback(
    (color: string) => {
      if (!colorQuery) {
        return false;
      }

      if (Array.isArray(colorQuery)) {
        return colorQuery.includes(color);
      }

      return colorQuery === color;
    },
    [params]
  );

  return (
    <div className="border rounded-lg p-4 flex flex-col mb-4 gap-4 h-fit sticky top-[40px]">
      <div>
        <h2 className="mb-2 pl-1 text-lg font-semibold">Сортировка</h2>
        <div className="flex flex-col gap-2">
          <Select
            onValueChange={(value) => handleSortSelectChange(value, "sortBy")}
            defaultValue={sortByDefault as string}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Сортировать по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Цене</SelectItem>
              <SelectItem value="year">Году выпуска</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              handleSortSelectChange(value, "sortMethod")
            }
            defaultValue={sortMethodDefault as string}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Способ сортировки" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">По возрастанию</SelectItem>
              <SelectItem value="desc">По убыванию</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <h2 className="mb-1 text-lg font-semibold">Фильтрация</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-md mb-2">Бренд</p>
            <div className="flex flex-col gap-1">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    className="w-3 h-3"
                    type="checkbox"
                    name="brand"
                    checked={getBrandChecked(brand)}
                    value={brand}
                    onChange={onFilterSelectChange}
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-md mb-2">Цвет</p>
            <div className="flex flex-col gap-1">
              {colors.map((colorItem) => (
                <label
                  key={colorItem.colorUrl}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    className="w-3 h-3"
                    type="checkbox"
                    name="color"
                    checked={getColorChecked(colorItem.colorUrl)}
                    value={colorItem.colorUrl}
                    onChange={onFilterSelectChange}
                  />
                  <span className="text-sm">{colorItem.color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
