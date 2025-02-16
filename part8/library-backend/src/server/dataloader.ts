import DataLoader from "dataloader";
import { Author, Book } from "../models";

export const bookCountLoader = new DataLoader(
  async (authorIds) => {
    const result = await Book.aggregate([
      {
        $match: {
          author: { $in: authorIds },
        },
      },
      {
        $group: {
          _id: "$author",
          bookCount: { $sum: 1 },
        },
      },
    ]);

    const map = {};
    result.forEach((doc) => (map[doc._id] = doc.bookCount));
    return authorIds.map((id: string) => map[id] || 0);
  },
  { cache: true }
);

export const authorLoader = new DataLoader(async (authorIds) => {
  const result = await Author.find({
    _id: authorIds,
  });

  const map = {};
  result.forEach((doc) => (map[doc._id.toString()] = doc));
  return authorIds.map((id: string) => map[id] || 0);
});
