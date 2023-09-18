import { ServerResponse } from "@/types/data";
import axios from "axios";
import { ParsedQuery } from "query-string";

interface Props {
  page?: number;
  query?: ParsedQuery<string>;
}

export default async function fetchCars({ page = 1, query = {} }: Props) {
  try {
    const { data } = await axios.get<ServerResponse>(
      `https://juzt-test-server.vercel.app/cars`,
      {
        params: {
          ...query,
          page,
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
