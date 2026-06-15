#!/usr/bin/env node

const { program } = require("commander");
const pkg = require("../package.json");

program
  .name("design-skills")
  .description("Install curated website designs as code")
  .version(pkg.version);

program
  .command("add <pack>")
  .description("Install a pack from the registry into your project")
  .option("-d, --dir <dir>", "Target directory (default: current directory)")
  .option("-o, --overwrite", "Overwrite existing files", false)
  .action(async (pack, options) => {
    const { AddCommand } = require("../src/commands/add");
    await AddCommand(pack, options);
  });

program
  .command("list")
  .description("List all available packs in the registry")
  .option("-f, --framework <fw>", "Filter by framework (html, react, nextjs)")
  .option("-c, --category <cat>", "Filter by category (landing, saas, etc.)")
  .action(async (options) => {
    const { ListCommand } = require("../src/commands/list");
    await ListCommand(options);
  });

program
  .command("info <pack>")
  .description("Show detailed information about a pack")
  .action(async (pack) => {
    const { InfoCommand } = require("../src/commands/info");
    await InfoCommand(pack);
  });

program.parse();
