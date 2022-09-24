import { readFileSync } from "fs";
import { dirname } from "path";

export async function base64_encode(filename) {
  const appDir = dirname(require.main.filename);
  return readFileSync(
    appDir + "/assets/images/emotional/" + filename,
    "base64"
  );
}
