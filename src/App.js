import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Table from './objects/Table'
import Cell from './objects/Cell'

import Square from './components/Square'

import './App.css';

const Row = styled.div`
  display: flex;
`
const generateTable = (height, width) => {
  const table = new Table()
  const arr = []
  for (var y = 0; y < height; y++) {
    const row = []
    for (var x = 0; x < width; x++) {
      const cell = new Cell(false, table, x, y)
      row.push(cell)
    }
    arr.push(row)
  }
  table.setTable(arr)
  return table
}

const initTable = generateTable(25, 25)

function App() {

  const [table, setTable] = useState(initTable.table)
  const [gen, setGen] = useState(0)
  const [game, setGame] = useState(false)
  const [speed, setSpeed] = useState(100)
  // console.log(table)

  const setNextGen = () => {
    initTable.switchCellsStatus()
    setTable([...initTable.table])
  }

  const checkNeighbors = () => {
    initTable.checkCellsNeighbors()
  }

  const selectPresetCells = () => {
    const mid_y = ~~(table.length /2)
    const mid_x = ~~(table[0].length /2)
  }

  useEffect(() => {
    if (game) {
      checkNeighbors()
      const setNextGenInterval = setInterval(() => {
        setNextGen()
        setGen(gen + 1)
      }, speed)
      return function cleanup() {
        clearInterval(setNextGenInterval) 
      }
    }
  }, [gen, game])

  return (
    <div className="App">
      {table.map((row, i) => <Row key={i}>{row.map((cell, i) => <Square key={i} game={game} cell={cell} />)}</Row>)}
      <h3>Generation: {gen}</h3>
      <button onClick={() => setGame(!game)}>{game ? 'Stop game' : 'Start Game'}</button>
      <input onChange={e => setSpeed(500/e.target.value)} value={500/speed} type="number" min="1" max="5"/>
    </div>
  );
}

export default App;
