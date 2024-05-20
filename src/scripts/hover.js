import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

let hoverElement = document.querySelectorAll(".contact-content-element");
hoverElement.forEach((element) => {
	let swiper = element.querySelector(".element-hover");
	let arrow = element.querySelector("svg");
	let text = element.querySelector(".content-element-text");
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
		text,
		{
			color: "#1a1a1a",
		},
		"-=0.4"
	);
	hoverInEffect.from(
		arrow,
		{
			opacity: 0,
			x: -20,
		},
		"-=0.2"
	);
	element.addEventListener("mouseover", () => {
		hoverInEffect.play();
	});
	element.addEventListener("mouseleave", () => {
		hoverInEffect.reverse();
	});
});
let projectHover = document.querySelectorAll(".project-wrapper");
projectHover.forEach((hover) => {
	let image = hover.querySelector(".project-image");
	let imageHover = gsap.timeline({ paused: true });
	imageHover.to(image, {
		filter: "blur(30px)",
		duration: 0.5,
		borderRadius: 100,
	});
	image.addEventListener("mouseover", () => {
		imageHover.play();
	});
	image.addEventListener("mouseleave", () => {
		imageHover.reverse();
	});
});
