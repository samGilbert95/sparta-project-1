document.addEventListener('DOMContentLoaded',() => {
  const gridArea = document.getElementById('gridSect');
  let gridArray = [];
  let removed = [];
  let songArray = [
    ["Adele","rolling in the deep","images/adele21.png","Adele.mp3"],
    ["George Ezra","shotgun","images/shotgun.jpeg","Ezra.mp3"],
    ["Marshmello","happier","images/Marshmello.png","marsh.mp3"],
    ["Childish Gambino","feels like summer","images/gambino.jpg","gambino.mp3"],
    ["Foster The People","pumped up kicks","images/foster.png","kicks.mp3"],
    ["Gorillaz","humility","images/gorillaz.jpg","gorillaz.mp3"]
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
  ];
  let score = 0;
  let songName = '';

  const imageGrid = new Object();

  imageGrid.guessBtn = document.getElementById('guessBtn');

  // create a large grid over the album imageGrid
  // This will be the baseline at the start of the game
  // also calls get song to display img and sound
  imageGrid.nextSong = () => {
    
  }

  imageGrid.populate = () => {
    for (let i = 0;i <10;i++){
      const newBlock = document.createElement('div');
      newBlock.setAttribute('class','row');
      gridArea.appendChild(newBlock);
      for (var j = 0; j< 10;j++){
        const test = document.createElement('div');
        test.setAttribute('class','block');
        newBlock.appendChild(test);
        gridArray.push(test);
      }
    }
    imageGrid.getSong();
  }

  // generates a random number and adds a new song from the song array.
  imageGrid.getSong = () => {
    let rand = Math.floor(Math.random()*songArray.length);
    let randArtist = songArray[rand][0];
    let randSongName = songArray[rand][1];
    songName = randSongName;
    let randSongImg = songArray[rand][2];
    let randSongMp3 = songArray[rand][3];
    const music = document.getElementById('musicPlayer');
    const cover = document.getElementById('albumArea');
    const songname = document.getElementById('songNameTest');
    music.setAttribute("src","mp3/"+randSongMp3);
    cover.setAttribute("src",randSongImg);
    songname.innerHTML = randSongName + ' by ' + randArtist;
    music.play();
    imageGrid.deleteRand();
  }

  // randomly select block from grid, remove it
  // will need 2d array of all block objects
  // function on loop set to time delay
  imageGrid.deleteRand= () => {
    setInterval(function () {
      let rand = Math.floor(Math.random()*100);
      if (removed.indexOf(rand) == -1) {
        removed.push(rand);
        const element = gridArray[rand];
        element.classList.remove('block');
        element.classList.add('blockInv');
      }
    }, 1000);
  }

  //checks if user input is correct.
  //if answer is correct, score is increased and score flashes green
  //if wrong, display answer and make score flash red
  // delay for 4 seconds then start new song.
  imageGrid.checkAnswer = () => {
    console.log('works');
    let message = document.getElementById('score');
    message.innerHTML = 'Score: ' + score;
    let guess = document.getElementById('guess');
    console.log(guess.value);
    if (guess.value.toLowerCase() == songName){
      score++;
      message.innerHTML = 'Score: ' + score;
    } else {
      console.log('Incorrect!');
    }
    setTimeout(function(){
      imageGrid.nextSong();
    }, 5000);
  }

  imageGrid.populate();
  imageGrid.guessBtn.addEventListener('click',(e) => {
    imageGrid.checkAnswer();
  });
});
