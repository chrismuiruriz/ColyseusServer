import { Command } from "@colyseus/command";
import ITMIState from "../types/ITMIState";

export default class NextTurnCommand extends Command<ITMIState> {
    execute() {
        const activePlayer = this.room.state.activePlayer;

        if (activePlayer == 0) {
            this.room.state.activePlayer = 1;
        } else {
            this.room.state.activePlayer = 0;
        }
    }
}