"use strict";

$(document).ready(function () {

	const init = {
		combo1: [1, 4, 7, 1, 2, 3, 3, 1],
		combo2: [2, 5, 8, 4, 5, 6, 5, 5],
		combo3: [3, 6, 9, 7, 8, 9, 7, 9],
		playerTurn: true,
		positions: [],
		vals: [],
		winner: false,
		clickCnt: 0,

		promptNew: (plyrWinnr) => {
			$("#msg").html(plyrWinnr);
			$("#msg").append("<button class='btn btn-info' id='againBtn'>PlayAgain?</button>");
		},

		resetFnc: function () {
			$("#msg").html("");
			this.winner = false;
			this.positions = [false, false, false, false, false, false, false, false, false];
			this.playerTurn = true;
			this.vals = [];
			this.clickCnt = 0;
			for (let i = 1; i <= 9; i++)
				$(`#box${i}`).empty();
		},

	};

	$("#mainContainer > .boxesCnt > div").click(function () {
		if (!init.winner) {
			const clickedID = $(this).attr("id");
			const clickedNum = $(this).attr("attrNum");
			const positions = init.positions;
			const combo1 = init.combo1;
			const combo2 = init.combo2;
			const combo3 = init.combo3;
			let pos = parseInt(clickedNum) - 1;
			let vals = init.vals;

			if (!positions[pos]) {
				init.clickCnt++;
				if (init.playerTurn) {
					$("#" + clickedID).html('<img class="imgXO" src="X.png" attrVal="x"/>');
					positions[pos] = true;
					vals[pos] = "x";
					init.playerTurn = !init.playerTurn;
				} else {
					$("#" + clickedID).html('<img class="imgXO" src="o.png" attrVal="o"/>');
					positions[pos] = true;
					vals[pos] = "o";
					init.playerTurn = !init.playerTurn;
				}
				for (let i = 0; i < 9; i++) {
					if (vals[combo1[i] - 1] === "x" && vals[combo2[i] - 1] === "x" && vals[combo3[i] - 1] === "x") {
						init.winner = true;
						init.promptNew('PLAYER  1  (X) WINS!    ');
					}
					if (vals[combo1[i] - 1] === "o" && vals[combo2[i] - 1] === "o" && vals[combo3[i] - 1] === "o") {
						init.winner = true;
						init.promptNew('PLAYER  2  (O) WINS!    ');
					}
				} //ends winCheck for Loop
				if (init.clickCnt === 9 && init.winner === false) {
					init.winner = true;
					init.promptNew('Game TIED!    ');
				}
			} //ends position if
		} //ends winner if
	}); //ends child on click

	$('#botContainer').on('click', '#againBtn', () => {
		init.resetFnc();
	});

	init.resetFnc();

}); //ends document ready