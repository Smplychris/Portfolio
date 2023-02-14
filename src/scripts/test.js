import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

let page = new Lenis({
	duration: 1.2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	direction: "vertical",
	gestureDirection: "vertical",
	smooth: true,
	mouseMultiplier: 1,
	smoothTouch: false,
	touchMultiplier: 2,
	infinite: false,
});
function raf(time) {
	page.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let itemClick = document.querySelectorAll(".color-box");
itemClick.forEach((click) => {
	let popupWrapper = click.querySelector(".popup-wrapper");
	let popupContent = click.querySelector(".popup-content");
	let popup = new Lenis({
		wrapper: popupWrapper,
		content: popupContent,
		duration: 1.4,
		direction: "vertical",
		gestureDirection: "vertical",
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: true,
		touchMultiplier: 2.2,
		infinite: false,
	});
	function raf(time) {
		popup.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	popup.stop();
	let open = click.querySelector(".popup");
	let wrapper = click.querySelector(".popup-wrapper");
	let enter = click.querySelector(".open");
	let close = click.querySelector(".close");
	let images = click.querySelectorAll("img");
	images.forEach((image) => {
		gsap.from(image, {
			opacity: 0,
			y: 100,
			scrollTrigger: {
				scroller: wrapper,
				trigger: image,
				start: "top 80%",
				end: "top 50%",
				scrub: 0.2,
			},
		});
	});
	gsap.set(wrapper, {
		yPercent: 110,
	});

	let opener = gsap.timeline({ paused: true });
	opener.to(open, {
		autoAlpha: 1,
		duration: 2,
	});
	opener.to(wrapper, {
		yPercent: 0,
		duration: 1,
		ease: "power2.inOut",
	});
	enter.addEventListener("click", () => {
		opener.play();
		popup.start();
		page.stop();
	});
	close.addEventListener("click", () => {
		opener.reverse();
		popup.stop();
		page.start();
	});
});
