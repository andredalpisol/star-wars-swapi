import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'info-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-tag.component.html'
})
export class InfoTagComponent {
  @Input() items: any[] | string | null | undefined;
}
