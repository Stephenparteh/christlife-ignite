import { TeamMember } from "../models/TeamMember";
import { teamMemberCreateSchema, teamMemberUpdateSchema } from "../validators/team";
import { createCrudController } from "../utils/crudFactory";

export const teamController = createCrudController(TeamMember, {
  createSchema: teamMemberCreateSchema,
  updateSchema: teamMemberUpdateSchema,
  sort: { order: 1, createdAt: 1 },
  notFoundMessage: "Team member not found.",
});
