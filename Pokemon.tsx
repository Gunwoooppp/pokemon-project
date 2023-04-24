import React, { useState } from 'react';
import { fetchData, DataResponse } from "./DataManager";


function Pokemon() {

    type PokemonDetails = {
        name: string,
        weight: number,
        height: number,
        sprite: string,
    }

    const [pokemon, setPokemon] = useState("bulbasaur");
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>({
        name: "",
        weight: 0,
        height: 0,
        sprite: "",
    });
    const [favorites, setFavorites] = useState<string[]>([]);

    function onPokemonChange(event: any) {
        setPokemon(event.target.value);
    }

    async function searchPokemon() {
        const response: DataResponse = await fetchData("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        if (response.status === "SUCCESS") {
            const data = response.data;
            console.log(data)
            const newPokemon: PokemonDetails = {
                name: data.name,
                weight: data.weight,
                height: data.height,
                sprite: data.sprites.front_default,
            }

            setPokemonDetails(newPokemon)
        }
    }

    function addToFavorites() {
        if (!pokemonDetails) {
            return;
        }
        favorites.push(pokemonDetails.name);
        const tmp = [];
        for (const x of favorites) {
            tmp.push(x);
        }

        setFavorites(tmp);
    }

    const favoriteListElements = favorites.map(
        function (name: string) {
            return (<li>{name}</li>)
        }
    );

    return (
        <div className="container">
            <h1>Pokemon Explorer</h1>

            <div>
                <input type="text" onChange={onPokemonChange} />
                <button onClick={() => { searchPokemon() }}>Search</button>
            </div>

            <table>
                <thead>
                    <th>Property</th>
                    <th>Value</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{pokemonDetails.name}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{pokemonDetails.weight}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{pokemonDetails.height}</td>
                    </tr>
                    <tr>
                        <td>Sprite</td>
                        <td><img src={pokemonDetails.sprite} alt="" /></td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => { addToFavorites() }}>Add to favorites</button>

            <h2>Favorite Pokemons</h2>
            <ol>
                {favoriteListElements}
            </ol>
        </div>
    );
}

export default Pokemon 