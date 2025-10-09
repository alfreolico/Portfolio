// assets/js/helpers/language_switcher.js

const translations = {
	es: {
		// Navbar
		navHome: 'Inicio',
		navAbout: 'Acerca de Mí',
		navSkills: 'Habilidades',
		navProjects: 'Portafolio',
		navContact: 'Contacto',

		// Home
		homeTitle: '¿Sabías qué?:',
		homeDescription: 'Si estas buscando un fullstack. SOY LO QUE TÚ NECESITAS!',
		homeButton: 'Descargar CV',

		// About
		aboutTitle: 'Acerca de Mí',
		aboutDescription:
			'Soy un ingeniero mecánico y desarrollador con experiencia incipiente en el ámbito fullstack, pero con una fuerte inclinación hacia el desarrollo backend. Me destaco en la creación y gestión de sistemas robustos, enfocados en la lógica del servidor, la gestión de bases de datos y la implementación de APIs. Mi interés radica en comprender y optimizar el funcionamiento interno de las aplicaciones, asegurando rendimiento, escalabilidad y seguridad. Aunque estoy explorando tecnologías de frontend, me siento más cómodo trabajando con herramientas y lenguajes backend como Node.js y Python, además de sistemas de bases de datos relacionales y no relacionales como PostgreSQL. Me considero una persona comprometida con mi trabajo y con una pasión por el aprendizaje continuo. Mi enfoque está en aprender y crecer profesionalmente, aportando soluciones confiables y buscando siempre mejorar mis habilidades técnicas.',

		// Skills
		skillsTitle: 'Habilidades',
		skillsDescription:
			'Como desarrollador fullstack, combino un dominio técnico integral con habilidades interpersonales para abarcar todas las fases del desarrollo de software. Domino lenguajes como HTML, CSS y JavaScript en el frontend, junto con frameworks modernos como React, y trabajo en el backend con tecnologías como Node.js y Django. También gestiono bases de datos relacionales y no relacionales, implemento buenas prácticas de seguridad y utilizo herramientas como Git y Docker para optimizar procesos. Mi capacidad de comunicación, resolución de problemas y adaptabilidad me permite colaborar eficazmente en equipo y entregar soluciones de alta calidad.',
		skillHtmlTitle: 'HTML',
		skillHtmlDesc:
			'Tengo conocimiento en HTML, lo que me permite estructurar contenido de manera clara y semántica. Utilizo etiquetas adecuadas para organizar la información y mejorar la accesibilidad, como encabezados, párrafos, listas y formularios interactivos. También me enfoco en seguir buenas prácticas, como mantener código limpio, accesible y optimizado para motores de búsqueda, asegurando siempre una experiencia de usuario efectiva.',
		skillCssTitle: 'CSS3',
		skillCssDesc:
			'Tengo dominio en CSS3, que utilizo para diseñar interfaces web atractivas y responsivas. Mis habilidades incluyen el uso de selectores avanzados, diseño flexible con técnicas como flexbox y grid, animaciones y transiciones para mejorar la interacción del usuario, y personalización de estilos mediante variables CSS. Además, optimizo el diseño para diferentes dispositivos utilizando consultas de medios y sigo las mejores prácticas para garantizar un código limpio, reutilizable y escalable.',
		skillJsTitle: 'Javascript',
		skillJsDesc:
			'Tengo experiencia con JavaScript, lo que me permite desarrollar soluciones interactivas y dinámicas en la web. Mis habilidades incluyen manipulación del DOM, gestión de eventos, y consumo de APIs mediante fetch. También trabajo con almacenamiento local, control de estado, y frameworks modernos como React. Utilizo buenas prácticas como modularidad y manejo de errores para garantizar código eficiente y escalable.',
		softSkillsTitle: 'Habilidades Blandas',
		softSkill1: 'Atención al detalle',
		softSkill2: 'Trabajo en equipo',
		softSkill3: 'Creativo',
		softSkill4: 'Pensamiento Crítico',
		softSkill5: 'Proactivo',
		softSkill6: 'Autodidacta',

		// Projects
		projectsTitle: 'Proyectos',
		project1Name: 'Proyecto 1',
		project1Desc: 'Me encuentro trabajando en ellos.',
		project2Name: 'Proyecto 2',
		project2Desc: 'Me encuentro trabajando en ello.',
		projectButtonDemo: 'VER DEMO',
		projectButtonCode: 'VER CÓDIGO',

		// Contact
		contactTitle: 'Contacto',
		contactInfoTitle: 'Información de contacto',
		contactInfoDesc: 'Ponte en contacto conmigo, para materializar tus ideas.',
		contactWhatsapp: 'Enviar mensaje a WhatsApp',
		contactLocation: 'Carmen, Campeche, México.',
		contactFormTitle: 'Enviar mensaje',
		contactFormName: 'Nombre',
		contactFormEmail: 'Correo',
		contactFormSubject: 'Asunto',
		contactFormMessage: 'Mensaje',
		contactFormButton: 'Enviar',
		contactFormSuccess: 'Formulario enviado con éxito!',
		contactFormClose: 'Cerrar',

		// Footer
		footerDescription: 'SOY LO QUE TÚ NECESITAS!',
		footerSocialTitle: 'Redes Sociales',
		footerCopy: 'Todos los derechos reservados',
	},

	en: {
		// Navbar
		navHome: 'Home',
		navAbout: 'About Me',
		navSkills: 'Skills',
		navProjects: 'Portfolio',
		navContact: 'Contact',

		// Home
		homeTitle: 'Did you know?:',
		homeDescription:
			"If you're looking for a fullstack developer, I'M WHAT YOU NEED!",
		homeButton: 'Download CV',

		// About
		aboutTitle: 'About Me',
		aboutDescription:
			'I am a mechanical engineer and developer with emerging experience in the fullstack field, but with a strong inclination towards backend development. I excel at creating and managing robust systems, focused on server logic, database management, and API implementation. My interest lies in understanding and optimizing the internal workings of applications, ensuring performance, scalability, and security. Although I am exploring frontend technologies, I feel more comfortable working with backend tools and languages such as Node.js and Python, as well as relational and non-relational database systems like PostgreSQL. I consider myself a person committed to my work with a passion for continuous learning. My focus is on learning and growing professionally, providing reliable solutions and always seeking to improve my technical skills.',

		// Skills
		skillsTitle: 'Skills',
		skillsDescription:
			'As a fullstack developer, I combine comprehensive technical mastery with interpersonal skills to cover all phases of software development. I master languages such as HTML, CSS, and JavaScript on the frontend, along with modern frameworks like React, and work on the backend with technologies such as Node.js and Django. I also manage relational and non-relational databases, implement good security practices, and use tools like Git and Docker to optimize processes. My communication skills, problem-solving abilities, and adaptability allow me to collaborate effectively in teams and deliver high-quality solutions.',
		skillHtmlTitle: 'HTML',
		skillHtmlDesc:
			'I have knowledge in HTML, which allows me to structure content in a clear and semantic way. I use appropriate tags to organize information and improve accessibility, such as headings, paragraphs, lists, and interactive forms. I also focus on following best practices, such as maintaining clean, accessible code optimized for search engines, always ensuring an effective user experience.',
		skillCssTitle: 'CSS3',
		skillCssDesc:
			'I have proficiency in CSS3, which I use to design attractive and responsive web interfaces. My skills include the use of advanced selectors, flexible design with techniques like flexbox and grid, animations and transitions to improve user interaction, and style customization through CSS variables. Additionally, I optimize design for different devices using media queries and follow best practices to ensure clean, reusable, and scalable code.',
		skillJsTitle: 'Javascript',
		skillJsDesc:
			'I have experience with JavaScript, which allows me to develop interactive and dynamic web solutions. My skills include DOM manipulation, event handling, and API consumption through fetch. I also work with local storage, state management, and modern frameworks like React. I use best practices such as modularity and error handling to ensure efficient and scalable code.',
		softSkillsTitle: 'Soft Skills',
		softSkill1: 'Attention to detail',
		softSkill2: 'Teamwork',
		softSkill3: 'Creative',
		softSkill4: 'Critical Thinking',
		softSkill5: 'Proactive',
		softSkill6: 'Self-taught',

		// Projects
		projectsTitle: 'Projects',
		project1Name: 'Project 1',
		project1Desc: 'I am currently working on them.',
		project2Name: 'Project 2',
		project2Desc: 'I am currently working on it.',
		projectButtonDemo: 'VIEW DEMO',
		projectButtonCode: 'VIEW CODE',

		// Contact
		contactTitle: 'Contact',
		contactInfoTitle: 'Contact Information',
		contactInfoDesc: 'Get in touch with me to materialize your ideas.',
		contactWhatsapp: 'Send message to WhatsApp',
		contactLocation: 'Carmen, Campeche, Mexico.',
		contactFormTitle: 'Send Message',
		contactFormName: 'Name',
		contactFormEmail: 'Email',
		contactFormSubject: 'Subject',
		contactFormMessage: 'Message',
		contactFormButton: 'Send',
		contactFormSuccess: 'Form submitted successfully!',
		contactFormClose: 'Close',

		// Footer
		footerDescription: "I'M WHAT YOU NEED!",
		footerSocialTitle: 'Social Media',
		footerCopy: 'All rights reserved',
	},
};

