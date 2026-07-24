function updateCopyRightYear() {
	const copyrightElementDOM = document.querySelector('[data-current-year]');
	if (copyrightElementDOM) copyrightElementDOM.textContent = new Date().getFullYear();
}

export default updateCopyRightYear;
