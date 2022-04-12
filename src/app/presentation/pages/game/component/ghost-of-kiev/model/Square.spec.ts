import { createColumns, createRows, createSquares, createSquaresBySize, erase, draw, SquareDraw } from "./Square"

 

describe('Screen', () => {

    it('must be create a column with 5 letters ', ()=>{
        const result = createColumns(5)
       // console.log(result)
        expect(result).toContain('A')
        expect(result).toContain('B')
        expect(result).toContain('C')
        expect(result).toContain('D')
        expect(result).toContain('E')
        expect(result).not.toContain('Z')
    })

    it('must be create a rows with 3 size 0, 1, 2 ', ()=>{
        const result = createRows(3)
        // console.log(result)
        expect(result).toContain(0)
        expect(result).toContain(1)
        expect(result).toContain(2)
    })

    it('must be a screen with 9 items',()=>{

        const columns = ['a', 'b', 'c']
        const rows = [1,2, 3]
        const result = createSquares(columns, rows)
        // console.log(result)
        expect(result.length).toEqual(9)
        // const result = createScreen(columns, rows)
        // console.log(result)
        // result.squares.forEach(x => console.log(x))

        // expect(result.squares).toHaveSize(3)
    })

    it('must be a screen with 50 items',()=>{

        const result = createSquaresBySize(5, 10)
        // console.log(result)
        expect(result.length).toEqual(50)
    })

    // it('must be update drawing',()=>{
    //     const squares = createSquaresBySize(3, 3)
    //     let result = draw(squares, new SquareDraw('A', 2, { name: 'jet', type: 'shooter' }))
    //     result.map(x => x.drawings).forEach(x => console.log(x))
    //     result = draw(squares, new SquareDraw('A', 2, { name: 'jet', type: 'boom' }))
    //     result.map(x => x.drawings).forEach(x => console.log(x))
    // })

    it('must be delete drawing',()=>{
        const squares = createSquaresBySize(3, 3)
        let result = draw(squares, new SquareDraw('A', 2, 'jet', 'shooter' ))
        result = draw(result, new SquareDraw('B', 3, 'warplane', 'shooter' ))

         result.map(x => x.drawings).forEach(x => console.log(x))
        result = erase(squares, new SquareDraw('A', 2,'jet', 'boom' ))
        result.map(x => x.drawings).forEach(x => console.log(x))
    })
})