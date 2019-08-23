module.exports = {
    Query: {
        posts: async (parent, { userId }, { models, req }) => {
            console.log("useId", userId)
            const posts = await models.Post.find({ userId });
            return posts;
        }
    },
    Mutation: {
        createPost: async (parent, { title, description, image, userId }, { models }) => {
            const post = new models.Post({ title, description, image, userId });
            try {
                await post.save();
            } catch (e) {
                throw new Error('Cannot Save Post!!!');
            }
            return post;
        }
    },
    Post: {
        userId: async ({ userId }, args, { models }) => {
            const user = await models.User.findOne({ _id: userId });
            return user;
        }
    }
};