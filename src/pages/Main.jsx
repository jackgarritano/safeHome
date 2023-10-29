import useAuthentication from "../hooks/useAuthentication";
import HouseCard from "../components/HouseCard";
import { Container, Grid, Button } from '@mui/material';
import { getAllHouses, getUserData } from "../utils/db";
import { useState, useEffect, useContext } from "react";
import SupabaseContext from '../components/SupabaseContext';
import {
	generateBathroomRecs,
	generateBedroomRecs,
	generateHouseRecs,
	generateKitchenRecs,
	generateLivingRoomRecs,
	generateStairsRecs
} from '../utils/recommendations.js';
import { useNavigate } from 'react-router-dom';

export default function Main() {
	const { authenticated, userId } = useAuthentication();
	const navigate = useNavigate();
	const supabase = useContext(SupabaseContext);
	const [houses, setHouses] = useState([]);

	useEffect(() => {
		if (userId) {
			getAllHouses(supabase, userId)
				.then(returnedHouses => {
					getUserData(supabase, userId)
						.then(userData => {
							for (let house of returnedHouses) {
								let tempRecs = []
								console.log('type of house bathrooms', typeof house['bathrooms']);
								for (let brm of house['bathrooms']) {
									const bathroomRecs = generateBathroomRecs(userData, house, brm);
									tempRecs = tempRecs.concat(bathroomRecs);
								}
								for (let bdrm of house['bedrooms']) {
									const bdrmRecs = generateBedroomRecs(userData, house, bdrm);
									tempRecs = tempRecs.concat(bdrmRecs);
								}
								tempRecs = tempRecs.concat(generateHouseRecs(userData, house));
								for (let ktch of house['kitchens']) {
									const kitchenRecs = generateKitchenRecs(userData, house, ktch);
									tempRecs = tempRecs.concat(kitchenRecs);
								}
								for (let lvrm of house['living_rooms']) {
									const lvrmRecs = generateLivingRoomRecs(userData, house, lvrm);
									tempRecs = tempRecs.concat(lvrmRecs);
								}
								for (let stair of house['stairs']) {
									const stairRecs = generateStairsRecs(userData, house, stair);
									tempRecs = tempRecs.concat(stairRecs);
								}
								const recSet = new Set(tempRecs);
								setHouses((prevHouses) => [...prevHouses, {
									recs: recSet.size,
									name: house['house_name'],
									id: house['id']
								}]);
							}
						})
				})
			console.log('houses after manipulation: ', houses);
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
			<h2>Your Houses</h2>
			<br></br>
			<Button variant="contained" color="primary" onClick={() => navigate(`/housedata`)}>
				Add House
			</Button>
			<br></br>
			<Grid container spacing={3}>
				{houses.map((house, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<HouseCard
							houseName={house.name}
							safetyScore={house.recs}
							houseId={house.id}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	</>
}