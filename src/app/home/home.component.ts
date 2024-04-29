import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationCardComponent } from '../information-card/information-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InformationCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
