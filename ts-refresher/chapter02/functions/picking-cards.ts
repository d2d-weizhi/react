let suits = [ "hearts", "spades", "clubs", "diamonds" ];

function pickCard (x: { suit: string; card: number }[]): number;

function pickCard (x: number): { suit: string; card: number; };

function pickCard(x): any {
	// Working with object/array?
	// So, we were given a deck and we choose a card
	if (typeof x == "object") {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	} else if (typeof x == "number") {
		// Otherwise, we give you the opportunity to choose a card
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

let myDeck = [
	{ suit: "diamonds", card: 2 },
	{ suit: "spades", card: 10 },
	{ suit: "hearts", card: 4 }
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);