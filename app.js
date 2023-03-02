const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(bodyParser.json());

var schema = buildSchema(`
  type query {
    hello: String
  }

  type mutation {
    sayHi(name: String): String
  }

  schema {
    query: query
    mutation: mutation
  }
`);

var rootValue = {
    hello: () => {
        return 'Hello world!';
    },
    sayHi: (args) => {
        return `Hi, ${args.name}!`;
    }
};

app.get('/', (req, res) => {
    res.send('Hello from GraphQL demo!')
})

app.use('/v2/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
}));

app.listen(2233, () => {
    console.log(`Running a server at 2233`)
})
