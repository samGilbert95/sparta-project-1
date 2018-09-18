document.addEventListener('DOMContentLoaded',() => {
  //============================VARIABLES=====================
  const gridArea = document.getElementById('gridSect');
  const success = document.getElementById('correct');
  const fail = document.getElementById('wrong');
  const guess = document.getElementById('guess');
  const back = document.getElementById('gameBack');
  const scoreAnim = document.getElementById('score');
  let gridArray = [];
  let removed = [];
  let usedSong = '';
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
    ["Gorillaz","humility","images/gorillaz.jpg","gorillaz.mp3"],
    ["U2","beautiful day","images/u2.jpg","day.mp3"],
    ["Gnarls Barkley","crazy","images/crazy.JPG","crazy.mp3"],
    ["Daft Punk","one more time","images/daft.jpg","daft.mp3"],
    ["The Walkmen","the rat","images/rat.jpg","rat.mp3"],
    ["Capital Cities","safe and sound","images/safe.jpg","safe.mp3"],
    ["Pharell Williams","happy","images/happy.jpg","happy.mp3"],
    ["Mark Ronson","uptown funk","images/funk.jpeg","funk.mp3"]
  ];
  let score = 0;
  //============================OBJ DEFINITIONS=====================
  const imageGrid = new Object();
  const leaderboard = new Object();
  const styles = new Object();
  //============================IMAGE GRID==========================

  imageGrid.guessBtn = document.getElementById('guessBtn');
  imageGrid.nextSong = () => {
    $('.row').remove();
    gridArray = [];
    removed = [];
    guess.value = '';
    timecount = 0;
    back.setAttribute('style','animation:none');
    scoreAnim.setAttribute('style','animation:none');
    imageGrid.removeUsed();
    clearInterval(timer);
    imageGrid.populate();
  }

  imageGrid.removeUsed = () => {
    for (let i = 0; i<songArray.length;i++){
      if (usedSong === songArray[i][1]){
        songArray.splice(i,1);
      }
    }
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
    usedSong = randSongName;
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
      timecount++;
    }, 500);
  }

  imageGrid.success = () => {
    back.setAttribute('style','animation:flashCorrect 1s');
    scoreAnim.setAttribute('style','animation:scorePulse 1s');
  }

  imageGrid.fail = () => {
    back.setAttribute('style','animation:flashFail 1s');
  }

  //checks if user input is correct.
  //if answer is correct, score is increased and score flashes green
  //if wrong, display answer and make score flash red
  // delay for 4 seconds then start new song.
  imageGrid.checkAnswer = () => {
    songCount++;
    let message = document.getElementById('score');
    message.innerHTML = 'Score: ' + score;
    if (guess.value.toLowerCase() == songName){
      score = score + (100-(timecount*2));
      imageGrid.success();
      message.innerHTML = 'Score: ' + score;
    } else {
      imageGrid.fail();
    }
    if (songCount >= songMax){
      const name = prompt('Enter Your Name');
      alert('You Scored: ' + score);
      localStorage.setItem(name,score);
      setTimeout(function(){
        document.location.href = 'index.html';
      }, 1000);
    }
    setTimeout(function(){
      imageGrid.nextSong();
    }, 2000);
  }

  // ======================LEADERBOARD===============================

  // Sorts array by score value and prints out to Leaderboard
  leaderboard.fillArray = () => {
    for (var i = 0; i < 5; i++) {
      let key = 'Fill Score';
      let value = 0;
      let keypair = [];
      keypair.push(key);
      keypair.push(value);
      scores.push(keypair);
      //console.log(scores[i]);
    }
  }

  leaderboard.clearBtn = document.getElementById('clearStore');
  leaderboard.getScores = () => {
    for (var i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let value = localStorage[key];
      let keypair = [];
      keypair.push(key);
      keypair.push(value);
      scores.push(keypair);
    }
  }

  leaderboard.clearLead = () => {
    localStorage.clear();
    location.reload();
  }

  leaderboard.printScores = () => {
    leaderboard.getScores();
    let scoreGet = scores;
    console.log(scoreGet);
    scoreGet.sort(function(a,b){
      return b[1] - a[1];
    });
    for (var i = 0; i < 5; i++){
      var node = document.createElement("li");
      var textnode = document.createTextNode(scores[i][0] + ": " + scores[i][1]);
      switch (i) {
        case 0:
        node.setAttribute('class','gold');
        break;
        case 1:
        node.setAttribute('class','silver');
        break;
        case 2:
        node.setAttribute('class','bronze');
        break;
        default:
        break;
      }
      node.appendChild(textnode);
      document.getElementById("lead").appendChild(node);
    }
  }
  if(document.title == 'Music Quiz'){
    imageGrid.populate();
    imageGrid.guessBtn.addEventListener('click',(e) => {
      imageGrid.checkAnswer();
    });
  } else if (document.title == 'Main') {
    leaderboard.fillArray();
    leaderboard.printScores();
    leaderboard.clearBtn.addEventListener('click',(e) => {
      leaderboard.clearLead();
    });
  }

  // =================STYLE BUTTONS======================
  styles.info = document.getElementById('inst');
  styles.infoBack = document.getElementById('returnInfo');
  styles.lead = document.getElementById('leadBtn');
  styles.leadBack = document.getElementById('returnLead');

  styles.showInfo = () => {
    const menuSec = document.getElementsByClassName('menuBtn');
    const content = document.getElementById('instructTest');
    const barrier = document.getElementById('container');
    for (var i = 0; i < menuSec.length; i++) {
      menuSec[i].setAttribute('style','height:0px; margin:0px;');
    }
    barrier.setAttribute('style','visibility:hidden;');
    content.setAttribute('style','visibility:visible');
  };

  styles.returnInfo = () => {
    const menuSec = document.getElementsByClassName('menuBtn');
    const content = document.getElementById('instructTest');
    const barrier = document.getElementById('container');
    for (var i = 0; i < menuSec.length; i++) {
      menuSec[i].setAttribute('style','height:50px; margin:auto; margin-top:35px;');
    }
    barrier.setAttribute('style','visibility:visible;');
    content.setAttribute('style','visibility:hidden');
  };

  styles.showLead = () => {
    const menuSec = document.getElementsByClassName('menuBtn');
    const content = document.getElementById('leadSect');
    const barrier = document.getElementById('container');
    for (var i = 0; i < menuSec.length; i++) {
      menuSec[i].setAttribute('style','height:0px; margin:0px;');
    }
    barrier.setAttribute('style','visibility:hidden;');
    document.getElementById('instructTest').setAttribute('style','margin:0px; height:0px;')
    content.setAttribute('style','visibility:visible');
  };

  styles.loadIn = () => {
    back.setAttribute('style','animation: fadeIn 1s');
  }

  styles.returnLead = () => {
    const menuSec = document.getElementsByClassName('menuBtn');
    const content = document.getElementById('leadSect');
    const barrier = document.getElementById('container');
    for (var i = 0; i < menuSec.length; i++) {
      menuSec[i].setAttribute('style','height:50px; margin:auto; margin-top:35px;');
    }
    barrier.setAttribute('style','visibility:visible;');
    content.setAttribute('style','visibility:hidden');
  };

  styles.info.addEventListener('click',(e) => {
    styles.showInfo();
  });
  styles.infoBack.addEventListener('click',(e) => {
    styles.returnInfo();
  });
  styles.lead.addEventListener('click',(e) => {
    styles.showLead();
  });
  styles.leadBack.addEventListener('click',(e) => {
    styles.returnLead();
  });
});
