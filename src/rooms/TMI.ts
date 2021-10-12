import { Client, Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { Message } from "../types/Messages";
import TMIState from "./TMIState";
import PlayerSelectionCommand from "../commands/PlayerSelectonCommand";
import { GameState } from "../types/ITMIState";

export default class TMI extends Room<TMIState> {
    private dispatcher = new Dispatcher(this);

    onCreate() {
        this.maxClients = 2;
        this.setState(new TMIState());

        this.onMessage("TMI", (client, message: { index: number }) => {
            console.log("New message received");
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client,
                index: message.index,
            });
        });
    }

    onJoin(client: Client) {
        const idx = this.clients.findIndex(
            (c) => c.sessionId === client.sessionId
        );
        client.send("playerIndex", { playerIndex: idx });

        if (this.clients.length >= 2) {
            this.state.gameState = GameState.Playing;
        }
    }
}
