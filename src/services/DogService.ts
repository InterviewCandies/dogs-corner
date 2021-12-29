import axios from "./axios";
import { BreedType } from "../types/Breed";
import uniqid from 'uniqid';
import { VoteType } from "../types/Vote";
import { NewResultType, ResultType } from "../types/Response";
import { Favourite } from "../types/Favourite";


class DogService {
    getAllBreeds() {
        return axios.get<BreedType[]>('/breeds');
    }
    getUserInfo() {
        let userId = localStorage.getItem('dogs-corner-user');
        if (!userId) {
            userId = uniqid();
            localStorage.setItem('dogs-corner-user', userId);
        }

        return userId;
    }
    getVotesByUserId(userId: string) {
        return axios.get<VoteType[]>('/votes', {
            params: {
                sub_id: userId
            }
        })
    }
    getFavouritesByUserId(userId: string) {
        return axios.get<Favourite[]>('/favourites', {
            params: {
                sub_id: userId
            }
        })
    }
    createFavourite(userId: string, imageId: string) {
        return axios.post<NewResultType>('/favourites', {
            image_id: imageId,
            sub_id: userId,
        })
    }
    deleteFavourite(favouriteId: number) {
        return axios.delete<ResultType>('/favourites/' + favouriteId)
    }
    createVote(userId: string, imageId: string, value: number) {
        return axios.post<NewResultType>('/votes', {
            image_id: imageId,
            sub_id: userId,
            value: value
        })
    }
    deleteVoteById(voteId: number) {
        return axios.delete<ResultType>('/votes/' + voteId)
    }
}

export default new DogService();