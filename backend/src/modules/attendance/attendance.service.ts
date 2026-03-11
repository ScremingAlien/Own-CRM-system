import { AttendanceRepository } from "./attendance.repository.js";

class AttendanceService {
  private repository: AttendanceRepository;

  constructor() {
    this.repository = new AttendanceRepository();
  }

  async getAll(): Promise<any[]> {
    return await this.repository.findAll();
  }
}

export default new AttendanceService();
