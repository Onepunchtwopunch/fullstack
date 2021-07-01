import React from 'react'
import MainLayout from '../../Layouts/MainLayout'

function GameOver(props) {
  return (
    <MainLayout>

    <div
      id='GameBoard'
      style={{
        width: props.width,
        height: props.height,
        borderWidth: props.width / 50,
      }}>
      <div id='GameOver' style={{ fontSize: props.width / 15 }}>
        <div id='GameOverText'>GAME OVER</div>
        <div>Your score: {props.score}</div>
        <div>
          {props.newHighScore ? 'New local ' : 'Local '}high score:{' '}
          {props.highScore}
        </div>
        <div id='PressSpaceText'>Press Space to restart</div>
      </div>
    </div>
    </MainLayout>
  )
}

export default GameOver
