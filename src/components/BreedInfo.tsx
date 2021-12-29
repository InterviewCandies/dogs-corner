import React, { useEffect, useState } from "react";
import { BreedType } from "../types/Breed";
import { Badge, Card, HeartIcon, IconButton, ThumbsDownIcon, ThumbsUpIcon, toaster } from "evergreen-ui";
import './BreedInfo.css';
import DogService from "../services/DogService";
import { NewVoteType, VoteType } from "../types/Vote";
import { Favourite, NewFavoriteType } from "../types/Favourite";

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
    const [votes, setVotes] = useState<VoteType[]>([]);
    const [favourites, setFavourites] = useState<Favourite[]>([]);

    useEffect(() => {
        const userId = DogService.getUserInfo();
        const fetchVotes = async() => {
            const votes = await DogService.getVotesByUserId(userId).then(response => response.data);
            setVotes(votes);
        }
        fetchVotes();

        const fetchFavourites = async() => {
            const favourites = await DogService.getFavouritesByUserId(userId).then(response => response.data);
            setFavourites(favourites);
        }

        fetchFavourites();

    }, [JSON.stringify(breed)]);

    const currentVote = votes.find(vote => vote.image_id === breed?.image.id);
    const currentFav = favourites.find(fav => fav.image_id === breed?.image.id);

    const onVote = async(value: number) => {
        await deleteVote();
        if (currentVote?.value !== value) {
            await createNewVote(value);
        }
    }

    const onFavouriteClicked = async () => {
        if (currentFav) {
            await DogService.deleteFavourite(currentFav.id);
            setFavourites(prevState => prevState.filter(item => item.id !== currentFav.id));
            toaster.success(`Removed ${breed?.name} from your favourites`, {
                duration: 5
            });
        } else if (breed) {
            const userId = DogService.getUserInfo();
            const newFav: NewFavoriteType = {
                sub_id: userId,
                image_id: breed.image.id,
                image: breed.image
            }

            const result = await DogService.createFavourite(newFav.sub_id,newFav.image_id).then(response => response.data);
            const id = result.id;
            setFavourites(prevState => [...prevState, { ...newFav, id}]);
            toaster.success(`Added ${breed?.name} to your favourites`, {
                duration: 5
            });
        }
    }

    const createNewVote = async (value: number) => {
        if (!breed) {
            return
        }

        const userId = DogService.getUserInfo();
        let newVote: NewVoteType = {
            sub_id: userId,
            image_id: breed.image.id,
            value
        }
        const result = await DogService.createVote(newVote.sub_id, newVote.image_id, value).then(item => item.data);
        const id = result.id;
        setVotes((previousVotes) => {
            return [...previousVotes, {...newVote, id}];
        })
    }

    const deleteVote = async() => {
        if (!currentVote) {
            return;
        }
        await DogService.deleteVoteById(currentVote.id);
        setVotes((previousVotes) => {
            return previousVotes.filter(vote => vote.id !== currentVote.id);
        })
    }

    return  <Card className="info-box" elevation={1} padding={16}>
        {breed ? <>
            <span>
                <IconButton icon={ThumbsUpIcon}
                    marginRight={8}
                    appearance={currentVote?.value === 1 ? 'primary' : undefined}
                    onClick={() => onVote(1)}
                    intent={currentVote?.value === 1 ? 'success' : undefined}
                />
                <IconButton icon={ThumbsDownIcon}
                    appearance={currentVote?.value === 0 ? 'primary' : undefined}
                    marginRight={8}
                    onClick={() => onVote(0)}
                    intent={currentVote?.value === 0 ? 'danger' : undefined}
                />
                 <IconButton icon={HeartIcon}
                    appearance={currentFav? 'primary' : undefined}
                    onClick={() => onFavouriteClicked()}
                    intent={currentFav? 'none' : undefined}
                 />
            </span>
            <h3>{ breed.name }</h3>
            <small>{ breed.bred_for }</small>
            <img src={ breed.image.url } />
            { breed.temperament ? getTags(breed.temperament) : null }
            { breed.life_span ? <p className="origin">Life span: { breed.life_span }</p> : null }
        </> : <p className="no-result">No result</p>}
    </Card>;
}

export default BreedInfo;