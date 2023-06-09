window.onload = function () {
  const body = document.body;
  const gunShot = new Audio(`audio/gun-shot.mp3`);
  const duckHit = new Audio(`audio/duck-falling-w-drop.mp3`);
  const duckQuack = new Audio (`audio/duck-flapping.mp3`)
  let score = 0
  let totalScore = `00000`; 

  body.addEventListener(`click`, () => { gunShot.play(); displayScore(score -= 100); });

  function displayScore(score) {
    totalScore = ``;
    if (score < 0) {score = 0};
    for (let i = 0; i < (5 - score.toString().length); i++) {
        totalScore = totalScore + `0`;
      }
      totalScore += score.toString();
    scoreTracker.textContent = `Score: ${totalScore}`;
    return score;
  }

  console.log(body);

  const duckTracker = document.createElement(`div`);
  const scoreTracker = document.createElement(`div`);
  scoreTracker.classList.add(`nintendoText`)
  duckTracker.classList.add(`nintendoText`);

  duckTracker.style.display = `none`;

  body.appendChild(duckTracker);
  body.appendChild(scoreTracker);
  scoreTracker.textContent = `Score: ${totalScore}`;
  duckTracker.textContent = `5 Ducks Remain`;
 
  // 1. Create a <div> with the class "duck" and add it to the body.  Do this step by step
  // ( 1. create the element

  // const duck = document.createElement(`div`);

  //   2. add a class to the element

  // duck.classList.add(`duck`);

  //   3. append the element to the body )

  // body.appendChild(duck);

  // 2. Next, use setInterval to toggle the "flap" class on the duck every 250 ms (1/4 second)

  // setInterval(flapWings, 250);

  // function flapWings() {
  //   duck.classList.toggle(`flap`);
  // }

  // https://www.w3schools.com/jsref/met_win_setinterval.asp

  // 3. Fantastic!  Now, let's move the duck using CSS "top" and "left". Create
  // a function `moveDuck` that takes a duck object as an argument and sets the
  // "top" and "left" CSS properties.
  // HINT: Use Math.random() * window.innerWidth    for "left"
  //       And Math.random() * window.innerHeight   for "top"
  // DON'T FORGET: You might need to set "top" and "left" to a number of pixels -- e.g., "400px" rather than simply "400".

  function moveDuck(duck) {
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;

    const duckLeftPosition = duck.style.left.slice(0, -2);
    const duckTopPosition = duck.style.top.slice(0, -2);

    // const distanceToTravel = Math.sqrt(Math.pow(Math.abs(duckLeftPosition - left), 2) + Math.pow(Math.abs(duckTopPosition - top), 2))

    const topSpeed = Math.abs(duckTopPosition - top) / window.innerHeight;
    const leftSpeed = Math.abs(duckLeftPosition - left) / window.innerWidth;

    duck.style.transition = `top ${ 2 / topSpeed}s, left ${ 2 / leftSpeed}s`

    // if (Math.abs(duckTopPosition - top) > 300) {
    //   duck.style.transition = `top 3s`
    // }
    // if (Math.abs(duckLeftPosition - left) > 300)
    // { duck.style.transition = `left 3s` };
    
    // if(distanceToTravel<200){
    //   duck.style.transition = `top 1s, left 1s`
    // }
    // if (distanceToTravel >= 200 && distanceToTravel < 400) { 
    //   duck.style.transition = `top 2s, left 2s`
    // }
    // if (distanceToTravel >= 400 && distanceToTravel < 600) { 
    //   duck.style.transition = `top 3s, left 3s`
    // }
    // if (distanceToTravel >= 600) {
    //   duck.style.transition = `top 4s, left 4s`
    //  }

    // if ((duckLeftPosition - left) > 200) {
    //   duck.style.transitionTimingFunction = `ease-in`;
    // }
    
    // console.log(distanceToTravel);

    if ( (duckLeftPosition - left) < 0 ) {
      duck.style.transform = `scaleX(-1)`;
    }
    else if ((duckLeftPosition - left) > 0) {
      duck.style.transform = `scaleX(1)`;
   }

    duck.style.left = `${left}px`;
    duck.style.top = `${top}px`;
  }

  // 4. Try making the duck move to a different location every second (what did we use to do this several lines up??)

  // const setMoveDuck = (duck) => {
  //   setInterval(() => {
  //     moveDuck(duck)
  //   }, 1000);

  // }

  // setInterval(() => {
  // setMoveDuck(duck)
  // }, 1000);

  // 5. Congratulations! Move on to part 2!

  // ---------------------------- PART 2 ---------------------------------

  // 6. Things are getting a bit messy. Let's create
  //    a "function" called createDuck() that does everything in 1-4
  //    and "returns" the duck object

  function createDuck() {
    const duck = document.createElement(`div`);
    duck.classList.add(`duck`);
    body.appendChild(duck);
    setInterval(flapWings, 250);
  // // setInterval(moveDuck(duck), 1000);

    function flapWings() {
      duck.classList.toggle(`flap`);
    }

    // const setMoveDuck = (duck) => {
    
    setInterval( () => { moveDuck(duck)
        }, Math.random() * (2000-1000)+1000);
    
    // setMoveDuck(duck);
    
    duck.addEventListener(`click`, (event) => {
      event.target.classList.add(`shot`);
      // score += 1100;
      displayScore(score += 1100);
      duckHit.play();
      setTimeout(removeDuck, 1000);
    })

    function removeDuck() {
      body.removeChild(duck);
      checkForWinner();
    }
    
    function checkForWinner(){
      const numberOfDucks = body.getElementsByClassName(`duck`).length;
      if (numberOfDucks !== 1) { duckTracker.textContent = `${numberOfDucks} Ducks Remain`; }
      if (numberOfDucks === 1) { duckTracker.textContent = `${numberOfDucks} Duck Remains`; }
      if (numberOfDucks === 0) {
        alert("YOU WIN!!")
      }
    }

    return duck;
  }

  // 7. Now, let's create lots of ducks!  Use a "for" loop to create 5 ducks
  //    using our fancy new createDuck() function

  let startRound = new Audio(`audio/start-round.mp3`);
  
  const startBox = document.createElement(`div`);
  body.appendChild(startBox);
  
  startBox.classList.add(`flex-container`);
  startBox.classList.add(`nintendoText`);
  startBox.style.height = `120px`
  startBox.style.width = `500px`
  startBox.style.backgroundColor = `gray`;
  startBox.style.color = `white`;
  startBox.style.display = `flexbox`;
  startBox.style.margin = `100px auto`
  startBox.style.textAlign = `center`
  startBox.style.padding = `50px`;
  startBox.style.fontSize = `30px`;
  startBox.style.border = `solid 5px darkslategray`;
  startBox.textContent = `Are you ready to hunt some ducks?`

  const startButton = document.createElement(`button`);
  startBox.appendChild(startButton);
  startButton.classList.add(`nintendoText`)
   startButton.style.height = `45px`;
  startButton.style.width = `auto`;
  startButton.style.backgroundColor = `lightslategray`;
  startButton.style.border = `solid 3px darkslategray`
  startButton.style.color = `white`;
  startButton.style.fontSize = `25px`
  startButton.textContent = `START`;
  // startButton.style.display = `block`;



  startButton.addEventListener('click', startGame);

  function startGame() {
    startRound.play();
    startBox.parentElement.removeChild(startBox);
    duckTracker.style.display = `block`;

    for (let i = 1; i <= 5; i++) {
      createDuck();
    }
  }
      // numberOfDucks = body.getElementsByClassName(`duck`).length;

    // while (numberOfDucks > 0) {
    //   setInterval(duckQuack.play(), 2000)
    //   numberOfDucks = body.getElementsByClassName(`duck`).length;
    // }



  // 8. Uh oh, our ducks are overlapping.  Modify createDuck so each time
  //     it creates a duck, it appears in a random location
  // HINT: You may want to create a `randomPosition()` function that you can use
  //       to set the ducks' initial locations and in your `moveDuck()` function;

  // 9. Keep going! Move onto part 3!

  // --------------------------- PART 3 ------------------------------------

  // 11. BOOM. Attach a "click" handler that adds the "shot" class to
  //     the duck when you click on it!

  // 12. After a duck has been clicked on, remove it from the DOM after
  //     a short delay (1 second) Hint Hint...use setTimeout
  //     as for removing the element check out https://dzone.com/articles/removing-element-plain

  // 13. Create a new function named checkForWinner() that reads the DOM
  //     to see if there are any ducks left. (How can we check the DOM for more than one element?, and how can we see how many elements we get back) If not, alert "YOU WIN!"


  // 14. BONUS: The ducks are moving pretty erratically, can you think
  //     of a way to adjust the ducks speed based on how far needs to move?

  // 15. BONUS: Add the "left" and "right" class to the duck based on the
  //     direction the duck is flying and change the way the duck is facing

  // FIN. You win 1 trillion tokens.  Play the day away!
};
