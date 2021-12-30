import React, {useEffect, useState} from "react";
import {Pane, Card, Pill, IconButton, RemoveIcon, Pagination, CrossIcon, toaster} from "evergreen-ui";
import "./Collection.css";
import CollectionList from "../components/CollectionList";
import FileInput from "../components/FileInput";
import {Favourite} from "../types/Favourite";
import DogService from "../services/DogService";
import {UploadedImageType} from "../types/UploadedImage";

function Collection() {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);

    useEffect(() => {
        const userId = DogService.getUserInfo();
        const fetchFavourites = async() => {
            const favourites = await DogService.getFavouritesByUserId(userId).then(response => response.data);
            setFavourites(favourites);
        }

        fetchFavourites();

      /*  const fetchUploadedImages = async() => {
            const images = await DogService.getUploadedImage(userId);
            setUploadedImages(images.data);
        }

        fetchUploadedImages();*/
    }, [])

    const onDeleteFavourite = async (id: number) => {
        await DogService.deleteFavourite(id);
        setFavourites(prevState => prevState.filter(item => item.id !== id));
        toaster.success(`Removed from your favourites`, {
            duration: 5
        });
    }

    const onDeleteImage = async (id: number) => {
        await DogService.deleteUploadedImage(id);
        setUploadedImages(prevState => prevState.filter(item => item.id !== id));
        toaster.success(`Removed from your favourites`, {
            duration: 5
        });
    }

    return <div className="collection">
        <Pane elevation={1} className="left">
            <FileInput/>
        </Pane>
        <div className="right">
            <CollectionList items={favourites} heading="Your favourites" onDelete={onDeleteFavourite}/>
            <CollectionList items={uploadedImages} heading="Your images" onDelete={onDeleteImage}/>
        </div>
    </div>
}

export default Collection;