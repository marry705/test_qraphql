import app from './app';
import server from './server';

server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 4000 }, () => console.log('🚀 Server ready'));
