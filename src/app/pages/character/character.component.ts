import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwapiService } from 'src/app/services/swapi.service';
import { Router } from '@angular/router';
import { CharacterPersistenceService } from 'src/app/services/character.persistence.service';


@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  characterName: string | null = null;
  isCharacterValid: boolean | null = null;
  isLoading: boolean = false;

  private swapiService = inject(SwapiService);
  private router = inject(Router);
  private characterPersistenceService = inject(CharacterPersistenceService)

  async validateCharacter() {
    if (!this.characterName || !this.characterName.trim()) {
      this.isCharacterValid = false;
    } else {
      await this.searchCharacter(this.characterName);
    }
  }

  async searchCharacter(characterName: string) {
    try {
      this.isLoading = true;
      const response = await this.swapiService.getCharacterData(characterName.trim());

      if (response) {
        this.isCharacterValid = true;
        this.characterPersistenceService.setCharacter(response);
        this.router.navigate(['/infos']);
      } else {
        this.isCharacterValid = false;
      }
    } catch (error) {
      this.isCharacterValid = false;
    } finally {
      this.isLoading = false;
    }
  }
}
