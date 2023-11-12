const a = [13, 31, 7, 18, 3, 4, 34, 17, 26, 21, 27, 12, 23, 32, 15, 6, 25, 30, 36, 1, 8, 10, 28, 5];
const b = [7, 13, 17, 32, 14, 23, 39, 0, 12, 34, 4, 24, 21, 1, 3, 27, 37, 22, 31, 29, 20, 9, 33, 2];
const c = [26, 10, 1, 39, 11, 20, 0, 17, 2, 35, 6, 38, 3, 33, 23, 30, 19, 7, 9, 27, 12, 34, 4, 13];
const all = [a, b, c];

const results = {};
all.forEach((arr) => {
	arr.forEach((num) => {
		if (!results[num]) {
			results[num] = 0;
		}
		results[num] += 1;
	});
});

const counts = [0, 0, 0, 0];

for (const i in results) {
	counts[results[i]] += 1;
}
console.log(counts);
