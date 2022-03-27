import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/chat/'

});

const chatAPI ={
	getRooms: (username) => {
		console.log(`get rooms of ${walletId}`)
		return api.get('room/all', {
			params: {
				username: username
			}
		})
	},
	createPrivateRoom: (roomname, buddy) => {
		return api.post('room/createPrivate', {
			username: username,
			buddy: buddy, 
		})
	},
	createBuubleRoom: (roomname, participants) => {
		return api.post('room/createBubble', {
			username: username,
			participants: participants,
		})
	}
}