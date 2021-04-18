import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Cards {
  readonly id: string;
  readonly ContentName: string;
  readonly Creator: string;
  readonly Capacity: number;
  readonly HostName: string;
  readonly Time: string;
  readonly CourseName: string;
  readonly MeetingInfo: string;
  constructor(init: ModelInit<Cards>);
  static copyOf(source: Cards, mutator: (draft: MutableModel<Cards>) => MutableModel<Cards> | void): Cards;
}