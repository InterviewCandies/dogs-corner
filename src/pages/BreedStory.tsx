import React, { useEffect, useState } from "react";
import { BreedType } from "../types/Breed";
import BreedInfo from "../components/BreedInfo";
import DogService from "../services/DogService";
import './BreedStory.css';
import { CaretLeftIcon, CaretRightIcon, IconButton, Pane, Spinner } from "evergreen-ui";

function BreedStory() {
    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBreeds = async() => {
            setIsLoading(true)
            const breeds = await DogService.getAllBreeds();
            setBreeds(breeds.data);
            setSelectedBreed(0);
            setIsLoading(false);
        }
        fetchBreeds();
    }, [])

    const onClickNext = () => {
        setSelectedBreed(prevState => prevState !== null ? (prevState + 1) % breeds.length : null);
    }

    const onClickPrev = () => {
        setSelectedBreed( prevState => prevState !== null ? (prevState - 1 + breeds.length) % breeds.length : null);
    }

    return <div className="story-container">
        {isLoading ? <Pane>
            <Spinner margin="auto"/>
            <p>Loading story...</p>
        </Pane>: <>
        <IconButton icon={CaretLeftIcon} className='pagination-button' onClick={onClickPrev}/>
        <BreedInfo breed={selectedBreed !== null ? breeds[selectedBreed] : null}/>
        <IconButton icon={CaretRightIcon} className='pagination-button' onClick={onClickNext}/>
        </> }
    </div>
}

export default BreedStory;