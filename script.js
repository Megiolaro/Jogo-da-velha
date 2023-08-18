const cellElement = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board]")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-winnig-message-button]")


let isCircleTurn

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    //criando evento de click para todas as celulas
    isCircleTurn = false
    for (const cell of cellElement) {
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener("clicl", handleClick)
        cell.addEventListener("click", handleClick, { once: true })
    }

    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message")
}

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerHTML = "Velha!"
    } else {
        winningMessageTextElement.innerHTML = isCircleTurn ? "O venceu!" : "X venceu!"
    }

    winningMessage.classList.add("show-winning-message")
}

const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElement[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellElement].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn

    setBoardHoverClass()
}

const handleClick = (e) => {
    //colocar a marca
    const cell = e.target
    const classToAdd = isCircleTurn ? "circle" : "x"

    placeMark(cell, classToAdd)

    //verificar por vitoria

    const isWin = checkForWin(classToAdd)

    //verificar por empate

    const isDraw = checkForDraw()

    if (isWin) {
        endGame(false)
    }
    else if (isDraw) {
        endGame(true)
    }
    else {
        //mudar simbolo

        swapTurns()
    }


}

startGame()

restartButton.addEventListener("click", startGame)



