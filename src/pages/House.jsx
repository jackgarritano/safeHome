import useAuthentication from "../hooks/useAuthentication";
import { Container, Grid, Button } from '@mui/material';
import RoomCard from "../components/RoomCard";
import useQueryParam from '../utils/useQueryParam';
import { getAllHouses, getUserData } from "../utils/db";
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from "react";
import {
	generateBathroomRecs,
	generateBedroomRecs,
	generateHouseRecs,
	generateKitchenRecs,
	generateLivingRoomRecs,
	generateStairsRecs
} from '../utils/recommendations.js';
import SupabaseContext from '../components/SupabaseContext';

export default function House() {
	const { authenticated, userId } = useAuthentication();
	const houseId = useQueryParam('id');
	const navigate = useNavigate();
	const supabase = useContext(SupabaseContext);
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		if (userId) {
			let newRooms = [];
			getAllHouses(supabase, userId)
				.then(returnedHouses => {
					getUserData(supabase, userId)
						.then(userData => {
							let house = null;
							for (let possibleHouse of returnedHouses) {
								if(possibleHouse.id == houseId){
									house = possibleHouse;
								}
							}
							let tempRecs = []
							console.log('type of house bathrooms', typeof house['bathrooms']);
							for (let brm of house['bathrooms']) {
								const bathroomRecs = generateBathroomRecs(userData, house, brm);
								tempRecs = tempRecs.concat(bathroomRecs);
								newRooms.push({
									recs: tempRecs.length,
									name: brm['room_name'],
									id: brm['id']
								});
							}
							for (let bdrm of house['bedrooms']) {
								const bdrmRecs = generateBedroomRecs(userData, house, bdrm);
								tempRecs = tempRecs.concat(bdrmRecs);
								newRooms.push({
									recs: tempRecs.length,
									name: bdrm['room_name'],
									id: bdrm['id']
								});
							}
							for (let ktch of house['kitchens']) {
								const kitchenRecs = generateKitchenRecs(userData, house, ktch);
								tempRecs = tempRecs.concat(kitchenRecs);
								newRooms.push({
									recs: tempRecs.length,
									name: ktch['room_name'],
									id: ktch['id']
								});
							}
							for (let lvrm of house['living_rooms']) {
								const lvrmRecs = generateLivingRoomRecs(userData, house, lvrm);
								tempRecs = tempRecs.concat(lvrmRecs);
								newRooms.push({
									recs: tempRecs.length,
									name: lvrm['room_name'],
									id: lvrm['id']
								});
							}
							for (let stair of house['stairs']) {
								const stairRecs = generateStairsRecs(userData, house, stair);
								tempRecs = tempRecs.concat(stairRecs);
								newRooms.push({
									recs: tempRecs.length,
									name: stair['room_name'],
									id: stair['id']
								});
							}
							setRooms(newRooms);
							console.log('rooms after manipulation: ', rooms);
						})
					
				})
		}
	}, [userId])

	const containerStyles = {
		minHeight: '100%', // covers the full height of its parent, you can also use '100vh' for full viewport height
		display: 'flex',
		alignItems: 'center', // centers children vertically in this container
		justifyContent: 'center', // centers children horizontally in this container
		flexDirection: 'column'
	};

	return <>
		<Container style={containerStyles}>
			<h2>Your Rooms</h2>
			<br></br>
			<Button variant="contained" color="primary" onClick={() => navigate(`/roomredirect?id=${houseId}`)}>
				Add Room
			</Button>
			<br></br>
			<Grid container spacing={3}>
				{rooms.map((room, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<RoomCard
							roomName={room.name}
							safetyScore={room.recs}
							roomId={room.id}
							houseId={houseId}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	</>
}

