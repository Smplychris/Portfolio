import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

let page = new Lenis({
	duration: 0.8,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
	let enter = project.querySelector(".project-modal");
	let open = project.querySelector(".project-button");
	let top = project.querySelector("#top");
	let close = project.querySelector(".project-modal-close");
	let projectScroll = project.querySelector(".project-modal-content");
	let swiperTop = document.querySelector(".swiper.top");
	let swiperBottom = document.querySelector(".swiper.bottom");

	gsap.set(swiperTop, {
		yPercent: -101,
	});
	gsap.set(swiperBottom, {
		yPercent: 101,
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
			modal.scrollTo(top, { immediate: true });
			modal.stop();
			page.start();
		},
	});
	opener.to([swiperTop, swiperBottom], {
		yPercent: 0,
		duration: 1,
		ease: "expo.inOut",
	});
	opener.set(enter, {
		autoAlpha: 1,
	});
	opener.from(projectScroll.children, {
		opacity: 0,
		yPercent: 20,
		stagger: 0.1,
	});
	opener.from(close, {
		opacity: 0,
		yPercent: -100,
	});
	open.addEventListener("click", () => {
		opener.play();
	});
	close.addEventListener("click", () => {
		opener.reverse();
	});
});
export { page };
