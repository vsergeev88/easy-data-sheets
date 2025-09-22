import { getDataSheet } from "@/lib/data/dataSheets";
import FormView from "../components/FormView/FormView";

async function ViewPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const { data, ...formInfo } = await getDataSheet(id);

	return <FormView formData={JSON.parse(data)} formInfo={formInfo} />;
}

export default ViewPage;
