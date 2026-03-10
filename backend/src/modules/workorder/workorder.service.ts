import { Prisma } from "@/generated/index.js";
import { WorkOrderRepository } from "./workorder.repository.js";
import { CreateWorkOrderType, WorkOrderDTO, WorkOrderStatus } from "./workorder.types.js";
import { PartyRepository } from "../party/party.repository.js";
import { statusCode } from "@/utils/constants/statusCode.js";

class WorkorderService {
  private repository: WorkOrderRepository;
  private partyRepository: PartyRepository;
  constructor() {
    this.repository = new WorkOrderRepository();
    this.partyRepository = new PartyRepository();
  }

  async find_all(): Promise<WorkOrderDTO[]> {
    return await this.repository.findAll();
  }

  async find_by_id(id: string): Promise<WorkOrderDTO | null> {
    return await this.repository.findById(id);
  }

  async create(data: CreateWorkOrderType): Promise<WorkOrderDTO> {
    let isParty = await this.partyRepository.findById(data.partyId);
    if (!isParty) {
      throw new Error("Party Not Found", { cause: statusCode.BAD_REQUEST });
    }
    
    return await this.repository.create(data);
  }

  async update(id: string, data: Prisma.WorkOrderUpdateInput): Promise<WorkOrderDTO> {
    return await this.repository.update(id, data);
  }
  async updateStatus(id: string, data: WorkOrderStatus): Promise<WorkOrderDTO> {
    return await this.repository.updateStatus(id, data);
  }

  async delete(id: string) {
    let isWr = await this.repository.findById(id);
    if(!isWr){
      throw new Error("Workorder Not Found", { cause: statusCode.BAD_REQUEST });
    }
    return await this.repository.delete(id);
  }


}

export default new WorkorderService();
