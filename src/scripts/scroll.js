import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let projectWrapper = document.querySelectorAll(".project-wrapper");
projectWrapper.forEach((wrapper) => {
	let tittle = wrapper.querySelector(".project-tittle");
	let description = wrapper.querySelector(".project-description");
	let button = wrapper.querySelector(".project-button");
	let image = wrapper.querySelector(".project-image");
	let textAppear = gsap.timeline({
		defaults: { ease: "expo.out", duration: 2 },
		scrollTrigger: {
			trigger: wrapper,
			start: "top 80%",
		},
	});
	textAppear.from(tittle.firstElementChild, {
		yPercent: 120,
		skewY: 7,
	});
	textAppear.from(
		description,
		{
			yPercent: 101,
			opacity: 0,
		},
		"-=2"
	);
	textAppear.from(
		button,
		{
			opacity: 0,
			yPercent: 50,
		},
		"-=2"
	);
	textAppear.from(
		image,
		{
			yPercent: 101,
			duration: 2,
		},
		"-=1.95"
	);
});
