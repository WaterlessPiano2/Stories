export async function up(knex): Promise<any> {
  return knex.schema.createTable("notes", (table) => {
    table.increments();
    table.string("note", 10000);
    table.integer("userId");
    table.boolean("isArchived").defaultTo(false);
  });
}

export async function down(knex): Promise<any> {
  return knex.schema.dropTable("notes");
}
