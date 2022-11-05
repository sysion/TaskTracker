const tasks = [
	{
		id: 1,
		text: 'Visit Tunji Ososanya',
		day: '18th October, 2022 at 10:00am',
		reminder: false,
	},
	{
		id: 2,
		text: 'Tunji Ososanya mum\'s birthday',
		day: '24th October, 2022 at 4:10pm',
		reminder: true,
	},
	{
		id: 3,
		text: 'Tunji Ososanya\'s birthday',
		day: '29th October, 2022 at 12:30pm',
		reminder: true,
	},
	{
		id: 4,
		text: 'Follow up on Tunji Ososanya',
		day: '7th November, 2022 at 9:00am',
		reminder: false,
	},
	{
		id: 5,
		text: 'Say hello to Tunji Ososanya\'s mum',
		day: '11th November, 2022 at 3:15pm',
		reminder: true,
	}
];

const Tasks = () => {
	return (
		<div> 
			{
				tasks.map((task)=>(<h3 key={task.id}>{task.text}</h3>))
			}
		</div>
	);

}

export default Tasks;