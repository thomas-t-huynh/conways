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
}