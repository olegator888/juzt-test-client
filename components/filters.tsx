"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface Props {
  colors: Color[];
  brands: string[];
  isOpen: boolean;
  close: () => void;
}

/**
 * we do filtering with query string and not with state
 * because it gives us benefits:
 * 1. we can navigate through requests with browser history arrows
 * 2. we can share link with other users
 * 3. we can save the link and go back to it later
 */

interface FiltersState {
  brands: { brand: string; selected: boolean }[];
  colors: { color: Color; selected: boolean }[];
  sortBy: string | null;
  sortMethod: string | null;
}

const Filters = ({ colors, brands, isOpen, close }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  const paramsParsed = qs.parse(params.toString());

  const [filtersState, setFiltersState] = useState<FiltersState>({
    brands: [],
    colors: [],
    sortBy: null,
    sortMethod: null,
  });

  useEffect(() => {
    const brandQuery = paramsParsed.brand;
    const colorQuery = paramsParsed.color;
    const sortByDefault = paramsParsed.sortBy as string | null;
    const sortMethodDefault = paramsParsed.sortMethod as string | null;

    setFiltersState({
      brands: brands.map((brand) => ({
        brand,
        selected: getBrandChecked(brand, brandQuery),
      })),
      colors: colors.map((color) => ({
        color,
        selected: getColorChecked(color.colorUrl, colorQuery),
      })),
      sortBy: sortByDefault || null,
      sortMethod: sortMethodDefault || null,
    });
  }, [isOpen]);

  const handleSortSelectChange = (value: string, type: string) => {
    let sortMethod = filtersState.sortMethod;
    let sortBy = filtersState.sortBy;

    switch (type) {
      case "sortBy":
        if (!sortMethod) {
          sortMethod = "asc";
        }
        sortBy = value;
        break;
      case "sortMethod":
        if (!sortBy) {
          sortBy = "price";
        }
        sortMethod = value;
        break;
    }

    setFiltersState((prev) => ({
      ...prev,
      sortBy,
      sortMethod,
    }));
  };

  const onBrandClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFiltersState((prev) => ({
      ...prev,
      brands: prev.brands.map((item) =>
        item.brand === value ? { ...item, selected: !item.selected } : item
      ),
    }));
  };

  const onColorClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFiltersState((prev) => ({
      ...prev,
      colors: prev.colors.map((colorItem) =>
        colorItem.color.colorUrl === value
          ? { ...colorItem, selected: !colorItem.selected }
          : colorItem
      ),
    }));
  };

  const onSubmit = () => {
    const { sortMethod, sortBy } = filtersState;

    const brands = filtersState.brands.filter((brand) => brand.selected);
    const colors = filtersState.colors.filter((color) => color.selected);

    const query: ParsedQuery<string> = {
      sortMethod,
      sortBy,
      brand: brands.length ? brands.map((item) => item.brand) : null,
      color: colors.length ? colors.map((item) => item.color.colorUrl) : null,
    };

    let url = qs.stringifyUrl(
      {
        url: "",
        query,
      },
      { skipNull: true }
    );

    if (!query.sortMethod && !query.sortBy && !query.brand && !query.color) {
      url = "/";
    }

    close();
    router.push(url);
  };

  const getBrandChecked = useCallback(
    (brand: string, brandQuery?: string | (string | null)[] | null) => {
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
    (color: string, colorQuery?: string | (string | null)[] | null) => {
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

  const handleClose = () => {
    close();
  };

  let content = (
    <div>
      <h2 className="mb-1 text-lg font-semibold">Фильтрация</h2>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-md mb-2">Бренд</p>
          <div className="flex flex-col gap-1">
            {filtersState.brands.map((brand) => (
              <label
                key={brand.brand}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  name="brands"
                  checked={brand.selected}
                  value={brand.brand}
                  onChange={onBrandClick}
                />
                <span className="text-sm">{brand.brand}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-md mb-2">Цвет</p>
          <div className="flex flex-col gap-1">
            {filtersState.colors.map((colorItem) => (
              <label
                key={colorItem.color.colorUrl}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  name="colors"
                  checked={colorItem.selected}
                  value={colorItem.color.colorUrl}
                  onChange={onColorClick}
                />
                <span className="text-sm">{colorItem.color.color}</span>
              </label>
            ))}
          </div>
        </div>
        <Button className="mt-2" onClick={onSubmit}>
          Применить
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <div className="rounded-lg flex flex-col gap-4 h-fit sticky top-[40px]">
          <div>
            <h2 className="mb-2 pl-1 text-lg font-semibold">Сортировка</h2>
            <div className="flex gap-2">
              <Select
                value={filtersState.sortBy || undefined}
                onValueChange={(value) =>
                  handleSortSelectChange(value, "sortBy")
                }
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
                value={filtersState.sortMethod || undefined}
                onValueChange={(value) =>
                  handleSortSelectChange(value, "sortMethod")
                }
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
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Filters;
