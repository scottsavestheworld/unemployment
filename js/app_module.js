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
      narrationElement    : $$.element("div", "narration_element"),
      preGameScreen       : $$.element("section", "pre-game"),
      preGameGreeting     : $$.element("div", "pre-game_greeting"),
      preGameInputPrefix  : $$.element("span", "pre-game_input-prefix"),
      preGameInput        : $$.element("input", "pre-game_input")
    };

    this.linkOpponents();
    this.render();
    this.typeText("Please enter your company's name and press ENTER...", this.parts.preGameGreeting)
      .then(this.initializeGame)
      .catch(function(error){
        console.log("Error: ", error);
      });
  }

  render() {
    let parts = this.parts;

    parts.stage.appendChild(parts.battleground);
    parts.stage.appendChild(parts.characterStats);
    parts.stage.appendChild(parts.preGameScreen);

    parts.battleground.appendChild(parts.leftBattleground);
    parts.battleground.appendChild(parts.rightBattleground);

    parts.characterStats.appendChild(parts.leftCharacterStats);
    parts.characterStats.appendChild(parts.rightCharacterStats);

    parts.stage.appendChild(parts.narration);

    this.addCharacter("left", this.characters.leftCharacter)
      .addCharacter("right", this.characters.rightCharacter);

    this.element.appendChild(parts.stage);

    parts.preGameScreen.appendChild(parts.preGameGreeting);
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

  initializeGame(thisApp) {
    thisApp.parts.preGameScreen.appendChild(thisApp.parts.preGameInputPrefix);
    thisApp.parts.preGameScreen.appendChild(thisApp.parts.preGameInput);
    thisApp.parts.preGameInputPrefix.innerHTML = ">";
    thisApp.parts.preGameInput.focus();

    thisApp.parts.preGameInput.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        let inputValue = thisApp.parts.preGameInput.value || "Your Company";
        thisApp.parts.preGameInput.blur();
        thisApp.characters.rightCharacter.props.ultimate.name = inputValue.toUpperCase();
        thisApp.parts.preGameScreen.classList.add("is-fading-out");
        setTimeout(() => {
          thisApp.startGame();
          thisApp.parts.stage.removeChild(thisApp.parts.preGameScreen);
        }, 2000);
      }
    });
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

  typeText(message, container) {
    let thisApp = this;
    return new Promise((resolve, reject) => {
      let text         = $$.string(message);
      let textLength   = text.length;
      let currentText  = "";
      let currentIndex = 0;

      function addCharacter() {
        if (currentIndex !== textLength) {
          setTimeout(() => {
            container.innerHTML = currentText = (currentText + text[currentIndex]);
            currentIndex ++;
            addCharacter();
          }, $$.random(10, 40));
        } else {
          resolve(thisApp);
        }
      }

      addCharacter();
    });
  }
}
