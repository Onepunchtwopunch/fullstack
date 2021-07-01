import React, { Component } from "react";
import Target from "./Target";
import { defaultParams, initialGameState } from "../js/params";
import { gameField, panelStyle, messageStyle } from "../js/styles.js";
import classes from "../hunter.module.css";
import MainLayout from "../../../Layouts/MainLayout";

let gameParams = { ...defaultParams };

class reactionGame extends React.Component {
  runNewGame = () => {
    this.setState({
      ...initialGameState(),
      gameover: false,
      start: true,
      targetsCnt: 0,
    });
    this.makeGameFlow(this.gameOptions());
  };

  gameOptions = () => ({
    probability: this.state.probability,
    periodMsec: gameParams.periodMsec,
  });

  makeGameFlow = (options) => {
    if (this.state.life === 0) {
      gameParams = { ...defaultParams };
      const score = this.state.score;
      this.setState({
        ...initialGameState(),
        gameover: true,
        lastscore: this.state.score,
      });
      return false;
    }
    let gameIterator = this.targetGenerate(options);
    setTimeout(() => {
      clearInterval(gameIterator);
      options.periodMsec -= gameParams.difficultStepMsec;
      options.probability += gameParams.difficultStepProbability;
      this.makeGameFlow(options, this);
    }, gameParams.difficultIntervalMsec);
  };

  targetGenerate = ({ probability, periodMsec }) => {
    return setInterval(() => {
      if (Math.random() * 100 <= probability) {
        const xpos =
          Math.random() * (gameParams.fieldWidth - gameParams.targetWidth);
        const ypos =
          Math.random() * (gameParams.fieldHeight - gameParams.targetHeight);
        this.setState({
          targets: [
            ...this.state.targets,
            <Target
              id={this.state.targetsCnt}
              key={this.state.targetsCnt}
              coordinate={{ xpos, ypos }}
              clickHandler={this.clickTarget}
              targetFired={this.targetFired}
            />,
          ],
          targetsCnt: ++this.state.targetsCnt,
        });
      }
    }, periodMsec);
  };

  clickTarget = (id) => {
    console.log(id);
    const _targets = [...this.state.targets];
    _targets.reduce((acc, curr, i, arr) => {
      if (curr.props.id === id) {
        arr.splice(i, 1);
        this.setState({
          score: ++this.state.score,
          targets: _targets,
        });
      }
    }, _targets[0]);
  };

  targetFired = () => {
    const life = this.state.life > 0 ? this.state.life - 1 : 0;
    this.setState({ life: life });
  };

  constructor(props) {
    super(props);
    this.state = { ...initialGameState(), start: false };
  }

  render() {
    return (
      <MainLayout>
        <div>
          <div style={panelStyle}>
            {this.state.gameover !== true &&
              this.state.start === true &&
              `Попыток осталось: ${this.state.life} Попаданий: ${this.state.score}`}
          </div>
          <div className={classes.gameField} style={gameField}>
            {this.state.start === false && (
              <div style={messageStyle} onClick={() => this.runNewGame()}>
                <span style={{ cursor: "pointer" }}>Начать новую игру</span>
              </div>
            )}

            {this.state.gameover === true && (
              <div style={messageStyle}>
                <div>Мишеней сбито: {this.state.lastscore}</div>
                <div onClick={() => this.runNewGame()}>
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Играть еще
                  </span>
                </div>
              </div>
            )}

            {this.state.targets}
          </div>
        </div>
      </MainLayout>
    );
  }
}

export default reactionGame;
