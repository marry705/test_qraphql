import app from './app';
import dotenv from 'dotenv';

dotenv.config();
app.listen({ port: process.env.PORT || 5000 }, () => console.log('🚀 Server ready'));
