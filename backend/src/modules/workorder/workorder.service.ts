import { Prisma } from "@/generated/index.js";
import { WorkOrderRepository } from "./workorder.repository.js";
import { WorkOrderDTO } from "./workorder.types.js";

class WorkorderService {
  private repository: WorkOrderRepository;

  constructor() {
    this.repository = new WorkOrderRepository();
  }

  async find_all(): Promise<WorkOrderDTO[]> {
    return await this.repository.findAll();
  }

  async find_by_id(id: string): Promise<WorkOrderDTO | null> {
    return await this.repository.findById(id);
  }

  async create(data: Prisma.WorkOrderCreateInput): Promise<WorkOrderDTO> {
    return await this.repository.create(data);
  }
  
  async update(id: string, data: Prisma.WorkOrderUpdateInput): Promise<WorkOrderDTO> {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }


}

export default new WorkorderService();
