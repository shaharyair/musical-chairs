export interface SetupObj {
  id: number;
  name: string;
  computers: ComputerObj[];
}

export interface ComputerObj {
  id: number;
  type: ComputerType;
  setupId?: number;
}

export interface ComputerChangeEvent {
  computer: ComputerObj;
  sourceSetupId: number;
  targetSetupId: number;
}

export enum ComputerType {
  NATIV_RAKIA = "Nativ Rakia",
  ROMAH = "Romah",
  SHVIL = "Shvil Hahalav",
  ONE_AMAN = "One Aman",
}
