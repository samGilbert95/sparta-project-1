document.addEventListener('DOMContentLoaded',() => {
  console.log('Test');

  const gridArea = document.getElementById('gridSect');
  let gridArray = [];
  let removed = [];
// create a large grid over the album imageGrid
// This will be the baseline at the start of the game
  const imageGrid = new Object();

  imageGrid.populate = () => {
    for (let i = 0;i <5;i++){
      const newBlock = document.createElement('div');
      newBlock.setAttribute('class','row');
      gridArea.appendChild(newBlock);
      for (var j = 0; j< 5;j++){
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
    console.log(gridArray);
    setInterval(function () {
      let rand = Math.floor(Math.random()*25);
      if (removed.indexOf(rand) == -1) {
        removed.push(rand);
        const element = gridArray[rand];
        element.classList.remove('block');
        element.classList.add('blockInv');
      }
      console.log(rand);
      console.log(removed);
    }, 1000);
  }

  imageGrid.populate();
  imageGrid.deleteRand();
});
