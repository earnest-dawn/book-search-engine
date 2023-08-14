const { User } = require('../../models');
const { signToken, authError } = require('../../utils/auth');

const resolvers = {
    Query: {
        // getSingleUser: async (parent, args) => {
        //     const desiredUser = await User.findOne({user._id})
        //     return desiredUser
        // },
        me: async (parent, args, context) => {
            if (context.user) {
                const myData = await User.findOne({
                    _id: context.user._id,
                }).select('-__v -password');
                return myData;
            }
            throw authError;
        },
    },
    Mutations: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const savedBook = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return savedBook;
            }
            throw authError;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const deletedBook = await User.findByIdAndDelete(
                    { _id: context.user.id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return deletedBook;
            }
            throw authError;
        },
    },
};
module.exports = resolvers;
