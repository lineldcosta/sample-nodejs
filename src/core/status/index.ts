import { Service, Inject, Container } from 'typedi';
import { Pool } from 'pg';

@Service()
class Status {
  constructor(@Inject('db') private db) {}
  public getApiStatus(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.db.query('select * from status;', (error, results) => {
        if (error) {
          return reject(error);
        }
        console.log(results.rows);
        resolve('success1');
      });
    });
  }
}

export default Status;
