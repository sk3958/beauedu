BeauEdu.onSignInClick = function()
{
	var container = document.getElementById("container");
	container.classList.remove("right-panel-active");
};

BeauEdu.onSignUpClick = function()
{
	var container = document.getElementById("container");
	container.classList.add("right-panel-active");
};