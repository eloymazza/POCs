/*
Given an array of integers arr and a target sum target,
find all pairs of distinct integers that add up 
to the target sum. Return an array of arrays containing these pairs sorted in ascending order. 
If there are no such pairs, return an empty array.*/

const getPairs = (target, currentPos, arr) => {
	const pairs = [];
	const elem = arr[currentPos];
	for (let i = 1; currentPos + i < arr.length; i++) {
		let next = arr[currentPos + i];
		let sum = elem + next;
		if (sum === target) {
			pairs.push([elem, next].sort((a, b) => a - b));
		}
	}
	return pairs;
};

function findPairs(arr, target) {
	let pairs = [];
	arr.forEach((elem, i) => {
		if (i < arr.length) {
			pairs.push(...getPairs(target, i, arr));
		}
	});

	return pairs.sort((arrA, arrB) => arrA[0] - arrB[0]);
}

console.log(findPairs([1, 2, 3, 4, 5], 5));
console.log(findPairs([3, 7, 8, 4, 5, 9], 12));
console.log(findPairs([2, 4, 6, 8], 10));
