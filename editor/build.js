require("esbuild")
  .build({
    entryPoints: ["src/index.ts"], // Main file
    outfile: "dist/bundle.js", // Output file
    bundle: true, // Bundle dependencies
    minify: true, // Minify output for performance
    sourcemap: true, // Generate source map
    platform: "browser", // Target browsers
    target: ["es6"], // Output modern JS
    external: ["zeromq", "events", "path", "fs", "module"], // Exclude Node.js modules
  })
  .catch(() => process.exit(1));

// watch: process.argv.includes("--watch"), // Enable watch mode
