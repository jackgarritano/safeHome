import React, { useState } from 'react';
import { Typography, FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Slider, FormGroup, Button, Box } from '@mui/material';


export default function Onboarding() {


	const [formData, setFormData] = useState({
		name: '',
		age: '',
		mobility_level: 10,
		eyesight: 10,
		muscle_strength: 10,
		impairments: {
			past_fall_history: false,
			assistive_devices_usage: false,
			incontinence: false,
		}
	});

	// Handler for inputs change
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => {
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
	const handleSliderChange = (fieldName) => (event, newValue) => {
		setFormData((prevFormData) => ({
		  ...prevFormData,
		  [fieldName]: newValue,  // dynamic field name
		}));
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
				{/* <br></br> */}
				<Typography gutterBottom variant="body1">
					What is your name?
				</Typography>
				{/* Name Input */}
				<TextField
					fullWidth
					margin="normal"
					label="Name"
					variant="outlined"
					name="age"
					value={formData.age}
					onChange={handleInputChange}
				/>
				<br></br>
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
						name="mobility_level"
						value={formData.mobility_level}
						onChange={handleSliderChange('mobility_level')}
					/>
				</Box>

				{/* Eyesight Slider */}
				<Box sx={{ my: 2 }}>
					<Typography gutterBottom variant="body1">
						What is your level of eyesight?
					</Typography>
					<Slider
						aria-label="Eyesight Level"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={10}
						name="eyesight"
						value={formData.eyesight}
						onChange={handleSliderChange('eyesight')}
					/>
				</Box>

				{/* Mobility Slider */}
				<Box sx={{ my: 2 }}>
					<Typography gutterBottom variant="body1">
						What is your level of muscle strength?
					</Typography>
					<Slider
						aria-label="Muscle Strength"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={10}
						name="strength"
						value={formData.muscle_strength}
						onChange={handleSliderChange('muscle_strength')}
					/>
				</Box>

				{/* Impairments Checkboxes */}
				<FormControl component="fieldset" margin="normal">
					<Typography gutterBottom variant="body1">
						Do you or your family have any impairments?
					</Typography>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.past_fall_history} onChange={handleCheckboxChange} name="past_fall_history" />}
							label="History of past falls"
						/>
						<FormControlLabel
							control={<Checkbox checked={formData.impairments.assistive_devices_usage} onChange={handleCheckboxChange} name="assistive_devices_usage" />}
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