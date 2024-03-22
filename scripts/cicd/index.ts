#!/usr/bin/env bun

import { askProjectInfo } from "../utils/ask.util";
import Command from "../utils/command.util";

const commands = [{ name: "init", description: "Init cicd" }];

/**check arguaments are valid */

Command.validateArguments(commands);

async function main() {
  const answers = await askProjectInfo([
    {
      name: "provider",
      message: "select provider",
      type: "list",
      choices: ["github", "gitlab"],
    },

    {
      name: "projectType",
      message: "Project type",
      type: "list",
      choices: ["server", "client"],
    },
  ]);

  console.log(answers);
}

main();
