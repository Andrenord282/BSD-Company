
// Бургер навигация по сайту
const btnBurgerNavigation = document.querySelector('.burger-nav__body');
const navigationBody = document.querySelector('.navigation');

btnBurgerNavigation.addEventListener('click', () =>{
    btnBurgerNavigation.classList.toggle('active');
    navigationBody.classList.toggle('active');
})

// Работа якоря

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors){
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const anchorID = anchor.getAttribute('href').substr(1);
        document.getElementById(anchorID).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
};

// Работа кнопки карты

const btnMap = document.querySelector('.footer__map-btn');
const contactMap = document.querySelector('.footer__map');

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

btnMap.addEventListener('click', () =>{
    btnMap.classList.toggle('active');
    contactMap.classList.toggle('active');
    _slideToggle(contactMap);
})

// Работа навигации

const navigationLinks = document.querySelectorAll('.navigation__link');
const paginationDots = document.querySelectorAll('.pagination__dot');
const paginationNumbers = document.querySelectorAll('.pagination__num');
let indexLink = [];

function linksNavigation(){
	navigationLinks.forEach((link, i) =>{
			link.addEventListener('click', () => {
			clearActiveClass(navigationLinks);
			clearActiveClass(paginationDots);
			clearActiveClass(paginationNumbers);
			link.classList.add('active');
			paginationDots[i].classList.add('active');
			paginationNumbers[i].classList.add('active');
			btnBurgerNavigation.classList.remove('active');
			navigationBody.classList.remove('active');
		});
	});
}

function dotsNavigation(){
	paginationDots.forEach((dot, i) =>{
			dot.addEventListener('click', () => {
				clearActiveClass(paginationDots);
				clearActiveClass(navigationLinks);
				clearActiveClass(paginationNumbers);
				dot.classList.add('active');
				navigationLinks[i].classList.add('active');
				paginationNumbers[i].classList.add('active');
		});
	});
}

function clearActiveClass(element) {
    element.forEach((link) => {
        link.classList.remove('active');
    })
}

const sections = document.querySelectorAll('.section');
let sectionHeight;
let sectionsHeight = [];
let coords = {};
let sectionsCoordsTop = [];
let sectionsCoordsBottom = [];

for (const section of sections) {
	sectionHeight = section.offsetHeight;
	sectionsHeight.push(sectionHeight);
	getCoords(section);
	sectionsCoordsTop.push(getCoords(section));
	sectionsCoordsBottom.push(getCoords(section) + sectionHeight);

}

function getCoords(elem) { 
	coords =  elem.getBoundingClientRect();
	return Math.floor((coords.top + pageYOffset));
}

function checkSection() {
	let scrollDocument = window.scrollY;
	const header = document.querySelector('.header');
	headerHeight = header.clientHeight;
	// let hiddenStart = window.innerHeight/100*45;

	for (let i = 0; i < sections.length; i++) {
		sectionCoordTop = sectionsCoordsTop[i];
		sectionCoordBottom = sectionsCoordsBottom[i];
		if(scrollDocument > (sectionCoordTop - headerHeight)  && scrollDocument < (sectionCoordBottom - headerHeight) ){
		paginationDots[i].classList.add('active');
		paginationNumbers[i].classList.add('active');
		navigationLinks[i].classList.add('active');
		}else{
			paginationDots[i].classList.remove('active');
			paginationNumbers[i].classList.remove('active');
			navigationLinks[i].classList.remove('active');

		}
	}
	return scrollDocument;

}

// linksNavigation();
// dotsNavigation();
// window.addEventListener('scroll', checkSection);
		
// Работа анимации

// const animItems = document.querySelectorAll('.'); // Переменная с объектами анимации
// console.log(pageYOffset);
// if (animItems.length > 0) { // Проверка есть ли псевдомассив с элиментами
// 	window.addEventListener('scroll', animOnScroll);
// 	// Функция работы анимации
// 	function animOnScroll () {
// 		for (let index = 0; index < animItems.length; index++) { // Создаем цикл проходимся по псевдомассиву
// 			const animeItem = animItems[index]; // Находим каждый элимент псевдомассива
// 			const animeItemHeight = animeItem.offsetHeight // Находим высоту каждого объекта, офсетную
// 			const animeItemOffsetTop = offset(animeItem).top // Находим позицию каждого элимента относительно верха страницы
// 			const animeStart = 2 // Коэффицента регулировки старта анимации
// 			let pageYOffset = window.pageYOffset;
// 			let animItemPoint = window.innerHeight - animeItemHeight / animeStart; // Анимация срабатывает при определении высоты окна браузера минус высота элимента поделенная на коэффицент
			
