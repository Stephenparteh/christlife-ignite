import { Event } from "../models/Event";
import { eventCreateSchema, eventUpdateSchema } from "../validators/event";
import { createCrudController } from "../utils/crudFactory";

export const eventsController = createCrudController(Event, {
  createSchema: eventCreateSchema,
  updateSchema: eventUpdateSchema,
  sort: { featured: -1, createdAt: -1 },
  notFoundMessage: "Event not found.",
});
