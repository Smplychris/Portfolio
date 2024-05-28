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
			color: "#ffffff",
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
		duration: 0.3,
		ease: "power1.inOut",
		//borderRadius: 100,
	});
	imageHover.to(
		hover,
		{
			backgroundColor: "#091C19",
			duration: 0.3,
			ease: "power1.inOut",
		},
		"-=0.3"
	);
	image.addEventListener("mouseover", () => {
		imageHover.play();
	});
	image.addEventListener("mouseleave", () => {
		imageHover.reverse();
	});
});
