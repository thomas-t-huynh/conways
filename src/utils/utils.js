export const generateRandomColor = () => {
    const colors = ['Tomato','Orange','DodgerBlue','MediumSeaGreen', 'SlateBlue', 'Violet']
    const randInt = Math.floor(Math.random() * colors.length)
    return colors[randInt]
}

