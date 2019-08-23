const { GraphQLServer } = require('graphql-yoga');
var jwt = require('jsonwebtoken');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const models = require('./models/index');

console.log(resolvers)

let authenticate = async (resolve, root, args, context, info) => {
    let token;
    try {
        token = jwt.verify(context.request.get("Authorization"), "secret");
    } catch (e) {
        return new AuthenticationError("Not authorised");
    }
    context.claims = token.claims;
    const result = await resolve(root, args, context, info);
    return result;
};
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: req => ({ ...req, models }),
    //middlewares: [authenticate]
});
server.start(() => {
    console.log(`😄 Server running at http://localhost:4000`);
    require('./db');
});