## Sparta Project 1


### Description
---
This project tasked me with creating a game which tested the skills which we had been developing in the first 3 weeks of our training

### Tech used
---
##### Languages
This project utilised basic HTML5 and CSS3 to estabish page structure and page styling respectively. Javascript was used to manage game logic. Git was used to traverse file structures and connect with GitHub
##### Environments
The majority of the programming was done inside the Atom text editor. MacDown was used in the creation of this ReadMe. GitHub was used to establish development branches and version control. The terminal was also used to traverse branches and set up live test servers.

### Challenges
---
As a part of styling the main page, I decided to move as many seperate html pages into the Index as possible. This presented several challenges in fitting all of the elements on the screen, and required that I shrink elements which were not in use.

### Takeaways
---
In general, I am surprised by how fast progress was on this project. In using trello and designing mockup designs before begining the assignment, I was able to think clearly and carefully about what needed to be done. This meant that there was less time spent working on trivial persuits or wondering what to do next.

### GitHub links
GitHub Repo: <https://github.com/samGilbert95/sparta-project-1/>

Github Pages: <https://samgilbert95.github.io/sparta-project-1/>

###Codeblocks
---
##### HTML Example Code
###### Leaderboard In Index
```html
   <section id="menu">
    <section id="container">
      <h1 class="menuBtn"> Music Quiz</h1>
      <a href="game.html" class="menuBtn">Game</a>
      <a id="inst" class="menuBtn">Instructions</a>
      <a id="leadBtn"class="menuBtn">Leaderboard</a>
       <!-- href="lead.html"  -->
      <section id="instructTest">
        <h3 class="sectionHead">Instructions</h3>
        <div>
          <p>When the page loads, You will be presented with a
          randomly generated song. In order to score a point,
          you will need to guess the name of the song correctly</p>
        </div>
        <div>
          <p> As time passes, pieces of the album cover will be
          revealed.However, the longer you wait, the less points you
          will score.</p>
        </div>
        <div>
          <p>When you're sure of your answer, press the button to
          stop the timer and get your points. A wrong answer is 0
          points so think carefully</p>
        </div>
        <a id='returnInfo'> I understand </a>
      </section>
      <section id="leadSect">
        <h3 class="sectionHead">Leaderboard</h3>
        <ul id="lead">

        </ul>
        <content id="leadBtns">
          <a id="returnLead">Back</a>
          <a id="clearStore"> Clear Leaderboard</a>
        </content>
      </section>
    </section>
  </section>
```
##### CSS Example Code
###### Fullscreen Menu Video
```css
#myVideo{
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
}
```
###### Animation Examples
```css
@-webkit-keyframes flashCorrect {
	0% { background-color: lightgray; }
	50% { background-color: green; }
	100% { background-color: lightgray; }
}

@-webkit-keyframes scorePulse {
	0% { font-size: 1.3em;}
	50% { font-size: 1.6em; }
	100% { font-size: 1.3em; }
}
```
##### Javascript Example Code
###### Populate Grid
```javascript
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
```

### Download Instructions
----
These instructions assume that the user has a GitHub Account and Git installed on their terminal. In case these assumptions are incorrect, resoruces for installation are provided below.

Git Installation:<https://gist.github.com/derhuerst/1b15ff4652a867391f03>

GitHub Signup: <https://services.github.com/on-demand/intro-to-github/create-github-account>

##### Step 1: Clone Repo
Go to <https://github.com/samGilbert95/sparta-project-1> and
##### Step 2:	CD into terminal
Copy the project into the chosen directory using the Git Clone Command

---
###### Author:	Sam Gilbert
