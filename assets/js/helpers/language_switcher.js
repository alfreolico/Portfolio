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
			'Como desarrollador fullstack, combino un dominio técnico integral con habilidades interpersonales para abarcar todas las fases del desarrollo de software. Domino lenguajes como HTML, CSS y JavaScript en el frontend, junto con frameworks modernos como React y Tailwind CSS. En el backend trabajo con tecnologías como Node.js y Django, y gestiono bases de datos relacionales como PostgreSQL y bases de datos no relacionales. Implemento buenas prácticas de seguridad y utilizo herramientas como Git y Docker para optimizar procesos. Mi capacidad de comunicación, resolución de problemas y adaptabilidad me permite colaborar eficazmente en equipo y entregar soluciones de alta calidad.',

		// Skills Categories
		skillsCategoryFrontend: 'Frontend',
		skillsCategoryBackend: 'Backend & Bases de Datos',
		skillsCategoryTools: 'Herramientas',

		// Frontend Skills
		skillHtmlTitle: 'HTML',
		skillHtmlDesc:
			'Tengo conocimiento en HTML, lo que me permite estructurar contenido de manera clara y semántica. Utilizo etiquetas adecuadas para organizar la información y mejorar la accesibilidad, como encabezados, párrafos, listas y formularios interactivos.',
		skillCssTitle: 'CSS3',
		skillCssDesc:
			'Tengo dominio en CSS3, que utilizo para diseñar interfaces web atractivas y responsivas. Mis habilidades incluyen el uso de selectores avanzados, flexbox, grid, animaciones y transiciones para mejorar la interacción del usuario.',
		skillJsTitle: 'Javascript',
		skillJsDesc:
			'Tengo experiencia con JavaScript, lo que me permite desarrollar soluciones interactivas y dinámicas en la web. Mis habilidades incluyen manipulación del DOM, gestión de eventos, y consumo de APIs mediante fetch.',
		skillTsTitle: 'TypeScript',
		skillTsDesc:
			'Utilizo TypeScript para desarrollar aplicaciones JavaScript más robustas mediante tipado estático. Mi experiencia incluye definición de interfaces y tipos personalizados, integración con React y Node.js, y detección temprana de errores.',
		skillReactTitle: 'React',
		skillReactDesc:
			'Desarrollo aplicaciones web modernas con React, utilizando hooks como useState y useEffect para gestionar estado. Tengo experiencia en componentes funcionales, manejo de props, React Router, y consumo de APIs REST.',
		skillTailwindTitle: 'Tailwind CSS',
		skillTailwindDesc:
			'Utilizo Tailwind CSS para crear interfaces modernas y responsivas mediante clases utilitarias. Mi experiencia incluye diseño de layouts complejos, personalización de temas y optimización del build para producción.',

		// Backend Skills
		skillNodeTitle: 'Node.js',
		skillNodeDesc:
			'Desarrollo aplicaciones backend con Node.js, creando APIs RESTful eficientes y escalables. Mi experiencia incluye manejo de peticiones asíncronas, conexión con bases de datos y buenas prácticas de seguridad.',
		skillExpressTitle: 'Express.js',
		skillExpressDesc:
			'Desarrollo APIs con Express.js, el framework web más popular de Node.js. Mis habilidades incluyen creación de rutas RESTful, middleware personalizado, validación de datos y gestión de errores centralizada.',
		skillPostgresTitle: 'PostgreSQL',
		skillPostgresDesc:
			'Trabajo con PostgreSQL para gestionar bases de datos relacionales. Mis habilidades incluyen diseño de esquemas normalizados, consultas SQL complejas con joins, creación de índices y manejo de transacciones.',
		skillMongoTitle: 'MongoDB',
		skillMongoDesc:
			'Trabajo con MongoDB para gestionar bases de datos NoSQL flexibles. Mi experiencia incluye diseño de esquemas orientados a documentos, operaciones CRUD, agregaciones y uso de Mongoose para modelado de datos.',

		// Tools
		skillGitTitle: 'Git & GitHub',
		skillGitDesc:
			'Domino Git para control de versiones y GitHub para colaboración. Mis habilidades incluyen gestión de ramas con Git Flow, pull requests, code reviews y uso de GitHub Actions para CI/CD.',

		// Soft Skills
		softSkillsTitle: 'Habilidades Blandas',
		softSkill1: 'Resolución de problemas',
		softSkill2: 'Comunicación efectiva',
		softSkill3: 'Trabajo en equipo',
		softSkill4: 'Adaptabilidad',
		softSkill5: 'Pensamiento crítico',
		softSkill6: 'Aprendizaje continuo',
		softSkill7: 'Gestión del tiempo',
		softSkill8: 'Atención al detalle',

		// Projects
		projectsTitle: 'Proyectos',
		project1Name: 'Rick and Morty Character Explorer',
		project1Desc:
			'Aplicación web interactiva desarrollada con React que consume la API de Rick and Morty para explorar personajes de la serie. Implementa búsqueda en tiempo real, filtrado por estado (vivo/muerto/desconocido), paginación, y visualización detallada de información. Utiliza React Hooks (useState, useEffect), manejo de estados, peticiones asíncronas con fetch, y diseño responsivo con CSS3. Demuestra habilidades en consumo de APIs REST, gestión de componentes y experiencia de usuario fluida.',
		project2Name: 'Be My Valentine',
		project2Desc:
			'Aplicación web interactiva y creativa desarrollada con JavaScript vanilla que presenta un juego divertido de San Valentín. Implementa lógica de juego con eventos del DOM, manipulación dinámica de elementos HTML, animaciones CSS personalizadas, y diseño responsivo. Utiliza programación orientada a eventos, gestión de estados sin frameworks, y técnicas modernas de JavaScript (ES6+). Demuestra creatividad en el diseño UX/UI y habilidades en desarrollo frontend sin dependencias externas.',
		project3Name: 'Pokédex',
		project3Desc:
			'Pokédex interactiva desarrollada con React que consume la PokeAPI para explorar el universo Pokémon. Incluye búsqueda avanzada por nombre o número, filtrado por tipos, visualización de estadísticas detalladas, evoluciones y habilidades. Utiliza React Hooks para gestión de estado, Context API para compartir datos globales, lazy loading para optimizar rendimiento, y diseño responsivo con CSS moderno. Implementa arquitectura de componentes escalable y mejores prácticas de React para una experiencia de usuario óptima.',
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
			'I am a mechanical engineer and developer with emerging experience in the fullstack field, but with a strong inclination towards backend development. I excel in creating and managing robust systems, focusing on server-side logic, database management, and API implementation. My interest lies in understanding and optimizing the internal workings of applications, ensuring performance, scalability, and security. Although I am exploring frontend technologies, I feel more comfortable working with backend tools and languages such as Node.js and Python, as well as relational and non-relational database systems like PostgreSQL. I consider myself a person committed to my work and with a passion for continuous learning. My focus is on learning and growing professionally, providing reliable solutions and always seeking to improve my technical skills.',

		// Skills
		skillsTitle: 'Skills',
		skillsDescription:
			'As a fullstack developer, I combine comprehensive technical mastery with interpersonal skills to cover all phases of software development. I master languages like HTML, CSS, and JavaScript on the frontend, along with modern frameworks like React and Tailwind CSS. On the backend, I work with technologies like Node.js and Django, and manage relational databases like PostgreSQL and non-relational databases. I implement security best practices and use tools like Git and Docker to optimize processes. My communication skills, problem-solving abilities, and adaptability allow me to collaborate effectively in teams and deliver high-quality solutions.',

		// Skills Categories
		skillsCategoryFrontend: 'Frontend',
		skillsCategoryBackend: 'Backend & Databases',
		skillsCategoryTools: 'Tools',

		// Frontend Skills
		skillHtmlTitle: 'HTML',
		skillHtmlDesc:
			'I have knowledge in HTML, which allows me to structure content in a clear and semantic way. I use appropriate tags to organize information and improve accessibility, such as headings, paragraphs, lists, and interactive forms.',
		skillCssTitle: 'CSS3',
		skillCssDesc:
			'I have mastery in CSS3, which I use to design attractive and responsive web interfaces. My skills include the use of advanced selectors, flexbox, grid, animations, and transitions to enhance user interaction.',
		skillJsTitle: 'Javascript',
		skillJsDesc:
			'I have experience with JavaScript, which allows me to develop interactive and dynamic solutions on the web. My skills include DOM manipulation, event handling, and consuming APIs using fetch.',
		skillTsTitle: 'TypeScript',
		skillTsDesc:
			'I use TypeScript to develop more robust JavaScript applications through static typing. My experience includes defining interfaces and custom types, integration with React and Node.js, and early error detection.',
		skillReactTitle: 'React',
		skillReactDesc:
			'I develop modern web applications with React, using hooks like useState and useEffect to manage state. I have experience in functional components, props handling, React Router, and consuming REST APIs.',
		skillTailwindTitle: 'Tailwind CSS',
		skillTailwindDesc:
			'I use Tailwind CSS to create modern and responsive interfaces using utility classes. My experience includes designing complex layouts, theme customization, and optimizing the build for production.',

		// Backend Skills
		skillNodeTitle: 'Node.js',
		skillNodeDesc:
			'I develop backend applications with Node.js, creating efficient and scalable RESTful APIs. My experience includes handling asynchronous requests, connecting to databases, and implementing security best practices.',
		skillExpressTitle: 'Express.js',
		skillExpressDesc:
			'I develop APIs with Express.js, the most popular Node.js web framework. My skills include creating RESTful routes, custom middleware, data validation, and centralized error handling.',
		skillPostgresTitle: 'PostgreSQL',
		skillPostgresDesc:
			'I work with PostgreSQL to manage relational databases. My skills include designing normalized schemas, complex SQL queries with joins, creating indexes, and transaction handling.',
		skillMongoTitle: 'MongoDB',
		skillMongoDesc:
			'I work with MongoDB to manage flexible NoSQL databases. My experience includes designing document-oriented schemas, CRUD operations, aggregations, and using Mongoose for data modeling.',

		// Tools
		skillGitTitle: 'Git & GitHub',
		skillGitDesc:
			'I master Git for version control and GitHub for collaboration. My skills include branch management with Git Flow, pull requests, code reviews, and using GitHub Actions for CI/CD.',

		// Soft Skills
		softSkillsTitle: 'Soft Skills',
		softSkill1: 'Problem-solving',
		softSkill2: 'Effective communication',
		softSkill3: 'Teamwork',
		softSkill4: 'Adaptability',
		softSkill5: 'Critical thinking',
		softSkill6: 'Continuous learning',
		softSkill7: 'Time management',
		softSkill8: 'Attention to detail',

		// Projects
		projectsTitle: 'Projects',
		project1Name: 'Rick and Morty Character Explorer',
		project1Desc:
			'Interactive web application developed with React that consumes the Rick and Morty API to explore characters from the series. Implements real-time search, filtering by status (alive/dead/unknown), pagination, and detailed information display. Uses React Hooks (useState, useEffect), state management, asynchronous requests with fetch, and responsive design with CSS3. Demonstrates skills in REST API consumption, component management, and seamless user experience.',
		project2Name: 'Be My Valentine',
		project2Desc:
			"Interactive and creative web application developed with vanilla JavaScript featuring a fun Valentine's Day game. Implements game logic with DOM events, dynamic HTML element manipulation, custom CSS animations, and responsive design. Uses event-driven programming, state management without frameworks, and modern JavaScript techniques (ES6+). Demonstrates creativity in UX/UI design and frontend development skills without external dependencies.",
		project3Name: 'Pokédex',
		project3Desc:
			'Interactive Pokédex developed with React that consumes the PokeAPI to explore the Pokémon universe. Includes advanced search by name or number, filtering by types, detailed statistics visualization, evolutions, and abilities. Uses React Hooks for state management, Context API to share global data, lazy loading for performance optimization, and responsive design with modern CSS. Implements scalable component architecture and React best practices for an optimal user experience.',
		projectButtonDemo: 'VIEW DEMO',
		projectButtonCode: 'VIEW CODE',

		// Contact
		contactTitle: 'Contact',
		contactInfoTitle: 'Contact Information',
		contactInfoDesc: 'Get in touch with me to bring your ideas to life.',
		contactWhatsapp: 'Send WhatsApp message',
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

	// Skills Categories
	const categoryTitles = document.querySelectorAll('.skills__category-title');
	if (categoryTitles.length >= 3) {
		categoryTitles[0].textContent = t.skillsCategoryFrontend;
		categoryTitles[1].textContent = t.skillsCategoryBackend;
		categoryTitles[2].textContent = t.skillsCategoryTools;
	}

	// All Skill Cards (Frontend, Backend, Tools)
	const allSkillCards = document.querySelectorAll('.skills__card-container');
	const skillTranslations = [
		// Frontend (6 skills)
		{ title: t.skillHtmlTitle, desc: t.skillHtmlDesc },
		{ title: t.skillCssTitle, desc: t.skillCssDesc },
		{ title: t.skillJsTitle, desc: t.skillJsDesc },
		{ title: t.skillTsTitle, desc: t.skillTsDesc },
		{ title: t.skillReactTitle, desc: t.skillReactDesc },
		{ title: t.skillTailwindTitle, desc: t.skillTailwindDesc },
		// Backend (4 skills)
		{ title: t.skillNodeTitle, desc: t.skillNodeDesc },
		{ title: t.skillExpressTitle, desc: t.skillExpressDesc },
		{ title: t.skillPostgresTitle, desc: t.skillPostgresDesc },
		{ title: t.skillMongoTitle, desc: t.skillMongoDesc },
		// Tools (1 skill)
		{ title: t.skillGitTitle, desc: t.skillGitDesc },
	];

	allSkillCards.forEach((card, index) => {
		if (skillTranslations[index]) {
			const title = card.querySelector('.skills__card-title');
			const desc = card.querySelector('.skills__card-description');
			if (title) title.textContent = skillTranslations[index].title;
			if (desc) desc.textContent = skillTranslations[index].desc;
		}
	});

	// Soft Skills
	const softSkillsTitle = document.querySelector('.skills__tags-title');
	if (softSkillsTitle) softSkillsTitle.textContent = t.softSkillsTitle;

	const softSkillTags = document.querySelectorAll('.skills__tag');
	if (softSkillTags.length >= 8) {
		softSkillTags[0].textContent = t.softSkill1;
		softSkillTags[1].textContent = t.softSkill2;
		softSkillTags[2].textContent = t.softSkill3;
		softSkillTags[3].textContent = t.softSkill4;
		softSkillTags[4].textContent = t.softSkill5;
		softSkillTags[5].textContent = t.softSkill6;
		softSkillTags[6].textContent = t.softSkill7;
		softSkillTags[7].textContent = t.softSkill8;
	}

	// Projects
	const projectsTitle = document.querySelector('#projects .section__title');
	if (projectsTitle) projectsTitle.textContent = t.projectsTitle;

	const projects = document.querySelectorAll('.projects__project');
	if (projects.length >= 3) {
		// Project 1
		const proj1Name = projects[0].querySelector('.projects__name');
		const proj1Desc = projects[0].querySelector('.projects__description');
		if (proj1Name) proj1Name.textContent = t.project1Name;
		if (proj1Desc) proj1Desc.textContent = t.project1Desc;

		// Project 2
		const proj2Name = projects[1].querySelector('.projects__name');
		const proj2Desc = projects[1].querySelector('.projects__description');
		if (proj2Name) proj2Name.textContent = t.project2Name;
		if (proj2Desc) proj2Desc.textContent = t.project2Desc;

		// Project 3
		const proj3Name = projects[2].querySelector('.projects__name');
		const proj3Desc = projects[2].querySelector('.projects__description');
		if (proj3Name) proj3Name.textContent = t.project3Name;
		if (proj3Desc) proj3Desc.textContent = t.project3Desc;
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
