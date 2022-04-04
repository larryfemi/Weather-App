const wrapper = document.querySelector(".wrapper");
inputPart = wrapper.querySelector(".input-part");
infoTxt = wrapper.querySelector(".info-txt");
inputField = wrapper.querySelector("input");

inputField.addEventListener("keyup", (e) => {
	if (e.key == "Enter" && inputField.value != "") {
		console.log("Hello");
	}
});
