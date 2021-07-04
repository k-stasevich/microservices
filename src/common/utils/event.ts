export interface Event<CreateEventOptions, Event> {
  create(options: CreateEventOptions): Event;
  register(): Promise<void>;
}
