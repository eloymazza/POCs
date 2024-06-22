function either404(number) {
	let fourAndFour = false;
	let zeroAndZero = false;
	const l = number.length;

	number.forEach((n, i) => {
		if (n === 4 && number[i + 1] === 4) {
			fourAndFour = true;
		}
		if (n === 0 && number[i + 1] === 0) {
			zeroAndZero = true;
		}

		if (fourAndFour && zeroAndZero) {
			return false;
		}
	});

	return (fourAndFour || zeroAndZero) && !(fourAndFour && zeroAndZero);
}

console.log(either404([4, 4, 3, 1]));
console.log(either404([1, 4, 4, 0, 0, 9]));
console.log(either404([3, 4, 2, 4, 6]));
