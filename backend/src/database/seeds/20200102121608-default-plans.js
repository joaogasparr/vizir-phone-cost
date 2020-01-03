module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'FaleMais 30',
          duration: 30,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'FaleMais 60',
          duration: 60,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'FaleMais 120',
          duration: 120,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', null, {});
  },
};
