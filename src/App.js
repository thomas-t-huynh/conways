import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import Table from './objects/Table'
import Cell from './objects/Cell'

import Square from './components/Square'

import './App.css';

const Row = styled.div`
  display: flex;
`

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  width: 800px;
  justify-content: space-between;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CellContainer = styled.div`
  
`
const generateTable = (amount) => {
  const table = new Table()
  const arr = []
  for (var y = 0; y < amount; y++) {
    const row = []
    for (var x = 0; x < amount; x++) {
      const cell = new Cell(false, table, x, y)
      row.push(cell)
    }
    arr.push(row)
  }
  table.setTable(arr)
  return table
}

const initTable = generateTable(25)

function App() {

  const [table, setTable] = useState(initTable.table)
  const [gen, setGen] = useState(0)
  const [game, setGame] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [rainbow, setRainbow] = useState('mediumseagreen')
  const [cells, setCells] = useState(25)
  const[message, setMessage] = useState("")
  // console.log(table)
  const setNextGen = () => {
    initTable.switchCellsStatus()
    setTable([...initTable.table])
  }

  const checkNeighbors = () => {
    initTable.checkCellsNeighbors()
  }

  const selectPresetCells = (preset) => {
    if (game) {return}
    initTable.setAllDead()
    const mid_y = ~~(table.length /2)
    const mid_x = ~~(table[0].length /2)
    initTable[`create${preset}`]({mid_x, mid_y})
    setTable([...initTable.table])
    // commit
  }

  const handleSetRainbow = () => {
    if (rainbow === 'mediumseagreen') {
      return setRainbow('rainbow')
    } 
    setRainbow('mediumseagreen')
  }

  const handleSetCells = () => {
    if (cells < 25) {
      setMessage("Minimum cells is 25")
      return setCells(25)
    } else if (cells > 100) {
      setMessage("Maximum cells is 100")
      return setCells(100)
    } else {
      setMessage("")
      initTable.changeCells(cells)
      setTable([...initTable.table])
    }
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
      <h1>Conway's Game of Life</h1>
      <Container>
        <CellContainer>
          {table.map((row, i) => <Row key={i}>{row.map((cell, i) => <Square key={i} game={game} cell={cell} color={rainbow} />)}</Row>)}
        </CellContainer>
        <MenuContainer>
          <h3>Generation: {gen}</h3>
          <h3>{message}</h3>
          <Button type={game ? 'danger' : 'primary'} onClick={() => setGame(!game)}>{game ? 'Stop game' : 'Start Game'}</Button>
          <Button onClick={() => handleSetRainbow()}>{rainbow === 'rainbow' ? 'Single Color' : 'Rainbow'}</Button>
          <Button onClick={() => selectPresetCells('Blinker')}>Blinker</Button>
          <Button onClick={() => selectPresetCells('Toad')}>Toad</Button>
          <Button onClick={() => selectPresetCells('Beacon')}>Beacon</Button>
          <Button onClick={() => selectPresetCells('Glider')}>Glider</Button>
          <Button onClick={() => selectPresetCells('Random')}>Random</Button>
          <input onChange={e => setSpeed(500/e.target.value)} value={500/speed} type="number" min="1" max="5"/>
          <input onChange={e => setCells(e.target.value)} value={cells} type="number" min="25" max="100"/>
          <Button onClick={() => handleSetCells()}>Set cells</Button>
        </MenuContainer>
      </Container>
    </div>
  );
}

export default App;
