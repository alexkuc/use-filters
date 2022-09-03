// https://stackoverflow.com/a/53981706
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_HOST: string;
      VITE_PORT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
