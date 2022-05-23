import { concatMap, delay, from, map, Observable, of, skip, switchMap } from "rxjs";
import { DrawingType, SquareDraw } from "./Square";

export interface RussianEnemy {
    classname: string;
    column: string;
    row: number;
}

interface Options {
    name: string;
    drawingType: DrawingType;
    columns: string[];
    rows: number[];
    skipColumns?: number;
    takeColumns?: number;
    skipRows?: number;
    delay: number;
}

interface GetSquareDrawOptions {
    columns: string[];
    row: number;
    index: number;
}

export function drawInvaderBase(options: Options): Observable<SquareDraw> {

    const { columns, rows, delay: delayTime, name, drawingType } = options;
    const skipColumns = options.skipColumns ? options.skipColumns : 0
    const takeColumns = options.takeColumns ? options.takeColumns : columns.length
    const skipRows = options.skipRows ? options.skipRows : 0

    let newColumns = [...columns].slice(skipColumns, skipColumns + takeColumns)
    let newRows = [...rows].slice(skipRows)
    const getColumnsDirectionByIndex = (index: number) => {
        if (index % 2 === 0) {
            return [...newColumns]
        }
        return [...newColumns].reverse()
    }

    const getSquareDraw = (item: GetSquareDrawOptions): SquareDraw[] => item.columns.map(c => new SquareDraw({
        column: c,
        row: item.row,
        name,
        type: drawingType
    }))
    
    const streams$ = from(rows).pipe(
        skip(skipRows),
        map(row => ({
            index: newRows.indexOf(row),
            row
        })),
        map(item => ({
            ...item,
            columns: getColumnsDirectionByIndex(item.index)
        })),
        switchMap(item => from(getSquareDraw(item))),
        concatMap(item => of(item).pipe(delay(delayTime))),
    )
    return streams$;
}