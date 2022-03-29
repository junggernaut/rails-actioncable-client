import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/chat/'

});

const chatAPI ={
	getRooms: (username) => {
		console.log(`get rooms of ${username}`)
		return api.get('room/all', {
			params: {
				username: username
			}
		})
	},
	createPrivateRoom: (roomname, buddy) => {
		return api.post('room/createPrivate', {
			username: roomname,
			buddy: buddy, 
		})
	},
	createBuubleRoom: (roomname, participants) => {
		return api.post('room/createBubble', {
			username: roomname,
			participants: participants,
		})
	}
}

export default chatAPI;