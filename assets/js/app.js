import emailSettings from './modules/email.js';
import aosConfig from './modules/aosConfig.js';

const getModal = (modalName) => {
	return document?.querySelector(`[data-modal=${modalName}]`);
};

const setModalState = (modal, activate) => {
	const action = activate ? 'add' : 'remove';
	modal?.classList[action]('active');
};

addEventListener('load', async () => {
	// AOS
	AOS.init(aosConfig);

	// Success modal
	const successModal = getModal('success');
	const successModalClose = successModal.querySelector('[data-modal-close]');
	const successModalContent = successModal.querySelector(
		'[data-modal-content]'
	);

	successModalClose.addEventListener('click', () => {
		setModalState(successModal, false);
	});

	successModalContent.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	successModal.addEventListener('click', () => {
		setModalState(successModal, false);
	});

	// Form modal
	const formModal = getModal('form');
	const fromModalOpenBtns = document.querySelectorAll('[data-form-modal-btn]');
	const formModalClose = formModal.querySelector('[data-modal-close]');
	const formModalContent = formModal.querySelector('[data-modal-content]');

	fromModalOpenBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			setModalState(formModal, true);
		});
	});

	formModalClose.addEventListener('click', () => {
		setModalState(formModal, false);
	});

	formModalContent.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	formModal.addEventListener('click', () => {
		setModalState(formModal, false);
	});

	// Order form
	const orderForms = document.querySelectorAll('[data-form]');

	orderForms.forEach((orderForm) => {
		orderForm.addEventListener('submit', function (e) {
			const form = this;
			const service = emailSettings.serviceId;
			const user = emailSettings.userId;
			const submitBtn = form.querySelector('button[type=submit]');
			const templateId = emailSettings.templatePaymentId;
			e.preventDefault();

			submitBtn.disabled = true;

			emailjs.sendForm(service, templateId, e.target, user).then(
				(res) => {
					if (res.status === 200) {
						submitBtn.disabled = false;
						form.querySelectorAll('input').forEach((input) => {
							input.value = '';
						});
						setModalState(formModal, false);

						setTimeout(function () {
							setModalState(successModal, true);
						}, 500);
					}
				},
				(err) => {
					if (err) {
						submitBtn.disabled = false;

						form.insertAdjacentHTML(
							'beforeend',
							'<div class="form__error">Помилка при відправленні заявки! <br /> Спробуйте пізніше!</div>'
						);

						setTimeout(function () {
							form.querySelector('.form__error').remove();
						}, 2500);
					}
				}
			);
		});
	});
});
