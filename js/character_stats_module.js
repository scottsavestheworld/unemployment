class CharacterStats {
  constructor(dataObject = {}) {
    this.id = dataObject.id ? `${dataObject.id}Stats` : `${Date.now()}Stats`;
    this.element = $$.element("div", "stats", null, this.id);

    this.parts = {
      name           : $$.element("div", "stats_name"),
      hitpointBox    : $$.element("div", "stats_hitpoint-box"),
      hitpointLabel  : $$.element("div", "stats_hitpoint-label"),
      hitpointPrefix : $$.element("div", "stats_hitpoint_prefix"),
      hitpoints      : $$.element("div", "stats_hitpoints")
    }

    this.props = {
      name           : dataObject.name || "Unknown Contender",
      hitpointLabel  : dataObject.hitpointLabel || "",
      hitpointPrefix : dataObject.hitpointPrefix || "",
      hitpoints      : dataObject.hitpoints || 1
    }

    this.render();
  }

  render() {
    let parts = this.parts;

    this.element.appendChild(parts.name);
    this.element.appendChild(parts.hitpointBox);

    parts.hitpointBox.appendChild(parts.hitpointLabel);
    parts.hitpointBox.appendChild(parts.hitpointPrefix);
    parts.hitpointBox.appendChild(parts.hitpoints);

    for (let prop in this.props) {
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
