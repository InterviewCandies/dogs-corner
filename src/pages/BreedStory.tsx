import React, { useEffect, useState } from "react";
import { BreedType } from "../types/Breed";
import BreedInfo from "../components/BreedInfo";
import DogService from "../services/DogService";
import './BreedStory.css';
import { CaretLeftIcon, CaretRightIcon, IconButton } from "evergreen-ui";

interface Props {
    breeds: BreedType[]
}

function BreedStory() {
    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<number | null>(null);

    useEffect(() => {
        const fetchBreeds = async() => {
            const breeds = await DogService.getAllBreeds();
            setBreeds(breeds.data);
            setSelectedBreed(0);
        }
        fetchBreeds();
    }, [])

    const onClickNext = () => {
        setSelectedBreed(prevState => prevState !== null ? (prevState + 1) % breeds.length : null);
    }

    const onClickPrev = () => {
        setSelectedBreed( prevState => prevState !== null ? (prevState - 1 + breeds.length) % breeds.length : null);
    }

    return <div className="container">
        <IconButton icon={CaretLeftIcon} borderRadius={80} width={80} height={80} onClick={onClickPrev}/>
        <BreedInfo breed={selectedBreed !== null ? breeds[selectedBreed] : null}/>
        <IconButton icon={CaretRightIcon} borderRadius={80} width={80} height={80} onClick={onClickNext}/>
    </div>
}

export default BreedStory;