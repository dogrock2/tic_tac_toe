"use strict";

$(document).ready(function() {

	let playerTurn = true;
	let positions = [false,false,false,false,false,false,false,false,false];
    let combo1 = [1,4,7,1,2,3,3,1];
	let combo2 = [2,5,8,4,5,6,5,5];
	let combo3 = [3,6,9,7,8,9,7,9];
	let vals = [];
	let winner = false;
	let clickCnt = 0;
	

	$("#mainContainer > .boxesCnt > div").click(function() {
		if(!winner){
			let clickedID = $(this).attr("id");
			let clickedNum = $(this).attr("attrNum");
			let pos =  parseInt(clickedNum) - 1;
		  
			if (!positions[pos]){
			    clickCnt++;
				if (playerTurn) {				
					$("#" + clickedID).html('<img class="imgXO" src="X.png" attrVal="x"/>');
					positions[pos] = true;
					vals[pos] = "x";
					playerTurn = !playerTurn;
				} else {          
					$("#" + clickedID).html('<img class="imgXO" src="o.png" attrVal="o"/>');
					positions[pos] = true;
					vals[pos] = "o";
					playerTurn = !playerTurn;
				} 
				for (let i = 0; i < 9; i++) {
					if (vals[combo1[i] - 1] === "x" && vals[combo2[i] - 1] === "x" && vals[combo3[i] - 1] === "x"){   
						winner = true;
						promptNew('PLAYER  1  (X) WINS!    ');
					}
					if (vals[combo1[i] - 1] === "o" && vals[combo2[i] - 1] === "o" && vals[combo3[i] - 1] === "o"){
						winner = true;
						promptNew('PLAYER  2  (O) WINS!    ');
					}
				} //ends winCheck for Loop
				if(clickCnt === 9 && winner === false){
					winner = true;
					promptNew('Game TIED!    ');
				}
			}//ends position if
		}//ends winner if
	}); //ends child on click
	
	$('#botContainer').on('click','#againBtn', function(){
		$("#msg").html("");
		winner = false;
		positions = [false,false,false,false,false,false,false,false,false];
		playerTurn = true;
		vals = [];
		clickCnt = 0;
		for(let i = 1; i <= 9; i++)
		  $(`#box${i}`).empty();
	});
	
	function promptNew(plyrWinnr){
		$("#msg").html(plyrWinnr);
		$("#msg").append("<button class='btn btn-info' id='againBtn'>PlayAgain?</button>");
	}


}); //ends document ready
