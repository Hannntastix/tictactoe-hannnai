import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className='w-20 h-20 border-black rounded-md bg-white mx-3 my-3 text-4xl font-semibold font-sans' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ isSinglePlayer }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (isSinglePlayer && !xIsNext && !calculateWinner(squares)) {
      const emptySquares = squares
        .map((square, idx) => (square === null ? idx : null))
        .filter((idx) => idx !== null);
      if (emptySquares.length > 0) {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const nextSquares = squares.slice();
        nextSquares[randomMove] = 'O';
        setSquares(nextSquares);
        setXIsNext(true);
      }
    }
  }, [xIsNext, squares, isSinglePlayer]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || (!xIsNext && isSinglePlayer)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status = '';

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Now Is Your Turn: ' + (xIsNext ? 'X' : 'O');
  }
  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className='w-full h-screen justify-center items-center mx-auto py-10 px-10 flex flex-col gap-5 bg-black'>
        <h1 className='text-6xl font-semibold text-center font-mono text-blue-400 pointer-events-none select-none'>TIC <span className='text-yellow-400'>TAC</span> <span className='text-red-500'>TOE</span></h1>
        {winner ? (
          <div className='text-3xl text-center text-red-600 pointer-events-none select-none'>{status}</div>
        ) : (
          <div className='text-3xl text-center text-blue-500 pointer-events-none select-none'>{status}</div>
        )}
        <div className='w-full h-1/2 justify-center items-center mx-auto md:px-10'>
          <div className='justify-center items-center mx-auto w-[306px] h-[312px] grid grid-cols-3'>
            {squares.map((square, i) => (
              <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
            ))}
          </div>
        </div>
        {winner && (
          <>
            <button
              className='select-none mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-2xl hover:bg-blue-900 transition ease-in-out duration-300'
              onClick={resetGame}>
              Play Again
            </button>
          </>
        )}
        <button onClick={refreshPage} className='select-none text-gray-200 text-xl bg-red-500 px-4 py-2 rounded-md hover:bg-red-800 transition ease-in-out duration-300'>Back</button>
      </div>
    </>
  );
}

function Game() {
  const [isSinglePlayer, setIsSinglePlayer] = useState(null);

  if (isSinglePlayer === null) {
    return (
      <div className='w-full h-auto flex flex-col justify-center items-center bg-black'>
        <div className='text-center my-40 h-screen w-full bg-none py-40'>
          <h1 className='text-zinc-300 xl:text-8xl text-6xl px-5 noto-serif-font select-none pointer-events-none'>Welcome to Tic-Tac-Toe Game</h1>
          <p className='text-zinc-500 text-3xl my-10 select-none pointer-events-none'>By HannnAI</p>
          <p className='text-zinc-200 text-xl noto-serif-font select-none pointer-events-none'>Scroll down to start playing ↓</p>
        </div>
        <div className='text-center h-screen'>
          <h1 className='text-6xl font-semibold text-blue-400 mb-8 pointer-events-none select-none noto-serif-font'>TIC <span className='text-yellow-400'>TAC</span> <span className='text-red-500'>TOE</span></h1>
          <p className='text-zinc-300 text-center text-xl pointer-events-none select-none'>Select Mode :</p>
          <button
            className='select-none mx-2 px-4 py-2 bg-none text-white rounded-md text-2xl hover:text-red-300 transition ease-in-out duration-300'
            onClick={() => setIsSinglePlayer(true)}>
            Single Player
          </button>
          <button
            className='select-none mx-2 px-4 py-2 bg-none text-white rounded-md text-2xl hover:text-blue-300 transition ease-in-out duration-300'
            onClick={() => setIsSinglePlayer(false)}>
            Two Players
          </button>
          <div className='md:w-1/2 w-full h-auto justify-center items-center my-10 mx-auto noto-serif-font px-4'>
            <p className='text-zinc-300 text-xl text-center noto-serif-font'>Tic-Tac-Toe is a classic two-player game where players take turns marking spaces in a 3x3 grid. The objective is to be the first to get three of your marks in a row, either horizontally, vertically, or diagonally.</p>
          </div>
          <div className='hidden md:block'>
            <div className='w-full h-auto justify-center items-center my-10 mx-auto grid grid-cols-2 px-5'>
              <div className='w-full h-auto justify-center items-center my-10'>
                <h1 className='text-xl font-bold text-red-300'>Single Player Mode (Against Computer)</h1>
                <h2 className='text-zinc-300 py-5 px-4 text-lg'>In this mode, you will compete against a computer opponent. The computer can have varying levels of difficulty, from easy to hard, depending on the complexity of its strategy.</h2>
                <p className='text-yellow-400 font-bold text-left text-xl px-5'>Key Points:</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>1. Game Grid</span>: A 3x3 grid is used for gameplay.</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>2. Player Marks</span>: The player uses 'X' while the computer uses 'O'.</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>3. Restart Option</span>: Players can restart the game at any time.</p>
              </div>
              <div className='w-full h-auto justify-center items-center my-10'>
                <h1 className='text-xl font-bold text-blue-300'>Two Players Mode (Playing with a Friend)</h1>
                <h2 className='text-zinc-300 py-5 px-4 text-lg'>In this mode, you will compete against a computer opponent. The computer can have varying levels of difficulty, from easy to hard, depending on the complexity of its strategy.</h2>
                <p className='text-yellow-400 font-bold text-left text-xl px-5'>Key Points:</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>1. Player Marks</span>: Player 1 uses 'X' and Player 2 uses 'O'.</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>2. Interaction</span>: Players interact directly by taking turns on the same device or platform.</p>
                <p className='text-zinc-300 text-left px-5 py-2'><span className='font-bold'>3. Winning Condition</span>: The first to align three marks in a row, column, or diagonal wins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Board isSinglePlayer={isSinglePlayer} />;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every((square) => square !== null)) {
    return 'No One';
  }

  return null;
}

export default Game;
