export interface TeamGameState {
    currentScore: number;
    finishedAt: string | null;
    curCheckPointIndex: number;
    scoreTransaction: (number[])[];
  }
  
export interface GameState {
    id: string;
    gameDataId: string;
    updatedAt: string | null;
    gameName: string;
    gameCode: string;
    isGameStarted: boolean;
    startedAt: string | null;
    isGameOver: boolean;
    totalNumberOfCheckPoints: number;
    teamWiseGameState: {
      TeamA: TeamGameState;
      TeamB: TeamGameState;
      // Add more team properties if needed
    };
  }