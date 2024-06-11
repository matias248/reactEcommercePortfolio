import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:3001',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}, restriction) => restriction ? cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
})
    : cors()