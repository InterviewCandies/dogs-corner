import React, { useEffect, useState } from "react";
import { BreedType } from "../types/Breed";
import { Badge, Card, HeartIcon, IconButton, ThumbsDownIcon, ThumbsUpIcon, toaster } from "evergreen-ui";
import './BreedInfo.css';
import DogService from "../services/DogService";
import { NewVoteType, VoteType } from "../types/Vote";
import { Favourite, NewFavoriteType } from "../types/Favourite";
import ProgressiveImage from "react-progressive-graceful-image";

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
    const [isVoting, setIsVoting] = useState<boolean>(false);
    const [isProcessingFav, setIsProcessingFav] = useState<boolean>(false);
    const temp = JSON.stringify(breed);

    useEffect(() => {
        const userId = DogService.getUserInfo();
        const fetchVotes = async() => {
            setIsVoting(true)
            const votes = await DogService.getVotesByUserId(userId).then(response => response.data);
            setVotes(votes);
            setIsVoting(false);
        }
        fetchVotes();

        const fetchFavourites = async() => {
            setIsProcessingFav(true);
            const favourites = await DogService.getFavouritesByUserId(userId).then(response => response.data);
            setFavourites(favourites);
            setIsProcessingFav(false);
        }

        fetchFavourites();

    }, [temp]);

    const currentVote = votes.find(vote => vote.image_id === breed?.image.id);
    const currentFav = favourites.find(fav => fav.image_id === breed?.image.id);

    const onVote = async(value: number) => {
        setIsVoting(true);
        await deleteVote();
        if (currentVote?.value !== value) {
            await createNewVote(value);
        }
        setIsVoting(false);
    }

    const onFavouriteClicked = async () => {
        setIsProcessingFav(true);

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

        setIsProcessingFav(false);
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
        {
            breed ?
                <>
                    <span>
                        <IconButton icon={isVoting ? undefined : ThumbsUpIcon}
                            marginRight={8}
                            isLoading={isVoting}
                            appearance={currentVote?.value === 1 ? 'primary' : undefined}
                            onClick={() => onVote(1)}
                            intent={currentVote?.value === 1 ? 'success' : undefined}
                        />
                        <IconButton icon={isVoting ? undefined : ThumbsDownIcon}
                            appearance={currentVote?.value === 0 ? 'primary' : undefined}
                            marginRight={8}
                            isLoading={isVoting}
                            onClick={() => onVote(0)}
                            intent={currentVote?.value === 0 ? 'danger' : undefined}
                        />
                         <IconButton
                            icon={isProcessingFav ? undefined : HeartIcon}
                            isLoading={isProcessingFav}
                            appearance={currentFav? 'primary' : undefined}
                            onClick={() => onFavouriteClicked()}
                            intent={currentFav? 'none' : undefined}
                         />
                    </span>
                    <h3>{ breed.name }</h3>
                    <small>{ breed.bred_for }</small>
                    <ProgressiveImage placeholder='http://placehold.jp/24/e6e8f0/696f8c/500x500.png?text=Loading%20image' src={breed.image.url}>
                        { (src: string) => <img src={src} alt={breed?.image.id}/> }
                    </ProgressiveImage>
                    { breed.temperament ? getTags(breed.temperament) : null }
                    { breed.life_span ? <p className="origin">Life span: { breed.life_span }</p> : null }
                </> : <p className="no-result">No result</p>
        }
    </Card>;
}

export default BreedInfo;