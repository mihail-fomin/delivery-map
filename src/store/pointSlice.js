import { createSlice } from '@reduxjs/toolkit'
import model from '../assets/model'


const initialState = {
	pointsList: [],
}

const pointSlice = createSlice({
	name: 'points',
	initialState,
	reducers: {
		// подгрузка массива модели
		loadFromLocalStorage(state) {
			const storageData = localStorage.getItem('points')
			if (!!storageData) {
				state.pointsList = JSON.parse(storageData)
			} else {
				localStorage.setItem('points', JSON.stringify(model))
			}
		},
		// логика обновлений модели
		addPoint(state, action) {
			const pointInList = state.pointsList.find(p => p.x === action.payload.x
				&& p.y === action.payload.y)
			if (typeof pointInList === 'object') {
				pointInList.name = action.payload.name
				pointInList.amount = action.payload.amount
			} else {
				state.pointsList.push(action.payload)
			}
			localStorage.setItem('points', JSON.stringify(state.pointsList))
		},
		removePoint(state, action) {
			state.pointsList = state.pointsList.filter(p => (
				p.x !== action.payload.x && p.y !== action.payload.y))
			localStorage.setItem('points', JSON.stringify(state.pointsList))
		},
		undoChanges(state) {
			localStorage.removeItem('points')
			state.pointsList = model
		},
	}
})

export const {
	loadFromLocalStorage,
	addPoint,
	setChanges,
	removePoint,
	undoChanges,
} = pointSlice.actions
export default pointSlice.reducer