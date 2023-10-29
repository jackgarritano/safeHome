import React, { useState } from 'react';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';


export default function Onboarding() {


	const [formData, setFormData] = useState({
		age: '',
		mobility: 0,
		impairments: {
			eyesight: false,
			muscleWeakness: false,
			historyOfFalls: false,
			assistiveDevices: false,
			incontinence: false,
		},
		budget: '',
	});

	// Handler for inputs change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) =>{
			return { ...prevFormData, [name]: value };
		});
	};

	// Handler for checkbox change
	const handleCheckboxChange = (event) => {
		const { name, checked } = event.target;
		setFormData((prevFormData) => {
			return { ...prevFormData, impairments: { ...prevFormData.impairments, [name]: checked } }
		});
	};

	// Handler for slider change
	const handleSliderChange = (event, newValue) => {
		setFormData((prevFormData) => {
			return { ...prevFormData, mobility: newValue }
		});
	};

	// Handler for form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Form data:', formData);
		// Here, you would typically handle form submission, like sending data to a server
	};

	// Now we build the form UI
	return (
		<Box sx={{ m: 4 }}>
			<form onSubmit={handleSubmit}>
				<h2>Onboarding</h2>
				<br></br>
				<Typography gutterBottom variant="body1">
					What is your age?
				</Typography>
				{/* Age Input */}
				<TextField
					fullWidth
					margin="normal"
					label="Age"
					type="number"
					variant="outlined"
					name="age"
					value={formData.age}
					onChange={handleInputChange}
				/>

				{/* Mobility Slider */}
				<Box sx={{ my: 2 }}>
					<Typography gutterBottom variant="body1">
						What is your mobility level?
					</Typography>
					<Slider
						aria-label="Mobility Level"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={10}
						name="mobility"
						value={formData.mobility}
						onChange={handleSliderChange}
					/>
				</Box>

				{/* Impairments Checkboxes */}
				<FormControl component="fieldset" margin="normal">
					<Typography gutterBottom variant="body1">
						Do you or your family have any impairments?
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.eyesight} onChange={handleCheckboxChange} name="eyesight" />}
							label="Impaired Eyesight"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.muscleWeakness} onChange={handleCheckboxChange} name="muscleWeakness" />}
							label="Muscle weakness or atrophy"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.historyOfFalls} onChange={handleCheckboxChange} name="historyOfFalls" />}
							label="History of past falls"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.assistiveDevices} onChange={handleCheckboxChange} name="assistiveDevices" />}
							label="Use of assistive devices"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.incontinence} onChange={handleCheckboxChange} name="incontinence" />}
							label="Incontinence"
						/>
					</FormGroup>
				</FormControl>

				<Box sx={{ marginTop: 3 }}> {/* Adjusts margin to your preference */}
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
}