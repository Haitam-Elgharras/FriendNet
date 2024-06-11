const { default: mongoose } = require("mongoose");

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('posts').insertMany([
      {
        _id: new mongoose.Types.ObjectId(),
        userId: '66426baf36d6920379d61782',
        firstName: 'Haitam',
        lastName: 'Elgharras',
        location: 'morocco',
        description: 'This is my post for testing',
        userPicturePath: 'meeting.png',
        likes: { '66426baf36d6920379d61782': true },
        comments: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        _id: new mongoose.Types.ObjectId(),
        userId: '66426baf36d6920379d61782',
        firstName: 'Haitam',
        lastName: 'Elgharras',
        location: 'morocco',
        description: 'This is my 2nd post for testing',
        userPicturePath: 'meeting.png',
        likes: { '66426baf36d6920379d61782': true },
        comments: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
