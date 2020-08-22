import Cell from './Cell'

export default class Table {
    constructor(table=[]) {
        this.table = table
    }

    setTable(table) {
        this.table = table 
    }

    checkCellsNeighbors() {
        this.table.forEach(row => {
            row.forEach(cell => {
                cell.checkNeighbors()
            })
        })
    }

    switchCellsStatus() {
        this.table.forEach(row => {
            row.forEach(cell => {
                cell.setNextStatus()
            })
        })
    }

    setAllDead() {
        this.table.forEach(row => {
            row.forEach(cell => {
                cell.setDead()
            })
        })
    }

    createRandom() {
        this.table.forEach(row => {
            row.forEach(cell => {
                const randInt = Math.floor(Math.random() * 10);
                if (randInt <= 3) {
                    cell.setAlive()
                }
            })
        })
    }

    changeCells(amount) {
        console.log(amount)
        const table = []
        for (var y = 0; y < amount; y++) {
            if (this.table[y]) {
                const row = table[y]
                for (var x = 0; x < amount; x++) {
                    if (!this.table[y][x]) {
                        const cell = new Cell(false, this.table, x, y)
                        row.push(cell)
                    } else {
                        row.push(this.table[y][x])
                    }
                }
                table.push(row)
            } else {
                const row = []
                for (var x = 0; x < amount; x++) {
                    const cell = new Cell(false, this.table, x, y)
                    row.push(cell)
                }
                table.push(row)
            }
        }
        this.table = table
    }

    createBlinker({mid_x, mid_y}) {
        this.table[mid_y][mid_x].setAlive()
        this.table[mid_y][mid_x-1].setAlive()
        this.table[mid_y][mid_x+1].setAlive()
    }

    createToad({ mid_x, mid_y }) {
        this.table[mid_y][mid_x].setAlive()
        this.table[mid_y][mid_x-1].setAlive()
        this.table[mid_y][mid_x+1].setAlive()
        this.table[mid_y+1][mid_x-1].setAlive()
        this.table[mid_y+1][mid_x-2].setAlive()
        this.table[mid_y+1][mid_x].setAlive()
    }

    createBeacon({ mid_x, mid_y }) {
        this.table[mid_y-2][mid_x-1].setAlive()
        this.table[mid_y-2][mid_x-2].setAlive()
        this.table[mid_y-1][mid_x-2].setAlive()
        
        this.table[mid_y][mid_x+1].setAlive()
        this.table[mid_y+1][mid_x].setAlive()
        this.table[mid_y+1][mid_x+1].setAlive()
    }

    createGlider({ mid_x, mid_y }) {
        this.table[mid_y][mid_x].setAlive()
        this.table[mid_y][mid_x-1].setAlive()
        this.table[mid_y][mid_x+1].setAlive()
        this.table[mid_y-1][mid_x+1].setAlive()
        this.table[mid_y-2][mid_x].setAlive()
    }
}