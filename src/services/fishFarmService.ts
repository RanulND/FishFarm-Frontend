import { FishFarmRequestPayload, FishFarmResponsePayload } from "../utilities/types/fishFarm";
import axios from "./apiService";

export const getAllFishFarms = () => axios.get<FishFarmResponsePayload[]>("FishFarm")

export const createFishFarm = (fishFarm: FishFarmRequestPayload) => axios.post<FishFarmResponsePayload>("FishFarm", fishFarm)

export const updateFishFarm = (fishFarm: FishFarmRequestPayload, id: number) => axios.patch(`FishFarm/${id}`, fishFarm)

export const deleteFishFarm = (id: number) => axios.delete(`FishFarm/${id}`)

export const getFishFarm = (id: number) => axios.get<FishFarmResponsePayload>(`FishFarm/${id}`)