// 			if (animeItemHeight > window.innerHeigh) { // Если элимент выше окна барузера
// 				animItemPoint = animeItemHeight - window.innerHeight / animeStart; // Анимация срабатывает при определении высоты объекта минус высота окна браузера поделенная на коэффицент
// 			}

// 			// Если переменная с значением скрола от вехра страницы больше позиции элимента относительная верха 
// 			// страинцы минус значения при котором срабатывает анимация и переменная с значением скрола от 
// 			// верха страницы меньше высоты элимента плюс  значение при которой срабатывает анимация
// 			if (pageYOffset > (animeItemOffsetTop - animItemPoint) && pageYOffset < (animeItemOffsetTop + animItemPoint)){
// 				animeItem.classList.add('show'); // Добавляем класс шоу для элимента
// 				animeItem.classList.remove('hidden'); // Убираем класс хидден для элимента

// 			} else { // Иначе
// 				if (!animeItem.classList.contains('no-hidden')){
// 				animeItem.classList.remove('show'); // Убираем класс шоу для элимента
// 				animeItem.classList.add('hidden'); // Добавялем класс хидден для элимента
// 				}	 
// 			}

// 		}
// 	}

// 	// Функция поиска позиции элимента относительно верха и левого края вьюпорта
// 	function offset(el) {
// 		const rect = el.getBoundingClientRect(), // Размер элимента и позиция относителньо вьюпорта 
// 		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, // Значение прокрутки в лево страницы
// 		scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Значение прокрутки вниз страницы
// 		return { top: rect.top + scrollTop, // Позиция элимента относительно верха вьюпорта плюс прокрутки сверха страницы
// 				left: rect.left + scrollLeft } // Позиция элимента относительно левого края вьюпорта плюс прокрутки в лево страницы
// 	}

// 	setTimeout(() => {
// 		animOnScroll();
// 	}, 400);
// }

console.log('test')

let percentRatio;
const sectionContacts = document.querySelector('.contacts');
let animepoint = document.querySelector('.animepoint');


const progressHeightDocument = () => {
	sectionContactsPosition = Math.floor((sectionContacts.getBoundingClientRect().top + pageYOffset));
	let scrollTop = window.scrollY;

	// console.log(sectionContacts);
	// console.log(scrollTop);

	percentRatio = Math.floor((scrollTop / sectionContactsPosition) * 100);
	if (percentRatio >=100) {
		percentRatio = 100;
	}	

	console.log(percentRatio);

};

//Анимация блоков
let innerWidthUser = window.innerWidth;
let innerHeigthUser = window.innerHeight;
const animItem = document.querySelectorAll('.anim-item');

console.log(innerWidthUser)

const animationItems = () => {

	if(animItem){
		let pointAnimation;

		animItem.forEach((item, i) => {
			if (innerWidthUser >= 1000){
				pointAnimation = item.dataset.anim_desktop;
			}

			if (innerWidthUser >= 600 && innerWidthUser < 1000){
				pointAnimation = item.dataset.anim_tablet;
			}

			if (innerWidthUser < 600){
				pointAnimation = item.dataset.anim_phone;
			}

			const pelayAnimation = item.dataset.anim_delay;
			item.style.setProperty('--animation-delay', `${pelayAnimation}`);
			if (percentRatio >= pointAnimation) {
				item.classList.remove('hidden-animation');
				item.classList.add('show-animation');
				item.classList.add('active');

			}
		})
	}
};

progressHeightDocument();
linksNavigation();
dotsNavigation();
animationItems();

window.addEventListener('scroll', () => {
	checkSection();
	progressHeightDocument();
	animationItems();



});
