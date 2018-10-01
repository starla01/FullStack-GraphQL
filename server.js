const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const GraphqlHTTP = require('express-graphql');
const port = 5670;
const app = express();

const middleware = require('graphql-voyager/middleware').express;
const graphFX = GraphqlHTTP({ schema, graphiql: true });

app.use('/voyager', middleware({
    endpointUrl: 'http://127.0.0.1:' + port + '/graphql'
}))
app.use('/graphql', graphFX, expressGraphQL({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log('Listening PORT ' + port + '...')
})