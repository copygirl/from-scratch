// priority: 20

const WOOD = {
  oak:      {  },
  spruce:   {  },
  birch:    {  },
  jungle:   {  },
  acacia:   {  },
  dark_oak: {  },
  crimson:  {  },
  warped:   {  },
};

for (let [ id, data ] of Object.entries(WOOD)) {
  let isShroom = [ "crimson", "warped" ].includes(id);
  data.log          = `minecraft:${id}_${ isShroom ? "stem" : "log" }`;
  data.stripped_log = `minecraft:stripped_${id}_${ isShroom ? "stem" : "log" }`;
  data.planks       = `minecraft:${id}_planks`;
}

// Add all items in WOOD to JEI, including ones added later.
onEvent("jei.add.items", event => {
  for (let data of Object.values(WOOD))
    for (let id of Object.values(data))
      if (isIdentifier(id)) event.add(id);
});
