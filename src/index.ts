import { ExtensionContext, listManager, workspace } from 'coc.nvim';
import GenericList from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  context.subscriptions.push(
    listManager.registerList(new GenericList(workspace.nvim)),
  );
}
