import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import ITMIState, { Cell } from "../types/ITMIState";

type Payload = {
    client: Client;
    index: number;
};

export default class PlayerSelectionCommands extends Command<
    ITMIState,
    Payload
> {
    execute(data: Payload) {
        const { client, index } = data;

        const clientIndex = this.room.clients.findIndex(
            (c) => c.id === client.id
        );

        const cellValue = clientIndex === 0 ? Cell.x : Cell.o;
        console.log(`cell value ${cellValue}`);
        console.log(`index ${index}`);
        console.log(`client index ${clientIndex}`);
        console.log(`cell.x ${Cell.x}`);
        this.room.state.board[index] = cellValue;
    }
}
