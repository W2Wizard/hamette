<script lang="ts">

	let people = [
		{ firstName: 'John', lastName: 'Doe', age: 30 },
		{ firstName: 'Jane', lastName: 'Doe', age: 25 },
		{ firstName: 'James', lastName: 'Smith', age: 32 },
		{ firstName: 'Judy', lastName: 'Green', age: 28 }
	];
</script>

<table>
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>Age</th>
		</tr>
	</thead>
	<tbody>
		{#each people as person}
			<tr>
				<td>{person.firstName}</td>
				<td>{person.lastName}</td>
				<td>{person.age}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f2f2f2;
	}

	tr {
		&:nth-child(even) {
			background-color: #f2f2f2;
		}
	}
</style>
