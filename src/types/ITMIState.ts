export enum Cell {
    Empty,
    x,
    o,
}

export interface ITMIState {
    board: Cell[];

    activePlayer: number;
}

export default ITMIState;
