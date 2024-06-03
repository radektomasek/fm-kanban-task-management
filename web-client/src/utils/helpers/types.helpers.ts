export function assertIsNode(event: EventTarget | null): asserts event is Node {
  if (!event || !(event instanceof Node)) {
    throw new Error("Node expected")
  }
}
