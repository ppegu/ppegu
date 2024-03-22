export type ICommand = { name: string; description: string };

export default class Command {
  public static validateArguments(commands: ICommand[]) {
    const isValid = process.argv.filter(
      (a) => commands.filter((c) => c.name === a)[0]
    )[0];

    if (!isValid) {
      console.log("Available commands:");
      commands.map((c) => {
        console.log(c.name, ":", c.description, "\n");
      });
      process.exit();
    }

    return true;
  }
}
