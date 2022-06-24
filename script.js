const locations = [{name: `Beach where you washed ashore`, path: [`Up the left mountain`, `Down the valley`, `Up the right mountain`], choices: [1 , 2, 3]}, 
                 {name: `You arrive at a mountain fork`, path: [`Take the left side path`, `Go up the summit`], choices: [12 , 15]},
                 {name: `You arrive at valley center`, path: [`Go into the cave on the left`, `Continue down the path`], choices:[10,8]},
                 {name: `You arrive at a mountain Fork`, path: [`Head up to the Summit`, `Take the right path down`], choices:[5,4]},
                 {name: `You arrive at small village`}, //win index 4
                 {name: `You arrive at the summit`, path: [`Take the left path`, `Continue over summit and down the mountain`], choices:[6,7]},
                 {name: `You slipped off the path and fell to your death`}, //lose index 6
                 {name: `You see an elf village in the distance and head there`},//win index 7
                 {name: `You meet a local elf who offers you direction towards civilization`, path: [`Ask for the nearest city`, `Ask her to take you to her village`], choices:[9,7]},
                 {name: `You follow her direction and find your way towards the nearest city`}, //win index 9
                 {name: `You follow cave path but arrive at a three way fork`, path: [`Take the left path`, `Take the center cave`, `Take the right path`], choices:[12,11,8]},
                 {name: `You meet a dead end`, path: [`Turn around`], choices:[10]},
                 {name: `You find yourself on the beach`, path: [`Head into the ocrean and see if there are other land nearby`, `Continue following the sea shore`], choices:[14,13]},
                 {name: `You see a port city in your sight and head there`},//win index 13
                 {name: `You are attacked by shark. You strugle and free yourself, but you ultimately bleed to death`}, //lose index 14
                 {name: `You arrive at the summit, however a dragon spots you and kills you with it's fire breath`}]; //lose index 15

let player = {name: ``, location: 0};

function getName() {
    let name = prompt(`Please enter your full name`);
    return name;
}

function init() {
    player.name = getName();
    player.location = 0;
    checkGameState();
}

function chosePath(location) {
    
    let pathAvailable = `${locations[location].name} : ${(locations[location].choices.length > 2? "(1/2/3)" : locations[location].choices.length > 1 ? "(1/2)" : "1" )} \n`;
    let lost = location == 6 || location == 14 || location == 15;
    if(!lost) {
        for(let i = 0; i < locations[location].path.length; i++) {
            pathAvailable += `${i+1}. ${locations[location].path[i]}\n`;
            
            //console.log(locations[location].path[i]);
        }
        const newPath = prompt(pathAvailable);
        player.location =  locations[location].choices[(((!isNaN(newPath) ? parseInt(newPath) : 1) -1) % locations[location].path.length)];
        console.log(locations[location].choices[((!isNaN(newPath) ? parseInt(newPath) : 1) -1) % locations[location].path.length]);
    }
    checkGameState();
}

function checkGameState() {
    switch (player.location) {
        /* Win cases fall down */
        case 4:
        case 7:
        case 9:
        case 13:
            alert(`${locations[player.location].name} \n You Survived`);
            replay();
            break;
        /*Lose case */
        case 6:
        case 14:
        case 15:
            alert(`${locations[player.location].name} \n You Lose`);
            replay();        
            break;
        case 0:
            alert(`${player.name} washed ashore. \n Survive and get back to civilization`);
            chosePath(player.location);
            break;
        default:
            chosePath(player.location);
            break;
    }
}

function replay() {
    let replay = prompt("Play again? (y/n)");
    if(replay === `y`) {
        init();
    } else {
        alert(`Game Over! \n You can always refresh the page to replay`);
    }
}

init();