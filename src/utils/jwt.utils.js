import jwt from 'jsonwebtoken';

export function generateToken({id, username, role}) {
    return new Promise((resolve, reject) => {
        const data = {id, username, role};


        const secretKey = process.env.JWT_SECRET;

        const option = {
            algorithm: 'HS512',
            expiresIn: '1h',
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }

        jwt.sign(data, secretKey, option, (error, token)=> {
            if (error) {
                reject(new Error("Token non généré"));
                return;
            }

            resolve(token);
        })
    });
}

export function decodeToken(token) {
    return new Promise ((resolve, reject)=> {
        const secretKey = process.env.JWT_SECRET;

        const options = {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        }

        jwt.verify(token, secretKey, options, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        })
    })
}
