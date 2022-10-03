export const slugify = (title: string) => title
  .trim()
  .toLowerCase()
  .replaceAll(/[~!@#$%^&*()_+{}":><?[\]';,./*-+]/g, "")
  .replaceAll(/\s+/g, "-");
