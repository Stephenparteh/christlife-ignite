import { Testimonial } from "../models/Testimonial";
import { testimonialCreateSchema, testimonialUpdateSchema } from "../validators/testimonial";
import { createCrudController } from "../utils/crudFactory";

export const testimonialsController = createCrudController(Testimonial, {
  createSchema: testimonialCreateSchema,
  updateSchema: testimonialUpdateSchema,
  notFoundMessage: "Testimonial not found.",
});
