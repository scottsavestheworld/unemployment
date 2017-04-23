class Character {
  constructor(appModule, dataObject = {}) {
    this.owner       = appModule;
    this.isCharacter = true;
    this.id          = dataObject.id;
    this.element     = $$.element("div", "character", "is-unaware", this.id);

    this.parts = {
      head          : $$.element("div", "character_head", null, null, dataObject.head),
      eyes          : $$.element("div", "character_eyes", null, null, dataObject.eyes),
      mouth         : $$.element("div", "character_mouth", null, null, dataObject.mouth),
      leftArm       : $$.element("div", "character_arm", "left", null, dataObject.leftArm),
      rightArm      : $$.element("div", "character_arm", "right", null, dataObject.rightArm),
      body          : $$.element("div", "character_body", null, null, dataObject.body),
      shadow        : $$.element("div", "character_shadow"),
      stats         : new CharacterStats(this),
      characterMenu : new CharacterMenu(this)
    };

    this.props = {
      eyesState       : "open",
      expression      : "focused",
      actionState     : "unaware",
      opponent        : null,
      name            : dataObject.name           || "Unknown Contender",
      hitpointLabel   : dataObject.hitpointLabel  || "",
      hitpointPrefix  : dataObject.hitpointPrefix || "",
      hitpoints       : dataObject.hitpoints      || 1,
      autoAttack      : dataObject.autoAttack     || false,
      special         : dataObject.special        || {},
      turnsForSpecial : dataObject.turnsToSpecial || -1,
      turnsToSpecial  : dataObject.specialReady   || 0,
      moves           : dataObject.moves          || {}
    };

    this.emotes = [
      "unaware",
      "aware",
      "ready",
      "attacking",
      "aware",
      "worried",
      "injured",
      "aware",
      "thinking"
    ];

    this.render();
    this._comeAlive();
  }

  render() {
    let parts = this.parts;

    parts.head.appendChild(parts.eyes);
    parts.head.appendChild(parts.mouth);

    this.element.appendChild(parts.shadow);
    this.element.appendChild(parts.rightArm);
    this.element.appendChild(parts.body);
    this.element.appendChild(parts.head);
    this.element.appendChild(parts.leftArm);

    this.parts.characterMenu.buildParts();
    this.parts.characterMenu.render();
    this.parts.stats.render();
  }

  _comeAlive() {
    setTimeout(() => {
      this.element.classList.add("is-breathing");
    }, $$.random(0, 1000));

    setTimeout(() => {
      this._blink();
    }, $$.random(3000, 7000));
  }

  _blink() {
    this._updateEyes(true);
    setTimeout(() => { this._updateEyes(); }, 50);
    setTimeout(() => { this._blink()}, $$.random(3000, 7000));
  }
  updateExpression() {
    let eyesState = "open";
    let expression = "focused";
    switch (this.props.actionState) {
      case "ready":
      case "attacking":
        expression = "angry";
        break;
      case "worried":
        expression = "worried";
        break;
      case "injured":
        eyesState = "wincing";
        expression = "angry";
        break;
      case "thinking":
        eyesState = "blinking";
        break;
    }

    this.props.eyesState = eyesState;
    this.props.expression = expression;
    this._updateEyes();
  }

  _updateEyes(isBlinking) {
    let eyesState   = isBlinking && this.props.actionState !== "injured" ? "blinking" : this.props.eyesState;
    let expression = this.props.expression;
    this.parts.eyes.image.src = `img/${this.id}/eyes_${eyesState}_${expression}.svg`;
  }

  startTurn() {
    setTimeout(() => {
      this.updateActionState("ready");
      if (this.props.autoAttack) {
        setTimeout(() => {
          if (this.props.turnsToSpecial > 0) {
            this.props.turnsToSpecial --;
          } else if (this.props.turnsToSpecial === 0) {
            this.doMove(this.props.special);
            this.props.turnsToSpecial = this.props.turnsForSpecial;
          } else {
            this.getRandomMove(this.props.moves.auto.result);
          }
        }, 2000);
      } else {
        this.owner.addCharacterMenu(this.parts.characterMenu.element);
      }
    }, 2000);
  }

  getRandomMove(moveOptions) {
    let totalMoveOptions = moveOptions.length;
    let moveOptionNumber = $$.random(1, totalMoveOptions) - 1;
    if (moveOptionNumber > -1) {
      this.doMove(moveOptions[moveOptionNumber]);
    }
  }

  doMove(move) {
    this.updateActionState(move.action);
    this.props.opponent.updateActionState("worried");
    this.owner.removeCharacterMenu(this.parts.characterMenu.element);
    setTimeout(() => {
      this.updateHitpoints(move.restore);
      this.props.opponent.updateHitpoints(-move.damage);
      this.props.opponent.startTurn();
    }, 1000);
    console.log(move.name);
  }

  updateHitpoints(amount) {
    this.props.hitpoints += amount;
    this.parts.stats.updatePart("hitpoints", this.props.hitpoints);
    if (amount >= 0) {
      this.updateActionState("");
    } else {
      this.updateActionState("injured");
      setTimeout(() => {
        if (this.props.hitpoints <= 0) {
          this.props.opponent.updateActionState("victorious");
        } else {
          this.updateActionState("");
        }
      }, 1000);
    }

  }

  updateActionState(actionState) {
    this.element.classList.remove(`is-${this.props.actionState}`);
    this.element.classList.add(`is-${actionState}`);
    this.props.actionState = actionState;
    this.updateExpression();
  }
};
