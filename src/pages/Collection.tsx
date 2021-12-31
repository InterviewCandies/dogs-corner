import React, {useEffect, useState} from "react";
import { Pane, toaster, Button } from "evergreen-ui";
import "./Collection.css";
import CollectionList from "../components/CollectionList";
import FileInput from "../components/FileInput";
import {Favourite} from "../types/Favourite";
import DogService from "../services/DogService";
import {UploadedImageType} from "../types/UploadedImage";

function Collection() {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);
    const [isLoadingFav, setIsLoadingFav] = useState<boolean>(false);
    const [isLoadingUploadedImages, setIsLoadingUploadedImages] = useState<boolean>(false);
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [isSubmittingFile, setIsSubmittingFile] = useState<boolean>(false);

    useEffect(() => {
        const userId = DogService.getUserInfo();
        const fetchFavourites = async() => {
            setIsLoadingFav(true);
            const favourites = await DogService.getFavouritesByUserId(userId).then(response => response.data);
            setFavourites(favourites);
            setIsLoadingFav(true);
        }

        fetchFavourites();
        fetchUploadedImages();
    }, [])

    const fetchUploadedImages = async() => {
        setIsLoadingUploadedImages(true)
        const userId = DogService.getUserInfo();
        const images = await DogService.getUploadedImage(userId);
        setUploadedImages(images.data);
        setIsLoadingUploadedImages(false);
    }

    const onDeleteFavourite = async (id: number) => {
        await DogService.deleteFavourite(id);
        setFavourites(prevState => prevState.filter(item => item.id !== id));
        toaster.success(`Removed successfully`, {
            duration: 5
        });
    }

    const onFileChanged = (file: File) => {
       setCurrentFile(file);
    }

    const onSubmitFile = async () => {
        try {
            setIsSubmittingFile(true);
            const userId = DogService.getUserInfo();
            await DogService.uploadNewImage(userId, currentFile as File).then(response => response.data);
            setCurrentFile(null);
            await fetchUploadedImages();
            setIsSubmittingFile(false);
            toaster.success('Your image has been submitted');
        } catch (e: any) {
            setIsSubmittingFile(false);
            if (!e.response) {
                toaster.danger(e.message);
                return;
            }
            toaster.danger(e.response.data.message);
        }
    }

    const onDeleteImage = async (id: number) => {
        await DogService.deleteUploadedImage(id);
        setUploadedImages(prevState => prevState.filter(item => item.id !== id));
        toaster.success(`Removed successfully`, {
            duration: 5
        });
    }

    return <div className="collection">
        <Pane elevation={1} className="left" borderRadius={4}>
            <h3 className="heading">Upload new dog image</h3>
            <FileInput handleFileChanged={onFileChanged}/>
            <Button marginTop={16} onClick={onSubmitFile} isLoading={isSubmittingFile} disabled={currentFile === null} appearance={currentFile ? 'primary' :undefined}>Submit</Button>

        </Pane>
        <div className="right">
            <CollectionList items={favourites} heading="Your favourites" onDelete={onDeleteFavourite} isLoading={isLoadingFav}/>
            <CollectionList items={uploadedImages} heading="Your images" onDelete={onDeleteImage} isLoading={isLoadingUploadedImages}/>
        </div>
    </div>
}

export default Collection;