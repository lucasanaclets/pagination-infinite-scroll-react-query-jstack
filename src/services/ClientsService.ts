import { httpClient } from "./httpClient";
import { IPaginatedResponse } from "./types";

interface IClient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  vehicleManufacturer: string;
}

export class clientsService {
  static async getAll(page = 1, perPage = 10) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const { data } = await httpClient.get<IPaginatedResponse<IClient[]>>(
      "/clients",
      {
        params: {
          _page: page,
          _per_page: perPage,
        },
      }
    );

    return data;
  }
}
