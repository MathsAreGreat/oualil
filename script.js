window.MathJax = {
	tex: {
		inlineMath: [
			["$", "$"],
			["\\(", "\\)"],
		],
	},
	svg: {
		fontCache: "global",
	},
};

(function () {
	var script = document.createElement("script");
	script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
	script.async = true;
	document.head.appendChild(script);
})();

const simplifySqrt = (b) => {
	let a = 1; // Default factor

	// Find the largest square factor of b
	for (let i = Math.floor(Math.sqrt(b)); i >= 1; i--) {
		if (b % (i * i) === 0) {
			a = i; // a is the square root of the largest square factor
			break;
		}
	}

	const remainder = b / (a * a);

	return [a, remainder];
};

const generateRandomOperation = () => {
	let num1 = Math.floor(Math.random() * 10) + 1;
	while (num1 == 1) num1 = Math.floor(Math.random() * 10) + 1;
	let num2 = Math.floor(Math.random() * 10) + 1;
	while ([1, 4, 9].includes(num2)) num2 = Math.floor(Math.random() * 10) + 1;

	return {
		num1,
		num2,
		result: simplifySqrt(num1 ** 2 * num2),
	};
};

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
	// Select all span elements
	const arr = [];
	const ps = document.querySelectorAll("p");
	for (let index = 0; index < ps.length; index++) {
		while (true) {
			const operation = generateRandomOperation();
			const t = `<span class="sol hidden">$\\sqrt{${
				operation.num1 ** 2 * operation.num2
			}} = \\color{red}{${operation.result[0]}\\sqrt{${
				operation.result[1]
			}}}$</span><span class="dots">$\\sqrt{${
				operation.num1 ** 2 * operation.num2
			}} = \\cdots$</span>`;
			ps[index].innerHTML = t;
			if (!arr.includes(operation.result)) {
				arr.push(operation.result);
				break;
			}
		}
	}
	const sol = document.querySelectorAll(".sol");
	const dots = document.querySelectorAll(".dots");
	const countdownElement = document.getElementById("countdown");
	let countdownTime = 1800,
		intervalId; // 60 seconds countdown

	const time_format = (ss) => {
		if (ss < 60) return `${ss.toString().padStart(2, "0")} secondes`;
		let minutes = Math.floor(ss / 60);
		let seconds = ss % 60;
		return `${minutes.toString().padStart(2, "0")} minutes ${seconds
			.toString()
			.padStart(2, "0")} secondes`;
	};
	const toggleHiddenClass = () => {
		// Remove the hidden class from the current span and add it to all other spans
		for (let index = 0; index < sol.length; index++) {
			sol[index].classList.remove("hidden");
			dots[index].classList.add("hidden");
		}
		countdownElement.classList.add("hidden");
	};

	const updateCountdown = () => {
		const ct = time_format(countdownTime);
		countdownElement.textContent = `Les solutions seront affichées après ${ct} ...`;
		countdownTime--;

		// If countdown reaches 0, toggle the spans
		if (countdownTime < 0) {
			toggleHiddenClass();
			clearInterval(intervalId);
		}
	};
	intervalId = setInterval(updateCountdown, 1000);
});
