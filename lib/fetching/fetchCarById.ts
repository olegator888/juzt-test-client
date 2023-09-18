import { Car } from "../../types/car";
import axios from "axios";

export default async function fetchCarById(id: string) {
  try {
    const { data } = await axios.get<Car>(
      `https://juzt-test-server.vercel.app/cars/${id}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
