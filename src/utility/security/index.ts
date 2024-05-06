import configureHelmet from './auth.helmet';
import configureRateLimit from './auth.ratelimit';

export function configureSecurity(app: any) {
	app.disable('x-powered-by');
	configureHelmet(app);
	configureRateLimit(app);
}
