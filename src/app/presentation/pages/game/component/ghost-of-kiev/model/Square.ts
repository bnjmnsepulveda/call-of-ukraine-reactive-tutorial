
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z']
type DrawingType = '' | 'shooter' | 'laser' | 'invader' | 'boom'
type SquareEventName = 'russian-target-destroyed' | 'shooter-damage' 

class Square {

    public drawings: Drawing[] = []

    get key() {
        return `${this.column}-${this.row}`
    }

    constructor(public readonly column: string, public readonly row: number) { }

    addDrawing(drawing: Drawing) {
        this.drawings = [
            ...this.drawings,
            drawing
        ]
    }

    removeDrawing(drawing: Drawing) {
        this.drawings = this.drawings.filter(d => d.name !== drawing.name)
    }

}

interface Drawing {
    name: string;
    type: DrawingType;
}

export interface SquareEvent {
    name: SquareEventName;
    drawings: Drawing[];

}

interface SquareDrawProperties {
    column: string,
    row: number,
    name: string,
    type: DrawingType
}

//rename to DrawingPosition
export class SquareDraw {

    public readonly column: string
    public readonly row: number
    public readonly drawing: Drawing

    get key() {
        return `${this.column}-${this.row}`
    }

    constructor(properties: SquareDrawProperties) { 
        this.column = properties.column
        this.row = properties.row
        this.drawing = {
            name: properties.name,
            type: properties.type
        }
    }

}

const createColumns = (size: number): string[] => {
    return ALPHABET.slice(0, size)
}

const createRows = (size: number): number[] => {
    return Array.from(Array(size).keys())
}

const createSquares = (columns: string[], rows: number[]): Square[] => {
    let squares: Square[] = []
    for (const row of rows) {
        for (const col of columns) {
            squares.push(new Square(col, row))
        }
    }
    return squares
}

const createSquaresBySize = (columns: number, rows: number): Square[] => {
    return createSquares(
        createColumns(columns),
        createRows(rows)
    )
}

const draw = (squares: Square[], squareDraw: SquareDraw): Square[] => {
    const newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].key === squareDraw.key) {
            newSquares[x].addDrawing(squareDraw.drawing)
            break
        }
    }
    return newSquares
}

const erase = (squares: Square[], squareDraw: SquareDraw): Square[] => {
    const newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].drawings.map(x => x.name).includes(squareDraw.drawing.name)) {
            newSquares[x].removeDrawing(squareDraw.drawing)
        }
    }
    return newSquares
}

export {
    Square,
    createSquares,
    createColumns,
    createRows,
    createSquaresBySize,
    draw,
    erase
}