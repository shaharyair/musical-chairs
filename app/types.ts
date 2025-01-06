export interface ChairObj {
  id: number;
  name: string;
  computers: (ComputerObj | null)[];
}

export interface ComputerObj {
  id: number;
  type: ComputerType;
}

export enum ComputerType {
  NATIV_RAKIA = "nativ rakia",
  ROMAH = "romah",
  SHVIL = "shvil",
  ONE_AMAN = "one aman",
}
