export let projectsData = [
  {
    id: 1,
    title: "Project One",
    description: "A brief description of the first project. It solves a problem and uses these technologies.",
    repo: "https://github.com"
  },
  {
    id: 2,
    title: "Project Two",
    description: "A brief description of the second project. It's a cool app with a modern tech stack.",
    repo: "https://github.com"
  },
  {
    id: 3,
    title: "Project Three",
    description: "A brief description of the third project. This one is open source and you can contribute.",
    repo: "https://github.com"
  },
  {
    id: 4,
    title: "Project Four",
    description: "A brief description of the fourth project. It was a team effort and we learned a lot.",
    repo: "https://github.com"
  }
];

export const setProjectsData = (newProjects) => {
  projectsData = newProjects;
};

