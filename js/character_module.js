class Character {
  constructor(appModule, dataObject = {}) {
    this.owner       = appModule;
    this.isCharacter = true;
    this.id          = dataObject.id;
    this.element     = $$.element("div", "character", "is-unaware", this.id);

    this.props = {
      eyesState        : "open",
      expression       : "focused",
      mouthState       : "neutral",
      actionState      : "unaware",
      opponent         : null,
      menuColor        : dataObject.menuColor        || "#888",
      name             : dataObject.name             || "Unknown Contender",
      hitpointLabel    : dataObject.hitpointLabel    || "",
      hitpointPrefix   : dataObject.hitpointPrefix   || "",
      hitpoints        : dataObject.hitpoints        || 1,
      autoAttack       : dataObject.autoAttack       || false,
      ultimate         : dataObject.ultimate         || {},
      ultimateStart    : dataObject.ultimateStart    || null,
      ultimateCharge   : dataObject.ultimateCharge   || 0,
      moves            : dataObject.moves            || {}
    };

    this.parts = {
      head               : $$.element("div", "character_head", null, null, dataObject.head),
      eyes               : $$.element("div", "character_eyes", null, null, dataObject.eyes),
      mouth              : $$.element("div", "character_mouth", null, null, dataObject.mouth),
      leftArm            : $$.element("div", "character_arm", "left", null, dataObject.leftArm),
      rightArm           : $$.element("div", "character_arm", "right", null, dataObject.rightArm),
      body               : $$.element("div", "character_body", null, null, dataObject.body),
      shadow             : $$.element("div", "character_shadow"),
      characterNarration : $$.element("span", "character-narration"),
      characterStats     : new CharacterStats(this),
      characterMenu      : new CharacterMenu(this)
    };

    this.parts.characterStats.element.style.backgroundColor = this.props.menuColor;
    this.parts.characterNarration.style.backgroundColor = this.props.menuColor;
    this.render();
    this.comeAlive();
    this.updateActionState(dataObject.initialActionState);
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
    this.parts.characterStats.render();
  }

  comeAlive() {
    setTimeout(() => {
      this.element.classList.add("is-breathing");
    }, $$.random(0, 1000));

    setTimeout(() => {
      this.blink();
    }, $$.random(3000, 7000));
  }

  blink() {
    this.updateEyes(true);
    setTimeout(() => { this.updateEyes(); }, 50);
    setTimeout(() => { this.blink()}, $$.random(3000, 7000));
  }

  updateExpression() {
    let eyesState = "open";
    let expression = "focused";
    let mouthState = "neutral";

    switch (this.props.actionState) {
      case "sad":
      case "defeated":
        expression = "worried";
        mouthState = "frowning";
        break;
      case "attacking":
      case "ultimate":
        expression = "angry";
        mouthState = "angry";
        break;
      case "ready":
        expression = "angry";
        mouthState = "frowning";
        break;
      case "worried":
        expression = "worried";
        break;
      case "surprised":
        mouthState = "open";
        break;
      case "battered":
        mouthState = "open";
      case "injured":
        eyesState  = "wincing";
        expression = "angry";
        break;
      case "sleeping":
      case "thinking":
        eyesState = "closed";
        break;
      case "zoned":
        expression = "zoned";
        mouthState = "smiling";
        break;
      case "happy" :
      case "victorious":
        mouthState = "laughing";
        break;
      case "pathetic":
        expression = "sexy";
        mouthState = "sexy";
    }

    this.props.eyesState  = eyesState;
    this.props.expression = expression;
    this.props.mouthState = mouthState;
    this.updateEyes();
    this.updateMouth();
  }

  updateMouth() { this.props.eyesState;
    let mouthState = this.props.mouthState;
    this.parts.mouth.image.src = `img/${this.id}/mouth_${mouthState}.svg`;
  }

  updateEyes(isBlinking) {
    let actionState = this.props.actionState;
    let shouldBlink = actionState !== "injured" && actionState !== "zoned" && actionState !== "battered";
    let eyesState   = isBlinking && shouldBlink ? "closed" : this.props.eyesState;
    let expression  = this.props.expression;
    this.parts.eyes.image.src = `img/${this.id}/eyes_${eyesState}_${expression}.svg`;
  }

  startTurn() {
    setTimeout(() => {
      this.updateActionState("ready");
      if (this.props.autoAttack) {
        setTimeout(() => {
          if (this.props.ultimateCharge !== 100) {
            this.getRandomMove(this.props.moves.auto.result);
          } else {
            this.doMove(this.props.ultimate);
            this.props.ultimateCharge = this.props.ultimateStart;
          }
        }, 2000);
      } else {
        this.parts.characterMenu.updateUltimateCharge();
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
    let duration = move.duration || 1000;
    this.updateActionState(move.action);
    this.props.opponent.updateActionState("worried");
    this.owner.removeCharacterMenu(this.parts.characterMenu.element);
    this.updateNarration(move.name, true);
    this.updateUltimateCharge($$.random(move.ult[0], move.ult[1]));
    setTimeout(() => {
      this.updateHitpoints($$.random(move.restore[0], move.restore[1]));
      this.props.opponent.updateHitpoints(-$$.random(move.damage[0], move.damage[1]));
      this.checkVictoryState();
    }, duration);
  }

  updateHitpoints(amount) {
    this.props.hitpoints += amount;
    if (this.props.hitpoints < 0) {
      this.props.hitpoints = 0;
    }
    this.parts.characterStats.updatePart("hitpoints", this.props.hitpoints);
    if (amount > 0) {
      this.updateActionState("happy");
    }
    else if (amount === 0) {
      this.updateActionState("neutral")
    } else {
      if (-amount < this.props.hitpoints * .2) {
        this.updateActionState("injured");
      } else {
        this.updateActionState("battered");
      }
    }
    this.showHitpointChange(amount)
  }

  updateUltimateCharge(amount) {
    let ultimateCharge = this.props.ultimateCharge;
    if (typeof ultimateCharge === "number") {
      ultimateCharge += amount;

      if (ultimateCharge > 100) {
        ultimateCharge = 100;
      }
      else if (ultimateCharge < 0) {
        ultimateCharge = 0;
      }
      this.props.ultimateCharge = ultimateCharge;
      this.parts.characterMenu.updateUltimateCharge(ultimateCharge);
    }
  }

  checkVictoryState () {
      setTimeout(() => {
      if (this.props.hitpoints === 0) {
        this.updateActionState("defeated");
        this.props.opponent.updateActionState("victorious");
      } else if (this.props.opponent.props.hitpoints === 0) {
        this.updateActionState("victorious");
        this.props.opponent.updateActionState("defeated");
      } else {
        this.updateActionState("neutral");
        this.props.opponent.updateActionState("neutral");
        this.props.opponent.startTurn();
      }
    }, 1000);
  }

  updateActionState(actionState) {
    this.element.classList.remove(`is-${this.props.actionState}`);
    this.element.classList.add(`is-${actionState}`);
    this.props.actionState = actionState;
    this.updateExpression();
  }

  updateNarration(narrative, isVisible, duration) {
    this.parts.characterNarration.innerHTML = narrative;
    if (isVisible) {
      this.owner.addNarration(this.parts.characterNarration, duration);
    }
  }

  showHitpointChange(amount) {
    if (amount !== 0) {
      let secondaryClass = amount > 0 ? "is-adding" : "is-subtracting";
      let prefix = this.props.hitpointPrefix;
      if (amount < 0) { amount = -amount }
      amount = prefix + amount;

      let hitpointChange = $$.element("div", "hitpoint-change", secondaryClass);
      hitpointChange.innerHTML = amount;
      this.element.appendChild(hitpointChange);
      setTimeout(() => {
        this.element.removeChild(hitpointChange);
      }, 3000);
    }
  }
};
