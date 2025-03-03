export interface Coordinate {
    x: number
    y: number
} 

export interface FishFarmRequestPayload {
    name: string
    cageCount: number
    hasBarge: boolean
    picture: string
    coordinate: Coordinate
}

export interface FishFarmResponsePayload {
    id: number
    name: string
    cageCount: number
    hasBarge: boolean
    picture: string
    coordinate: Coordinate
}

