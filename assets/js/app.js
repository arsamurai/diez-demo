const animateOnScroll = (selector, w_top, w_height) => {
	const block = document.querySelector(selector);
	const blockRect = block.getBoundingClientRect();
	const blockHeight = blockRect.top + window.scrollY;
	const blockOuterHeight = blockRect.height;

	if (w_top + w_height > blockHeight && w_top < blockHeight + blockOuterHeight) {
		block.classList.add('animate');
	}
};

function zoomOnScroll(block, difference) {
	let scaleFactor = 0.5 + (difference / 100).toFixed(1) * 0.1;
	let opacityFactor = (difference / 100).toFixed(1) * 0.33;

	block.style.transform = 'scale(' + scaleFactor + ')';
	block.style.opacity = opacityFactor;
}

addEventListener('load', async () => {
	// Active header
	const header = document.querySelector('[data-header]');

	const setHeaderActive = (entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				header.classList.add('active');
			} else {
				header.classList.remove('active');
			}
		});
	};

	let observer = new IntersectionObserver(setHeaderActive, {
		rootMargin: '0px',
		threshold: 0,
	});
	observer.observe(document.querySelector('[header-anchor]'));

	// Navigation
	const burger = document.querySelector('[data-burger-btn]');
	const menu = document.querySelector('[data-menu]');
	const scrollLinks = document.querySelectorAll('[data-scroll-to]');
	const body = document.body;

	const goTo = (sectionId) => {
		const top = document.getElementById(sectionId)?.offsetTop - 100;
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

	// Animation on scroll
	let w_top = window.scrollY || window.pageYOffset;
	let w_height = window.innerHeight;

	animateOnScroll('[data-telegram-img]', w_top, w_height);
});

addEventListener('scroll', (e) => {
	document.documentElement.style.setProperty(
		'--scroll-y',
		`${window.scrollY}px`
	);

	// Animation on scroll
	let w_top = window.scrollY || window.pageYOffset;
	let w_height = window.innerHeight;

	animateOnScroll('[data-telegram-img]', w_top, w_height);

	// Zoom on scroll
	const services = document.querySelector('#services');
	const servicesItems = document.querySelectorAll('[data-services-item]');
	
	const servicesDistanceToTop = services.offsetTop - 600;
	const servicesHeight = services.offsetHeight / 2;

	servicesItems.forEach((item) => {
		if(window.scrollY > servicesDistanceToTop && window.scrollY < servicesDistanceToTop + servicesHeight) {
			const difference = window.scrollY - servicesDistanceToTop;
			zoomOnScroll(item, difference);
		}
	});
});
