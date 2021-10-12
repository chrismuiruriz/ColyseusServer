import { Command } from "@colyseus/command";
//import { Client } from "colyseus";
import ITMIState, { Cell } from "../types/ITMIState";
import NextTurnCommand from "./NextTurnCommand";

type Payload = {};

const getValueAt = (board: number[], row: number, col: number) => {
    const idx = row * 3 + col;
    return board[idx];
};

const wins = [
    //Rows
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
    ],
    [
        { row: 2, col: 0 },
        { row: 2, col: 2 },
        { row: 2, col: 1 },
    ],
    //Cols
    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
    ],
    //Diagnols
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ],
];

export default class CheckWinnerCommand extends Command<ITMIState, Payload> {
    private determineWin() {
        for (let i = 0; i < wins.length; ++i) {
            let hasWinner = true;
            const win = wins[i];
            for (let j = 1; j < win.length; ++j) {
                const prevCell = win[j - 1];
                const cell = win[j];
                console.log(cell);

                const prevValue = getValueAt(
                    this.state.board,
                    prevCell.row,
                    prevCell.col
                );
                const cellValue = getValueAt(
                    this.state.board,
                    cell.row,
                    cell.col
                );

                if (prevValue !== cellValue || prevValue === Cell.Empty) {
                    hasWinner = false;
                    break;
                }
            }

            if (hasWinner) {
                return win;
            }
        }
        return false;
    }

    execute() {
        const win = this.determineWin();
        if (win) {
            // TODO: set winnerPlayer
            console.log(`Winner`);
            this.state.winningPlayer = this.state.activePlayer;
        } else {
            return [new NextTurnCommand()];
        }
    }
}
