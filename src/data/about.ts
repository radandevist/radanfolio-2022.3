import { v4 } from "uuid";

/* eslint-disable max-len */
const preAbout = {
  avatar: "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660190042/radanfolio/profile_pic_imdxvm.jpg",
  name: "Daniel Adriananrisoa",
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
      url: "https://www.instagram.com/radandevist"
    },
    { 
      name: "Facebook Page",
      url: "https://www.facebook.com/radandevist"
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
    "HTML", "CSS", "Javascript", "Typescript", "React.js", "Node.js", "Express.js", "Microsoft Office", "Office computing",  "Responsive design", "Bootstrap", "Tailwind", "version control",
    "github", "Googling", "Duckling", "Test Driven Development", "ESLint", "ESBuild", "Webpack", "Vite.js", "Imkscape", "Linux", "Socket.IO", "WebRTC", "Prisma", "Sequelize", "Mocha.js",
    "Chai.js", "Sinon.js", "Jest"
  ],
  bioIntro: "Hey! I'm Radan",
  bioPreface: "A full-stack Javascript and Typescript 👨🏿‍💻developer from 🇲🇬 Madagascar. I'm also a 🐧Linux user in an everyday basis.",
  bioSub: "I am a mostly self-taught MERN Stack developer (despite the fact that I attended college) who values attention to detail and with a passion for solving complex problems. Offering the significant ability to work well both independently and in collaboration with close-knit teams. Building large and scalable web architectures is what I aim for.",
  // bioMain: "Banh mi you probably havent heard of them yuccie beard deep v. Salvia roof party selvage jianbing, irony forage direct trade. Pug tumeric mixtape, church-key cray single-origin coffee selvage ugh prism keytar. Typewriter yr plaid post-ironic. Palo santo twee ethical, pug squid godard jianbing adaptogen."
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
