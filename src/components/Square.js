import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const Div = styled.div`
  background: ${props => props.alive ? 'darkseagreen' : 'lightgray'};
  height: 20px;
  width: 20px;
  margin: 1px;
`


function Square({ cell }) {

    useEffect(() => {
        setStatus(cell.alive)
    }, [cell.alive])

    const switchStatus = () => {
        cell.switchStatus()
        setStatus(cell.alive)
        // cell.checkNeighbors()
        console.log(cell)
    }
    const [ status, setStatus ] = useState(cell.alive)
    return (
        <Div onClick={() => switchStatus()} alive={status} />
    )
}

export default Square;