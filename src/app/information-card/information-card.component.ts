import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-information-card',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>information-card works!</p> `,
  styleUrl: './information-card.component.css',
})
export class InformationCardComponent {}
