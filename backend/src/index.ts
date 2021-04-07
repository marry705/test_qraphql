import app from './app';

app.listen({ port: process.env.PORT || 5000 }, () => console.log('🚀 Server ready'));
