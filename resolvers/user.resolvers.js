module.exports = {
    Query: {
        userProfile: async (parent, { _id }, { models }) => {
            const user = await models.User.find({ _id });
            console.log(user);
            return user;
        },
    },
    Mutation: {
        createUser: async (parent, { firstName, lastName, email, password }, { models }) => {
            console.log(models)
            const User = await models.User.findOne({ email });
            if (User) {
                throw new Error('Please provide a unique email.');
            }
            const user = new models.User({ firstName, lastName, email, password });
            try {
                await user.save();
            } catch (e) {
                throw new Error('Cannot Save Post!!!');
            }
            return user;
        },
        login: async (parent, { email, password }, { models, req }) => {
            const user = await models.User.findOne({ email });
            if (!user) throw new Error('No Such User exists.');
            user.comparePassword(password, function (err, isMatch) {
                if (err) throw new Error('Incorrect password.');
                if (!isMatch) throw new Error('Incorrect password.');
            });
            return user;
        }
    }
};