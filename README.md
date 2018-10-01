

graphql-POC

- 1. npm init
- 2. npm install —save express express-graphql graphql lodash 
- 3. Writing Basic Server
# Building a Server 

### server.js

```js
const express = require('express');
const expressGraphQL = require('express-graphql');


const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Listening PORT 4000...')
})
```
# Building a schema

```js
schema/schema.js

const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    { id: '23', firstName: 'Yanelli Santamarina Velazquez', age: 34 },
    { id: '24', firstName: 'Fernando Robles Rivera', age: 33 },
    { id: '25', firstName: 'Nancy Botello Carmona', age: 34 },
    { id: '26', firstName: 'Pimpoyita Carmona', age: 34 },
    { id: '27', firstName: 'Teresa Carmona', age: 34 },
    { id: '28', firstName: 'Adan Israel Resendiz', age: 36 },
    { id: '29', firstName: 'Gerardo Rivera Corpus', age: 33 },
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

```

# Run Server

execute node server.js in the root project & see in navigator localhost:4000/graphql

In the console of de grapnel execute this query example

```js
{
  user(id: "29") {
    id
    firstName
    age
  }
}
```


Changing Harcode data for Dynamic Data

```unix
npm install —save json-server
````

Agregar whatcher a package.json “json-server”: “json-server —watch db.json” 

execute npm run json:server in terminal 

The terminal response with

```unix
 \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3000/users

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...

GET /users 200 11.311 ms - 566

```

## Connect to Server with AXIOS

```unix
npm install —save axios
```

Adding Visual Schemas with Voyager

changes in Server

```js
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
```


automate changes in Server

```unix
npm install —save nodemon
```

— MUTATION

post

```js
mutation{
 addUser(firstName: "Adriana Botello Carmona", age: 30){
    id,
    firstName,
    age
  }
}
```

delete

```js
mutation{
	deleteUser(id:"23") {
	  id
	}
} 
```

patch

```js
mutation{
 	updateUser(id:"YzS9xjq", age:33, companyId: "4"){
  	id
  	age
  	firstName	
	}
}
```