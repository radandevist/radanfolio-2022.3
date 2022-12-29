import { notFound, usePathname } from "next/navigation";

import { PATH_NAMES } from "../constants/pathNames";

export default function NotFoundAdminPage() {
  const pathName = usePathname();
  if (!Object.values(PATH_NAMES.admin).includes(pathName || "")) {
    notFound();
  }

  return (
    <div>Not Sorry, page not found</div>
  );
}
