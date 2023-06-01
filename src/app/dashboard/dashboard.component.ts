import { Component, OnInit } from '@angular/core';
import { GameState } from '../models/state';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

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
        ]
      },
      TeamB: {
        currentScore: 0,
        finishedAt: null,
        curCheckPointIndex: 0,
        scoreTransaction: [
          [0],
        ]
      }
    }
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch the game data initially
    this.fetchGameState();

    // Fetch the game data every 5 seconds
    interval(5000).subscribe(() => {
      this.fetchGameState();
    });

  }

  fetchGameState(): void {
    // Make an HTTP GET request to the API endpoint
    this.http.get<GameState>('https://pras-th-api.azurewebsites.net/GameState/Get')
      .subscribe(data => {
        // Update the gameData property with the fetched data
        this.gameData = data;
      });
  }
}
