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
let allProjects = document.querySelectorAll(".project-wrapper");
let heroText = document.querySelectorAll(".moving-text");
let contacts = document.querySelectorAll(".contact-content-element");

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
				opacity: 0,
			},
			"-=1"
		);
		tlComplete.set(
			"#loading-container",
			{
				autoAlpha: 0,
			},
			"-=0.8"
		);
		tlComplete.from(
			[heroText, allProjects, contacts],
			{
				opacity: 0,
				y: 150,
				stagger: 0.1,
				clearProps: true,
			},
			"-=1.2"
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
