import "./modals";
import "./loader";
import "./scroll";

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};
