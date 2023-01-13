// import { useTranslation } from "next-i18next";

// import { ProjectComponent, ProjectComponentProps } from "./ProjectComponent";

// type FeaturedProjectProps = {
//   projects: ProjectComponentProps[];
// };

// export const FeaturedProjects = ({ projects }: FeaturedProjectProps) => {
//   const { t } = useTranslation("common:featured"); 

//   return (
//     <div className="w-full">
//       <div className="mxw-sm w-full flex justify-start my-24">
//         <h2 className="text-4xl md:text-6xl">{t("common:featured")}</h2>
//       </div>
//       <section className="mxw-sm grid gap-6 grid-cols-1 sm:grid-cols-2 pb-12">
//         {projects.map((project, index) => (
//           <ProjectComponent key={index} {...project}  />
//         ))}
//       </section>
//     </div>
//   );
// };
