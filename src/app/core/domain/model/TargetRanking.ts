
export interface TargetRanking {
    id: string;
    name: string;
    totalResources: number;
    remainingResources: number;
    destructionPercentage: number;
    civilians: number;
    buildings: number;
    soldiers: number;
    trucks: number;
    tanks: number;
    warplanes: number;
    warships: number;
}