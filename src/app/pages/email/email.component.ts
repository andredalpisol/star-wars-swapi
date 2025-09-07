import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email.component.html'
})
export class EmailComponent {
  email: string | null = null;
  isEmailValid: boolean | null = null;

  private router = inject(Router);

  validateEmail() {
    if (this.email !== null && this.email.includes('@') && this.email.length > 3) {
      this.isEmailValid = true;
      this.router.navigate(['/character']);
    }
    else {
      this.isEmailValid = false;
    }
  }
}
