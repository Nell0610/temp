"use client";

import clsx from "clsx";
import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  KeyboardEvent,
  PointerEventHandler,
  memo,
  useCallback,
  useRef,
} from "react";

import { useStorage } from "../../liveblocks.config";

interface Props
  extends Omit<
    ComponentProps<"div">,
    "id" | "onBlur" | "onChange" | "onFocus"
  > {
  dragged: boolean;
  id: string;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onDelete: () => void;
  onFocus: FocusEventHandler<HTMLTextAreaElement>;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
}

export default WhiteboardNote
  (
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const note = useStorage((root) => root.notes.get(id));

    const handleDoubleClick = useCallback(() => {
      textAreaRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Escape") {
          textAreaRef.current?.blur();
        }
      },
      []
    );

    if (!note) {
      return null;
    }

    const { x, y, text, selectedBy } = note;

    return (
      <div
        className={clsx(className, styles.container)}
        data-note={id}
        onDoubleClick={handleDoubleClick}
        onPointerDown={onPointerDown}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          transition: dragged ? "none" : undefined,
          zIndex: dragged ? 1 : 0,
          cursor: dragged ? "grabbing" : "grab",
          ...style,
        }}
        {...props}
      >
        <div className="">
          <div className=""></div>
          <div className="">
            <div className=""></div>
            <textarea
              className="bg-white text-black"
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              onKeyDown={handleKeyDown}
              onPointerDown={(e) => e.stopPropagation()}
              placeholder="Write note…"
              ref={textAreaRef}
              value={text}
            />
          </div>
        </div>
      </div>
    );
  }
);
