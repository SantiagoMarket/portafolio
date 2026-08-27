import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // `.next` guarda copias compiladas del código; sin excluirlo, vitest
    // recogería los tests dos veces.
    exclude: ["node_modules/**", ".next/**"],
  },
});
