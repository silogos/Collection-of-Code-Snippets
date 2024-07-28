import path from "path";
import { fileURLToPath } from "url";
import globEntries from "webpack-glob-entries";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: globEntries("./src/*.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js"],
  },
  mode: "production",
};
