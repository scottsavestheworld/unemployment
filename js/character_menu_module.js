class CharacterMenu {
  constructor(dataObject = {}) {
    this.id = dataObject.id ? `${dataObject.id}Menu` : `${Date.now()}Stats`;
    this.element = $$.element("div", "menu", null, this.id);

    this.parts = {
    }

    this.props = {
      autoAttack     : dataObject.autoAttack || false,
      special        : dataObject.special || {},
      turnsToSpecial : dataObject.turnsToSpecial || -1,
      specialReady   : dataObject.specialReady || false,
      moves          : dataObject.attacks || {}
    }

    this._buildParts();
    this.render();
  }

  _buildParts() {
    let moves = this.props.moves;
    for (let move in moves) {
      if (move !== "auto") {
        this.parts[move] = $$.element("div", "move");
        this.parts[move].name = "move";
    }
  }

  render() {
    let parts = this.parts;

    this.element.appendChild(parts.name);
    this.element.appendChild(parts.hitpointBox);

    parts.hitpointBox.appendChild(parts.hitpointLabel);
    parts.hitpointBox.appendChild(parts.hitpointPrefix);
    parts.hitpointBox.appendChild(parts.hitpoints);

    for (let part in this.parts) {
      this.updateProp(prop, this.props[prop]);
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
}
