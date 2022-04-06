import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, takeUntil, takeWhile } from 'rxjs';
import { ReactiveComponent } from 'src/app/presentation/shared/utils/ReactiveComponent';

@Component({
  selector: 'app-ghost-of-kiev',
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

    <article class="message app-section" contenteditable="true" (keydown)="moveShooter($event); shoot($event)" tabindex="0"   >
    <div class="message-header">
      <p> {{ title }}</p>
    </div>
    <div class="grid" >
        <ng-template ngFor let-square [ngForOf]="squares">
          <div [class]="square.classnames.join(' ')">
         
          </div>
        </ng-template>
      </div>
    <div class="message-body">
      
    </div>
  </article>
  `
})
export class GhostOfKievComponent extends ReactiveComponent implements OnInit, OnDestroy {

  title = 'Ghost of Kiev'

  isGameOver = false

  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
  columns = 15
  squares: Square[] = []

  currentShooterIndex = 202
  width = 15
  goingRight = true
  direction = 1
  russianKilled: number[] = []
  results = 0

  russianInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
  ]

  constructor() {
    super()

    this.createSquares()
    this.draw()
    this.addSquareClassname(this.currentShooterIndex, 'shooter')

  }

  ngOnInit(): void {
    this.addSubscription(
      interval(600).pipe(takeWhile(() => !this.isGameOver)).subscribe(x => this.moveInvaders(), err => {
        console.log(err)
        this.isGameOver = true
      })
    )
  }

  ngOnDestroy(): void {
    this.unsubscribeComponent()
  }

  createSquares() {
    let colIndex = 0
    let rowIndex = 0
    for (let i = 0; i < 225; i++) {
      const place = `${this.rows[rowIndex]}-${(colIndex + 1)}`
      const square: Square = {
        index: i,
        place,
        classnames: []
      }
      this.squares.push(square)
      if (colIndex === 14) {
        colIndex = 0
        rowIndex = 0
      }
      colIndex++
      rowIndex++
    }
  }

  addSquareClassname(index: number, classname: SquareClassname) {
    if (index > 0 && this.squares[index]) {
      this.squares[index].classnames.push(classname)
    }
  }

  removeSquareClassname(index: number, classname: SquareClassname) {
    if (this.squares[index]) {
      const filtered = this.squares[index].classnames.filter(c => c !== classname)
      this.squares[index].classnames = [
        ...filtered
      ]
    }
  }

  includeSquareClassname(index: number, classname: SquareClassname) {
    if (index > 0 && this.squares[index]) {
      return this.squares[index].classnames.includes(classname)
    }
    return false
  }

  draw() {
    for (let i = 0; i < this.russianInvaders.length; i++) {
      if (!this.russianKilled.includes(i)) {
        this.squares[this.russianInvaders[i]].classnames.push('invader')
      }
    }
  }

  remove() {
    for (let i = 0; i < this.russianInvaders.length; i++) {
      this.removeSquareClassname(this.russianInvaders[i], 'invader')
    }
  }

  printPosition(msg: string, index: number) {
    console.log(`${msg} position `, this.squares[index]?.place)
  }

  moveShooter(e: any) {
    this.removeSquareClassname(this.currentShooterIndex, 'shooter')
    switch (e.key) {
      case 'ArrowLeft':
        if (this.currentShooterIndex % this.width !== 0) this.currentShooterIndex -= 1
        break
      case 'ArrowRight':
        if (this.currentShooterIndex % this.width < this.width - 1) this.currentShooterIndex += 1
        break
    }
    this.addSquareClassname(this.currentShooterIndex, 'shooter')
  }

  moveInvaders() {

    const leftEdge = this.russianInvaders[0] % this.width === 0
    const rightEdge = this.russianInvaders[this.russianInvaders.length - 1] % this.width === this.width - 1
    this.remove()

    if (rightEdge && this.goingRight) {
      for (let i = 0; i < this.russianInvaders.length; i++) {
        this.russianInvaders[i] += this.width + 1
        this.direction = -1
        this.goingRight = false
      }
    }

    if (leftEdge && !this.goingRight) {
      for (let i = 0; i < this.russianInvaders.length; i++) {
        this.russianInvaders[i] += this.width - 1
        this.direction = 1
        this.goingRight = true
      }
    }

    for (let i = 0; i < this.russianInvaders.length; i++) {
      this.russianInvaders[i] += this.direction
    }

    this.draw()

    console.log('currentshooterindex', this.currentShooterIndex)
    const classnames = this.squares[this.currentShooterIndex].classnames
    if (classnames.includes('invader') && classnames.includes('shooter')) {
      this.setGameOver('GAME OVER')
    }

    for (let i = 0; i < this.russianInvaders.length; i++) {
      if (this.russianInvaders[i] > (this.squares.length)) {
        this.setGameOver('GAME OVER')
      }
    }
    if (this.russianKilled.length === this.russianInvaders.length) {
      this.setGameOver('YOU WIN LITTLE BASTARD')
    }
  }

  shoot(e: any) {

    let laserId: any
    let currentLaserIndex = this.currentShooterIndex

    const moveLaser = () => {
      //this.printPosition('removing laser', currentLaserIndex)
      this.removeSquareClassname(currentLaserIndex, 'laser')
      currentLaserIndex -= this.width
      this.addSquareClassname(currentLaserIndex, 'laser')

      if (this.includeSquareClassname(currentLaserIndex, 'invader')) {

        this.removeSquareClassname(currentLaserIndex, 'laser')
        this.removeSquareClassname(currentLaserIndex, 'invader')
        this.addSquareClassname(currentLaserIndex, 'boom')

        setTimeout(() => this.removeSquareClassname(currentLaserIndex, 'boom'), 300)
        clearInterval(laserId)

        const alienRemoved = this.russianInvaders.indexOf(currentLaserIndex)
        this.russianKilled.push(alienRemoved)
        this.results++
        this.title = `Ghost of Kiev: ${this.results} russian jets killed`
        console.log(this.russianKilled)

      }

    }
    switch (e.key) {
      case 'ArrowUp':
        laserId = setInterval(moveLaser, 100)
    }
  }

  setGameOver(title: string) {
    this.title = title
    this.isGameOver = true
  }


}

type SquareClassname = 'shooter' | '' | 'laser' | 'invader' | 'boom'

interface Square {
  index: number;
  place?: string;
  classnames: SquareClassname[];
}

