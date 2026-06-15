const chalk = require("chalk");
const ora = require("ora");
const { getAllPacks } = require("../utils/registry");

async function ListCommand(options) {
  const spinner = ora("Fetching registry...").start();

  try {
    let packs = await getAllPacks();

    // Apply filters
    if (options.framework) {
      packs = packs.filter((p) => p.framework === options.framework);
    }
    if (options.category) {
      packs = packs.filter((p) => p.category === options.category);
    }

    spinner.stop();

    if (packs.length === 0) {
      console.log(chalk.yellow("No packs found matching your filters."));
      return;
    }

    console.log(chalk.bold(`\nAvailable packs (${packs.length}):\n`));

    for (const pack of packs) {
      const featured = pack.featured ? chalk.cyan(" ★") : "";
      const tags = pack.tags.slice(0, 3).map((t) => chalk.dim(t)).join(" · ");

      console.log(
        `  ${chalk.bold(pack.title)}${featured}`
      );
      console.log(
        `    ${chalk.dim(pack.description.slice(0, 80))}${pack.description.length > 80 ? "..." : ""}`
      );
      console.log(
        `    ${chalk.cyan(pack.framework)} · ${chalk.dim(pack.category)} · ${tags}`
      );
      console.log();
    }

    console.log(
      chalk.dim(`  Install with: ${chalk.cyan("design-skills add <slug>")}`)
    );
    console.log(
      chalk.dim(`  More info: ${chalk.cyan("design-skills info <slug>")}\n`)
    );
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

module.exports = { ListCommand };
