import React, { useState } from 'react';
import { fetchData, DataResponse } from "./DataManager";


function Caretakers() {
    type Caretakers = {
        name: string,
        favoritePokemons: string,
        caringSkills: string,
    }
    const caretakers: Caretakers[] = [
        { name: "Jessica", favoritePokemons: "ivysaur", caringSkills: "cooking" },
        { name: "Mitoma", favoritePokemons: "squirtle", caringSkills: "nursing" }
    ]
    const favoriteListElements = caretakers.map(
        function (item: Caretakers) {
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.favoritePokemons}</td>
                    <td>{item.caringSkills}</td>
                </tr>
            )
        }
    );
    return (
        <div className="container">
            <h1>Caretakers</h1>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Favorite Pokemons</th>
                    <th>Caring Skills</th>
                </thead>
                <tbody>
                    {favoriteListElements}
                </tbody>
            </table>

        </div>
    );
}

export default Caretakers; 