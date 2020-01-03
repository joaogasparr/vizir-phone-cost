module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'rates',
      [
        {
          origin_id: 1,
          destiny_id: 6,
          price: 1.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin_id: 6,
          destiny_id: 1,
          price: 2.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin_id: 1,
          destiny_id: 7,
          price: 1.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin_id: 7,
          destiny_id: 1,
          price: 2.7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin_id: 1,
          destiny_id: 8,
          price: 0.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          origin_id: 8,
          destiny_id: 1,
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
