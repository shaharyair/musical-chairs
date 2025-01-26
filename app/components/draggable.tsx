"use client";

import React from "react";
import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";

export const Draggable = (props: { children: React.ReactNode } & UseDraggableArguments) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
};
