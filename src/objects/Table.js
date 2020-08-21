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