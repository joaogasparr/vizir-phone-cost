module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'rates',
      [
        {
          origin: 11,
          destiny: 16,
          price: 1.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin: 16,
          destiny: 11,
          price: 2.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin: 11,
          destiny: 17,
          price: 1.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin: 17,
          destiny: 11,
          price: 2.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin: 11,
          destiny: 18,
          price: 0.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin: 18,
          destiny: 11,
          price: 1.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('rates', null, {});
  },
};
