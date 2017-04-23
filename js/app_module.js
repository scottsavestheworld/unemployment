class App {
  constructor(dataObject = {}) {
    this.element = document.body;

    this.characters = {
      leftCharacter    : new Character(this, dataObject.leftCharacter),
      rightCharacter   : new Character(this, dataObject.rightCharacter),
    };

    this.parts = {
      stage               : $$.element("main", "stage"),
      battleground        : $$.element("section", "battleground"),
      leftBattleground    : $$.element("div", "battleground_left"),
      rightBattleground   : $$.element("div", "battleground_right"),
      characterStats      : $$.element("section", "character-stats"),
      leftCharacterStats  : $$.element("div", "character-stats_left"),
      rightCharacterStats : $$.element("div", "character-stats_right"),
      narration           : $$.element("section", "narration"),
      narrationElement    : $$.element("div", "narration_element")
    };

    this.linkOpponents();
    this.render();
  }

  render() {
    let parts = this.parts;

    parts.stage.appendChild(parts.battleground);
    parts.stage.appendChild(parts.characterStats);

    parts.battleground.appendChild(parts.leftBattleground);
    parts.battleground.appendChild(parts.rightBattleground);

    parts.characterStats.appendChild(parts.leftCharacterStats);
    parts.characterStats.appendChild(parts.rightCharacterStats);

    parts.stage.appendChild(parts.narration);

    this.addCharacter("left", this.characters.leftCharacter)
      .addCharacter("right", this.characters.rightCharacter);

    this.element.appendChild(parts.stage);

    setTimeout(() => {
      this.startGame();
    }, 2000);
  }

  linkOpponents() {
    if (this.characters.leftCharacter && this.characters.rightCharacter) {
      this.characters.leftCharacter.props.opponent = this.characters.rightCharacter;
      this.characters.rightCharacter.props.opponent = this.characters.leftCharacter;
    }
  }

  addCharacter(position, character = {}) {
    if (position === "left" || position === "right") {
      if (character.isCharacter === true) {
        if (character !== this.characters[`${position}Character`]) {
          this.parts[`${position}Battleground`].innerHTML = "";
          this.parts[`${position}Stats`].innerHTML = "";
          this.props[`${position}Character`] = character;
        }
        this.parts[`${position}Battleground`].appendChild(character.element);
        this.parts[`${position}CharacterStats`].appendChild(character.parts.characterStats.element);
      }
    }
    return this;
  }

  addNarration(narrationElement, duration = 3000) {
    this.parts.narration.innerHTML = "";
    this.parts.narration.appendChild(narrationElement);
    setTimeout(() => {
      this.removeNarration(narrationElement);
    }, duration);
  }
  removeNarration(narrationElement) {
    if (narrationElement.parentNode === this.parts.narration) {
      this.parts.narration.removeChild(narrationElement);
    }
  }

  updateNarration(narrative, isVisible, duration) {
    this.parts.narrationElement.innerHTML = narrative;
    if (isVisible) {
      this.addNarration(this.parts.narrationElement, duration);
    }
  }

  addCharacterMenu(characterMenu) {
    this.parts.stage.appendChild(characterMenu);
  }

  removeCharacterMenu(characterMenu) {
    if (characterMenu.parentNode === this.parts.stage) {
      this.parts.stage.removeChild(characterMenu);
    }
  }

  updateProp(propName, propValue) {
    if (propName) {
      if (this.props[propName] !== propValue) {
        if (this.props.hasOwnProperty(propName)) {
          this.props[propName] = propValue;
        }
      }
      if (this.parts.hasOwnProperty(propName)) {
        this.parts[propName].innerHTML = this.props[propName];
      }
    }
  }

  startGame() {
    this.preloadImages();
    this.updateNarration("Incoming Severence Check!", true, 3000);
    setTimeout(() => {
      this.characters.rightCharacter.updateHitpoints(18904);
      this.characters.leftCharacter.startTurn();
    },1000);
  }

  preloadImages() {
    let i = new Image();
    i.src = "img/battleground.jpg";
  }
}
