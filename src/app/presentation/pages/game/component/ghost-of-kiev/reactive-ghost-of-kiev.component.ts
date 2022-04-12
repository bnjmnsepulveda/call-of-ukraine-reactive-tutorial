import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, concatAll, concatMap, delay, filter, from, fromEvent, generate, interval, map, merge, mergeMap, Observable, of, startWith, switchMap, take, takeWhile, tap, timeInterval, zip } from 'rxjs';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';
import { erase, draw, Square, SquareDraw, createColumns, createRows, createSquares } from './model/Square';

@Component({
  selector: 'app-reactive-ghost-of-kiev',
  template: `
    <style>
      .grid {
        width: 302px;
        height: 302px;
        border: solid black 1px;
        display: flex;
        flex-wrap: wrap;
      }

      .grid div {
        width: 20px;
        height: 20px;
        border: solid burlywood 0.5px;
        font-size: 0.4rem;
      }

      .invader {
        background-color: purple;
        border-radius: 10px;
      }

      .shooter {
        background-color: green;
      }

      .laser {
        background-color: orange;
      }

      .boom {
        background-color: red;
      }

      .app-section {
        caret-color: transparent;
      }
    </style>

    <article #screen class="message app-section" contenteditable="true" tabindex="0"   >
    <div class="message-header">
      <p> {{ title }}</p>
    </div>
    <div class="grid" >
        <ng-template ngFor let-square [ngForOf]="squares">
          <div [class]="getSquareClassnames(square)">
            {{ square.key }}
          </div>
        </ng-template>
      </div>
    <div class="message-body">
      
    </div>
  </article>
  `,
  styles: [
  ]
})
export class ReactiveGhostOfKievComponent extends ReactiveComponent implements OnInit, OnDestroy {

  title = 'REACTIVE Ghost of Kiev'
  squares: Square[] = []
  columns: string[] = []
  rows: number[] = []
  squareDrawShooter: SquareDraw = new SquareDraw({ column: 'H', row: 14, name: 'ghost-of-kiev', type: 'shooter'})

  @ViewChild('screen', { static: true }) screen: ElementRef;

  constructor() { super() }

  ngOnInit(): void {
    this.squares = this.createSquares(15, 15)


    this.addSubscription(
      this.onMoveShooter().subscribe(sd => this.subscribeToDrawingSquare(sd)),
      this.onShoot().subscribe(sd => this.subscribeToDrawingSquare(sd)),
      this.movingRussianTroop().subscribe(sd => this.subscribeToDrawingSquare(sd))
      //this.ghostOfKievShooting().subscribe(x => this.drawingSquare(this.squares, x))
    )
  }

  ngOnDestroy(): void {
    this.unsubscribeComponent()
  }

  //#region Calculating screen and squares
  createSquares(columnSize: number, rowSize: number) {
    this.columns = createColumns(columnSize)
    this.rows = createRows(rowSize)
    return createSquares(this.columns, this.rows)
  }

  getSquareClassnames(square: Square) {
    return square.drawings.map(d => d.type).join(' ')
  }

  drawingSquare(squares: Square[], drawing: SquareDraw) {
    return draw(erase(squares, drawing), drawing)
  }

  subscribeToDrawingSquare(drawing: SquareDraw) {
    this.drawingSquare(this.squares, drawing)
  }

  getIndexColumn(column: string) {
    return this.columns.indexOf(column)
  }

  getNextColumn(column: string) {
    const index = this.columns.indexOf(column) + 1
    if (index >= 0 && index < this.columns.length) {
      return this.columns[index]
    }
    return null
  }

  getPrevColumn(column: string) {
    const index = this.columns.indexOf(column) - 1
    if (index >= 0 && index < this.columns.length) {
      return this.columns[index]
    }
    return null
  }

  getNextRow(row: number) {
    const index = this.rows.indexOf(row) + 1
    if (index >= 0 && index < this.rows.length) {
      return this.rows[index]
    }
    return -1
  }

  getPrevRow(row: number) {
    const index = this.rows.indexOf(row) - 1
    if (index >= 0 && index < this.rows.length) {
      return this.rows[index]
    }
    return -1
  }

  //#endregion

  //#region Game observables

