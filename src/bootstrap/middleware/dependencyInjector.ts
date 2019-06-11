import { Container } from 'typedi';
import { Logger } from 'winston';
import { Pool } from 'pg';

//set the db connection here
//set the logger here

type Models = {
  name: string;
  model: any;
};

export default ({ models, logger, db }: { models: Models[]; logger: Logger; db: Pool }) => {
  try {
    models &&
      models.forEach(m => {
        Container.set(m.name, m.model);
      });

    Container.set('logger', logger);
    Container.set('db', db);
  } catch (e) {
    console.log('🔥 Error on dependency injector loader %o', e);
    throw e;
  }
};
