import { TransmissionType, EngineType } from "@/types/car";

export const transmissionMap: Record<TransmissionType, string> = {
  auto: "Автоматическая",
  manual: "Ручная",
  robotic: "Роботизированная",
};

export const engineMap: Record<EngineType, string> = {
  diesel: "Дизельный",
  electric: "Электрический",
  gasoline: "Бензиновый",
};
