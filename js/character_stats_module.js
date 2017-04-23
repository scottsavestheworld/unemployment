class CharacterStats {
  constructor(character) {
    this.owner = character;
    this.element = $$.element("div", "stats", null, `${character.id}Stats`);

    this.parts = {
      name           : $$.element("div", "stats_name"),
      hitpointBox    : $$.element("div", "stats_hitpoint-box"),
      hitpointLabel  : $$.element("div", "stats_hitpoint-label"),
      hitpointPrefix : $$.element("div", "stats_hitpoint_prefix"),
      hitpoints      : $$.element("div", "stats_hitpoints")
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
      if (this.owner.props.hasOwnProperty(part)) {
        this.updatePart(part, this.owner.props[part]);
      }
    }
  }

  updatePart(partName, partValue) {
    if (partName) {
      if (this.parts.hasOwnProperty(partName)) {
        this.parts[partName].innerHTML = partValue;
      }
    }
  }
}
