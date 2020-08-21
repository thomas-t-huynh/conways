export default class Cell {
    constructor(alive=true, table, x, y) {
        this.alive = alive
        this.nextStatus = alive
        this.table = table
        this.x = x
        this.y = y
    }

    switchStatus() {
        this.alive = !this.alive
    }

    setNextStatus() {
        this.alive = this.nextStatus
    }

    setAlive() {
        this.alive = true
    }

    setDead() {
        this.alive = false
    }

    checkNeighbors() {
        const { table: { table }, x, y } = this
        let n = 0, ne = 0, nw = 0, s = 0, se = 0, sw = 0
        if (y - 1 >= 0) {
            n = table[y-1][x] && table[y-1][x].alive ? 1 : 0
            ne = table[y-1][x+1] && table[y-1][x+1].alive ? 1 : 0
            nw = table[y-1][x-1] && table[y-1][x-1].alive ? 1 : 0
        }
        if (y + 1 <= table.length - 1) {
            s = table[y+1][x] && table[y+1][x].alive ? 1 : 0
            se = table[y+1][x+1] && table[y+1][x+1].alive ? 1 : 0
            sw = table[y+1][x-1] && table[y+1][x-1].alive ? 1 : 0
        }
        let e = table[y][x+1] && table[y][x+1].alive ? 1 : 0
        let w = table[y][x-1] && table[y][x-1].alive ? 1 : 0
        let neighbors = e + w + n + s + ne + nw + se + sw
        // console.log(neighbors)
        if (this.alive && (neighbors >= 2 && neighbors <= 3)) {
            this.nextStatus = true
        } else if (!this.alive && (neighbors === 3)) {
            this.nextStatus = true
        } else {
            this.nextStatus = false
        }
    }
}