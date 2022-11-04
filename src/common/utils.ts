import { readFileSync } from "fs";
import { dirname } from "path";

export async function base64_encode(filename) {
  const appDir = dirname(require.main.filename);
  return readFileSync(
    appDir + "/assets/images/emotional/" + filename,
    "base64"
  );
}

export function getDecisionFirstQuiz(score) {
  if (score >= 0 && score <= 50) {
    return "prosocial";
  }
  if (score > -10 && score < 0) {
    return "compétitif";
  }
  if (score > 50) {
    return "altruiste";
  }
  if (score >= -10) {
    return "individualiste";
  }
}

export function paginationResponse(page, size, data, totalItems) {
  return { page, size, data, totalItems };
}
