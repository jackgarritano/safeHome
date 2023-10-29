export {insertOnboardingData};

async function insertOnboardingData(supabase, formData, id){
	const upsertData = {
		name: formData['name'],
		age: formData['age'],
		mobility_level: formData['mobility_level'],
		eyesight: formData['eyesight'],
		muscle_strength: formData['muscle_strength'],
		past_fall_history: formData['impairments']['past_fall_history'],
		assistive_devices_usage: formData['impairments']['assistive_devices_usage'],
		incontinence: formData['impairments']['incontinence']
	};
	if(id){
		upsertData['id'] = id;
	}
	const {data, error} = await supabase
		.from('user_info')
		.upsert(upsertData)
		.select()
	console.log(error);
}