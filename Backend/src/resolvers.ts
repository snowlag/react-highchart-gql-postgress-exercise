import { Security } from "./Entity/Security";
import { AppDataSource } from "./DataSource/datasource";

export const resolvers = {
  Query: {
    securities: async (
      _: any,
      { limit, offset }: { limit: number; offset: number }
    ) => {
      const securityRepository = AppDataSource.getRepository(Security);
      return securityRepository.find({
        skip: offset,
        take: limit,
      });
    },
    security: async (_: any, args: { ticker: string }) => {
      const securityRepository = AppDataSource.getRepository(Security);
      return securityRepository.findOne({ where: { ticker: args.ticker } });
    },
  },
};
