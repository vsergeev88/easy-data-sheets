import { Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const AddToFavorites = ({
	isFavorite,
	id,
}: {
	isFavorite: boolean;
	id: string;
}) => {
	const [isFav, setIsFav] = useState(isFavorite);
	const handleClick = () => {
		setIsFav(!isFav);
		// if (isFavorite) {
		// 	markAsUnbookmarked(id);
		// } else {
		// 	markAsBookmarked(id);
		// }
	};
	return (
		<Button
			className="text-center font-medium"
			onClick={(e) => {
				e.stopPropagation();
				handleClick();
			}}
			size="icon"
			variant="ghost"
		>
			<Star
				className={cn("text-3xl", isFav ? "text-yellow-500" : "text-slate-400")}
			/>
		</Button>
	);
};
