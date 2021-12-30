import {BreedType} from "./Breed";

export interface UploadedImageType {
    id: number;
    url: string;
    sub_id: string;
    original_filename: string;
    breeds?: BreedType[];
    image?: string;
}