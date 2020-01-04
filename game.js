var myWorld = [[], []];
let div = document.createElement("div");
let game = document.querySelector(".game");
let groundBlock = new Block("ground", "./img/gound1.png");
let stoneBlock = new Block("stone", "./img/stone1.jpg");
let leavesBlock = new Block("leaves", "./img/");
let treeTrunkBlock = new Block("treetrunk", "./img/");
let storge = document.querySelectorAll('.storge >img');
let flag = false;
let class_Name = "";
let blocks = [groundBlock.count, stoneBlock.count, leavesBlock.count, treeTrunkBlock.count];
let arrstorge = [...storge];
for (let index = 0; index < arrstorge.length; index++) {
    arrstorge[index].setAttribute('Block',blocks[index]);
}

let start = () => {
    for (var i = 0; i < 15; i++) {
        myWorld[i] = [];
        for (var j = 0; j < 25; j++) {
            let div = document.createElement("div");
            div.classList.add("emptySqure");
            if (j === 0 && i === 0) {
                div.style.left = 700 + 'px';
                div.style.top = 0 + 'px';
            }
            div.setAttribute("id", `r${i}c${j}`);
            myWorld[i].push(div);
            game.appendChild(div);
        }
    }
}
/*------------- create a ground----------------*/
let creatGround = () => {
    for (let i = 11; i < myWorld.length; i++) {
        for (let j = 0; j < myWorld[i].length; j++) {
            document.querySelector(`#r${i}c${j}`).classList.add("ground");
        }
    }
}
/*---------getting a first position of myWorld[i][j] of the tree------*/
let creatTree = (starti, startj) => {
    let x, y;
    {
        for (x = starti; x < starti + 3; x++) {
            for (y = startj; y < startj + 3; y++) {
                let position = "r" + x + "c" + y;
                document.querySelector(`#${position}`).classList.add("leaves");
            }

        }
        for (let x = starti + 3; x < 11; x++) {
            let position = "r" + x + "c" + (startj + 1);
            document.querySelector(`#${position}`).classList.add("treetrunk");
        }
    }
}
/*------------- create a stone----------------*/
let creatStone = (j, hight) => {
    //check if there is no tree/ground
    for (let indexi = 10; hight > 0; indexi-- , hight--) {
        let stone = document.querySelector(`#r${indexi}c${j}`);
        if (!stone.classList.contains("leaves") && !stone.classList.contains("ground")) {
            document.querySelector(`#r${indexi}c${j}`).classList.add("stone");
        }
    }
}
/*------checking if player choose axe to mine trees -----*/
let playerWantTreesAxe = () => {
    game.removeAttribute('id', 'curoserPickaxe');
    game.removeAttribute('id', 'curoserShovel');
    game.setAttribute('id', 'curoserAxe');
}
/*------checking if player choose Shovel to mine ground -----*/
let playerWantGround = () => {
    game.removeAttribute('id', 'curoserAxe');
    game.removeAttribute('id', 'curoserPickaxe');
    game.setAttribute('id', 'curoserShovel');
}
/*------checking if player choose Pickaxe to mine rock -----*/
let playerWantRocks = () => {
    game.removeAttribute('id', 'curoserAxe');
    game.removeAttribute('id', 'curoserShovel');
    game.setAttribute('id', 'curoserPickaxe');
}
/*------getting the Row index for the squre player click------*/
let getIndexRow = (target) => {
    let indexC = parseInt(target.indexOf("c"));
    let indexi = parseInt(target.substring(1, indexC));
    return indexi;
}
/*------getting the Col index for the squre player click------*/
let getIndexCol = (target) => {
    let indexC = parseInt(target.indexOf("c"));
    let indexj = parseInt(target.substring(indexC + 1));
    return indexj;
}
/*----------remove tree from the world------------*/
let removeTreetrunkFromWorld = (e) => {
    const squreToStorge = e.currentTarget.id;
    if (!myWorld[getIndexRow(squreToStorge) - 1][getIndexCol(squreToStorge)].classList.contains("treetrunk")) {
        myWorld[getIndexRow(squreToStorge)][getIndexCol(squreToStorge)].classList.remove('treetrunk');
        treeTrunkBlock.addBlock();
        return treeTrunkBlock.count;
    }
}
/*----------remove leaves from the world------------*/
let removeLeavesFromWorld = (e) => {
    const squreToStorge = e.currentTarget.id;
    if (!myWorld[getIndexRow(squreToStorge) - 1][getIndexCol(squreToStorge)].classList.contains("leaves")) {
        myWorld[getIndexRow(squreToStorge)][getIndexCol(squreToStorge)].classList.remove('leaves');
        leavesBlock.addBlock();
    }
}
/*----------remove ground from the world------------*/
let removeGroundFromWorld = (e) => {
    const squreToStorge = e.currentTarget.id;
    console.log(myWorld[getIndexRow(squreToStorge) + 1][getIndexCol(squreToStorge)].classList);
    if (myWorld[getIndexRow(squreToStorge) - 1][getIndexCol(squreToStorge)].classList.length === 1) {
        myWorld[getIndexRow(squreToStorge)][getIndexCol(squreToStorge)].classList.remove('ground');
        groundBlock.addBlock();
        arrstorge[0].block = groundBlock.count;
        console.log(arrstorge[0].block);
        return arrstorge[0].block;
    }
}
/*----------remove stone from the world------------*/
let removeRockFromWorld = (e) => {
    const squreToStorge = e.currentTarget.id;
    if (!myWorld[getIndexRow(squreToStorge) - 1][getIndexCol(squreToStorge)].classList.contains("stone")) {
        myWorld[getIndexRow(squreToStorge)][getIndexCol(squreToStorge)].classList.remove('stone');
        stoneBlock.addBlock();
        return stoneBlock.count;
    }
}
/*----chack to see that player choose the right tool and calling to relevant function to delete the squre-----*/
let removeSqureFromWorld = (e) => {
    if (e.target.classList.contains('ground') && (game.getAttribute("id") === "curoserShovel")) {
        removeGroundFromWorld(e);
    }
    if (e.target.classList.contains('leaves') && (game.getAttribute("id") === "curoserAxe")) {
        removeLeavesFromWorld(e);
    }
    if (e.target.classList.contains('treetrunk') && (game.getAttribute("id") === "curoserAxe")) {
        removeTreetrunkFromWorld(e);
    }
    if (e.target.classList.contains('stone') && (game.getAttribute("id") === "curoserPickaxe")) {
        removeRockFromWorld(e);
    }
}
/*---------choose the element player want to add to the screen-------*/
let addToWorld = (e) => {
    flag = true;
    game.removeAttribute('id', 'curoserAxe');
    game.removeAttribute('id', 'curoserPickaxe');
    game.removeAttribute('id', 'curoserShovel');
    let x = parseInt(e.target.className.indexOf("-"));
    class_Name = e.target.className.substring(0, x); //getting the class of the elment player want
    return flag, class_Name;
}

