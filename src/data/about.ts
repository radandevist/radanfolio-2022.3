import { v4 } from "uuid";

const preAbout = {
  // eslint-disable-next-line max-len
  avatar: "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660190042/radanfolio/profile_pic_imdxvm.jpg",
  name: "Daniel Adrianarisoa",
  email: "radandevist@gmail.com",
  github: "https://www.github.com/radandevist",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1cdJvbW1MsjvESowf32URfAz3Vpcw2uFk",
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
