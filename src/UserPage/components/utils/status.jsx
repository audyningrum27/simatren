export function getStatus(status, handleConfirm, id) {
	switch (status) {
		case 'Lunas':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'Belum Lunas':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-red-500 bg-red-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'SELESAI':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'PROSES':
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
		case 'KONFIRMASI':
			return (
				<button
					onClick={() => handleConfirm(id)}
					className="capitalize mt-1 py-2 px-4 rounded-md text-xs bg-green-400 font-semibold"
				>
					{status.replaceAll('_', ' ').toLowerCase()}
				</button>
			);
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100 font-semibold">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			);
	}
}