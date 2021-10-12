export enum Cell {
    Empty, //0
    x, //1
    o, //2
}

export enum GameState {
    WaitingForPlayers, //0
    Playing, //1
    Finished, //2
}

export interface ITMIState {
    gameState: GameState;

    board: Cell[];

    activePlayer: number;

    winningPlayer: number;
}

export default ITMIState;
