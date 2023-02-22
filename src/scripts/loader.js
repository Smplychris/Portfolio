import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { page } from "./modals";

let imagesLoaded = require("imagesloaded");
let loadedCnt = 0;
let loadStatus = 0;
let loadPercent = 0;
let allImgs = document.querySelectorAll("img").length;
let progressCnt = document.getElementById("progress-count");
let imgLoad = imagesLoaded("img");

let tlProgress = gsap.timeline({
	paused: true,
	onUpdate: () => {
		// Update the counter
		loadPercent = Math.floor(tlProgress.progress() * 100);
		progressCnt.innerHTML = loadPercent;
	},
	onComplete: () => {
		// Hide the loading container
		let tlComplete = gsap.timeline({
			defaults: { ease: "expo.inOut", duration: 2 },
			onComplete: () => {
				page.start();
			},
		});
		tlComplete.to(".progress-bar-wrap", {
			width: 0,
			duration: 0.8,
		});
		tlComplete.to(
			".progress-count-wrap",
			{
				yPercent: -60,
			},
			"-=1"
		);
		tlComplete.to(
			"#loading-container",
			{
				yPercent: -101,
				ease: "power3.inOut",
			},
			"-=0.8"
		);
		tlComplete.set("#loading-container", {
			autoAlpha: 0,
		});
		tlComplete.from(
			".moving-text",
			{
				yPercent: 101,
				stagger: 0.2,
				ease: "expo.out",
			},
			"-=1"
		);
	},
});

tlProgress.to("#progress-bar", { x: 0, ease: "linear" });

// Update the progress bar and the counter every time an image is loaded
if (allImgs > 0) {
	imgLoad.on("progress", function (instance, image) {
		loadedCnt++;
		loadStatus = loadedCnt / allImgs;
		gsap.to(tlProgress, { progress: loadStatus });
	});
}
