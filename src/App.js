import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { InputNumber } from 'antd';
import { Alert } from 'antd';

import Table from './objects/Table'
import Cell from './objects/Cell'

import Square from './components/Square'
import AboutModal from './components/Modal'

import './App.css';

const Row = styled.div`
  display: flex;
`

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`

const CellContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-top: 10px;
    width: 150px;
  }
`

const Title = styled.h1`
  font-family: 'Do Hyeon', sans-serif;
  color: white;
  font-size: 40px;
  text-shadow: 2px 2px black;
`

const Label = styled.h3`
  font-family: 'Do Hyeon', sans-serif;
  text-shadow: .5px .5px black;
  color: white;
  padding: 5px 0;
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
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState(false)
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
    } else if (cells > 50) {
      setMessage("Maximum cells is 50")
      return setCells(50)
    } else {
      setMessage("")
      initTable.changeCells(cells)
      setTable([...initTable.table])
    }
  }

  const resetGame = () => {
    initTable.setAllDead()
    setGen(0)
    setGame(false)
    setTable([...initTable.table])
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
      <Title>Conway's Game of Life</Title>
      <Container>
        <CellContainer>
          {table.map((row, i) => <Row key={i}>{row.map((cell, i) => <Square key={i} game={game} cell={cell} color={rainbow} />)}</Row>)}
          <Button onClick={() => setModal(true)}>About Conway's</Button>
        </CellContainer>
        <MenuContainer>
          <Label>Generation: {gen}</Label>
          {message && <Alert message={message} type="error" />}
          <Button type={game ? 'danger' : 'primary'} onClick={() => setGame(!game)}>{game ? 'Stop game' : 'Start Game'}</Button>
          <Button onClick={(() => resetGame())}>Reset Game</Button>
          <Label>Preset Patterns</Label>
          <Button onClick={() => selectPresetCells('Blinker')}>Blinker</Button>
          <Button onClick={() => selectPresetCells('Toad')}>Toad</Button>
          <Button onClick={() => selectPresetCells('Beacon')}>Beacon</Button>
          <Button onClick={() => selectPresetCells('Glider')}>Glider</Button>
          <Button onClick={() => selectPresetCells('Random')}>Random</Button>
          <Label>Toggle color</Label>
          <Button onClick={() => handleSetRainbow()}>{rainbow === 'rainbow' ? 'Single Color' : 'Rainbow'}</Button>
          <Label>Set Game Speed</Label>
          <InputNumber style={{ width: '100%' }} onChange={e => setSpeed(500/e)} value={500/speed} type="number" min="1" max="5"/>
          <Label>Set Cell Amount</Label>
          <InputNumber style={{ width: '100%', marginBottom: 10}} onKeyDown={e => e.keyCode === 13 && handleSetCells()}onChange={e => setCells(e)} value={cells} type="number" min="25" max="100"/>
          <Button onClick={() => handleSetCells()}>Set cells</Button>
        </MenuContainer>
        <AboutModal modal={modal} setModal={setModal} />
      </Container>
    </div>
  );
}

export default App;
