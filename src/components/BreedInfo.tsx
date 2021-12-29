import React from "react";
import { BreedType } from "../types/Breed";
import { Badge, Card } from "evergreen-ui";
import './BreedInfo.css';

interface Props {
    breed: BreedType | null
}

type Color = "neutral" | "red" | "yellow" | "green" | "blue" | "orange" | "purple" | "teal" | "automatic" | undefined;

const COLORS: Color[] = ["neutral", "red", "yellow", "green", "blue", "orange", "purple", "teal"];

const getTags = (temperament: string) => {
    const tags = temperament.split(',');
    return tags.map(item => {
        const color = COLORS[Math.floor(Math.random() * tags.length)];

        return <Badge color={color} key={item} marginRight={8}>{ item }</Badge>
    })
}

function BreedInfo({ breed }: Props) {
    return  <Card className="info-box" elevation={1} padding={16}>
        {breed ? <>
            <h3>{ breed.name }</h3>
            <small>{ breed.bred_for }</small>
            <img src={ breed.image.url } />
            { breed.temperament ? getTags(breed.temperament) : null }
            { breed.life_span ? <p className="origin">Life span: { breed.life_span }</p> : null }
        </> : <p className="no-result">No result</p>}
    </Card>;
}

export default BreedInfo;