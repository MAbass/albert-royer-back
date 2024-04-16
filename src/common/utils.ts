import { readFileSync, unlinkSync } from "fs";
import { dirname } from "path";

export async function base64_encode(filename) {
  const appDir = dirname(require.main.filename);
  return readFileSync(
    appDir + "/assets/images/emotional/" + filename,
    "base64"
  );
}

export async function deletefile(id) {
  const appDir = dirname(require.main.filename);
  return unlinkSync(appDir + "/assets/files/" + id + ".pdf");
}

export async function getReport(id: string) {
  const appDir = dirname(require.main.filename);
  return readFileSync(appDir + "/assets/files/" + id + ".pdf", "base64");
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

export function getDecisionSecondQuiz(score) {
  if (score >= 25) {
    return "bon";
  }
  if (score >= 19 && score < 25) {
    return "moyen";
  }
  if (score < 19) {
    return "faible";
  }
}

export function getDecisionThirdQuiz(score) {
  if (score >= 2) {
    return "bon";
  }
  if (score === 1) {
    return "moyen";
  }
  if (score < 1) {
    return "faible";
  }
}

export function getDecisionFourthQuiz(score) {
  if (score) {
    return "stable";
  } else {
    return "pas stable";
  }
}

export function paginationResponse(page, size, data, totalItems) {
  return { page, size, data, totalItems };
}
