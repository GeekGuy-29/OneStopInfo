const mainElement = document.querySelector('#myData');

const conditionalRender = (data) => {
	if (data.startsWith('http://') || data.startsWith('https://')) {
		return `<a href="${data}" target="_blank">${data}</a>`;
	}

	return `<p class="data--item__description">${data}</p>`;
};

const renderData = (data, fileName) => {
	let htmlString = `<summary><h1 class="data--heading" style="display:inline;">${
		fileName[0].toUpperCase() + fileName.slice(1)
	}</h1></summary>`;

	const [key1, key2, key3] = Object.keys(data[0]);

	let table = `<table class="data--table">`;
	table += `<tr><th>${key2}</th><th>${key3}</th></tr>`;

	data.forEach((item) => {
		table += `<tr class="data--item" id="${fileName}-${key1}">
            <td><h4 class="data--item__name">${item[key2]}</h4></td>
            <td>${conditionalRender(item[key3])}</td>
        </tr>`;
	});

	table += `</table>`;

	htmlString = `<details class="data--container-${fileName}">${htmlString} ${table}</details>`;

	mainElement.insertAdjacentHTML('beforeend', htmlString);
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
