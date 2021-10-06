import { Schema, ArraySchema, type } from "@colyseus/schema";
import ITMIState from "../types/ITMIState";

export default class TMIState extends Schema implements ITMIState {
    @type(["number"])
    board: ArraySchema<number>;

    @type("number")
    activePlayer = 0;

    constructor() {
        super();

        this.board = new ArraySchema(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
