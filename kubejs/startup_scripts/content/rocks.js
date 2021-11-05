// priority: 5

onEvent("item.registry", event => {
  for (let [ id, data ] of Object.entries(STONE)) {
    // If a cobble variant exists for this stone type, create rock item.
    if (data.cobble) {
      event.create(`${id}_rock`)
           .displayName(`${idToName(id)} Rock`)
           .texture(`kubejs:item/rock/${id}`);
      data.rock = `kubejs:${id}_rock`;
    }
  }
});

onEvent("item.tags", event => {
  for (let { rock } of Object.values(STONE)) if (rock) {
    event.add("kubejs:rock", rock);
    event.add("kubejs:size/small", rock);
  }
});
