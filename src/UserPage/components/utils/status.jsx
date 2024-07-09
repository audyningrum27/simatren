export function getStatus(status) {
	switch (status) {
		case 'Lunas':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100 font-semibold ">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'Belum Lunas':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-red-500 bg-red-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'Selesai':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'Proses':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'Belum Dimulai':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-red-500 bg-red-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'Diterima':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'Ditolak':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-red-500 bg-red-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
	}
}