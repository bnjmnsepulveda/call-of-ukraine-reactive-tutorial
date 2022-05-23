
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z']
export type DrawingType = '' | 'shooter' | 'laser' | 'invader' | 'boom'
type SquareEventName = 'russian-target-destroyed' | 'shooter-damage' | 'invader-destroyed'

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

    removeDrawingByName(name: string) {
        this.drawings = this.drawings.filter(d => d.name !== name)
    }

    removeDrawingStaringBy(name: string) {
        this.drawings = this.drawings.filter(d => !d.name.startsWith(name))
    }
    
}

interface Drawing {
    name: string;
    type: DrawingType;
}

export interface SquareEvent {
    row: number;
    column: string;
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

const eraseByName = (squares: Square[], name: string): Square[] => {
    const newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].drawings.map(x => x.name).includes(name)) {
            newSquares[x].removeDrawingByName(name)
            console.log('deleting', name)
        }
    }
    return newSquares
}

const eraseByStartWith = (squares: Square[], name: string): Square[] => {
    const newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].drawings.map(x => x.name).some(x => x.startsWith(name))) {
            newSquares[x].removeDrawingStaringBy(name)
            console.log('deleting', name)
        }
    }
    return newSquares
}

const eraseDrawings = (squares: Square[], col: string, row: number): Square[] => {
    const newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].column === col && newSquares[x].row === row) {
            newSquares[x].drawings = []
            console.log('deleting', name)
        }
    }
    return newSquares
}

const createEvent = (square: Square): SquareEvent => {
    const types = square.drawings.map(d => d.type)
    if (types.includes('invader') && types.includes('laser')) {
        return {
            ...square,
            name: 'invader-destroyed'
        }
    }
    return null
}

export {
    Square,
    createSquares,
    createColumns,
    createRows,
    createSquaresBySize,
    draw,
    erase,
    createEvent,
    eraseByName,
    eraseDrawings,
    eraseByStartWith
}