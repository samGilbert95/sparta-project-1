document.addEventListener('DOMContentLoaded',() => {
  //============================VARIABLES=====================
  const gridArea = document.getElementById('gridSect');
  const success = document.getElementById('correct');
  const fail = document.getElementById('wrong');
  let gridArray = [];
  let removed = [];
  let timer = 0;
  let songCount = 0;
  let timecount = 0;
  let songName = '';
  let songMax = 5;
  let scores = [];
  let dispSong = 0;
  let songArray = [
    ["Adele","rolling in the deep","images/adele21.png","Adele.mp3"],
    ["George Ezra","shotgun","images/shotgun.jpeg","Ezra.mp3"],
    ["Marshmello","happier","images/Marshmello.png","marsh.mp3"],
    ["Childish Gambino","feels like summer","images/gambino.jpg","gambino.mp3"],
    ["Foster The People","pumped up kicks","images/foster.png","kicks.mp3"],
    ["Gorillaz","humility","images/gorillaz.jpg","gorillaz.mp3"]
    ["U2","beautiful day","images/u2.jpg","day.mp3"],
    ["Gnarls Barkley","crazy","images/crazy.JPG","crazy.mp3"],
    ["Daft Punk","one more time","images/daft.jpg","daft.mp3"],
    ["The Walkmen","the rat","images/rat.jpg","rat.mp3"],
    ["Capital Cities","safe and sound","images/safe.jpg","safe.mp3"],
    ["Pharell Williams","happy","images/happy.jpg","happy.mp3"],
    ["Mark Ronson","uptown funk","images/funk.jpeg","funk.mp3"],
  ];
  let score = 0;
  //============================OBJDEFINITIONS=====================
  const imageGrid = new Object();
  const leaderboard = new Object();

  //============================IMAGEGRID==========================

  imageGrid.guessBtn = document.getElementById('guessBtn');
  imageGrid.nextSong = () => {
    $('.row').remove();
    gridArray = [];
    removed = [];
    timecount = 0;
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
    success.setAttribute('style','visibility:hidden');
    fail.setAttribute('style','visibility:hidden');
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
    dispSong++;
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
      console.log(timer);
      timecount++;
    }, 1000);
  }

  imageGrid.success = () => {
    success.setAttribute('style','visibility:visable');
  }

  imageGrid.fail = () => {
    fail.setAttribute('style','visibility:visable');
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
      score = score + (100-(timecount*3));
      imageGrid.success();
      message.innerHTML = 'Score: ' + score;
    } else {
      console.log('Incorrect!');
      imageGrid.fail();
    }
    if (songCount >= songMax){
      console.log(score);
      const name = prompt('Enter Your Name');
      localStorage.setItem(name,score);
      setTimeout(function(){
        document.location.href = 'index.html';
      }, 10);
    }
    setTimeout(function(){
      imageGrid.nextSong();
    }, 1000);
  }

  // ======================LEADERBOARD===============================

  // Sorts array by score value and prints out to Leaderboard
  leaderboard.clearBtn = document.getElementById('clearStore');
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

  leaderboard.clearLead = () => {
    localStorage.clear();
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
    for (var i = 0; i < localStorage.length; i++){
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
  } else if (document.title == 'Leaderboard') {
    leaderboard.printScores();
    leaderboard.clearBtn.addEventListener('click',(e) => {
        leaderboard.clearLead();
    });
  }

});
