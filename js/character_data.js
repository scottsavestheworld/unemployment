const CHARACTER_DATA = {
  rightCharacter: {
    id              : "scott",
    name            : "Scott",
    head            : "img/scott/head.svg",
    eyes            : "img/scott/eyes_open_focused.svg",
    mouth           : "img/scott/mouth.svg",
    leftArm         : "img/scott/arm.svg",
    rightArm        : "img/scott/arm.svg",
    body            : "img/scott/body.svg",
    screenPosition  : "right",
    hitpoints       : 18904,
    hitpointPrefix  : "$",
    hitpointLabel   : "Severence",
    autoAttack      : false,
    special         : { name: "SquareSpace", damage: 9999, restore: 0, action: "attacking" },
    turnsForSpecial : 10,
    turnsToSpecial  : 7,
    moves         : {
      jobHunt: {
        name: "Job Hunt", result: [
          { name: "Distribute Resumes", damage: 2, restore: 0,   action: "attacking" },
          { name: "Talk to Recruiters", damage: 3, restore: 0,   action: "attacking" },
          { name: "Update Portfolio",   damage: 4, restore: 0,   action: "attacking" },
          { name: "Spam Job Boards",    damage: 3, restore: 0,   action: "attacking" },
          { name: "Go on Interviews",   damage: 5, restore: -50, action: "attacking" }
        ]
      },
      sideWork: {
        name: "Side Work", result: [
          { name: "Design a Website",        damage: 1,   restore: 1000, action: "thinking" },
          { name: "Create Graphical Assets", damage: 1,   restore: 500,  action: "thinking" },
          { name: "Creative Writing",        damage: 1,   restore: 200,  action: "thinking" },
          { name: "Help with Branding",      damage: 1,   restore: 400,  action: "thinking" },
          { name: "Prostitution",            damage: -30, restore: 50,   action: "injured"  }
        ]
      },
      dink: {
        name: "Dink", result: [
          { name: "Play Video Games",  damage: -5, restore: 0,   action: "zoned" },
          { name: "Daydream",          damage: -1, restore: 0,   action: "zoned" },
          { name: "Watch TV",          damage: -2, restore: 0,   action: "zoned" },
          { name: "Take a Nap",        damage: -1, restore: 0,   action: "sleeping" },
          { name: "Hang With Friends", damage: -1, restore: -20, action: "sleeping" }
        ]
      }
    }
  },
  leftCharacter: {
    id              : "unemployment",
    name            : "Unemployment",
    head            : "img/unemployment/head.svg",
    eyes            : "img/unemployment/eyes_open_focused.svg",
    mouth           : "img/unemployment/mouth.svg",
    leftArm         : "img/unemployment/arm.svg",
    rightArm        : "img/unemployment/arm.svg",
    body            : "img/unemployment/body.svg",
    screenPosition  : "left",
    hitpoints       : 365,
    hitpointPrefix  : "",
    hitpointLabel   : "Days Remaining",
    autoAttack      : true,
    special         : { name: "Income Tax", damage: 7339, restore: 0, action: "attacking" },
    turnsForSpecial : -1,
    turnsToSpecial  : 0,
    moves        : {
      auto: {
        name: "auto", result: [
          { name: "Mortgage",    damage: 3200, restore: 0, action: "attacking" },
          { name: "Car Loan",    damage: 450,  restore: 0, action: "attacking" },
          { name: "Electricity", damage: 125,  restore: 0, action: "attacking" },
          { name: "Natural Gas", damage: 150,  restore: 0, action: "attacking" },
          { name: "Groceries",   damage: 200,  restore: 0, action: "attacking" }
        ]
      }
    }
  }
};
