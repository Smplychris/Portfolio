import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
gsap.registerPlugin(ScrollTrigger);

let page = new Lenis({
	duration: 0.8,
	lerp: 0.1,
	orientation: "vertical",
	gestureOrientation: "vertical",
	smoothWheel: true,
	smoothTouch: false,
	touchMultiplier: 0,
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
		duration: 0.8,
		lerp: 0.1,
		orientation: "vertical",
		gestureOrientation: "vertical",
		smoothWheel: true,
		wheelMultiplier: 1,
		smoothTouch: true,
		touchMultiplier: 0,
		infinite: false,
	});
	function raf(time) {
		modal.raf(time);
		ScrollTrigger.update();
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
	modal.stop();
	let open = project.querySelector(".project-image");
	let close = project.querySelector(".project-modal-close");
	let enter = project.querySelector(".project-modal");
	let content = project.querySelectorAll(".project-modal-image");
	let top = project.querySelector("#top");
	let heroVideo = project.querySelector(".hero-video");
	let swiperTop = document.querySelector(".swiper.top");
	let swiperBottom = document.querySelector(".swiper.bottom");

	gsap.set(swiperTop, {
		yPercent: -100,
		opacity: 0,
	});
	gsap.set(swiperBottom, {
		yPercent: 100,
		opacity: 0,
	});
	let opener = gsap.timeline({
		paused: true,
		onStart: () => {
			page.stop();
		},
		onComplete: () => {
			modal.start();
			heroVideo.play();
		},
		onReverseComplete: () => {
			modal.scrollTo(top, { immediate: true });
			modal.stop();
			page.start();
			//modal.scrollTo(top);
		},
	});
	opener.to([swiperTop, swiperBottom], {
		yPercent: 0,
		opacity: 1,
		ease: "power3.inOut",
		duration: 1,
	});
	opener.set(enter, {
		autoAlpha: 1,
	});
	opener.from(content, {
		opacity: 0,
		y: 40,
		scale: 0.9,
		//filter: "blur(30px)",
		duration: 1,
		ease: "power3.inOut",
		//stagger: 0.1,
	});
	opener.from(
		close,
		{
			opacity: 0,
			yPercent: 80,
			scale: 0.9,
			duration: 1,
			ease: "power3.inOut",
			//filter: "blur(30px)",
		},
		"-=1.2"
	);
	open.addEventListener("click", () => {
		opener.timeScale(1).play();
	});
	close.addEventListener("click", () => {
		opener.timeScale(1).reverse();
		//modal.scrollTo(top);
	});
});
export { page };

let videos = document.querySelectorAll(".video-wrapper").forEach((video) => {
	let play = video.querySelector("video");
	let button = video.querySelector(".play-pause-button");
	let playButton = button.querySelector("#play");
	let pauseButton = button.querySelector("#pause");
	gsap.set(playButton, {
		scale: 0,
	});
	let playPause = gsap.timeline({
		paused: true,
		ease: "power2.inOut",
	});
	playPause.to(pauseButton, {
		scale: 0,
		duration: 0.1,
	});
	playPause.to(playButton, {
		scale: 1,
		duration: 0.1,
	});

	play.addEventListener("click", function (event) {
		if (this.paused) this.play(), playPause.reverse();
		else this.pause(), playPause.play();
	});
});
