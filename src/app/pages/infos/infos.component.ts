import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CharacterPersistenceService } from '../../services/character.persistence.service';
import { CharacterInfos } from 'src/app/interfaces/Character';
import { InfoTagComponent } from 'src/app/directives/info-tag/info-tag.component';


@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [CommonModule, FormsModule, InfoTagComponent],
  templateUrl: './infos.component.html'
})
export class InfosComponent {
  infos: CharacterInfos | null;

  private router = inject(Router);
  private characterPersistenceService = inject(CharacterPersistenceService);

  constructor() {
    this.infos = this.characterPersistenceService.getCharacter();
  }

  searchAgain() {
    this.router.navigate(['character']);
  }
}
