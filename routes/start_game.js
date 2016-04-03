/**
 * Created by gopisrinath on 4/1/16.
 */
//var lastClicked;
//var grid = clickableGrid(10,3,function(el,row,col,i,thergb){
//    console.log("You clicked on element:",el);
//    console.log("You clicked on row:",row);
//    console.log("You clicked on col:",col);
//    console.log("You clicked on item #:",i);
//
//    el.className='clicked';
//    el.style.background = thergb;
//    if (lastClicked) lastClicked.className='';
//
//    lastClicked.style.background = el;
//});
//
//document.body.appendChild(grid);
//function clickableGrid( rows, cols, callback ){
//    var i=0;
//    var grid = document.createElement('table');
//    grid.className = 'grid';
//    for (var r=0;r<rows;++r){
//        var tr = grid.appendChild(document.createElement('tr'));
//        for (var c=0;c<cols;++c){
//            var cell = tr.appendChild(document.createElement('td'));
//            var x = Math.floor(Math.random() * 256);
//            var y = Math.floor(Math.random() * 256);
//            var z = Math.floor(Math.random() * 256);
//            var thergb = "rgb(" + x + "," + y + "," + z + ")";
//            cell.innerHTML = ++i;
//            cell.addEventListener('click',(function(el,r,c,i,thergb){
//                return function(){
//                    callback(el,r,c,i,thergb);
//                }
//            })(cell,r,c,i,thergb),false);
//        }
//    }
//    return grid;
//}


var GridWorld = require('gridworld').GridWorld;
var canvas = document.getElementById('canvas');

var world = new GridWorld(canvas, map[0].length, map.length, {
    padding       : {top: 10, left: 10, right: 10, bottom: 60},
    cellSize      : 32,
    cellSpacing   : 1,
    resizeCanvas  : true,
    drawBorder    : true,
    onclick: function(node) {
        console.log("you clicked on node: " + node);
    }
});

world.draw();