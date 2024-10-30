const ProductBadge = ({handleAddProduct, handleRemoveProduct, count, producto}) => {
    return (
		<div className="w-full bg-white shadow-lg rounded-lg flex justify-between py-3 px-2 select-none">
			<div className="font-medium">{producto.nombre}</div>
        	<div className="flex flex-row gap-3">
				<div className="w-full flex justify-center items-center bg-red-300 px-1 rounded-lg cursor-pointer" onClick={() => handleRemoveProduct(producto.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-red-600">
						<path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
					</svg>
				</div>
				<div className="w-full bg-slate-100 rounded-lg font-medium shadow-lg px-2 select-none">{count}</div>
				<div className="w-full flex justify-center items-center bg-emerald-300 px-1 rounded-lg cursor-pointer" onClick={() => handleAddProduct(producto.id)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-emerald-600">
						<path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
					</svg>
				</div>
			</div>
		</div>
    )
}

export default ProductBadge;