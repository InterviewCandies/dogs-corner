import axios from "./axios";
import { BreedType } from "../types/Breed";
import uniqid from 'uniqid';
import { VoteType } from "../types/Vote";
import { NewResultType, ResultType } from "../types/Response";
import { Favourite } from "../types/Favourite";
import {UploadedImageType} from "../types/UploadedImage";


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
    getUploadedImage(userId: string) {
        return axios.get<UploadedImageType[]>('/images', {
            params: {
                sub_id: userId,
                limit: 100
            }
        })
    }
    deleteUploadedImage(imageId: number) {
        return axios.delete<ResultType>('/images/' + imageId);
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
    uploadNewImage(userId: string, file: File) {
        const bodyFormData = new FormData();
        bodyFormData.append('sub_id', userId);
        bodyFormData.append('file', file);
        return axios.post<File>('/images/upload', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export default new DogService();