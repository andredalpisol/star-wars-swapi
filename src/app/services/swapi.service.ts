import { inject, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Character, CharacterInfos } from 'src/app/interfaces/Character';
import { SwapiResponse } from '../interfaces/SwapiResponse';
import { CharacterPersistenceService } from './character.persistence.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private api: AxiosInstance;
  private characterPersistenceService = inject(CharacterPersistenceService);

  constructor() {
    this.api = axios.create({
      baseURL: environment.apiBase,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getCharacterData(name: string): Promise<CharacterInfos | undefined> {
    const cachedCharacter = this.characterPersistenceService.getCharacterFromLocalStorage(name);
    if (cachedCharacter) return cachedCharacter;

    const params = { search: name.toUpperCase() };
    const response = await this.api.get<SwapiResponse<Character>>('/people', { params });

    if (response.data?.results?.length) {
      const foundCharacter = response.data.results.find(
        character => character.name.toUpperCase() === name.toUpperCase()
      );
      if (foundCharacter) return this.getCharacterDetails(foundCharacter);
    }
    return undefined;
  }

  private async getCharacterDetails(foundCharacter: Character): Promise<CharacterInfos> {
    const planetInfo = await this.fetchByUrl(foundCharacter.homeworld);
    const movieInfos = await this.fetchResourcesUrl(foundCharacter.films);
    const speciesInfos = await this.fetchResourcesUrl(foundCharacter.species);
    const vehicleInfos = await this.fetchResourcesUrl(foundCharacter.vehicles);
    const starshipInfos = await this.fetchResourcesUrl(foundCharacter.starships);

    return {
      name: foundCharacter.name,
      homeworld: planetInfo ? [planetInfo] : [],
      films: movieInfos,
      species: speciesInfos,
      vehicles: vehicleInfos,
      starships: starshipInfos
    } as CharacterInfos;
  }

  private async fetchResourcesUrl(urls: string[]) {
    if (!urls?.length) return [];
    return Promise.all(urls.map(url => this.fetchByUrl(url)));
  }

  private async fetchByUrl(url: string) {
    const cleanPath = url.replace(/^https?:\/\/[^/]+\/api/, '');
    const response = await this.api.get(cleanPath);
    return response.data;
  }
}