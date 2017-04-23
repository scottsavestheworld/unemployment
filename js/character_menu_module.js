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
  }

  render() {
    let parts = this.parts;
    for (let part in parts) {
      this.element.appendChild(parts[part]);
    }
  }
}
