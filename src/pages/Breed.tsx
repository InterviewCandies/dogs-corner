import React, { useEffect, useState } from "react";
import './Breed.css'
import BreedMenu from "../components/BreedMenu";
import { BreedType } from "../types/Breed";
import DogService from "../services/DogService";
import BreedInfo from "../components/BreedInfo";
import {BREEDS} from "../mocks/breeds";

function Breed() {
    const [breeds, setBreeds] = useState<BreedType[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<BreedType | null>(null);
    const [searchBreed, setSearchBreed] = useState<string>('');

    useEffect(() => {
        const fetchBreeds = async() => {
            const breeds = await DogService.getAllBreeds();
            setBreeds(breeds.data);
            setSelectedBreed(breeds.data[0]);
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
        <BreedMenu breeds={filteredBreeds}
           handleBreedChange={onBreedSelected}
           handleBreedSearch={onBreedSearched}/>
        <BreedInfo breed={selectedBreed}/>
    </section>
}

export default Breed;