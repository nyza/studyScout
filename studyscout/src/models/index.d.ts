import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class User {
  readonly id: string;
  readonly Joined_Cards?: (string | null)[];
  readonly Name: string;
  readonly Bio?: string;
  readonly Profile_Pic?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Cards {
  readonly id: string;
  readonly ContentName: string;
  readonly Creator?: string;
  readonly Capacity: string;
  readonly HostName: string;
  readonly Time?: string;
  readonly CourseName: string;
  readonly MeetingInfo: string;
  constructor(init: ModelInit<Cards>);
  static copyOf(source: Cards, mutator: (draft: MutableModel<Cards>) => MutableModel<Cards> | void): Cards;
}