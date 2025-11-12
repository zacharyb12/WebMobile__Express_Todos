import { decodeToken } from "../utils/jwt.utils.js";


export function authentificationMiddleware() {
    return async (req, res, next) => {

        const authData = req.headers['authorization'] ?? '';

        const [prefix, token] = authData.split(' ');

        if (prefix?.toLowerCase() !== 'bearer' || !token) {
            req.user = null;
            next();
            return;
        }

        try {
            req.user = await decodeToken(token);
        }
        catch {
            req.user = null;
        }

        next();
    };
}

export function authorizeMiddleware(...roles) {
    return async (req, res, next) => {
        if (!req.user) {
            res.sendStatus(401); // unauthorized

            return;
        }

        if (roles.length > 0 && !roles.includes(req.user.role)) {
            res.sendStatus(403); // forbidden
        }

        next();
    }
}