import Bull from "bull";

const whoamiQueue = new Bull("whoamiQueue", "redis://127.0.0.1:6379");

export default whoamiQueue;
