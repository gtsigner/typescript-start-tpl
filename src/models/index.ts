import db from '../lib/mongo'

import sp_league from './sp_league';
import sp_sports from './sp_sports';

const collections = {
    sp_sports: sp_sports,
    sp_league: sp_league,
};

export default collections;
export const connection = db;
