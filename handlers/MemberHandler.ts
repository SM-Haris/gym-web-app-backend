import { MemberDatabaseInterface } from "../interfaces/Member"
import Member from "../models/Member"

class MemberHandler {
    static async getMembersByGym(gym_id: string) {
        return Member.findAll({where:{gym_id:gym_id}})
    }

    static async createMember(data: MemberDatabaseInterface) {
        return Member.create(data)
    }

    static async updateMember(data: MemberDatabaseInterface) {
        return Member.update(data,{where:{id:data.id}})
    }

    static async findMemberById(member_id: string) {
        return Member.findOne({where: {id: member_id}})
    }
}

export default MemberHandler