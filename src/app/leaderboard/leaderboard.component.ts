import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>leaderboard works!</p> `,
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent {}