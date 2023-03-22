import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

let page = new Lenis({
	duration: 0.8,
	easing: (t) => Math.min(1, 1.01 - Math.pow(2, -10 * t)),
	direction: "vertical",
	gestureDirection: "vertical",
	smooth: true,
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
		duration: 1,
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
	let open = project.querySelector(".project-button");
	let close = project.querySelector(".project-modal-close");
	let enter = project.querySelector(".project-modal");
	let tittle = project.querySelectorAll(".animated-text");
	let content = project.querySelectorAll(".project-modal-image");
	let top = project.querySelector("#top");
	let swiperTop = document.querySelector(".swiper.top");
	let swiperBottom = document.querySelector(".swiper.bottom");

	gsap.set(swiperTop, {
		yPercent: -100,
	});
	gsap.set(swiperBottom, {
		yPercent: 100,
	});
	gsap.set(tittle, {
		yPercent: 100,
	});
	let opener = gsap.timeline({
		paused: true,
		onStart: () => {
			page.stop();
		},
		onComplete: () => {
			modal.start();
		},
		onReverseComplete: () => {
			//modal.scrollTo(top, { immediate: true });
			modal.stop();
			page.start();
		},
	});
	opener.to([swiperTop, swiperBottom], {
		yPercent: 0,
		ease: "power3.inOut",
		duration: 1,
	});
	opener.set(enter, {
		autoAlpha: 1,
	});
	opener.to(tittle, {
		ease: "circ.out",
		duration: 1,
		yPercent: 0,
		stagger: 0.3,
	});
	opener.from(content, {
		opacity: 0,
	});
	opener.from(close, {
		opacity: 0,
		yPercent: -100,
	});
	open.addEventListener("click", () => {
		opener.timeScale(1).play();
	});
	close.addEventListener("click", () => {
		modal.scrollTo(top);
		opener.timeScale(1).reverse();
	});
});
export { page };
