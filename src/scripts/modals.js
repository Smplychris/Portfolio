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
	ScrollTrigger.update();
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
page.stop();

let projectOpen = document.querySelectorAll(".project-wrapper");
projectOpen.forEach((project) => {
	let modalWrapper = project.querySelector(".project-modal-wrapper");
	let modalContent = project.querySelector(".project-modal-content");
	let modal = new Lenis({
		wrapper: modalWrapper,
		content: modalContent,
		duration: 1.2,
		direction: "vertical",
		gestureDirection: "vertical",
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: true,
		touchMultiplier: 2,
		infinite: false,
	});
	function raf(time) {
		modal.raf(time);
		ScrollTrigger.update();
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	modal.stop();
	let enter = project.querySelector(".project-modal");
	let open = project.querySelector(".project-button");
	let close = project.querySelector(".project-modal-close");
	let projectScroll = project.querySelector(".project-modal-content");

	let opener = gsap.timeline({ paused: true });
	opener.to(enter, {
		autoAlpha: 1,
		duration: 1,
	});
	opener.from(projectScroll.children, {
		opacity: 0,
	});
	opener.from(close, {
		opacity: 0,
		yPercent: -100,
	});
	open.addEventListener("click", () => {
		opener.play();
		modal.start();
		page.stop();
	});
	close.addEventListener("click", () => {
		opener.reverse();
		modal.stop();
		page.start();
	});
});
export { page };
