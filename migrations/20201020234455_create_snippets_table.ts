export async function up(knex): Promise<any> {
  return knex.schema.createTable("snippets", (table) => {
    table.increments();
    table.string("snippet", 10000);
    table.integer("parentID");
    table.integer("noteID");
    table.string("direction", 7);
  });
}

export async function down(knex): Promise<any> {
  return knex.schema.dropTable("snippets");
}
