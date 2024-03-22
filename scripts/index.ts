#!/usr/bin/env bun

import ExpressProject from "./framworks/express.project";
import { PROJECT_QUESTIONS, type IProjectAnswers } from "./questions";
import { askProjectInfo, type IQuestion } from "./utils/ask.util";
import Command from "./utils/command.util";

const commands = [{ name: "init", description: "Init project" }];

/**check arguaments are valid */

Command.validateArguments(commands);

async function generateProject(answers: IProjectAnswers) {
  console.log("generating project template for:", answers.framwork, "🤩🤩");

  if (answers.framwork === "expressjs") {
    const express = new ExpressProject();
    await express.generateProject(answers);
  }
}

async function main() {
  const answers = await askProjectInfo<IProjectAnswers>(PROJECT_QUESTIONS);

  await generateProject(answers);
}

main();
