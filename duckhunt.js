window.onload = function() {
  const body = document.body;

  console.log(body);

  const duckTracker = document.createElement(`div`);
  duckTracker.classList.add(`tracker`);
  duckTracker.style.fontSize = `30px`
  duckTracker.style.margin = `20px 30px `
  duckTracker.style.textAlign = `right`
  duckTracker.style.fontFamily = `Kongtext`;
  duckTracker.style.color = `gold`;
  body.appendChild(duckTracker);
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

    const topSpeed = Math.abs(duckTopPosition - top) / window.innerHeight; const leftSpeed = Math.abs(duckLeftPosition - left) / window.innerWidth;

    duck.style.transition = `top ${2/topSpeed}s, left ${2/leftSpeed}s`

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

    const setMoveDuck = (duck) => {
        setInterval(() => {
          moveDuck(duck)
        }, Math.random() * (2000-1000)+1000);
    }
    
    setMoveDuck(duck);
    
    duck.addEventListener(`click`, (event) => {
      event.target.classList.add(`shot`);
      setTimeout(removeDuck, 250);
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

  for (let i = 1; i <= 5; i++)
  {
    createDuck();
  }

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
