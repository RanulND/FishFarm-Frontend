import { WorkerRequestPayload, WorkerResponsePayload } from "../utilities/types/worker";
import axios from "./apiService";

export const getAllWorkersForFarm = (farmId: number) => axios.get<WorkerResponsePayload[]>(`Worker/${farmId}`)

export const createWorker = (worker: WorkerRequestPayload) => axios.post<WorkerResponsePayload>("Worker", worker)

export const deleteWorker = (fishFarmId: number, workerId: number) => axios.delete(`Worker/${fishFarmId}/${workerId}`)

export const editWorker = (id:number, worker: WorkerRequestPayload) => axios.patch<WorkerResponsePayload>(`Worker/${id}`, worker)