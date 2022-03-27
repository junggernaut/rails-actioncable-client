import { createCable } from '@anycable/web'
const URL = 'ws://localhost:8080/cable';
const cable = createCable(URL);

export default cable