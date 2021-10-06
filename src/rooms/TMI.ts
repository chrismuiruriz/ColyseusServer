import { Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { Message } from "../types/Messages";
import TMIState from "./TMIState";
import PlayerSelectionCommands from "../commands/PlayerSelectonCommands";

export default class TMI extends Room<TMIState> {
    private dispatcher = new Dispatcher(this);

    onCreate() {
        this.setState(new TMIState());

        this.onMessage("TMI", (client, message: { index: number }) => {
            console.log("New message received");
            this.dispatcher.dispatch(new PlayerSelectionCommands(), {
                client,
                index: message.index,
            });
        });
    }
}
