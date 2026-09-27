import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const adminSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    // unique: true both enforces and indexes this at the database level —
    // Mongoose builds the index automatically outside of production.
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // select: false means a plain Admin.find()/findOne() never returns the
    // hash; the login lookup opts back in explicitly with .select("+password").
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

export type AdminSchemaShape = InferSchemaType<typeof adminSchema>;
export type AdminDocument = HydratedDocument<AdminSchemaShape>;

export const Admin = model("Admin", adminSchema);
