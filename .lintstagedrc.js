module.exports = {
  // Using js config with function syntax to avoid passing file list because if tsc gets files as args
  // it ignores the tsconfig or throws if one is passed as arg as well via -p
  // https://github.com/okonet/lint-staged/issues/829#issuecomment-618649288
  "(*.ts|package-lock.json)": () => "npm run build",
  // This pattern is the same as ^ but has to be unique since it's an object key
  "**/*.ts": "eslint",
  // Dependency changes can potentially cause type change build fails, so re-lint the entire project when they update
  "package-lock.json": () => "./scripts/lint",
  // Changes to the proto base file will break generated static protobuf encoder
  "src/proto/uule.proto": () => "./scripts/lint-generated",
  // Make sure package.json and package-lock.json are in sync when dependencies update
  "package.json|package-lock.json": () => "npm install --frozen-lockfile",
}
