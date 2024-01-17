import "./loader";
import "./modals";
//import "./scroll";
import "./hover";
import { gsap } from "gsap";
gsap.config({ nullTargetWarn: false });

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
