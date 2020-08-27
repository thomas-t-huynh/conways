import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const customeStyles = {
    content: {
        height: 600,
        width: 600,
        margin: 'auto',
        background: 'slategray',
        transition: 'opacity 2s'
    }
}

const Modalh1 = styled.h1`
    font-family: 'Do Hyeon', sans-serif;
    color: white;
    font-size: 40px;
    text-shadow: 2px 2px black;
`

const Modalp = styled.h3`
    color: white;
    font-size: 18px;
    text-shadow: 0.5px 0.5px black;
`

function AboutModal({ modal, setModal }) {
    return (
        <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            contentLabel="About Modal"
            style={customeStyles}
        >
            <Modalh1>About Conway's Game of Life</Modalh1>
            <Modalp>This isn't your typical computer game here. The Game of Life, or just Life for short, is a zero-player game (no real time playing as game is predetermined by initial input) that simulates Cellular Automaton.</Modalp>
            <Modalp>Cellular Automaton is a repeating series of a cell population that either flourishes or dies out based on the amount of neighboring cells for each cell. If there's 2 or 3 bordering cells to a cell, the cell gets to live for another day. If there's any more or less than that, the cell will cease to live. If a dead cell has exactly 3 neighbors, then it comes back to life. With such living circumstances shown at a rapid pace, fascinating cell patterns will reveal itself.</Modalp>
            <Modalp>So what's the purpose of this feat of math and computation? John Conway, the creator of this game, pursued creating a virtual simulation that could be classified as alive based on John Von Neumann's definition of living. An organism is capable of self-reproduction and can simulate a Turing machine. This leads to the next major point of this game, Turing complete. To simply put, a system that is designed to solve any computational problem is classified as Turing Complete. Life is Conway's proof that automaton is well alive according to Von Neumann's requirements, and as a result brought meaning to 'simulation games'</Modalp>
        </Modal>
    )

}

export default AboutModal;