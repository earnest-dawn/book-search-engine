const typeDefs = `
type Book {
    authors: String
    descritpion: String
    bookId: String!
    image: String
    link: String
    Title: String!
}
type User {
    _id:ID
    username: String!
    email: String!
    Password: String!
    savedBooks: [Book]
}

type Auth {
    token: ID
    user: User
}

type Query {
me: User
}

type Mutations {
createUser(username: String!, email: String!, password: String!): Auth
saveBook(bookId: String!, title: String!, link: String!): Book
removeBook(bookId: String!, title: String!, link: String!): Book
login(username: String!, password: String!): Auth

}
`;

module.exports = typeDefs;
