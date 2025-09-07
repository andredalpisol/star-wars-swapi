import { Injectable } from '@angular/core';
import { CharacterInfos } from 'src/app/interfaces/Character';

@Injectable({
    providedIn: 'root'
})
export class CharacterPersistenceService {
    private characterData: CharacterInfos | null = this.getLastSearchedCharacter();

    setCharacter(data: CharacterInfos) {
        localStorage.setItem(data.name.toUpperCase(), JSON.stringify(data));
        localStorage.setItem("LAST_SEARCHED", data.name.toUpperCase())
        this.characterData = data;
    }

    getCharacter() {
        return this.characterData;
    }

    getLastSearchedCharacter() {
        const lastSearched = localStorage.getItem("LAST_SEARCHED");
        if (!lastSearched) return null;
        return this.getCharacterFromLocalStorage(lastSearched);
    }

    getCharacterFromLocalStorage(name: string): CharacterInfos | null {
        const data = localStorage.getItem(name.toLocaleUpperCase());
        return data ? JSON.parse(data) as CharacterInfos : null;
    }
}
