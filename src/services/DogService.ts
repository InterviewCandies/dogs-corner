import axios from "./axios";
import { BreedType } from "../types/Breed";

class DogService {
    getAllBreeds() {
        return axios.get<BreedType[]>('/breeds');
    }
}

export default new DogService();