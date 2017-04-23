class CharacterMenu {
  constructor(character) {
    this.owner = character;
    this.element = $$.element("section", "character-menu", null, `${character.id}Menu`);

    this.parts = {};
  }

  buildParts() {
    let moves = this.owner.props.moves;
    for (let move in moves) {
      if (move !== "auto") {
        this.parts[move] = $$.element("div", "character-menu_item");
        this.parts[move].innerHTML = moves[move].name;
        this.parts[move].addEventListener("click", (e) => {
          this.owner.getRandomMove(moves[move].result);
          e.preventDefault();
        });
      }
    }
    this.parts.ultimate = $$.element("div", "character-menu_item", "ultimate");
    this.parts.ultimate.addEventListener("click", (e) => {
      this.owner.doMove(this.owner.props.ultimate);
      this.owner.props.turnsToUltimate = this.owner.props.turnsForUltimate;
      e.preventDefault();
    });
  }

  updateUltimateCharge(ultimateCharge = this.owner.props.ultimateCharge) {
    if (ultimateCharge < 100) {
      this.parts.ultimate.classList.add("is-disabled");
    } else {
      this.parts.ultimate.classList.remove("is-disabled");
    }
    this.parts.ultimate.innerHTML = `Ultimate (${ultimateCharge}%)`
  }

  render() {
    let parts = this.parts;
    for (let part in parts) {
      this.element.appendChild(parts[part]);
    }
  }
}
