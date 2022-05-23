import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concatMap, delay, endWith, filter, from, generate, map, merge, Observable, of, pluck, share, skipWhile, startWith, Subject, switchMap, take, takeUntil, takeWhile, tap, timeInterval, toArray, zip } from 'rxjs';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';
import { MovingRussianInvaderDTO } from './dto/MovingRussianInvaderDTO';
import { drawInvaderBase } from './model/RussianEnemy';
import { erase, draw, Square, SquareDraw, createColumns, createRows, createSquares, SquareEvent, createEvent, eraseByName, eraseDrawings, DrawingType, eraseByStartWith } from './model/Square';

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

  // screen
  title = 'REACTIVE Ghost of Kiev'
  squares: Square[] = []
  columns: string[] = []
  rows: number[] = []
  // game
  shooter: SquareDraw = new SquareDraw({ column: 'H', row: 14, name: 'ghost-of-kiev', type: 'shooter' })
  shootDelay: number = 10;
  // reactive properties
  squareUpdated$ = new Subject<Square>();
  invaderShooted$: Observable<Square> = null;
  troopCapturePlayer$: Observable<Square> = null;
  // squareEvent$: Observable<SquareEvent>

  @ViewChild('screen', { static: true }) screen: ElementRef;

  constructor() { super() }

  ngOnInit(): void {

    let squares = this.createSquares(15, 15)

    this.invaderShooted$ = this.squareUpdated$.pipe(
      filter(square => {
        const types = square.drawings.map(d => d.type)
        return types.includes('laser') && types.includes('invader')
      }),
      share()
    )

    // this.troopCapturePlayer$ = this.squareUpdated$.pipe(
    //   filter(square => )
    // )


    const squares$ = merge(
      this.onMoveShooter(),
      this.onShoot(),
      this.movingRussianTroop(),
    ).pipe(
      map(squareDraw => draw(erase(squares, squareDraw), squareDraw)),
      share()
    )

    const squareUpdated$ = squares$.pipe(
      switchMap(squaresUpdated => from(squaresUpdated))
    )

    this.addSubscription(
      squares$.subscribe(squaresEvent => {
        this.squares = squaresEvent
      }),
      squareUpdated$.subscribe(square => this.squareUpdated$.next(square)),
      this.onResourceDestroyed().pipe(
        tap(square => eraseDrawings(this.squares, square.column, square.row)),
        tap(square => console.log('target-destroyed-at', square)),
        tap(square => draw(this.squares, new SquareDraw({ column: square.column, row: square.row, name: 'boom', type: 'boom' }))),
        switchMap(square => of(square).pipe(delay(100)))
      ).subscribe(square => {
        eraseDrawings(this.squares, square.column, square.row)
      })
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

  moveDrawing(direction: 'up' | 'down' | 'right' | 'left', intervaltime: number, initialDrawing: SquareDraw): Observable<SquareDraw> {

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

  ghostOfKievShooting(): Observable<SquareDraw> {
    const laser = new SquareDraw({
      column: this.shooter.column,
      row: this.getPrevRow(this.shooter.row),
      name: 'ghost-of-kiev-laser',
      type: 'laser'
    })
    return this.moveDrawing('up', this.shootDelay, laser)
  }


  movingRussianInvader(invader: MovingRussianInvaderDTO) {

    const invaderShooted$ = this.invaderShooted$.pipe(
      switchMap(s => from(s.drawings)),
      filter(d => d.name === invader.name),
      tap(x => console.log('soldier-shooted', x))
    )

    return drawInvaderBase({
      name: invader.name,
      drawingType: invader.type,
      columns: this.columns,
      rows: this.rows,
      skipRows: invader.skipRows ? invader.skipRows : 0,
      skipColumns: invader.skipColumns ? invader.skipColumns : 0,
      takeColumns: invader.takeColumns ? invader.takeColumns : 0,
      delay: 200
    }).pipe(
      takeUntil(invaderShooted$)
    )

  }

  movingRussianTroop(): Observable<SquareDraw> {

    const troopRows = 3
    const troopColumns = 10
    const takeColumns = 6
    const soldierTroops: MovingRussianInvaderDTO[] = []
    let soldierSuffix = 0;

    const gameOver$ = this.squareUpdated$.pipe(
      filter(s => s.drawings.map(d => d.name).some(n => n.startsWith('soldier-'))),
      skipWhile(s => s.row !== this.rows[this.rows.length - 1]),
      tap(() => eraseByStartWith(this.squares, 'soldier-')),
    )

    for (let x = 0; x < troopColumns; x++) {
      for (let y = 0; y < troopRows; y++) {
        soldierTroops.push({ name: `soldier-${soldierSuffix}`, type: 'invader', skipRows: y, skipColumns: x, takeColumns })
        soldierSuffix += 1
      }
    }

    return merge(
      ...soldierTroops.map(x => this.movingRussianInvader(x))
    ).pipe(
      takeUntil(gameOver$),
    )

  }

  onShoot() {
    return this.fromElementRefEvent(this.screen, 'keydown').pipe(
      pluck('key'),
      filter((key: any) => key === 'ArrowUp'),
      concatMap(() => this.ghostOfKievShooting().pipe(
        takeUntil(this.invaderShooted$)
      ))
    )
  }

  onMoveShooter(): Observable<SquareDraw> {

    const moving$ = this.fromElementRefEvent(this.screen, 'keydown').pipe(pluck('key'))

    const moveSquareDraw = () => (source: Observable<string>) => source.pipe(
      skipWhile(column => column === null),
      map(column => {
        return new SquareDraw({
          column: column,
          row: this.shooter.row,
          name: this.shooter.drawing.name,
          type: this.shooter.drawing.type
        })
      })
    )

    const right$ = moving$.pipe(
      filter((key: any) => key === 'ArrowRight'),
      map(() => this.getNextColumn(this.shooter.column)),
      moveSquareDraw()
    )

    const left$ = moving$.pipe(
      filter((key: any) => key === 'ArrowLeft'),
      map(() => this.getPrevColumn(this.shooter.column)),
      moveSquareDraw()
    )

    return merge(right$, left$).pipe(
      startWith(this.shooter),
      tap(shooter => this.shooter = shooter)
    )
  }

  onResourceDestroyed() {
    return this.invaderShooted$.pipe(
      map(x => ({ row: x.row, column: x.column }))
    )
  }

  //#endregion


}