  moveDrawing(direction: 'up' | 'down' | 'right' | 'left', intervaltime: number, initialDrawing: SquareDraw) {

    const iterators = {
      up: (squareDraw: SquareDraw) => {
        return new SquareDraw({ 
          column: squareDraw.column, 
          row: this.getPrevRow(squareDraw.row), 
          name: squareDraw.drawing.name,
          type: squareDraw.drawing.type
        })
      },
      down: (squareDraw: SquareDraw) => {
        return new SquareDraw({
          column: squareDraw.column, 
          row: this.getNextRow(squareDraw.row), 
          name: squareDraw.drawing.name, 
          type: squareDraw.drawing.type
        })
      },
      right: (squareDraw: SquareDraw) => { 
        return new SquareDraw({
          column: this.getNextColumn(squareDraw.column), 
          row: squareDraw.row, 
          name: squareDraw.drawing.name, 
          type: squareDraw.drawing.type
        })
      },
       left: (squareDraw: SquareDraw) => {
        return new SquareDraw({
          column: this.getPrevColumn(squareDraw.column), 
          row: squareDraw.row, 
          name: squareDraw.drawing.name, 
          type: squareDraw.drawing.type
        })
      }
    }

    const columnCondition = (squareDraw: SquareDraw) => {
      const index = this.columns.indexOf(squareDraw.column)
      return index >= 0 && index < this.columns.length
    }

    const rowCondition = (squareDraw: SquareDraw) => {
      return squareDraw.row >= 0 && squareDraw.row < this.rows.length
    }

    const conditions = {
      up: rowCondition,
      down: rowCondition,
      right: columnCondition,
      left: columnCondition
    }

    return generate({
      initialState: initialDrawing,
      condition: x => conditions[direction](x),
      iterate: x => iterators[direction](x),
    }).pipe(
      concatMap((item: any) => of(item).pipe(delay(intervaltime))),
    )
  }

  ghostOfKievShooting() {
    const row = this.squareDrawShooter.row
    const laser = new SquareDraw({
      column: this.squareDrawShooter.column, 
      row: this.getPrevRow(row), 
      name: 'ghost-of-kiev-laser', 
      type: 'laser' 
    })
    return this.moveDrawing('up', 10, laser)
  }

  movingRussianTroop() {
    const soldier1 = new SquareDraw({ column: 'B', row: 0, name: 'soldier-1', type: 'invader' })
    const soldier3 = new SquareDraw({ column: 'C', row: 0, name: 'soldier-2', type: 'invader' })
    const soldier4 = new SquareDraw({ column: 'D', row: 0, name: 'soldier-3', type: 'invader' })
    return from([soldier1, soldier3, soldier4]).pipe(
      mergeMap(s => this.moveDrawing('down', 700, s))
    )
  }

  onShoot() {

    const keysAllowed = ['ArrowUp']

    return this.fromElementRefEvent(this.screen, 'keydown').pipe(
      filter((event: any) => keysAllowed.includes(event.key)),
      concatMap(() => this.ghostOfKievShooting()),
    )

  }

  onMoveShooter() {

    const keysAllowed = ['ArrowLeft', 'ArrowRight']

    const initShooter$ = of(this.squareDrawShooter).pipe(
      tap(x => this.subscribeToDrawingSquare(x))
    )

    const eventMoving$ = this.fromElementRefEvent(this.screen, 'keydown').pipe(
      filter((event: any) => keysAllowed.includes(event.key)),
      map(e => e.key),
      map(k => {
        if (k === 'ArrowLeft') {
          const col = this.getPrevColumn(this.squareDrawShooter.column)
          if (col) {
            return new SquareDraw({
              column: col, 
              row: this.squareDrawShooter.row, 
              name: this.squareDrawShooter.drawing.name, 
              type: this.squareDrawShooter.drawing.type
            })
          }
        }
        if (k === 'ArrowRight') {
          const col = this.getNextColumn(this.squareDrawShooter.column)
          if (col) {
            return new SquareDraw({
              column: col, 
              row: this.squareDrawShooter.row, 
              name: this.squareDrawShooter.drawing.name, 
              type: this.squareDrawShooter.drawing.type
            })
          }
        }
        return this.squareDrawShooter
      }),
      tap(x => this.squareDrawShooter = x),
      //tap(x => console.log('click-screen', x)),
      //  map(x => this.drawingSquare(this.squares, x)),
    )

    return initShooter$.pipe(
      mergeMap(x => eventMoving$)
    )

  }

  //#endregion


}

