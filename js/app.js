document.addEventListener('DOMContentLoaded',() => {
  const gridArea = document.getElementById('gridSect');
  let gridArray = [];
  let removed = [];
  let timer = 0;
  let songCount = 3;
  let songName = '';
  let songMax = 5;
  let scores = [];
  let dispSong = parseInt(songCount) + 1;
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

  const imageGrid = new Object();
  const leaderboard = new Object();

  imageGrid.guessBtn = document.getElementById('guessBtn');
  imageGrid.nextSong = () => {
    $('.row').remove();
    gridArray = [];
    removed = [];
    console.log('Next Song');
    clearInterval(timer);
    imageGrid.populate();
  }
  // create a large grid over the album imageGrid
  // This will be the baseline at the start of the game
  // also calls get song to display img and sound
  imageGrid.populate = () => {
    for (let i = 0;i <10;i++){
      const newBlock = document.createElement('div');
      newBlock.setAttribute('class','row');
      gridArea.appendChild(newBlock);
      for (var j = 0; j< 10;j++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class','block');
        newBlock.appendChild(newElement);
        gridArray.push(newElement);
      }
    }
    imageGrid.getSong();
  }

  // generates a random number and adds a new song from the song array.
  imageGrid.getSong = () => {
    let rand = Math.floor(Math.random()*songArray.length);
    let randArtist = songArray[rand][0];
    let randSongName = songArray[rand][1];
    let randSongImg = songArray[rand][2];
    let randSongMp3 = songArray[rand][3];
    const stage = document.getElementById('stage');
    const music = document.getElementById('musicPlayer');
    const cover = document.getElementById('albumArea');
    const songname = document.getElementById('songNameTest');
    music.setAttribute("src","mp3/"+randSongMp3);
    cover.setAttribute("src",randSongImg);
    songName = randSongName;
    stage.innerHTML = "Song " + dispSong + " of " + songMax;
    music.play();
    imageGrid.deleteRand();
  }

  // randomly select block from grid, remove it
  // will need 2d array of all block objects
  // function on loop set to time delay
  imageGrid.deleteRand= () => {
    timer = setInterval(function () {
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
    songCount++;
    let message = document.getElementById('score');
    message.innerHTML = 'Score: ' + score;
    let guess = document.getElementById('guess');
    if (guess.value.toLowerCase() == songName){
      console.log('Correct!');
      score++;
      message.innerHTML = 'Score: ' + score;
    } else {
      console.log('Incorrect!');
    }
    if (songCount === songMax){
      console.log(score);
      const name = prompt('Enter Your Name');
      localStorage.setItem(name,score);
    }
    setTimeout(function(){
      imageGrid.nextSong();
    }, 1000);
  }

  // Sorts array by score value and prints out to Leaderboard

  leaderboard.getScores = () => {
    console.log('working');
    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      var value = localStorage[key];
      var keypair = [];
      keypair.push(key);
      keypair.push(value);
      scores.push(keypair);
    }
    console.log(scores);
  }

  leaderboard.printScores = () => {
    leaderboard.getScores();
    scores.sort(function(a,b){
      if (a[1] < b[1]){
        return 1;
      } else if (a[1] > b[1]) {
        return -1;
      } else{
        return 0;
      }
    });
    console.log(scores);
    for (var i = 0; i < 3; i++){
      var node = document.createElement("li");
      var textnode = document.createTextNode(scores[i]);
      node.appendChild(textnode);
      document.getElementById("lead").appendChild(node);
    }
  }
  if(document.title == 'Music Quiz'){
    imageGrid.populate();
    imageGrid.guessBtn.addEventListener('click',(e) => {
        imageGrid.checkAnswer();
    });
  } else {
    leaderboard.printScores();
  }

});
