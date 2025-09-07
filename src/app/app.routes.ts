import { Routes } from '@angular/router';
import { EmailComponent } from './pages/email/email.component';
import { CharacterComponent } from './pages/character/character.component';
import { InfosComponent } from './pages/infos/infos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'email', pathMatch: 'full' },
    { path: 'email', component: EmailComponent },
    { path: 'character', component: CharacterComponent },
    { path: 'infos', component: InfosComponent },
    { path: '**', redirectTo: 'email' }
];
