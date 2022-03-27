import { createConsumer } from "@rails/actioncable";
const URL = 'ws://localhost:8080/cable';
const consumer = createConsumer(URL);

export default consumer