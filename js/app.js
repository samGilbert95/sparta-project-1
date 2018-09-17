document.addEventListener('DOMContentLoaded',() => {
  console.log('Test');

  const gridArea = document.getElementById('gridSect');
  let gridArray = [];
  let removed = [];
  let songArray = [
    ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    ["George Ezra","Shotgun","images/shotgun.jpeg","Ezra.mp3"],
    ["Marshmello","Happier","images/Marshmello.png","marsh.mp3"],
    ["Childish Gambino","Feels Like Summer","images/gambino.jpg","gambino.mp3"],
    ["Foster The People","Pumped Up Kicks","images/foster.png","kicks.mp3"],
    ["Gorillaz","Humility","images/gorillaz.jpg","gorillaz.mp3"]
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
    // ["Adele","Rolling In The Deep","images/adele21.png","Adele.mp3"],
  ];

  const imageGrid = new Object();

  imageGrid.getSong = () => {
    let rand = Math.floor(Math.random()*songArray.length);
    console.log(rand);
    let randArtist = songArray[rand][0];
    let randSongName = songArray[rand][1];
    let randSongImg = songArray[rand][2];
    let randSongMp3 = songArray[rand][3];
    const music = document.getElementById('musicPlayer');
    const cover = document.getElementById('albumArea');
    const songname = document.getElementById('songNameTest');
    console.log(randSongName);
    console.log(randSongImg);
    console.log(randSongMp3);
    console.log(music);
    music.setAttribute("src","mp3/"+randSongMp3);
    cover.setAttribute("src",randSongImg);
    songname.innerHTML = randSongName + ' by ' + randArtist;
    music.play();

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
        const test = document.createElement('div');
        test.setAttribute('class','block');
        newBlock.appendChild(test);
        gridArray.push(test);
      }
    }
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

  // adds 4 buttons underneath the grid, one of which is the answer
  // imageGrid.addOptions = () => {
  //
  // }

  imageGrid.populate();
  imageGrid.getSong();
  imageGrid.deleteRand();
});