/*---------adding the element to the screen---------*/
let creatNew = (e) => {
    const squreLocetion = e.target.id;
    //chack if: player choose from storge & not adding in the air && not adding on top on another element 
    if (flag && myWorld[getIndexRow(squreLocetion)][getIndexCol(squreLocetion)].classList.length === 1
        && myWorld[getIndexRow(squreLocetion) + 1][getIndexCol(squreLocetion)].classList.length === 2 /*&& `${blockName}` > 0*/) {
        myWorld[getIndexRow(squreLocetion)][getIndexCol(squreLocetion)].classList.add(class_Name);
        //need to decreaseBlock()
    }
    flag = false;
    return flag;
}



start();
creatGround();
creatTree(5, 6);
creatStone(13, 4);
creatStone(12, 4);
creatStone(16, 5);

for (var k = 0; k < myWorld.length; k++) {
    for (var t = 0; t < myWorld[k].length; t++) {
        myWorld[k][t].addEventListener('click', removeSqureFromWorld);
    }
}
let axe = document.querySelector('.axe');
axe.addEventListener('click', playerWantTreesAxe);

let shovel = document.querySelector('.shovel');
shovel.addEventListener('click', playerWantGround);

let pickaxe = document.querySelector('.pickaxe');
pickaxe.addEventListener('click', playerWantRocks);

for (let index = 0; index < arrstorge.length; index++) {
    arrstorge[index].addEventListener('click', addToWorld);
}
console.log(arrstorge);
game.addEventListener('click', creatNew);





