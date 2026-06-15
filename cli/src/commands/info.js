const chalk = require("chalk");
const ora = require("ora");
const { getPackBySlug } = require("../utils/registry");

async function InfoCommand(packSlug) {
  const spinner = ora(`Fetching info for "${packSlug}"...`).start();

  try {
    const pack = await getPackBySlug(packSlug);
    if (!pack) {
      spinner.fail(chalk.red(`Pack "${packSlug}" not found in registry.`));
      console.log(
        chalk.dim(`Run ${chalk.cyan("design-skills list")} to see available packs.`)
      );
      process.exit(1);
    }

    spinner.stop();

    console.log();
    console.log(chalk.bold(pack.title));
    if (pack.featured) console.log(chalk.cyan("  ★ Featured"));
    console.log();

    console.log(chalk.bold("Description:"));
    console.log(`  ${pack.description}`);
    console.log();

    console.log(chalk.bold("Metadata:"));
    console.log(`  Framework:  ${chalk.cyan(pack.framework)}`);
    console.log(`  Category:   ${pack.category}`);
    console.log(`  License:    ${pack.license}`);
    console.log(`  Created:    ${pack.createdAt}`);
    if (pack.author) {
      console.log(`  Author:     ${pack.author.name}`);
      if (pack.author.url) console.log(`  URL:        ${pack.author.url}`);
    }
    console.log();

    console.log(chalk.bold("Tags:"));
    console.log(`  ${pack.tags.join(", ")}`);
    console.log();

    console.log(chalk.bold("Files:"));
    for (const file of pack.files) {
      console.log(`  ${chalk.cyan(file.path)} (${chalk.dim(file.type)})`);
    }
    console.log();

    if (pack.dependencies.length > 0) {
      console.log(chalk.bold("Dependencies:"));
      console.log(`  ${pack.dependencies.join(", ")}`);
      console.log();
    }

    console.log(chalk.bold("Install:"));
    console.log(
      chalk.cyan(`  design-skills add ${pack.slug}`)
    );
    console.log();
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

module.exports = { InfoCommand };
