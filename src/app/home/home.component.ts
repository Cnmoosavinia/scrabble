import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationCardComponent } from '../information-card/information-card.component';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InformationCardComponent, LeaderboardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
