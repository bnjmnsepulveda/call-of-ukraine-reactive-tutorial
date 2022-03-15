import { EntityBase } from "../../lib/EntityBase";
import { RussianCity } from "./RussianCity";

export interface Putin extends EntityBase{
    healthPoints: number;
    currentBunker: RussianCity;
}