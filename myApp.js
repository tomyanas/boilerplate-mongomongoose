const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();


const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const tomas = new Person({
    name: "Tomas",
    age: 25,
    favoriteFoods: ["pizza", "pasta", "salad"]
  });
tomas.save((err, data) => {
  if (err) {
    console.log(err);
  } else {
  done(null, data);
  }
});
};

const arrayOfPeople = [
  {
    name: "justo", age: 25, favoriteFoods: ["napolitana", "queso", "sushi"]
  },
  {
    name: "Juan", age: 30, favoriteFoods: ["polenta", "pollo", "tomate"]
  },
  {
    name: "Pedro", age: 35, favoriteFoods: ["salchicha", "bife", "pure"]
  },
];


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data.favoriteFoods.push(foodToAdd); //data is the person object that we found by id in the previous step (findById) and we add the food to the array of foods
      data.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          done(null, data);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet },{ new: true }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({age: 0 })
  .exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
  done(null, data);
  }
  });
};



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
