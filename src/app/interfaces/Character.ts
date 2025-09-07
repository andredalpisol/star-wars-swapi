export interface Character {
    name: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
}

export interface CharacterInfos {
    name: string;
    homeworld: Name[];
    films: Title[];
    species: Name[];
    vehicles: Name[];
    starships: Name[];
}

export interface Title {
    title: string
}

export interface Name {
    name: string
}