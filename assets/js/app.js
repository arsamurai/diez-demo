// Animation-func on scroll
const animateSvg = (selector, w_top, w_height) => {
	const svg = document.querySelector(selector);
	const svgRect = svg.getBoundingClientRect();
	const svgHeight = svgRect.top + window.scrollY;
	const svgOuterHeight = svgRect.height;

	if (w_top + w_height > svgHeight && w_top < svgHeight + svgOuterHeight) {
		svg.classList.add('animate');
	}
};

addEventListener('load', async () => {
	// Navigation
	const logoBtn = document.querySelector('[data-logo-btn]');
	const burger = document.querySelector('[data-burger-btn]');
	const menu = document.querySelector('[data-menu]');
	const scrollLinks = document.querySelectorAll('[data-scroll-to]');
	const body = document.body;

	const goTo = (sectionId) => {
		const top = document.getElementById(sectionId)?.offsetTop - 88;
		window.scrollTo({
			top,
			behavior: 'smooth',
		});
	};

	const setMenuState = (activate) => {
		if (window.innerWidth < 992) {
			if (activate) {
				const scrollY =
					document.documentElement.style.getPropertyValue('--scroll-y');
				body.style.position = 'fixed';
				body.style.top = `-${scrollY}`;
			} else {
				const scrollY = body.style.top;
				body.style.position = '';
				body.style.top = '';
				window.scrollTo(0, parseInt(scrollY || '0') * -1);
			}
		}
		const action = activate ? 'add' : 'remove';

		burger?.classList[action]('active');
		menu?.classList[action]('active');
	};

	logoBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	burger.addEventListener('click', ({ currentTarget }) => {
		const isActiveMenu = currentTarget.classList.contains('active');

		if (isActiveMenu) {
			setMenuState(false);
		} else {
			setMenuState(true);
		}
	});

	scrollLinks.forEach((link) => {
		link.addEventListener('click', ({ currentTarget }) => {
			const sectionId = currentTarget
				.getAttribute('data-scroll-to')
				.replace('#', '');
			setMenuState(false);
			goTo(sectionId);
		});
	});

	// Order modal
	const makeOrderBtns = document.querySelectorAll('[data-make-order]');
	const orderModal = document.querySelector('[data-order-modal]');

	makeOrderBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			orderModal.classList.add('active');
			if (menu.classList.contains('active')) setMenuState(false);
		});
	});

	// Work modal
	const works = document.querySelectorAll('[data-work-item]');
	const workModal = document.querySelector('[data-work-modal]');
	const workModalVideo = document.querySelector('[data-work-modal-video]');
	const workModalVideoSource = document.querySelector(
		'[data-work-modal-video-source]'
	);
	const workModalTitle = document.querySelector('[data-work-modal-title]');
	const workModalDesc = document.querySelector('[data-work-modal-desc]');
	const workModalPrev = document.querySelector('[data-work-modal-prev]');
	const workModalNext = document.querySelector('[data-work-modal-next]');

	const checkWork = (work, num) => {
		const title = work.querySelector('[data-work-title]').textContent;
		const desc = work.querySelector('[data-work-desc]').textContent;
		const video = work.querySelector('[data-work-video]').textContent;
		workModalTitle.innerHTML = title;
		workModalDesc.innerHTML = desc;
		workModalVideoSource.src = video;
		workModal.dataset.workNum = num;
		workModalVideo.load();
		workModal.classList.add('active');
	};

	works.forEach((work, index) => {
		work.addEventListener('click', () => {
			checkWork(work, index);
		});
	});

	workModalPrev.addEventListener('click', () => {
		const num = +workModal.dataset.workNum;
		if (num === 0) {
			return;
		} else {
			const work = works[num - 1];
			checkWork(work, num - 1);
		}
	});

	workModalNext.addEventListener('click', () => {
		const num = +workModal.dataset.workNum;
		if (num === works.length - 1) {
			return;
		} else {
			const work = works[num + 1];
			checkWork(work, num + 1);
		}
	});

	// Close modals
	const closeModalBtns = document.querySelectorAll('[data-close-modal]');

	closeModalBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			orderModal.classList.remove('active');
			workModal.classList.remove('active');
		});
	});

	// Animation on scroll
	let w_top = window.scrollY || window.pageYOffset;
	let w_height = window.innerHeight;

	animateSvg('[data-preview-svg]', w_top, w_height);
	animateSvg('[data-services-svg--1]', w_top, w_height);
	animateSvg('[data-services-svg--2]', w_top, w_height);
	animateSvg('[data-order-svg]', w_top, w_height);
});

addEventListener('scroll', () => {
	document.documentElement.style.setProperty(
		'--scroll-y',
		`${window.scrollY}px`
	);

	// Animation on scroll
	let w_top = window.scrollY || window.pageYOffset;
	let w_height = window.innerHeight;

	animateSvg('[data-preview-svg]', w_top, w_height);
	animateSvg('[data-services-svg--1]', w_top, w_height);
	animateSvg('[data-services-svg--2]', w_top, w_height);
	animateSvg('[data-order-svg]', w_top, w_height);
});

// Eyes move on cursor
addEventListener('mousemove', (event) => {

	const eyeLeft1 = document.querySelector('[data-eye-left-1]');
	const eyeRight1 = document.querySelector('[data-eye-right-1]');
	const eyeLeft2 = document.querySelector('[data-eye-left-2]');
	const eyeRight2 = document.querySelector('[data-eye-right-2]');

	const moveEye = (event, eyeLeft, eyeRight) => {
		const eyeLeftValues = eyeLeft.getBoundingClientRect();
		const eyeRightValues = eyeRight.getBoundingClientRect();
		const top = eyeLeftValues.top + eyeLeftValues.height / 2;
		const left = eyeLeftValues.left + eyeLeftValues.width / 2;
		const eyesDistance = (eyeRightValues.left + eyeRightValues.width / 2) - left;
		const x = event.x - left;
		const y = event.y - top;

		const eyeLeftRotation = 57.2958 * arcctg(x, y);
		const eyeRightRotation = 57.2958 * arcctg(x - eyesDistance , y);
	
		eyeLeft.style.transform = 'rotate(' + eyeLeftRotation + 'deg)';
		eyeRight.style.transform = 'rotate(' + eyeRightRotation + 'deg)';
	}

	const arcctg = (x, y) => {
		if(x > 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
		if(x < 0 && y > 0) return Math.PI / 2 - Math.atan(x / y);
		if(x < 0 && y < 0) return Math.PI + Math.atan(y / x);
		if(x > 0 && y < 0) return 3 * Math.PI / 2 + Math.abs(Math.atan(x / y));
	}

	moveEye(event, eyeLeft1, eyeRight1);
	moveEye(event, eyeLeft2, eyeRight2);

});