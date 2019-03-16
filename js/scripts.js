var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

// This Object contains the game-description quizzes, and an object for each one of the 4 quizzes that contains: the possible choice options, the quiz solutions/explanations and an array of booleans that establish if the answer is the right one (true) or not (false).
const gameDescriptions = {
  description: [
    "Sauron knows that the ring is somewhere in the middle-earth. Select the section with an id of #middle-earth. Which spell Sauron should use to begin the search? (Click to choice)",
    "Sauron has to find  who brings the ring, voices are that a fellowship of people is bringing it. But who are them? Select all span tags with the class of fellowship-member.",
    "The fellowship of the ring is so wise that never refer to the ring as a 'ring', find all the way they use to describe it that are <em> tags! (Click to choice)",
    "Sauron knows now how that vapid fellowship call the ring. He knows for sure that the hobbit named Frodo carries it. Help Sauron find Frodo before he reachs mount Doom and finally get the Ring!!! Select a <i> tag with the id of 'baggins'. (Click to choice, you have only one chance this time!)"
  ],

  gameQuiz0: {
    option: [
      'const middleEarth<wbr>= document.getElementsBy<wbr>ClassName("middle-earth");',
      'const middleEarth <wbr> = document.getElement<wbr>ById("#middle-earth");',
      'const middleEarth <wbr>= document.querySelector<wbr>("middle-earth");',
      'const middleEarth<wbr> = document.getElementBy<wbr>Id("middle-earth");'
    ],
    solutions: [
      '("#middle-earth" is not a class! Sauron is very uspet with your choice! Choose a better spell!)',
      "(You don 't need the hash sign with this method! Sauron howls in the dark for the frustration! Use this spell properly!)",
      "(No way! This method needs the complete selector, so if you are searching an id you need to include the hash sign (#). If Sauron had had feet, he would had stomped them on the ground angrily!)",
      "(HAHAH! Sauron is delighted, you did magnificently! The middle-earth is ready to be searched now! Could you think of another spell you could have used?)"
    ],
    rightchoice: [false, false, false, true]
  },
  gameQuiz1: {
    option: [
      'const fellowshipMembers <wbr>= document.querySelectorAll<wbr>("#fellowship-member"); ',
      'const fellowshipMembers<wbr> = document.getElementsBy<wbr>TagName("span");',
      'const fellowshipMembers<wbr> = document.querySelectorAll<wbr>(".fellowship-member");',
      'const fellowshipMembers<wbr> = document.querySelector<wbr>(".fellowship-member");'
    ],
    solutions: [
      "(Is that the simble of class? Hum...Sauron is looking backward, giving you the cold shoulders. Find a spell that select the forementioned class!)",
      '(This spell would select all spans, but we need only that with the class of "fellowship-member", if Sauron had had hands he would have bite his nails from the nervous)',
      '("Because you are a jolly good fellow, for you are a jolly good fellow and so say all of us, and so say all of us!" Good Job! The orcs are playing in tune for your wise choice and so is Sauron!")',
      "(Huhu, that would not query all the members, but just the first one! Sauron need to destroy them all! Find a better spell!)"
    ],
    rightchoice: [false, false, true, false]
  },
  gameQuiz2: {
    option: [
      'const powerfullArtifact <wbr>= document.getElementsBy<wbr>TagName("em");',
      'const powerfullArtifact <wbr>= document.getElementBy<wbr>TagName("em");',
      'const powerfullArtifact <wbr>= document.querySelector<wbr>All("ems");',
      'const powerfullArtifact <wbr> = document.querySelector(".em");'
    ],
    solutions: [
      "(Yup! Sauron is so proud of your spell skills that if he had had hands would have given you the high-five! Well done!)",
      "(Ah! That's a vile trick of that nasty fellowship, there's an 's' missing. Sauron snarls even if he has no mouth!)",
      "(Hum... you need to find all the em, but you won't write it like that! Sauron is burning red with fury! Hurry choice the right spell!)",
      "(Well, em is a tag not a class! Sauron is on the verge of a seizure, hurry find the correct answer!)"
    ],
    rightchoice: [true, false, false, false]
  },
  gameQuiz3: {
    option: [
      'const frodoBaggins<wbr> = document.getElementsBy<wbr>TagName("i")',
      'const frodoBaggins <wbr>= document.querySelector<wbr>("baggins");',
      'const frodoBaggins<wbr> = document.getElementBy<wbr>Id("baggins");',
      'const frodoBaggings<wbr> = document.querySelector<wbr>All("#baggins");'
    ],
    solutions: [
      "(NO! This would select all <i> tag not only the one with the id of baggings, Frodo had launched the ring in the lava, it's too late! Sauron is defeated!)",
      "(ARRGGGGGGGGGHH! You needed the hash sign (#), Frodo made it! He destroyed the ring. Sauron dissolves in a bursting flame)",
      "(YES! YOU DID IT! SAURON WON! The middle-earth is now destined to a fate of darkness and sorrow in which you will serve Sauron for the rest of the Eternity. Congrats on your new endless journey!)",
      '(NO WAY! This would return a nodelist, not a single element. Frodo wins. The ring is destroyed. Sauron fizzles and dissolves")'
    ],
    rightchoice: [false, false, true, false]
  }
};

