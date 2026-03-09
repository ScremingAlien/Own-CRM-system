import { PaymentRepository } from "./payment.repository.js";
 
class PaymentService {
  private repository: PaymentRepository;

  constructor() {
    this.repository = new PaymentRepository();
  }

  async getAll(): Promise<any[]> {
    return await this.repository.findAll();
  }
}

export default new PaymentService();
