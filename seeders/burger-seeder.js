module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('burgers', [
      {burger_name: "Double Double", devoured: false, createdAt: new Date(), updatedAt: new Date()},
      {burger_name: "Cheeseburger", devoured: false, createdAt: new Date(), updatedAt: new Date()},
      {burger_name: "Protein Style", devoured: false, createdAt: new Date(), updatedAt: new Date()},
      {burger_name: "Animal Style", devoured: false, createdAt: new Date(), updatedAt: new Date()}
    ], {});

  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('burgers', null, {truncate : true});
    
  }

};
