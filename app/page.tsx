"use client";

import React, { useState } from "react";
import { ChairObj, ComputerObj, ComputerType } from "./types";

export default function Home() {
  const [chairs] = useState<ChairObj[]>([
    {
      id: 1,
      name: "A1",
      computers: [
        { id: 91, type: ComputerType.NATIV_RAKIA },
        { id: 92, type: ComputerType.ONE_AMAN },
        { id: 93, type: ComputerType.ROMAH },
        { id: 94, type: ComputerType.SHVIL },
      ],
    },
    {
      id: 2,
      name: "A2",
      computers: [{ id: 94, type: ComputerType.SHVIL }],
    },
    {
      id: 3,
      name: "A3",
      computers: [
        { id: 91, type: ComputerType.NATIV_RAKIA },
        { id: 94, type: ComputerType.SHVIL },
      ],
    },
    {
      id: 4,
      name: "A4",
      computers: [{ id: 92, type: ComputerType.ONE_AMAN }],
    },
    // {
    //   id: 5,
    //   name: "A5",
    //   computers: [
    //     { id: 91, type: ComputerType.NATIV_RAKIA },
    //     { id: 92, type: ComputerType.ONE_AMAN },
    //     { id: 93, type: ComputerType.ROMAH },
    //     { id: 94, type: ComputerType.SHVIL },
    //   ],
    // },
    // {
    //   id: 6,
    //   name: "A6",
    //   computers: [
    //     { id: 91, type: ComputerType.NATIV_RAKIA },
    //     { id: 92, type: ComputerType.ONE_AMAN },
    //     { id: 93, type: ComputerType.ROMAH },
    //     { id: 94, type: ComputerType.SHVIL },
    //   ],
    // },
    // {
    //   id: 7,
    //   name: "A7",
    //   computers: [
    //     { id: 91, type: ComputerType.NATIV_RAKIA },
    //     { id: 92, type: ComputerType.ONE_AMAN },
    //     { id: 93, type: ComputerType.ROMAH },
    //     { id: 94, type: ComputerType.SHVIL },
    //   ],
    // },
    // {
    //   id: 8,
    //   name: "A8",
    //   computers: [
    //     { id: 91, type: ComputerType.NATIV_RAKIA },
    //     { id: 92, type: ComputerType.ONE_AMAN },
    //     { id: 93, type: ComputerType.ROMAH },
    //     { id: 94, type: ComputerType.SHVIL },
    //   ],
    // },
  ]);

  return (
    <div className="w-full">
      <SeatingRow data={chairs} />
    </div>
  );
}

export const SeatingRow = (props: { data: ChairObj[] }) => {
  return (
    <div className="flex w-full justify-center gap-4">
      {props.data.map((item) => (
        <ChairWithComputers key={`chair_${item.id}`} data={item} />
      ))}
    </div>
  );
};

export const ChairWithComputers = (props: { data: ChairObj }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Chair data={props.data} />
      <Computers data={props.data.computers} />
    </div>
  );
};

export const Computers = (props: { data: (ComputerObj | null)[] }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 items-center justify-between gap-2 bg-white p-2.5 rounded-md">
      {props.data.map((item) => (
        <ComputersItem key={`computer_${item?.id}`} data={item} />
      ))}
    </div>
  );
};

export const ComputersItem = (props: { data: ComputerObj | null }) => {
  return (
    <div className="flex size-32 flex-col items-center justify-center rounded-lg border-2 border-black p-2 text-center text-xl text-black">
      {props.data?.id && <span>id: {props.data.id}</span>}
      {props.data?.type && <span>{props.data?.type}</span>}
    </div>
  );
};

export const Chair = (props: { data: ChairObj }) => {
  return (
    <div className="flex size-32 flex-col items-center justify-center gap-2 rounded-full bg-gray-200 text-3xl text-black">
      <span>id: {props.data.id}</span>
      <span>{props.data.name}</span>
    </div>
  );
};
