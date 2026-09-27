import { GalleryItem } from "../models/GalleryItem";
import { galleryItemCreateSchema, galleryItemUpdateSchema } from "../validators/gallery";
import { createCrudController } from "../utils/crudFactory";

export const galleryController = createCrudController(GalleryItem, {
  createSchema: galleryItemCreateSchema,
  updateSchema: galleryItemUpdateSchema,
  notFoundMessage: "Gallery item not found.",
});
