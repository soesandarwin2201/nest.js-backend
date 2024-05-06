import rateLimit from 'express-rate-limit';

const configureRateLimit = app => {
	const limiter = rateLimit({
		windowMs: 5 * 60 * 1000, // 10 minutes
		max: 1000, // limit each IP to 1000 requests per windowMs
	});
	app.use(limiter);
};

export default configureRateLimit;
