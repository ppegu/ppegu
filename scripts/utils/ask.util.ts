import inquirer, { type Question } from "inquirer";

export type IQuestion = Question & {
  name: string;
  choices?: string[];
};

export async function askProjectInfo<T>(questions: IQuestion[]) {
  const answers = await inquirer.prompt(questions);

  return { ...answers } as T;
}
