class App {
  constructor(dataObject = {}) {
    this.element = document.body;

    this.characters = {
      leftCharacter    : new Character(dataObject.leftCharacter),
      rightCharacter   : new Character(dataObject.rightCharacter),
    };

    this.parts = {
      stage               : $$.element("main", "stage"),
      battleground        : $$.element("section", "battleground"),
      leftBattleground    : $$.element("div", "battleground_left"),
      rightBattleground   : $$.element("div", "battleground_right"),
      characterStats      : $$.element("section", "character-stats"),
      leftCharacterStats  : $$.element("div", "character-stats_left"),
      rightCharacterStats : $$.element("div", "character-stats_right"),
      characterMenu       : $$.element("div", "character-menu"),
      notification        : $$.element("div", "notification"),
      leftButton          : $$.element("button", "emote-button", "is-left"),
      rightButton         : $$.element("button", "emote-button")
    };

    this.props = {
      currentTurn      : "left",
      leftEmoteCount   : 0,
      rightEmoteCount  : 0
    };

    this.render();
    this.addEvents();
  }

  render() {
    let parts = this.parts;

    this.element.appendChild(parts.stage);
    this.element.appendChild(parts.characterMenu);
    parts.characterMenu.appendChild(parts.leftButton);
    parts.characterMenu.appendChild(parts.rightButton);
    parts.leftButton.innerHTML = "Change Emote";
    parts.rightButton.innerHTML = "Change Emote";

    parts.stage.appendChild(parts.battleground);
    parts.stage.appendChild(parts.characterStats);

    parts.battleground.appendChild(parts.leftBattleground);
    parts.battleground.appendChild(parts.rightBattleground);

    parts.characterStats.appendChild(parts.leftCharacterStats);
    parts.characterStats.appendChild(parts.rightCharacterStats);

    this.addCharacter("left", this.characters.leftCharacter)
      .addCharacter("right", this.characters.rightCharacter);
  }

  addEvents() {
    let leftCharacter   = this.characters.leftCharacter;
    let rightCharacter  = this.characters.rightCharacter;
    let leftEmoteCount  = this.props.leftEmoteCount;
    let rightEmoteCount = this.props.rightEmoteCount;

    this.parts.leftButton.addEventListener("click", function (e) {
      leftEmoteCount ++;
      if (leftEmoteCount >= leftCharacter.emotes.length) { leftEmoteCount = 0 }
      leftCharacter.updateProp("actionState", leftCharacter.emotes[leftEmoteCount]);
      e.preventDefault();
    });
    this.parts.rightButton.addEventListener("click", function (e) {
      rightEmoteCount ++;
      if (rightEmoteCount >= rightCharacter.emotes.length) { rightEmoteCount = 0 }
      rightCharacter.updateProp("actionState", rightCharacter.emotes[rightEmoteCount]);
      e.preventDefault();
    });
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
        this.parts[`${position}CharacterStats`].appendChild(character.parts.statsBox.element);
      }
    }
    return this;
  }

  startTurn(position) {

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
}
