import { createListenerMiddleware } from "@reduxjs/toolkit";

// Create the listener middleware
const listenerMiddleware = createListenerMiddleware();

// Export the middleware and its methods
export const { startListening, stopListening } = listenerMiddleware;
export default listenerMiddleware;