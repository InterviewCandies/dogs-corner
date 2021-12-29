export interface Favourite {
    "id": number,
    "image_id": string,
    "sub_id": string,
    "created_at"?: string,
    "image": {
        "id": string,
        "url": string
    }
}

export type NewFavoriteType = Omit<Favourite, 'id' | 'created_at'>