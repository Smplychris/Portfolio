import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let hoverElement = document.querySelectorAll(".contact-content-element");
hoverElement.forEach((element) => {
	let swiper = element.querySelector(".element-hover");
	let arrow = element.querySelector("svg");
	gsap.set(swiper, {
		xPercent: -101,
	});
	let hoverInEffect = gsap.timeline({
		paused: true,
		defaults: { duration: 0.4 },
	});
	hoverInEffect.to(swiper, {
		xPercent: 0,
	});
	hoverInEffect.to(
		arrow,
		{
			x: 10,
			y: -10,
		},
		"-=0.4"
	);
	element.addEventListener("mouseover", () => {
		hoverInEffect.play();
	});
	element.addEventListener("mouseleave", () => {
		hoverInEffect.reverse();
	});
});
