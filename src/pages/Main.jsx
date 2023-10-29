import useAuthentication from "../hooks/useAuthentication";
import HouseCard from "../components/HouseCard";
import { Container, Grid } from '@mui/material';
import { getAllHouses, getUserData } from "../utils/db";
import { useEffect, useContext } from "react";
import SupabaseContext from '../components/SupabaseContext';
import {
	generateBathroomRecs,
	generateBedroomRecs,
	generateHouseRecs,
	generateKitchenRecs,
	generateLivingRoomRecs,
	generateStairsRecs
} from '../utils/recommendations.js';

export default function Main() {
	const { authenticated, userId } = useAuthentication();
	const supabase = useContext(SupabaseContext);

	const houses = [];

	useEffect(() => {
		// getUserData(supabase, userId)
		// 				.then(userData => console.log(userData))
		// getAllHouses(supabase, userId)
		// 				.then(userData => console.log(userData))


		/*
			0
: 
bathrooms
: 
[{…}]
bedrooms
: 
(3) [{…}, {…}, {…}]
house_name
: 
"myhouse"
id
: 
"545e85c1-ab33-496b-92cb-80f1145addfa"
kitchens
: 
(2) [{…}, {…}]
living_rooms
: 
[{…}]
num_elderly
: 
2
num_floors
: 
1
num_people
: 
3
stairs
: 
(2) [{…}, {…}]
temp
: 
2
type_house
: 
"house"
user_id
: 
"21080eec-2821-4410-9620-34d867f296ad"
		*/


		if (userId) {
			getAllHouses(supabase, userId)
				.then(returnedHouses => {
					getUserData(supabase, userId)
						.then(userData => {
							console.log('rethouses', returnedHouses);
							for (let house of returnedHouses) {
								let tempRecs = []
								console.log('type of house bathrooms', typeof house['bathrooms']);
								for(let brm of house['bathrooms']){
									tempRecs.concat(generateBathroomRecs(userData, house, brm))
								}
								for(let bdrm of house['bedrooms']){
									tempRecs.concat(generateBedroomRecs(userData, house, bdrm))
								}
								tempRecs.concat(generateHouseRecs(userData, house));
								for(let ktch of house['kitchens']){
									tempRecs.concat(generateKitchenRecs(userData, house, ktch));
								}
								for(let lvrm of house['living_rooms']){
									tempRecs.concat(generateLivingRoomRecs(userData, house, lvrm));
								}
								for(let stair of house['stairs']){
									tempRecs.concat(generateStairsRecs(userData, house, stair));
								}
								const recSet = new Set(tempRecs);
								houses.push(
									{
										recs: recSet.size,
										name: house['house_name'],
										id: house['id']
									}
								);
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


	// for (let i = 0; i < 10; ++i) {
	// 	houses.push({
	// 		name: i % 3 == 0 ? "Jack's House" : i,
	// 		rooms: 3,
	// 	})
	// }

	return <>
		<Container style={containerStyles}>
			<h2>Your Houses</h2>
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