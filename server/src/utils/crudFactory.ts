import type { Request, Response } from "express";
import type { Model } from "mongoose";
import type { ZodType } from "zod";
import { ApiError } from "./ApiError";
import { asyncHandler } from "./asyncHandler";

interface CrudFactoryOptions<TCreate, TUpdate> {
  createSchema: ZodType<TCreate>;
  updateSchema: ZodType<TUpdate>;
  sort?: Record<string, 1 | -1>;
  notFoundMessage?: string;
}

/**
 * Standard list/get/create/update/delete handlers for a "published"-gated
 * content collection (Event, GalleryItem, Testimonial). Not used for the
 * two singletons (BibleStudy, SiteSettings), which have their own simpler
 * get-or-create + update controllers.
 *
 * The published/draft split is enforced here, once: list() and getOne()
 * only see drafts when req.user is set (i.e. the request carried a valid
 * session cookie — see middleware/auth.ts's attachUserIfPresent). Every
 * route built from this factory is mounted with attachUserIfPresent for
 * reads and requireAuth for the mutations.
 */
export const createCrudController = <TDoc, TCreate, TUpdate>(
  model: Model<TDoc>,
  { createSchema, updateSchema, sort, notFoundMessage = "Not found." }: CrudFactoryOptions<TCreate, TUpdate>,
) => {
  const list = asyncHandler(async (req: Request, res: Response) => {
    const filter = req.user ? {} : { published: true };
    const items = await model.find(filter).sort(sort ?? { createdAt: -1 });
    res.json({ items });
  });

  const getOne = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findById(req.params.id);
    // An unpublished item 404s for anyone without a session, the same as
    // if it didn't exist — it must not reveal that draft content exists.
    if (!item || (!(item as { published?: boolean }).published && !req.user)) {
      throw new ApiError(404, notFoundMessage);
    }
    res.json({ item });
  });

  const create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, parsed.error.issues[0]?.message ?? "Invalid request.");
    }
    const item = await model.create(parsed.data as Record<string, unknown>);
    res.status(201).json({ item });
  });

  const update = asyncHandler(async (req: Request, res: Response) => {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new ApiError(400, parsed.error.issues[0]?.message ?? "Invalid request.");
    }
    const item = await model.findByIdAndUpdate(req.params.id, parsed.data as Record<string, unknown>, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      throw new ApiError(404, notFoundMessage);
    }
    res.json({ item });
  });

  const remove = asyncHandler(async (req: Request, res: Response) => {
    const item = await model.findByIdAndDelete(req.params.id);
    if (!item) {
      throw new ApiError(404, notFoundMessage);
    }
    res.json({ message: "Deleted." });
  });

  return { list, getOne, create, update, remove };
};
