import type { IQuestion } from "./utils/ask.util";
import Validation from "./utils/validation.util";

export const PROJECT_QUESTIONS = [
  {
    name: "projectName",
    message: "Project name: ",
    validate: Validation.notNull,
  },
  {
    name: "framwork",
    message: "Select Framwork",
    type: "list",
    choices: ["vitejs", "expressjs"],
  },
  {
    name: "language",
    message: "Select language",
    type: "list",
    choices: ["typescript"],
    when: (ans: any) =>
      ans.framwork === "vitejs" || ans.framwork === "expressjs",
  },
  {
    name: "port",
    message: "App port:",
    validate: Validation.validatePort,
  },
  {
    name: "cicd",
    message: "configure CICD:",
    choices: ["true", "false"],
    type: "list",
  },
  {
    name: "repositoryProvider",
    message: "repository provider:",
    type: "list",
    choices: ["github", "gitlab"],
    when: (ans: any) => ans.cicd === "true",
  },
];

export type IProjectAnswers = {
  projectName: string;
  framwork: "vitejs" | "expressjs";
  language?: "typescript";
  port: string;
  cicd: "true" | "false";
  repositoryProvider?: "github" | "gitlab";
};
