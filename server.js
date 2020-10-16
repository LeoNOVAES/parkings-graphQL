const { GraphQLServer } = require('graphql-yoga');

let cities = [];

const resolvers = {
    Query: {
      getCities: () => cities,
      getCityById: (root, params) => {
        const city = cities.filter((c) => {
            return c.id === params.id
        });
        return city[0];
      }
    },
    Mutation: {
        addCity: (root, params) => {
            cities.push(params.city)
            return params.city;
        },
        deleteCity: (root, params) => {
            cities = cities.filter((c) => {
                return c.id !== params.id
            });
            return `cidade deletada com sucesso`;
        }

    }
}
  
const server = new GraphQLServer({
    resolvers,
    typeDefs: './schema.graphql'
});

server.start(() => console.log('run in 4000'));
