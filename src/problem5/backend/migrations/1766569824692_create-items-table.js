/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.up = (pgm) => {
  // Enable UUID extension (safe to run multiple times)
  pgm.createExtension("uuid-ossp", { ifNotExists: true });

  // Create items table
  pgm.createTable("items", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
    },
    name: {
      type: "text",
      notNull: true,
    },
    description: {
      type: "text",
    },
    is_active: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  // Index for common filtering
  pgm.createIndex("items", "is_active");
};

/**
 * @param {import('node-pg-migrate').MigrationBuilder} pgm
 */
exports.down = (pgm) => {
  pgm.dropTable("items");
};
