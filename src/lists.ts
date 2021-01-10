import { BasicList, ListAction, ListContext, ListItem, Neovim, window } from 'coc.nvim';

export default class GenericList extends BasicList {
 public readonly name = 'generic';
  public readonly description = 'CocList for generic-list';
  public readonly defaultAction = 'open';
  public actions: ListAction[] = [];

  constructor(nvim: Neovim) {
    super(nvim);

    this.addAction('open', (item: ListItem, context: ListContext) => {
      // first close window and then execute command
      if(!context.args[1]){
        window.showErrorMessage("Missing open command for generic list");
        return;
      }
      nvim.command(`${context.args[1]} ${item.data.name}`);
    }, { persist: false});
  }

  public async loadItems(context: ListContext): Promise<ListItem[]> {
    var args = context.args;
    if(!args[0]) {
        window.showErrorMessage("Missing item lister function");
        return [];
    }

    var itemLoaderFunction = args[0];
    var out = this.nvim.call(itemLoaderFunction);
    return out.then((value) => {
      var list:ListItem[] = [];
      var results = (value as string[])

      results.forEach(element => list.push({label: element, data: {name: element}}))
      return list;
    })
  }
}
