const gridWrapper = document.querySelector('.grid-wrapper');
const gridContainer = document.querySelector('.grid-container');
const gridBtn = document.querySelector('#grid-toggle');
const penColorSelect = document.querySelector('.pen-color-select');
const bgColorSelect = document.querySelector('.bg-color-select');
const rainbowBtn = document.querySelector('#rainbow-pen');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');

let gridSize = 16;

let bgColor = '#ffffff';
gridContainer.style.backgroundColor = bgColor;

penColorSelect.value = '#000000';
bgColorSelect.value = '#ffffff';

// function which creates grid structure and squares inside
function createGrid() {
	// to create dynamicaly grid elements inside gridContainer we need the take width of gridContainer and divide it by size of single grid
	let gridWidth = gridContainer.offsetWidth / gridSize;
	console.log(gridWidth);
	// setting the columns for grid
	gridContainer.style.gridTemplateColumns = `repeat(${
		gridSize - 3
	}, ${gridWidth}px) 1fr 1fr 1fr`;
	// setting the rows for grid
	gridContainer.style.gridTemplateRows = `repeat(${
		gridSize - 3
	}, ${gridWidth}px) 1fr 1fr 1fr`;

	// set up grid if girdSize is smaller than 4
	if (gridSize < 4) {
		gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
		gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
	}

	// loop for which creates squares inside of gridContainer
	for (let i = 0; i < gridSize ** 2; i++) {
		const square = document.createElement('div');
		square.classList.add('grid-item');
		square.style.backgroundColor = 'transparent';
		gridContainer.appendChild(square);
		square.classList.add('border-top-left');
	}
}
createGrid();

// add to variable gridItems all created grid-items
const gridItems = document.querySelectorAll('.grid-item');
let ink = '#000000';
let isPainting = false;

// setting into ink value selected pen color
penColorSelect.addEventListener('input', (e) => {
	ink = e.target.value;
	console.log('ink val: ', e.target);
});

// function responsive for mouse move, add selected pen color into item (grid item) background color
function mouseMove(e) {
	const item = e.target;
	item.style.backgroundColor = ink;
}

function erase(e) {
	const item = e.target;
	item.style.backgroundColor = bgColor;
}

// function which toggle the square boarder
function removeGridLines() {
	gridItems.forEach((item) => {
		item.classList.toggle('border-top-left');
	});
}

// function which clear all sketch grid, fires when we click on clear button
function clearGrid() {
	gridItems.forEach((item) => {
		item.style.backgroundColor = '';
        bgColor = '#ffffff';
		gridContainer.style.backgroundColor = bgColor;
		bgColorSelect.value = '#ffffff';
		penColorSelect.value = '#000000';
		ink = '#000000';
		// gridContainer.removeEventListener(paint);
	});
}

// function which return randomize numbers from 0 - 255
function randomNumber() {
	return Math.floor(Math.random() * 255);
}

function setRandomizeColor(e) {
	const item = e.target;
	const r = randomNumber();
	const g = randomNumber();
	const b = randomNumber();

	item.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function rainbowColor() {
	if (rainbowBtn.classList.contains('btn-active')) {
		gridItems.forEach((item) => {
			item.addEventListener('mouseover', setRandomizeColor);
		});
	} else {
		gridItems.forEach((item) => {
			item.removeEventListener('mouseover', setRandomizeColor);
		});
	}
}

// function starting paint but first checking isPainting value, if is true then painting, else stop paint
function startPaint() {
	if (eraserBtn.classList.contains('btn-eraser-active')) {
		isPainting = !isPainting;

		if (isPainting) {
			gridItems.forEach((item) => {
				item.addEventListener('mouseover', erase);
			});
		} else {
			gridItems.forEach((item) => {
				item.removeEventListener('mouseover', erase);
			});
		}
	} else if (rainbowBtn.classList.contains('btn-rainbow-active')) {
		isPainting = !isPainting;

		if (isPainting) {
			gridItems.forEach((item) => {
				item.addEventListener('mouseover', setRandomizeColor);
			});
		} else {
			gridItems.forEach((item) => {
				item.removeEventListener('mouseover', setRandomizeColor);
			});
		}
	} else {
		isPainting = !isPainting;

		if (isPainting) {
			gridItems.forEach((item) => {
				item.addEventListener('mouseover', mouseMove);
			});
		} else {
			gridItems.forEach((item) => {
				item.removeEventListener('mouseover', mouseMove);
			});
		}
	}
}

bgColorSelect.addEventListener('input', (e) => {
	const color = e.target.value;
	bgColor = color;
	gridContainer.style.backgroundColor = color;
});

gridContainer.addEventListener('click', () => {
	startPaint();
});
rainbowBtn.addEventListener('click', () => {
	rainbowBtn.classList.toggle('btn-rainbow-active');
});
eraserBtn.addEventListener('click', () => {
	eraserBtn.classList.toggle('btn-eraser-active');
});
gridBtn.addEventListener('click', removeGridLines);
clearBtn.addEventListener('click', clearGrid);