// Select all the list items that are the quiz possible answers
const gameOptions = document.querySelectorAll(".game-options");
//Select the p that contains the quiz instruction
const description = document.querySelector(".game-description");
//Select the button for the "next" quiz entry
const nextButton = document.querySelector(".next");

// The counter for the 4 quizzes (from 0 to 3) that is used to initialize the game
let index = 0;

//Start the game
createGame(index);

//Generate the Quiz and use the gameDescription object properties to build quiz and answers
function createGame(index) {
  //Change the quiz text description
  description.textContent = gameDescriptions.description[index];
  //Create all the 4 possible answers
  for (let i = 0; i < gameOptions.length; i++) {
    gameOptions[i].innerHTML = gameDescriptions["gameQuiz" + index].option[i];
    // Remove id and classes set on previous quiz (#rightchoice for the right answer, .badchoise for wrong answers)
    gameOptions[i].removeAttribute("id");
    gameOptions[i].classList.remove("badchoice");
    //If this is the right answer  add the  id of #rightchoice..
    if (gameDescriptions["gameQuiz" + index].rightchoice[i] === true) {
      gameOptions[i].setAttribute("id", "rightchoise");
    } else {
      // ... else add the class of .badchoice
      gameOptions[i].classList.add("badchoice");
    }
    //Create a span under the quiz choice with the answer explanation
    const spanSolution = document.createElement("span");
    spanSolution.setAttribute("class", "solution");
    spanSolution.textContent =
      gameDescriptions["gameQuiz" + index].solutions[i];

    gameOptions[i].appendChild(spanSolution);
    //Set a click event listener on each possible choice
    gameOptions[i].addEventListener("click", showSolution);
  }
}

//Show the span with the quiz choice explanation when one of the choices is clicked
function showSolution(e) {
  const target = e.target;

  const solution = target.querySelector(".solution");
  solution.style.display = "block";
  target.classList.add("option-blue");

  if (index === 3 && target.classList.contains("badchoice")) {
    gameOptions.forEach(v => {
      v.removeEventListener("click", showSolution);
      v.classList.add("ending");
    });
  }

  if (target.id === "rightchoise") {
    target.classList.add("option-red");
    // Change middle-earth text section styles depending on the index number
    switch (index) {
      case 0:
        const middleEarth = document.querySelector("#middle-earth");
        middleEarth.classList.add("middle-earth-color");
        break;

      case 1:
        const members = document.querySelectorAll(".fellowship-member");
        members.forEach(v => {
          v.classList.add("members");
        });
        break;

      case 2:
        const ring = document.querySelectorAll("em");
        ring.forEach(v => {
          v.classList.add("colorful-em");
        });
        break;

      case 3:
        const sauronWin = document.body;
        sauronWin.classList.add("sauron-win");
        const image = document.querySelector(".sauron-img");
        image.setAttribute(
          "src",
          "https://s19.postimg.cc/bg0b9a8yb/sauronwhite.png"
        );
        gameOptions.forEach(v => {
          v.removeEventListener("click", showSolution);
          v.classList.add("ending");
        });
        break;
    }
    if (index !== 3) {
      nextButton.removeAttribute("disabled");
      nextButton.addEventListener("click", showQuiz);
    }
  }
}

//Switch to the next quiz section
function showQuiz() {
  index += 1;

  gameOptions.forEach(v => {
    v.classList.remove("option-blue");
    v.classList.remove("option-red");
  });
  nextButton.removeEventListener("click", showQuiz);
  nextButton.setAttribute("disabled", true);
  description.classList.toggle("description-red");
  createGame(index);
}

//Set an event listener on the reset button
const reset = document.querySelector(".reset");

reset.addEventListener("click", resetGame);

//When reset button is clicked restart the game and remove all styles on the middle-earth tect section
function resetGame() {
  index = 0;

  document.body.classList.remove("sauron-win");
  gameOptions.forEach(v => {
    v.classList.remove("ending");
    v.classList.remove("option-blue");
    v.classList.remove("option-red");
  });

  const image = document.querySelector(".sauron-img");
  image.setAttribute("src", "https://s19.postimg.cc/3n9nhbaoz/sauron.png");

  const middleEarth = document.querySelector("#middle-earth");
  middleEarth.classList.remove("middle-earth-color");

  const members = document.querySelectorAll(".fellowship-member");
  members.forEach(v => {
    v.classList.remove("members");
  });

  const ring = document.querySelectorAll("em");
  ring.forEach(v => {
    v.classList.remove("colorful-em");
  });
  createGame(index);
}
