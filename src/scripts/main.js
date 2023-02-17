import "./modals";
import "./loader";
import "./scroll";
import "./hover";

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
