class Character {
  constructor(dataObject = {}) {
    this.isCharacter = true;
    this.id = dataObject.id;
    this.element = $$.element("div", "character", "is-unaware", this.id);

    this.parts = {
      head     : $$.element("div", "character_head", null, null, dataObject.head),
      eyes     : $$.element("div", "character_eyes", null, null, dataObject.eyes),
      mouth    : $$.element("div", "character_mouth", null, null, dataObject.mouth),
      leftArm  : $$.element("div", "character_arm", "left", null, dataObject.leftArm),
      rightArm : $$.element("div", "character_arm", "right", null, dataObject.rightArm),
      body     : $$.element("div", "character_body", null, null, dataObject.body),
      shadow   : $$.element("div", "character_shadow"),
      statsBox : new CharacterStats(dataObject)
    };

    this.props = {
      eyesState     : "open",
      expression    : "focused",
      actionState   : "unaware",
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
  _updateExpression() {
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

  updateProp(propName, propValue) {
    if (propName) {
      if (this.props[propName] !== propValue) {
        if (propName === "actionState") {
          this.element.classList.remove(`is-${this.props.actionState}`);
          if (propValue) {
            this.element.classList.add(`is-${propValue}`);
          }
          this.props.actionState = propValue;
          this._updateExpression();
        } else {
          if (this.props.hasOwnProperty(propName)) {
            this.props[propName] = propValue;
          }
        }
      }
    }
  }
};
