document.addEventListener('DOMContentLoaded',() => {
  console.log('Test');

  const gridArea = document.getElementById('gridSect');
  let gridArray = [];
// create a large grid over the album imageGrid
// This will be the baseline at the start of the game
  const imageGrid = new Object();

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
    console.log(gridArray);
    setInterval(function () {
      let rand = Math.floor(Math.random()*100);
      console.log(rand);
      const element = gridArray[rand];
      console.log(element);
      element.classList.remove('block');
      element.classList.add('blockInv');
    }, 1000);
  }

  imageGrid.populate();
  imageGrid.deleteRand();
});
