import useAuthentication from "../hooks/useAuthentication";
import HouseCard from "../components/HouseCard";
import { Container, Grid, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getAllHouses, getUserData } from "../utils/db";
import React, { useState, useEffect, useContext } from "react";
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
import useQueryParam from '../utils/useQueryParam';


export default function Room() {
	const { authenticated, userId } = useAuthentication();
	const roomId = useQueryParam('id');
	const houseId = useQueryParam('house_id');
	const supabase = useContext(SupabaseContext);
	const [recs, setRecs] = useState([]);

	useEffect(() => {
		

		if (userId) {
			getAllHouses(supabase, userId)
				.then(returnedHouses => {
					getUserData(supabase, userId)
						.then(userData => {
							let house = null;
							for (let possibleHouse of returnedHouses) {
								if (possibleHouse.id == houseId) {
									house = possibleHouse;
								}
							}
							console.log('returnedHouses', returnedHouses);
							console.log('found house', house);
							let tempRecs = [];
							if (house) {
								const callCorrectGenerateRecs = (key, data) => {
									switch (key) {
										case "bathrooms":
											return generateBathroomRecs(userData, house, data);
										case "bedrooms":
											return generateBedroomRecs(userData, house, data);
										case "kitchens":
											return generateKitchenRecs(userData, house, data);
										case "living_rooms":
											return generateLivingRoomRecs(userData, house, data);
										case "stairs":
											return generateStairsRecs(userData, house, data);
										default:
											return undefined;
									}
								}

								const findRoomById = (data, roomId) => {
									// Iterate over all keys in the object (bathrooms, bedrooms, kitchens, etc.)
									for (const category of Object.keys(data)) {
										// Check if the property's value is an array (which it should be for our room categories)
										if (Array.isArray(data[category])) {
											// Iterate over each room in the category
											for (const room of data[category]) {
												// If the room's ID matches our target ID, we've found our room
												if (room.id === roomId) {
													return {
														category,
														room,
													};
												}
											}
										}
									}
								}
								const {room, category} = findRoomById(house, roomId);
								tempRecs = callCorrectGenerateRecs(category, room);
							}

							setRecs(tempRecs);
							console.log('recs after manipulation: ', recs);
						})
				})
		}
	}, [userId])

	return (
		<Container>
			{/* If you want to add a title or some description */}
			<Typography variant="h6" component="div" gutterBottom>
				Room Recommendations
			</Typography>

			{/* Here we start listing our sentences */}
			<List component="nav" aria-label="main mailbox folders">
				{recs.map((sentence, index) => (
					<React.Fragment key={index}>
						<ListItem button>
							<ListItemText primary={sentence} />
						</ListItem>
						{index < recs.length - 1 && <Divider />} {/* Avoids adding a divider after the last item */}
					</React.Fragment>
				))}
			</List>
		</Container>
	);
}