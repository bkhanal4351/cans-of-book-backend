'uses strict'

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function seed() {

  await Book.create({
    title: "The Alchemist",
    description: "A classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself and focus on what really matters in life.",
    status: true,
    email: "test.test@email.com",

  });

  await Book.create({
    title: "Crying in H Mart",
    description: "An unflinching, powerful memoir about growing up Korean American, losing her mother, and forging her own identity",
    status: true,
    email: "ella.svete@gmail.com",
  });
  console.log("crying in H Mart was added");

  await Book.create({
    title: "Animal Farm",
    description: "Animal Farm is a satirical allegorical novella by George Orwell, first published in England on 17 August 1945. The book tells the story of a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy.",
    status: false,
    email: "ella.svete@gmail.com",

  });

  mongoose.disconnect();
  
}

seed();