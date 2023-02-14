import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let projectWrapper = document.querySelectorAll(".project-wrapper");
projectWrapper.forEach((wrapper) => {
	let tittle = wrapper.querySelector(".project-tittle");
	let description = wrapper.querySelector(".project-description");
	let button = wrapper.querySelector(".project-button");
	let textAppear = gsap.timeline({
		scrollTrigger: {
			trigger: wrapper,
			start: "top 60%",
		},
	});
	textAppear.from(tittle.firstElementChild, {
		yPercent: 101,
		skewY: -7,
		duration: 0.8,
	});
	textAppear.from(
		description.firstElementChild,
		{
			yPercent: 101,
			duration: 0.8,
		},
		"-=0.7"
	);
	textAppear.from(
		button,
		{
			opacity: 0,
			yPercent: 50,
			duration: 0.8,
		},
		"-=0.7"
	);
});
