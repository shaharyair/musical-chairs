"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = (props: { children: React.ReactNode, id: number }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};
