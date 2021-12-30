import React, { useEffect, useState } from "react";
import './Breed.css'
import BreedMenu from "../components/BreedMenu";
import { BreedType } from "../types/Breed";
import DogService from "../services/DogService";
import BreedInfo from "../components/BreedInfo";
import {Pane, Spinner} from "evergreen-ui";


function Breed() {
    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<BreedType | null>(null);
    const [searchBreed, setSearchBreed] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBreeds = async() => {
            setIsLoading(true);
            const breeds = await DogService.getAllBreeds();
            setBreeds(breeds.data);
            setSelectedBreed(breeds.data[0]);
            setIsLoading(false);
        }
        fetchBreeds();
      // setBreeds(BREEDS);
      // setSelectedBreed(BREEDS[0]);
    }, [])

    const onBreedSelected = (id: number) => {
        setSelectedBreed(breeds.find(breed => breed.id === id) ?? null);
    }

    const onBreedSearched = (value: string) => {
       setSearchBreed(value);
        const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(value.toLowerCase()));
        setSelectedBreed(filteredBreeds ? filteredBreeds[0] : null);
    }

    const filteredBreeds = breeds.filter(breed => breed.name.toLowerCase().includes(searchBreed.toLowerCase()));

    return <section className="container">
        {isLoading ? <Pane>
            <Spinner margin="auto"/>
            <p>Loading breeds...</p>
        </Pane> : <><BreedMenu breeds={filteredBreeds}
           handleBreedChange={onBreedSelected}
           handleBreedSearch={onBreedSearched}/>
        <BreedInfo breed={selectedBreed}/> </>
        }
    </section>
}

export default Breed;