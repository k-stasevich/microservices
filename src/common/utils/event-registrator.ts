import { Event } from './event';

/**
 * Class responsible for being event wrapper to prevent
 * events being used without registration (registration may be creating queue)
 */
export class EventRegistrator<CreateEventOptions, EventInstance>
  implements Event<CreateEventOptions, EventInstance>
{
  constructor(private event: Event<CreateEventOptions, EventInstance>) {}

  public isRegistered = false;

  create(options: CreateEventOptions): EventInstance {
    if (!this.isRegistered) throw new Error('Event is not registered');
    return this.event.create(options);
  }

  async register() {
    await this.event.register();
    this.isRegistered = true;
  }
}
