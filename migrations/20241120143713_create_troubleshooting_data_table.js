// migrations/<timestamp>_create_troubleshooting_data_table.js
exports.up = function(knex) {
    return knex.schema.createTable('troubleshooting_data', (table) => {
      table.increments('id').primary();
      table.string('failure_point').notNullable();
      table.string('symptom').notNullable();
      table.text('cause').notNullable();
      table.text('corrective_steps').notNullable();
      table.text('notes');
      table.timestamps(true, true); // Automatically create created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('troubleshooting_data');
  };
  