const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const ora = require("ora");
const { getPackBySlug, fetchPackFile } = require("../utils/registry");

async function AddCommand(packSlug, options) {
  const spinner = ora(`Fetching pack "${packSlug}"...`).start();

  try {
    // 1. Fetch pack metadata
    const pack = await getPackBySlug(packSlug);
    if (!pack) {
      spinner.fail(chalk.red(`Pack "${packSlug}" not found in registry.`));
      console.log(
        chalk.dim(`Run ${chalk.cyan("design-skills list")} to see available packs.`)
      );
      process.exit(1);
    }

    spinner.succeed(chalk.green(`Found: ${chalk.bold(pack.title)}`));
    console.log(chalk.dim(`  ${pack.description}`));
    console.log();

    // 2. Determine target directory
    const targetDir = options.dir
      ? path.resolve(process.cwd(), options.dir)
      : process.cwd();

    // 3. Create pack directory
    const packDir = path.join(targetDir, pack.slug);
    await fs.ensureDir(packDir);

    // 4. Download each file
    const fileSpinner = ora("Downloading files...").start();
    let filesWritten = 0;

    for (const file of pack.files) {
      try {
        const content = await fetchPackFile(pack.slug, file.path);
        const filePath = path.join(packDir, file.path);

        if (await fs.pathExists(filePath) && !options.overwrite) {
          fileSpinner.warn(
            chalk.yellow(`  Skipped ${file.path} (exists, use --overwrite)`)
          );
          continue;
        }

        await fs.writeFile(filePath, content, "utf-8");
        filesWritten++;
        fileSpinner.text = `Downloaded ${file.path}`;
      } catch (err) {
        fileSpinner.warn(
          chalk.yellow(`  Failed to download ${file.path}: ${err.message}`)
        );
      }
    }

    fileSpinner.succeed(chalk.green(`Downloaded ${filesWritten} file(s) to ${packDir}`));

    // 5. Show summary
    console.log();
    console.log(chalk.bold("Installed files:"));
    for (const file of pack.files) {
      console.log(chalk.cyan(`  ${pack.slug}/${file.path}`));
    }

    if (pack.dependencies.length > 0) {
      console.log();
      console.log(chalk.bold("Required dependencies:"));
      console.log(chalk.dim(`  ${pack.dependencies.join(", ")}`));
      console.log(
        chalk.dim(
          `  Install with: ${chalk.cyan(`npm install ${pack.dependencies.join(" ")}`)}`
        )
      );
    }

    console.log();
    console.log(
      chalk.green(`✓ Pack "${chalk.bold(pack.title)}" installed successfully!`)
    );
  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

module.exports = { AddCommand };
