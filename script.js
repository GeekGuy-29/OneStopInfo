const mainElement = document.querySelector('#myData');

const renderData = (data, fileName) => {
	let htmlString = `<h1 class="data--heading">${
		fileName[0].toUpperCase() + fileName.slice(1)
	}</h1>`;

	data.forEach((item) => {
		const [key1, key2, key3] = Object.keys(item);
		htmlString += `<div class="data--item" id="${fileName}-${key1}">
            <h2 class="data--item__name">${item[key2]}</h2>
            <p class="data--item__description">${item[key3]}</p>
        </div>`;
	});
};

const loadData = async (fileName) => {
	const url = window.location.origin + '/' + fileName + '.json';
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	renderData(data, fileName);
};

const init = async () => {
	const fileNamesUrl = window.location.origin + '/infofilenames.json';
	const response = await fetch(fileNamesUrl);
	const fileNames = await response.json();
	console.log(fileNames);
	fileNames.forEach(async (fileName) => {
		await loadData(fileName);
	});
};

init();
