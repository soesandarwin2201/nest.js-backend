import helmet from 'helmet';

const configureHelmet = app => {
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					// scriptSrc: ["'self'", 'trusted-scripts.com'],
				},
			},
		})
	);
};
export default configureHelmet;
