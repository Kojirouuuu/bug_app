// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TicketType = {
  "COMMON_GACHA_TICKET": "COMMON_GACHA_TICKET",
  "RARE_GACHA_TICKET": "RARE_GACHA_TICKET",
  "LEGENDARY_GACHA_TICKET": "LEGENDARY_GACHA_TICKET",
  "ITEM_TICKET": "ITEM_TICKET",
  "EVENT_TICKET": "EVENT_TICKET"
};

const { User, Photo, AIAnalysis, PointsAward, Gacha, GachaResult, Ticket, Insect } = initSchema(schema);

export {
  User,
  Photo,
  AIAnalysis,
  PointsAward,
  Gacha,
  GachaResult,
  Ticket,
  Insect,
  TicketType
};