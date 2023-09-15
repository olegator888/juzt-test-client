import { Car } from "../../types/car";
import axios from "axios";

export default async function fetchCarById(id: string) {
  try {
    const { data } = await axios.get<Car>(
      `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