function changeLanguage(lang) {
	localStorage.setItem('language', lang);
	document.documentElement.lang = lang;

	const t = translations[lang];

	// Navbar
	const navLinks = document.querySelectorAll('.navbar__link');
	if (navLinks.length >= 5) {
		navLinks[0].textContent = t.navHome;
		navLinks[1].textContent = t.navAbout;
		navLinks[2].textContent = t.navSkills;
		navLinks[3].textContent = t.navProjects;
		navLinks[4].textContent = t.navContact;
	}

	// Home
	const homeTitle = document.querySelector('.home__title');
	const homeDesc = document.querySelector('.home__description');
	const homeBtn = document.querySelector('.btn--primary');
	if (homeTitle) homeTitle.textContent = t.homeTitle;
	if (homeDesc) homeDesc.textContent = t.homeDescription;
	if (homeBtn) homeBtn.textContent = t.homeButton;

	// About
	const aboutTitle = document.querySelector('#about .section__title');
	const aboutDesc = document.querySelector('.about__description');
	if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
	if (aboutDesc) aboutDesc.textContent = t.aboutDescription;

	// Skills
	const skillsTitle = document.querySelector('#skills .section__title');
	const skillsDesc = document.querySelector('.skills__description');
	if (skillsTitle) skillsTitle.textContent = t.skillsTitle;
	if (skillsDesc) skillsDesc.textContent = t.skillsDescription;

	const skillCards = document.querySelectorAll('.skills__card-container');
	if (skillCards.length >= 3) {
		const htmlTitle = skillCards[0].querySelector('.skills__card-title');
		const htmlDesc = skillCards[0].querySelector('.skills__card-description');
		if (htmlTitle) htmlTitle.textContent = t.skillHtmlTitle;
		if (htmlDesc) htmlDesc.textContent = t.skillHtmlDesc;

		const cssTitle = skillCards[1].querySelector('.skills__card-title');
		const cssDesc = skillCards[1].querySelector('.skills__card-description');
		if (cssTitle) cssTitle.textContent = t.skillCssTitle;
		if (cssDesc) cssDesc.textContent = t.skillCssDesc;

		const jsTitle = skillCards[2].querySelector('.skills__card-title');
		const jsDesc = skillCards[2].querySelector('.skills__card-description');
		if (jsTitle) jsTitle.textContent = t.skillJsTitle;
		if (jsDesc) jsDesc.textContent = t.skillJsDesc;
	}

	// Soft Skills
	const softSkillsTitle = document.querySelector('.skills__tags-title');
	if (softSkillsTitle) softSkillsTitle.textContent = t.softSkillsTitle;

	const softSkillTags = document.querySelectorAll('.skills__tag');
	if (softSkillTags.length >= 6) {
		softSkillTags[0].textContent = t.softSkill1;
		softSkillTags[1].textContent = t.softSkill2;
		softSkillTags[2].textContent = t.softSkill3;
		softSkillTags[3].textContent = t.softSkill4;
		softSkillTags[4].textContent = t.softSkill5;
		softSkillTags[5].textContent = t.softSkill6;
	}

	// Projects
	const projectsTitle = document.querySelector('#projects .section__title');
	if (projectsTitle) projectsTitle.textContent = t.projectsTitle;

	const projects = document.querySelectorAll('.projects__project');
	if (projects.length >= 2) {
		const proj1Name = projects[0].querySelector('.projects__name');
		const proj1Desc = projects[0].querySelector('.projects__description');
		if (proj1Name) proj1Name.textContent = t.project1Name;
		if (proj1Desc) proj1Desc.textContent = t.project1Desc;

		const proj2Name = projects[1].querySelector('.projects__name');
		const proj2Desc = projects[1].querySelector('.projects__description');
		if (proj2Name) proj2Name.textContent = t.project2Name;
		if (proj2Desc) proj2Desc.textContent = t.project2Desc;
	}

	const projectButtons = document.querySelectorAll('.projects__button');
	projectButtons.forEach((btn, index) => {
		btn.textContent =
			index % 2 === 0 ? t.projectButtonDemo : t.projectButtonCode;
	});

	// Contact
	const contactTitle = document.querySelector('#contact .section__title');
	const contactInfoTitle = document.querySelector('.contact__info-title');
	const contactInfoDesc = document.querySelector('.contact__info-description');
	const contactWhatsapp = document.querySelector('.contact__info-number a');
	const contactMap = document.querySelector('.contact__info-map');

	if (contactTitle) contactTitle.textContent = t.contactTitle;
	if (contactInfoTitle) contactInfoTitle.textContent = t.contactInfoTitle;
	if (contactInfoDesc) contactInfoDesc.textContent = t.contactInfoDesc;
	if (contactWhatsapp) contactWhatsapp.textContent = t.contactWhatsapp;
	if (contactMap) contactMap.textContent = t.contactLocation;

	// Contact Form
	const formTitle = document.querySelector('.contact__form-title');
	const labelName = document.querySelector('label[for="name"]');
	const labelEmail = document.querySelector('label[for="email"]');
	const labelSubject = document.querySelector('label[for="subject"]');
	const labelMessage = document.querySelector('label[for="message"]');
	const formButton = document.querySelector('.contact__form-button');

	if (formTitle) formTitle.textContent = t.contactFormTitle;
	if (labelName) labelName.textContent = t.contactFormName;
	if (labelEmail) labelEmail.textContent = t.contactFormEmail;
	if (labelSubject) labelSubject.textContent = t.contactFormSubject;
	if (labelMessage) labelMessage.textContent = t.contactFormMessage;
	if (formButton) formButton.textContent = t.contactFormButton;

	const modal = document.querySelector('#modal');
	const btnCloseModal = document.querySelector('#btn_close-modal');
	if (modal && modal.childNodes[0]) {
		modal.childNodes[0].textContent = t.contactFormSuccess;
	}
	if (btnCloseModal) btnCloseModal.textContent = t.contactFormClose;

	// Footer
	const footerDesc = document.querySelector('.footer__description');
	const footerSocialTitle = document.querySelectorAll('.footer__title')[1];
	const footerCopy = document.querySelector('.footer__copy');

	if (footerDesc) footerDesc.textContent = t.footerDescription;
	if (footerSocialTitle) footerSocialTitle.textContent = t.footerSocialTitle;
	if (footerCopy) footerCopy.innerHTML = `&#64;<span> </span>${t.footerCopy}`;
}

export function initLanguageSwitcher() {
	const savedLanguage = localStorage.getItem('language') || 'es';
	const languageToggle = document.getElementById('language-toggle');

	if (languageToggle) {
		languageToggle.checked = savedLanguage === 'en';
		changeLanguage(savedLanguage);

		languageToggle.addEventListener('change', (e) => {
			const newLang = e.target.checked ? 'en' : 'es';
			changeLanguage(newLang);
		});
	}
}
