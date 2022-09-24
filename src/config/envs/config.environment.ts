import environment from "./env.project";

export class ConfigEnvironment {
  static getEnvPath(key: string): string {
    return environment[key];
  }
}
