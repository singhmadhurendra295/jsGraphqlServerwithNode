//const path = require('path');
const { fileLoader, mergeResolvers } = require('merge-graphql-schemas');
/* MANUAL APPROACH: Update this file manually with each resolver file */
// import userResolvers from "./user.resolvers";
// import welcomeResolvers from "./welcome.resolvers";
// const resolversArray = [userResolvers, welcomeResolvers];

/*  AUTOMATED APPROACH: Put your resolvers anywhere 
    with ".resolvers.[js/ts]" naming convention */

const userResolvers = require('./user.resolvers');
const postResolvers = require('./post.resolver');
//const resolvers = fileLoader(path.join(__dirname, './**/*.resolvers.*'));
const resolvers = mergeResolvers([userResolvers, postResolvers]);
module.exports = resolvers
