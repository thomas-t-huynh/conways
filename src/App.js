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
  // console.log(table)

  const setNextGen = () => {
    initTable.switchCellsStatus()
    setTable([...initTable.table])
  }

  const checkNeighbors = () => {
    initTable.checkCellsNeighbors()
  }

  useEffect(() => {
    if (game) {
      checkNeighbors()
      const setNextGenInterval = setInterval(() => {
        setNextGen()
        setGen(gen + 1)
      }, 500)
      return function cleanup() {
        clearInterval(setNextGenInterval) 
      }
    }
  }, [gen, game])

  return (
    <div className="App">
      {table.map((row, i) => <Row key={i}>{row.map((cell, i) => <Square key={i} cell={cell} />)}</Row>)}
      <button onClick={() => setNextGen()}>Next gen</button>
      <button onClick={() => checkNeighbors()}>Check Neighbors</button>
      <button onClick={() => setGame(!game)}>{game ? 'Stop game' : 'Start Game'}</button>
    </div>
  );
}

export default App;
