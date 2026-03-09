import { WorkerRepository } from "./worker.repository.js";
import { WorkerDTO } from "./worker.types.js";
 
class WorkerService {
  private repository: WorkerRepository;

  constructor() {
    this.repository = new WorkerRepository();
  }

  async getAll(): Promise<WorkerDTO[]> {
    return await this.repository.findAll();
  }
}

export default new WorkerService();
