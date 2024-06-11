import mongoose from 'mongoose';

export const connectionDB = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
        })
        .catch((error) => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.error(error);
        });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to db...');
    });

    mongoose.connection.on('error', err => {
        console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected...');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(
                'Mongoose connection is disconnected due to app termination...'
            );
            process.exit(0);
        });
    });
}
