import inquirer, { type Question } from "inquirer";

export type IQuestions = Question & {
  choices: string[];
};

export async function askProjectInfo(questions: IQuestions[]) {
  const answers = await inquirer.prompt(questions);

  return { ...answers };
}
