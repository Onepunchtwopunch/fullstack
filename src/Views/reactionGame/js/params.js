export const defaultParams = {
  fieldWidth: 1000,
  fieldHeight: 530,
  targetWidth: 90,
  targetHeight: 90,
  fieldColor: "#fff",
  targetColor1: "#df9e51",
  targetColor2: "#bf3a36",
  targetShadow1: "0px 0px 22px 2px #845216",
  targetShadow2: "0px 0px 22px 2px #730c0c",
  targetBorderRadius1: "100%",
  probability: 50,
  periodMsec: 650,
  periodForClickMsec: 950,
  difficultStepMsec: 7,
  difficultStepProbability: 4,
  difficultIntervalMsec: 1200,
  lifes: 4,
};

export const initialGameState = () => ({
  targets: [],
  probability: defaultParams.probability,
  life: defaultParams.lifes + 1,
  score: 0,
});
