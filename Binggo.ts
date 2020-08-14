import { winline } from './winLine'

let winner: any = false
let matchCouth = 0
let winnerRes = {}
let players: object[] = [
  {
    username: 'A0001',
    bingoCard: [],
    convertCard: [
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ],
    winnerRes: {}
  }
]

export class GameRoom {

  point: number[] = []
  pointInBox: number[] = Array.from(Array(30), (_, i) => i + 1)

  constructor() {
    this.start()
  }

  start() {
    this.randomPoint(players[0])
  }

  randomPoint(player: any) {
    let coutDownTime = 4
    let point: any = Array.from(Array(30), (_, i) => i + 1)
    let matrix = []
    for (let i = 0; i < 25; i++) {
      let random = point.splice(~~(Math.random() * point.length), 1)
      matrix.push(random[0])
    }
    player.bingoCard = matrix

    let timeInterval = setInterval(() => {
      if (--coutDownTime === -1) {
        clearInterval(timeInterval)
        console.log('coutDownTime in if:', coutDownTime)
        this.callPoint()
      } else {
        console.log('playing', coutDownTime);
      }
    }, 1000)

  }

  callPoint() {
    let callPoint = this.pointInBox.splice(~~(Math.random() * this.pointInBox.length), 1)
    this.convertPoint(callPoint[0], players[0])
  }

  convertPoint(callPoint: any, player: any) {
    console.log('callPoint', callPoint)
    let pointPosition: number = -1
    player.bingoCard.find((v: any, i: any) => {
      if (v === callPoint) {
        pointPosition = i
        player.convertCard[pointPosition] = 1
      }
    })
    this.checkBingo(player)
  }

  checkBingo(player: any) {
    for (let i = 0; i < winline.length; i++) {
      let winlineloop = winline[i]
      matchCouth = 0
      if (i === 8 || i === 9 || i === 10 || i === 11) {
        matchCouth++
      }
      if (!winner) {
        for (let j = 0; j < player.convertCard.length; j++) {
          if (winlineloop[j] === 1) {
            if (player.convertCard[j] === winlineloop[j]) {
              matchCouth++
            }
          }
          if (matchCouth === 6) {
            player.winnerRes = {
              winner: true,
              winnerLine: i
            }
            winner = true
          }
        }
      }
    }
    console.log('winner>>player:', player)
    let coutDownTime = 4
    if (!winner) {
      let timeInterval = setInterval(() => {
        if (--coutDownTime === -1) {
          clearInterval(timeInterval)
          console.log('coutDownTime in if:', coutDownTime)
          this.callPoint()
        } else {
          console.log('playing', coutDownTime);
        }
      }, 1000)
    }
  }
}

new GameRoom