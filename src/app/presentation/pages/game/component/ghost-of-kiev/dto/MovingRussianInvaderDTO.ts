import { DrawingType } from "../model/Square";

export interface MovingRussianInvaderDTO {
    name: string; 
    skipRows?: number; 
    skipColumns?: number; 
    takeColumns?: number; 
    type: DrawingType;
}