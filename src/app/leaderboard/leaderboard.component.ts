import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

export interface Result {
  PlayerId: number;
  Name: string;
  Score: number;
  GamesPlayed: number;
}

export interface Player {
  PlayerId: number;
  Name: string;
}

export interface GetResultsResponse {
  Results: Result[];
}

export interface GetPlayersResponse {
  Players: Player[];
}

// const ELEMENT_DATA: Result[] = [
//   { PlayerId: 5, Name: 'Ross Bronson', Score: 410, GamesPlayed: 16 },
//   { PlayerId: 2, Name: 'Jron Ashworth', Score: 640, GamesPlayed: 15 },
//   { PlayerId: 6, Name: 'Jally Smith', Score: 200, GamesPlayed: 9 },
//   { PlayerId: 1, Name: 'Carl Krueager', Score: 700, GamesPlayed: 9 },
//   { PlayerId: 4, Name: 'Bony Troy', Score: 150, GamesPlayed: 9 },
//   { PlayerId: 3, Name: 'Ashly Earnshaw', Score: 50, GamesPlayed: 3 },
// ];

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['PlayerId', 'Name', 'Score', 'GamesPlayed'];
  dataSource = new MatTableDataSource([] as Result[]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    const apiUrl = 'https://mocki.io/v1/d21f15c7-a0bb-4140-b036-7e4e3cfcf6f5';
    const apiReq = this.http.get<GetResultsResponse>(apiUrl);

    const playersUrl = 'assets/players.json';
    const playersReq = this.http.get<GetPlayersResponse>(playersUrl);

    apiReq.subscribe((apiData) => {
      playersReq.subscribe((playersData) => {
        apiData.Results.forEach((result) => {
          result.Name =
            playersData.Players.find(
              (player) => player.PlayerId === result.PlayerId
            )?.Name ?? 'Name Not Found';
        });
        this.dataSource = new MatTableDataSource(apiData.Results);
      });
    });
  }

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
