import { Component, OnInit } from '@angular/core';
import { GameState } from '../models/state';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';

//export const API_URL = 'https://localhost:7124';
export const API_URL = 'https://pras-th-api.azurewebsites.net';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  gameData: GameState = {
    id: "",
    gameDataId: "",
    updatedAt: "",
    gameName: "",
    gameCode: "",
    isGameStarted: false,
    startedAt: "",
    isGameOver: false,
    totalNumberOfCheckPoints: 0,
    teamWiseGameState: {
      TeamA: {
        currentScore: 0,
        finishedAt: null,
        curCheckPointIndex: 0,
        scoreTransaction: [
          [0],
        ],
        teamMemberNames: [],
      },
      TeamB: {
        currentScore: 0,
        finishedAt: null,
        curCheckPointIndex: 0,
        scoreTransaction: [
          [0],
        ],
        teamMemberNames: []
      }
    }
  };

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Fetch the game data initially
    this.fetchGameState();

    // Fetch the game data every 5 seconds
    interval(5000).subscribe(() => {
      this.fetchGameState();
    });

  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  fetchGameState(): void {
    // Make an HTTP GET request to the API endpoint
    this.http.get<GameState>(`${API_URL}/GameState/Get`)
      .subscribe(data => {

        // Format the date values using DatePipe
        data.updatedAt = this.datePipe.transform(data.updatedAt, 'yyyy-MM-dd HH:mm:ss');
        data.startedAt = this.datePipe.transform(data.startedAt, 'yyyy-MM-dd HH:mm:ss');
        data.teamWiseGameState.TeamA.finishedAt = this.datePipe.transform(data.teamWiseGameState.TeamA.finishedAt, 'yyyy-MM-dd HH:mm:ss');
        data.teamWiseGameState.TeamB.finishedAt = this.datePipe.transform(data.teamWiseGameState.TeamB.finishedAt, 'yyyy-MM-dd HH:mm:ss');

        // Update the gameData property with the fetched data
        this.gameData = data;
      });
  }
}
