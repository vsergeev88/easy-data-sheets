import type { Instance } from "mobx-state-tree";
import { BareFormInfoModel } from "@/app/stores/bareStores/bareFormInfoModel";

export const EditorFormInfoModel = BareFormInfoModel.named(
	"FormInfoModel"
).actions((self) => ({
	setUpdatedAt: (updatedAt: Date) => {
		self.updatedAt = updatedAt;
	},
}));
export interface IEditorFormInfoModel
	extends Instance<typeof EditorFormInfoModel> {}
