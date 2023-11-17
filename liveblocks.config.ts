import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";

const client = createClient({
  publicApiKey:
    "pk_dev_yi-811xbSE0WB0GqKMDbIMZt6Setn0_NgURMgSY7bhDDCAtYEZvzss95_LHt3b80",
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
// Presence represents the properties that will exist on every User in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  isTyping: boolean;
};
export type Note = LiveObject<{
  x: number;
  y: number;
  text: string;

  id: string;
}>;
// Optionally, Storage represents the shared document that persists in the
// Room, even after all Users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  todos: LiveList<LiveObject<Todo>>;
};

type Todo = {
  text: string;
  checked?: boolean;
};
export type Notes = LiveMap<string, Note>;

// Optionally, UserMeta represents static/readonly metadata on each User, as
// provided by your own custom auth backend (if used). Useful for data that
// will not change during a session, like a User's name or avatar.
// type UserMeta = {
//   id?: string,  // Accessible through `user.id`
//   info?: Json,  // Accessible through `user.info`
// };

// Optionally, the type of custom events broadcasted and listened for in this
// room. Must be JSON-serializable.
// type RoomEvent = {};

export const {
  suspense: {
    RoomProvider,
    useStorage,
    useOthers,
    useUpdateMyPresence,
    useMutation,
  },
} = createRoomContext<Presence, Storage /* UserMeta, RoomEvent */>(client);
