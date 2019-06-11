import { Service, Inject, Container } from 'typedi';
import Status from './../../core/status';

@Service()
export default class StatusService {
  constructor(@Inject('statusModel') private statusModel) {}
  public async status() {
    try {
      const statusInstance = Container.get(Status);
      let apiStatus = await statusInstance.getApiStatus();
      return {
        apiStatus: apiStatus,
      };
    } catch (e) {
      console.log('e', e);
      throw e;
    }
  }
}
