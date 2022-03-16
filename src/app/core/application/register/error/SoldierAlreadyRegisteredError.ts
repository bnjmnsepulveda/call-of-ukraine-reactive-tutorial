
export class SoldierAlreadyRegisteredError extends Error {
    constructor(soldierName: string) {
      super(`Soldier: ${soldierName} already registered`); 
      this.name = "ValidationError";
    }
  }