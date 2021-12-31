import React, { ChangeEvent, useEffect, useState } from "react";
import { Card, Menu, Pane, SearchInput } from "evergreen-ui";
import './BreedMenu.css';
import { BreedType } from "../types/Breed";

const getBreedOptions = (breeds: BreedType[]) => {
    return breeds.map(breed => ({
        label: breed.name,
        value: breed.id
    }))
}

interface Props {
    breeds: BreedType[],
    handleBreedChange: (id: number) => void;
    handleBreedSearch: (value: string) => void;
}

function BreedMenu({ breeds, handleBreedChange, handleBreedSearch}: Props) {
    const [selectedBreed, setSelectBreed] = useState<number | null>(null);
    const temp = JSON.stringify(breeds);

    useEffect(() => {
        setSelectBreed(breeds.length ? breeds[0].id : 0);
    }, [temp])

    return <div className="breeds">
        <SearchInput placeholder="Type the name of breed"
             marginBottom={16}
             onChange={(e: ChangeEvent<HTMLInputElement>) => handleBreedSearch(e.target.value)}/>
        <Card border={true} paddingY={16} elevation={1} className="list">
            {
                breeds.length ? <Menu>
                    <Menu.OptionsGroup
                        selected={selectedBreed}
                        options={getBreedOptions(breeds)}
                        onChange={(id) => {
                            setSelectBreed(id);
                            handleBreedChange(id);
                        }}>
                    </Menu.OptionsGroup>
                </Menu> : <Pane className="no-result" padding={16}>No result</Pane>
        }
        </Card>
    </div>

}

export default BreedMenu;