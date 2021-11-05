// priority: 5

onEvent("item.registry", event => {
  for (let [ id, data ] of Object.entries(WOOD)) {
    event.create(`${id}_board`)
          .displayName(`${idToName(id)} Board`)
          .texture(`kubejs:item/board/${id}`);
    data.board = `kubejs:${id}_board`;
  }
});

onEvent("item.tags", event => {
  for (let { board } of Object.values(WOOD)) {
    event.add("kubejs:board", board);
    event.add("kubejs:size/small", board);
  }
});
