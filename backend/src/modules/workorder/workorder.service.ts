import { WorkOrderRepository } from "./workorder.repository.js";
import { WorkOrderDTO } from "./workorder.types.js";
 
class WorkorderService {
  private repository: WorkOrderRepository;

  constructor() {
    this.repository = new WorkOrderRepository();
  }

  async getAll(): Promise<WorkOrderDTO[]> {
    return await this.repository.findAll();
  }
}

export default new WorkorderService();
