export async function up(knex): Promise<any> {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("name", 50);
  });
}

export async function down(knex): Promise<any> {
  return knex.schema.dropTable("users");
}
