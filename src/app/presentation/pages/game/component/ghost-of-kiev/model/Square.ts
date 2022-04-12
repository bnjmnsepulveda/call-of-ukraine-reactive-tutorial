
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z']
type DrawingType = '' | 'shooter' | 'laser' | 'invader' | 'boom'

class Square {

    public drawings: Drawing[] = []

    get key() {
        return `${this.column}-${this.row}`
    }

    constructor(public readonly column: string, public readonly row: number) { }

    addDrawing(d: Drawing) {
        this.drawings.push(d)
    }

    removeDrawing(d: Drawing) {
        this.drawings = this.drawings.filter(d => d.name !== d.name)
    }

}

interface Drawing {
    name: string;
    type: DrawingType;
}
//rename to DrawPosition
export class SquareDraw {

    public readonly drawing: Drawing

    get key() {
        return `${this.column}-${this.row}`
    }

    constructor(
        public readonly column: string,
        public readonly row: number,
        public readonly drawingName: string,
        public readonly drawingType: DrawingType
    ) { 
        this.drawing = {
            name: drawingName,
            type: drawingType
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
    let newSquares = [...squares]
    for (let x = 0; x < newSquares.length; x++) {
        if (newSquares[x].key === squareDraw.key) {
            newSquares[x].addDrawing(squareDraw.drawing)
            break
        }
    }
    return newSquares
}

const erase = (squares: Square[], squareDraw: SquareDraw): Square[] => {
    let newSquares = [...squares]
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