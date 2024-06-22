function reverseLetters(chars) {
	const l = chars.length;
	const newArr = Array.from({ l });
	let inv = -1;
	for (let i = 0; i < l; i++) {
		newArr[i] = chars.at(inv);
		inv--;
	}
	return newArr;
}

console.log(reverseLetters(["b", "d", "x", "p", "c"]));
console.log(reverseLetters(["a", "r", "s", "t", "j", "e", "e", "a", "y"]));
console.log(reverseLetters(["a", "r"]));
