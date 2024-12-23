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
	script.src = "http://localhost/mathjax/es5/tex-svg.js";
	script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
	script.async = true;
	document.head.appendChild(script);
})();
