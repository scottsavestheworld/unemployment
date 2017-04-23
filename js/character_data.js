const CHARACTER_DATA = {
  rightCharacter: {
    id                 : "scott",
    name               : "Scott",
    head               : "img/scott/head.svg",
    eyes               : "img/scott/eyes_open_focused.svg",
    mouth              : "img/scott/mouth.svg",
    leftArm            : "img/scott/arm.svg",
    rightArm           : "img/scott/arm.svg",
    body               : "img/scott/body.svg",
    menuColor          : "#0C3550",
    initialActionState : "unaware",
    hitpoints          : 5200,
    hitpointPrefix     : "$",
    hitpointLabel      : "Savings",
    autoAttack         : false,
    ultimate           : { name: "SquareSpace", damage: [9999, 9999], restore: [0, 0], action: "ultimate", duration: 3000 },
    turnsForUltimate   : 10,
    turnsToUltimate    : 7,
    moves         : {
      jobHunt: {
        name: "Job Hunt", result: [
          { name: "Distribute Resumes", damage: [10, 20], restore: [0, 0],     action: "attacking" },
          { name: "Talk to Recruiters", damage: [10, 20], restore: [0, 0],     action: "attacking" },
          { name: "Update Portfolio",   damage: [10, 20], restore: [0, 0],     action: "attacking" },
          { name: "Spam Job Boards",    damage: [10, 20], restore: [0, 0],     action: "attacking" },
          { name: "Go on Interviews",   damage: [20, 50], restore: [-50, -5],  action: "attacking" }
        ]
      },
      sideWork: {
        name: "Side Work", result: [
          { name: "Design a Website",        damage: [5, 10],   restore: [1000, 3000], action: "thinking", duration: 2000 },
          { name: "Create Graphical Assets", damage: [5, 10],   restore: [500, 2000],  action: "thinking", duration: 2000 },
          { name: "Creative Writing",        damage: [5, 10],   restore: [100, 1000],  action: "thinking", duration: 2000 },
          { name: "Help with Branding",      damage: [5, 10],   restore: [500, 1500],  action: "thinking", duration: 2000 },
          { name: "No Work Available",       damage: [-25, -1], restore: [-10, -50],   action: "sad",      duration: 2000 },
          { name: "Job Market is Fickle",    damage: [-25, -1], restore: [-10, -50],   action: "sad",      duration: 2000 },
          { name: "Attempt Prostitution",    damage: [-50, -5], restore: [-10, -50],   action: "sad",      duration: 2000 }
        ]
      },
      dink: {
        name: "Dink", result: [
          { name: "Play Video Games",  damage: [-10, 0], restore: [0, 0],    action: "zoned",    duration: 3000 },
          { name: "Daydream",          damage: [-10, 0], restore: [0, 0],    action: "zoned",    duration: 3000 },
          { name: "Watch TV",          damage: [-10, 0], restore: [0, 0],    action: "zoned",    duration: 3000 },
          { name: "Take a Nap",        damage: [-10, 0], restore: [0, 0],    action: "sleeping", duration: 3000 },
          { name: "Hang with Friends", damage: [-10, 0], restore: [-100, 0], action: "happy",    duration: 3000 }
        ]
      }
    }
  },
  leftCharacter: {
    id                 : "unemployment",
    name               : "Unemployment",
    head               : "img/unemployment/head.svg",
    eyes               : "img/unemployment/eyes_open_focused.svg",
    mouth              : "img/unemployment/mouth.svg",
    leftArm            : "img/unemployment/arm.svg",
    rightArm           : "img/unemployment/arm.svg",
    body               : "img/unemployment/body.svg",
    menuColor          : "#424E56",
    initialActionState : "ready",
    hitpoints          : 365,
    hitpointPrefix     : "",
    hitpointLabel      : "Days Remaining",
    autoAttack         : true,
    ultimate           : { name: "Income Tax", damage: [7000, 9000], restore: [0, 0], action: "ultimate", duration: 3000 },
    turnsForUltimate   : -1,
    turnsToUltimate    : 0,
    moves        : {
      auto: {
        name: "auto", result: [
          { name: "Mortgage",           damage: [3200, 3200], restore: [0, 0],  action: "attacking" },
          { name: "Car Loan",           damage: [450, 450],   restore: [0, 0],  action: "attacking" },
          { name: "Car Insurance",      damage: [150, 150],   restore: [0, 0],  action: "attacking" },
          { name: "Electricity Bill",   damage: [80, 300],    restore: [0, 0],  action: "attacking" },
          { name: "Natural Gas Bill",   damage: [30, 200],    restore: [0, 0],  action: "attacking" },
          { name: "Groceries",          damage: [10, 200],    restore: [0, 0],  action: "attacking" },
          { name: "Surprise Expenses",  damage: [0, 800],     restore: [0, 0],  action: "attacking" },
          { name: "Family Emergency",   damage: [0, 1000],    restore: [5, 50], action: "attacking" }
        ]
      }
    }
  }
};
