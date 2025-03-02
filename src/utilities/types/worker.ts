import { WorkerPosition } from "../enums/workerPosition"

export interface WorkerRequestPayload {
    name: string
    workerPosition: WorkerPosition
    dob: string
    email: string
    certifiedUntil: string
    picture: string
    fishFarmId: number
}

export interface WorkerRequestPayload {
    name: string
    workerPosition: WorkerPosition
    dob: string
    email: string
    certifiedUntil: string
    picture: string
    fishFarmId: number
}

export interface WorkerResponsePayload {
    id: number
    name: string
    workerPosition: WorkerPosition
    dob: string
    email: string
    certifiedUntil: string
    picture: string
    fishFarmId: number
}