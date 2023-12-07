const gridWrapper = document.querySelector('.grid-wrapper');
const gridContainer = document.querySelector('.grid-container');
const gridBtn = document.querySelector('#grid-toggle');
const penColorSelect = document.querySelector('.pen-color-select');
const bgColorSelect = document.querySelector('.bg-color-select');
const rainbowBtn = document.querySelector('#rainbow-pen');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');
const gridSizeBtn = document.querySelectorAll('.grid-size .btn');

let gridSize = 16;

let bgColor = '#ffffff';
gridContainer.style.backgroundColor = bgColor;

penColorSelect.value = '#000000';
bgColorSelect.value = '#ffffff';

// function which creates grid structure, size is passed value wich we can set as we want 256, 576 or more
function createGrid(size) {
	// reset gridContainer by removing all child elements
	while (gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}

	let gridWidth = gridContainer.offsetWidth / gridSize;
	console.log(gridWidth);

	gridContainer.style.gridTemplateColumns = `repeat(${
		gridSize - 3
	}, ${gridWidth}px) 1fr 1fr 1fr`;
	gridContainer.style.gridTemplateRows = `repeat(${
		gridSize - 3
	}, ${gridWidth}px) 1fr 1fr 1fr`;

	// for loop which creates divs for each grid
	for (let i = 0; i < size; i++) {
		const square = document.createElement('div');
		square.classList.add('grid-item');
		square.style.backgroundColor = 'transparent';
		square.classList.add('border-top-left');
		gridContainer.appendChild(square);
	}
}

// set up first grid strucutre of 16x16
createGrid(256);

// add to variable gridItems all created grid-items
let gridItems = document.querySelectorAll('.grid-item');
let ink = '#000000';
let isPainting = false;

// setting into ink value selected pen color
penColorSelect.addEventListener('input', (e) => {
	ink = e.target.value;
	console.log('ink val: ', e.target);
});

// function responsiblee for mouse move, add selected pen color into item (grid item) background color
function mouseMove(e) {
	const item = e.target;
	item.style.backgroundColor = ink;
}

// function responsible for erase single painted grid
function erase(e) {
	const item = e.target;
	item.style.backgroundColor = bgColor;
}

// function addListener or removeListener on each item from grid to call earase function
function startErase() {
	if (isPainting) {
		gridItems.forEach((item) => {
			item.addEventListener('mouseover', erase);
		});
	} else {
		gridItems.forEach((item) => {
			item.removeEventListener('mouseover', erase);
		});
	}
}

// function which toggle the square boarder
function toggleGridLines() {
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
		eraserBtn.classList.remove('btn-eraser-active');
		rainbowBtn.classList.remove('btn-rainbow-active');
		// gridContainer.removeEventListener(paint);
	});
}

// function which return randomize numbers from 0 - 255
function randomNumber() {
	return Math.floor(Math.random() * 255);
}

// function setting up randomized color
function setRandomizeColor(e) {
	const item = e.target;
	const r = randomNumber();
	const g = randomNumber();
	const b = randomNumber();

	item.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// function start painting in reinbow color if isPainting is true
function paintRainbow() {
	if (isPainting) {
		gridItems.forEach((item) => {
			item.addEventListener('mouseover', setRandomizeColor);
		});
	} else {
		gridItems.forEach((item) => {
			item.removeEventListener('mouseover', setRandomizeColor);
		});
	}
}

// function starting paint but first checking isPainting value, if is true then painting, else stop paint. Next checking which button is active, is erase then call erase, else if rainbow button then call rainbow function
function startPaint() {
	if (eraserBtn.classList.contains('btn-eraser-active')) {
		isPainting = !isPainting;
		startErase();
	} else if (rainbowBtn.classList.contains('btn-rainbow-active')) {
		isPainting = !isPainting;
		paintRainbow();
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

// listener on bgColorSelect when we choose color then value color took main color then we add color to value bgColor and finally we add backgroundColor style into gridContainer
bgColorSelect.addEventListener('input', (e) => {
	const color = e.target.value;
	bgColor = color;
	gridContainer.style.backgroundColor = color;
});

// listener on click on gridContainer which calls startPaint
gridContainer.addEventListener('click', () => {
	startPaint();
});

// listener on rainbowBtn which toggle button, checking is active or not
rainbowBtn.addEventListener('click', () => {
	rainbowBtn.classList.toggle('btn-rainbow-active');
});

// listener on reaserBtn click which toggle active eraser button
eraserBtn.addEventListener('click', () => {
	eraserBtn.classList.toggle('btn-eraser-active');
});

// listener on gridBtn which change grid lines on or of
gridBtn.addEventListener('click', toggleGridLines);
// listener on clearBtn which clear all grid with active buttons after click
clearBtn.addEventListener('click', clearGrid);

// listener on each btn on click to change the size of grid
gridSizeBtn.forEach((btn) => {
	btn.addEventListener('click', () => {
		gridSizeBtn.forEach((btn) => {
			btn.classList.remove('btn-eraser-active');
		});

		if (btn.id === 'grid-size-big') {
			gridSize = 16;
		} else if (btn.id === 'grid-size-medium') {
			gridSize = 24;
		} else if (btn.id === 'grid-size-small') {
			gridSize = 32;
		}

		btn.classList.add('btn-eraser-active');
		createGrid(gridSize * gridSize);
		gridItems = document.querySelectorAll('.grid-item');
	});
});
