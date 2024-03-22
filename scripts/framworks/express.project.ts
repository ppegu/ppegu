import fs from "fs";
import path from "path";
import type { IProjectAnswers } from "../questions";
import Template from "../utils/template.util";
import prettier from "prettier";

export default class ExpressProject {
  generatePackageJson(templateDir: string, info: IProjectAnswers) {
    const packageJsonPath = path.join(templateDir, "package.json");

    const packageJsonBuffer = fs.readFileSync(packageJsonPath);
    const packageJsonString = packageJsonBuffer.toString();

    const packageJson = JSON.parse(packageJsonString);

    packageJson.name = info.projectName;

    return JSON.stringify(packageJson);
  }

  async generateProject(info: IProjectAnswers) {
    const templateDir = path.join(
      __dirname,
      `../../templates/${info.framwork}-${info.language}`
    );

    if (!fs.existsSync(templateDir))
      throw Error(`Template ${templateDir} does not exists.`);

    const projectPath = info.projectName.toLowerCase();

    if (fs.existsSync(projectPath)) {
      console.error(`\nerror: ${projectPath} already exists 😬😬.\n`);
      process.exit();
    }

    console.log(`Generating ${info.framwork}-${info.language} project 🥵🥵`);

    fs.mkdirSync(projectPath, { recursive: true });

    Template.copyFolderRecursively(templateDir, projectPath, [
      "node_modules",
      "bun.lockb",
      "package-lock.json",
    ]);

    const packageJson = this.generatePackageJson(templateDir, info);

    const packageJsonPretty = await prettier.format(packageJson, {
      parser: "json",
    });

    fs.writeFileSync(
      path.join(projectPath, "./package.json"),
      packageJsonPretty
    );

    if (info.cicd === "true") {
      const configDir = path.join(
        __dirname,
        `../../templates/${info.repositoryProvider}/.bun-${info.framwork}.yml`
      );

      if (info.repositoryProvider === "gitlab") {
        fs.copyFileSync(configDir, path.join(projectPath, ".gitlab-ci.yml"));
      }
    }

    console.log("\nDone!😎 Happy coding😍😍😍. \n");
    console.log(`cd ${projectPath} and run "bun install" to get start.\n`);
  }
}
