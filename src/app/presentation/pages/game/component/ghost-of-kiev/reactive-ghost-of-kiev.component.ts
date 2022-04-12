import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, concatAll, concatMap, delay, filter, from, fromEvent, generate, interval, map, merge, mergeMap, Observable, of, startWith, switchMap, take, takeWhile, tap, timeInterval, zip } from 'rxjs';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';
import { erase, createSquaresBySize, draw, Square, SquareDraw, createColumns, createRows, createSquares } from './model/Square';

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
  squareDrawShooter: SquareDraw = new SquareDraw('H', 14, 'ghost-of-kiev','shooter')

  @ViewChild('screen', { static: true }) screen: ElementRef;

  constructor() { super() }

  ngOnInit(): void {
    this.squares = this.createSquares(15, 15)


    this.addSubscription(
      // this.moveGreenItem().subscribe(x => this.squares = x, err => console.log(err), () => console.log(this.squares)),
      // this.moveRussian().subscribe(x => this.squares = x),
      this.onMoveShooter().subscribe(sd => this.subscribeToDrawingSquare(sd)),
      this.onShoot().subscribe(sd => this.subscribeToDrawingSquare(sd))
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

  moveDrawing(direction: 'up' | 'down', intervaltime: number, initialDrawing: SquareDraw) {

    const iterators = {
      up: (squareDraw: SquareDraw) => {
        let row = this.getPrevRow(squareDraw.row)
        return new SquareDraw(squareDraw.column, row, squareDraw.drawing.name,squareDraw.drawing.type)
      },
      down: (squareDraw: SquareDraw) => {
        let row = this.getNextRow(squareDraw.row)
        return new SquareDraw(squareDraw.column, row, squareDraw.drawing.name, squareDraw.drawing.type)
      },
      // right: (squareDraw: SquareDraw) => new SquareDraw(squareDraw.column, squareDraw.row + 1, squareDraw.drawing),
      // left: (squareDraw: SquareDraw) => new SquareDraw(squareDraw.column, squareDraw.row - 1, squareDraw.drawing)
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
    const laser = new SquareDraw(this.squareDrawShooter.column, this.getPrevRow(row), 'ghost-of-kiev-laser', 'laser' )
    return this.moveDrawing('up', 10, laser)
  }

  movingRussianTroop() {

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
            return new SquareDraw(col, this.squareDrawShooter.row, this.squareDrawShooter.drawing.name, this.squareDrawShooter.drawing.type)
          }
        }
        if (k === 'ArrowRight') {
          const col = this.getNextColumn(this.squareDrawShooter.column)
          if (col) {
            return new SquareDraw(col, this.squareDrawShooter.row, this.squareDrawShooter.drawing.name, this.squareDrawShooter.drawing.type)
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

