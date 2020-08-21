import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { generateRandomColor } from '../utils/utils'

const Div = styled.div`
  background: ${props => props.alive ? props.color : 'lightgray'};
  height: 20px;
  width: 20px;
  margin: 1px;
`

function Square({ cell, game, color }) {

    useEffect(() => {
        setStatus(cell.alive)
    }, [cell.alive])

    const switchStatus = () => {
        if (!game) {
            cell.switchStatus()
            setStatus(cell.alive)
            // cell.checkNeighbors()
            console.log(cell)
        }
    }
    const [ status, setStatus ] = useState(cell.alive)
    return (
        <Div onClick={() => switchStatus()} alive={status} color={color === 'mediumseagreen' ? 'mediumseagreen' : generateRandomColor()} />
    )
}

export default Square;