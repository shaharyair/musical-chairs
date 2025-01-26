"use client";

import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Draggable } from "./components/draggable";
import { Droppable } from "./components/droppable";
import {
  SetupObj,
  ComputerObj,
  ComputerType,
  ComputerChangeEvent,
} from "./types";
import dynamic from "next/dynamic";

const DndContext = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false },
);

export default function Home() {
  const [computerChanges, setComputerChanges] = useState<ComputerChangeEvent[]>(
    [],
  );
  const [setups, setSetups] = useState<SetupObj[]>([
    {
      id: 11,
      name: "Name 1",
      computers: [
        { id: 1, type: ComputerType.NATIV_RAKIA, setupId: 11 },
        { id: 2, type: ComputerType.ONE_AMAN, setupId: 11 },
        { id: 3, type: ComputerType.ROMAH, setupId: 11 },
        { id: 4, type: ComputerType.SHVIL, setupId: 11 },
      ],
    },
    {
      id: 12,
      name: "Name 2",
      computers: [
        { id: 5, type: ComputerType.NATIV_RAKIA, setupId: 12 },
        { id: 6, type: ComputerType.ONE_AMAN, setupId: 12 },
      ],
    },
    {
      id: 13,
      name: "Name 4",
      computers: [],
    },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active: computer, over: target } = event;
    if (!target?.id) {
      return;
    }
    const currentComputer = computer.data.current as ComputerObj;
    const isTheSameSetup = currentComputer?.setupId === target?.id;
    if (isTheSameSetup) {
      return;
    }

    setComputerChanges([
      ...computerChanges,
      {
        computer: currentComputer,
        sourceSetupId: currentComputer.setupId as number,
        targetSetupId: target.id as number,
      },
    ]);

    const updatedSetups = getUpdatedSetups(
      currentComputer,
      target?.id as number,
    );
    setSetups(updatedSetups);
  };

  const getUpdatedSetups = (
    currentComputer: ComputerObj,
    setupTargetId: number,
  ) => {
    return setups.map((setup) => {
      const isCurrentSetup = setup.id === currentComputer?.setupId;
      const isTargetSetup = setup.id === setupTargetId;
      if (isCurrentSetup) {
        return {
          ...setup,
          computers: setup.computers.filter(
            (item) => item.id !== currentComputer.id,
          ),
        };
      }
      if (isTargetSetup) {
        return {
          ...setup,
          computers: [
            ...setup.computers,
            {
              ...currentComputer,
              setupId: setup.id,
            },
          ],
        };
      }
      return setup;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="m-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4">
        <WorkSetupRow data={setups} />
        <ChangesReport data={computerChanges} />
      </div>
    </DndContext>
  );
}

const WorkSetupRow = (props: { data: SetupObj[] }) => {
  return (
    <div className="flex w-full items-start justify-between gap-4">
      {props.data.map((item) => (
        <WorkSetup id={item.id} key={`chair_${item.id}`} data={item} />
      ))}
    </div>
  );
};

const WorkSetup = (props: { data: SetupObj; id: number }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Chair data={props.data} />
      <Container data={props.data.computers} id={props.id} />
    </div>
  );
};

const Container = (props: { data: ComputerObj[]; id: number }) => {
  return (
    <Droppable id={props.id}>
      <div className="grid min-h-80 min-w-80 grid-cols-2 grid-rows-2 items-center justify-between gap-4 rounded-md bg-white p-2">
        {props.data.map((item) => (
          <Computer id={item.id} key={`computer_${item?.id}`} data={item} />
        ))}
      </div>
    </Droppable>
  );
};

const Computer = (props: { data: ComputerObj; id: number }) => {
  return (
    <Draggable id={props.id} data={props.data}>
      <div className="flex aspect-square size-full flex-col items-center justify-center rounded-lg border-2 border-black bg-gray-400 p-2 text-center text-xl text-black">
        {props.data?.id && <span className="font-bold text-2xl">{props.data.id}</span>}
        {props.data?.type && <span>{props.data?.type}</span>}
      </div>
    </Draggable>
  );
};

const Chair = (props: { data: SetupObj }) => {
  return (
    <div className="flex size-32 flex-col items-center justify-center gap-2 rounded-full bg-gray-200 text-lg text-black">
      <span className="font-bold text-2xl">{props.data.id}</span>
      <span>{props.data.name}</span>
    </div>
  );
};

const ChangesReport = (props: { data: ComputerChangeEvent[] }) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-white p-4 text-black">
      {props.data.map((item, index) => (
        <div
          key={`change_${item.computer.id}_${index}`}
          className="flex items-center justify-center gap-4"
        >
          <span>
            {"✦"} <b>{item.computer.type}</b> ({item.computer.id}) |{" "}
            {item.sourceSetupId} {"→"} {item.targetSetupId}
          </span>
        </div>
      ))}
    </div>
  );
};
