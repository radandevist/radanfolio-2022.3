import { v4 } from "uuid";

const preAbout = {
  // eslint-disable-next-line max-len
  avatar: "https://res.cloudinary.com/dhwkzyl32/image/upload/v1666629233/radanfolio/compressed_profile_pic_mqt0nm.jpg",
  name: "Daniel Adrianarisoa",
  email: "radandevist@gmail.com",
  github: "https://www.github.com/radandevist",
  // TODO: test this link in private browser window
  resumeUrl: "https://drive.google.com/uc?id=1IueI05j7CJ5HXjzfQd1r44C5mOoEwToa&export=download",
  socials: [
    { 
      name: "Linkedin",
      url: "https://www.linkedin.com/in/radandevist"
    },
    { 
      name: "Instagram",
      url: "https://www.instagram.com/devist.english"
    },
    { 
      name: "Facebook Page",
      url: "https://www.facebook.com/devist.english"
    },
    { 
      name: "Facebook Profile",
      url: "https://www.twitter.com/radandevist.me"
    },
    {
      name: "Github",
      url: "https://github.com/radandevist"
    }
  ],
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "Typescript",
    "React.js",
    "Node.js",
    "Express.js",
    "Microsoft Office",
    "Office computing",  "Responsive design",
    "Bootstrap",
    "Tailwind",
    "version control",
    "github",
    "Googling",
    "Duckling",
    "Test Driven Development",
    "ESLint",
    "ESBuild",
    "Webpack",
    "Vite.js",
    "Imkscape",
    "Linux",
    "Socket.IO",
    "WebRTC",
    "Prisma",
    "Sequelize",
    "Mocha.js",
    "Chai.js",
    "Sinon.js",
    "Jest"
  ],
};

const { skills: preSkills, ...destructuredAbout } = preAbout;

const skillsWithId = preSkills.map(skill => ({
  id: v4(),
  name: skill,
}));

export const about = {
  ...destructuredAbout,
  skills: skillsWithId,
};
