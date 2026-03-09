import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

console.log("🚀 Creating new TypeScript module with Repository...");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("❌ Please provide a module name: npm run create-module -- user");
  process.exit(1);
}

const moduleName = args[0].replace("--", "").toLowerCase();
const ModuleName = capitalize(moduleName);
const modulePath = path.join(__dirname, "../src/modules", moduleName);

if (fs.existsSync(modulePath)) {
  console.error(`❌ Module "${moduleName}" already exists at src/modules/${moduleName}`);
  process.exit(1);
}

fs.mkdirSync(modulePath, { recursive: true });

const files = {
  // --- REPOSITORY (The DB Layer) ---
  [`${moduleName}.repository.ts`]: `
import type { ${ModuleName} } from "./${moduleName}.types.js";

export class ${ModuleName}Repository {
  // Logic for DB queries goes here
  async findAll(): Promise<${ModuleName}[]> {
    return []; // Replace with actual DB call like: return this.model.find()
  }
}
`,

  // --- SERVICE (Business Logic Layer) ---
  [`${moduleName}.service.ts`]: `
import { ${ModuleName}Repository } from "./${moduleName}.repository.js";
import type { ${ModuleName} } from "./${moduleName}.types.js";

class ${ModuleName}Service {
  private repository: ${ModuleName}Repository;

  constructor() {
    this.repository = new ${ModuleName}Repository();
  }

  async getAll(): Promise<${ModuleName}[]> {
    return await this.repository.findAll();
  }
}

export default new ${ModuleName}Service();
`,

  // --- CONTROLLER ---
  [`${moduleName}.controller.ts`]: `
import type { Request, Response, NextFunction } from "express";
import ${moduleName}Service from "./${moduleName}.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class ${ModuleName}Controller {
  private ${moduleName}Service = ${moduleName}Service;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.${moduleName}Service.getAll();
      res.success("Get All ${ModuleName}s", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
`,

  // --- ROUTES ---
  [`${moduleName}.routes.ts`]: `
import { Router } from "express";
import ${ModuleName}Controller from "./${moduleName}.controller.js";

const router = Router();
const ${moduleName}Controller = new ${ModuleName}Controller();

router.get("/", ${moduleName}Controller.getAll);

export default router;
`,

  // --- TYPES ---
  [`${moduleName}.types.ts`]: `
export interface ${ModuleName} {
  id: number;
  title: string;
}
`,

  // --- VALIDATOR ---
  [`${moduleName}.validator.ts`]: `
import { z } from "zod";

export const create${ModuleName}Schema = z.object({
  body: z.object({
    title: z.string().min(1, "${ModuleName} title is required"),
  }),
});

export type Create${ModuleName}Input = z.infer<typeof create${ModuleName}Schema>["body"];
`,

  // --- MODEL ---
  [`${moduleName}.model.ts`]: `
// import mongoose from "mongoose";
// export const ${ModuleName}Model = mongoose.model("${ModuleName}", new mongoose.Schema({ title: String }));
`,
};

// Write files
for (const [fileName, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(modulePath, fileName), content.trim() + "\n");
}

console.log(`✅ Module "${moduleName}" created successfully with Repository Pattern!`);

function capitalize(str ) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}