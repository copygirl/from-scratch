// priority: 5

const PILES = {
  dirt:      [ "minecraft:dirt", "minecraft:grass_block", "minecraft:podzol",
               "minecraft:farmland", "minecraft:grass_path" ],
  gravel:    [ "minecraft:gravel" ],
  sand:      [ "minecraft:sand" ],
  red_sand:  [ "minecraft:red_sand" ],
  soul_sand: [ "minecraft:soul_sand" ]
};

onEvent("item.registry", event => {
  for (let id in PILES)
    event.create(id + "_pile")
         .displayName(idToName(id) + " Pile")
         .texture("kubejs:item/pile/" + id);
});

onEvent("item.tags", event => {
  for (let id in PILES)
    event.add("kubejs:size/small", "kubejs:" + id + "_pile");
});

onEvent("block.loot_tables", event => {
  for (let [ id, blocks ] of Object.entries(PILES))
    for (let block of blocks)
      buildSilkTouchDrops(event, block, "4x kubejs:" + id + "_pile");

  buildSilkTouchDrops(event, "minecraft:coarse_dirt",
    [ "2x kubejs:dirt_pile", "2x kubejs:gravel_pile" ]);
});

onEvent("recipes", event => {
  for (let [ id, blocks ] of Object.entries(PILES))
    event.shaped(blocks[0], [ "PP", "PP" ], { P: "kubejs:" + id + "_pile" });

  event.shaped("minecraft:coarse_dirt", [ "DG", "GD" ],
    { D: "kubejs:dirt_pile", G: "kubejs:gravel_pile" });
});

onEvent("jei.add.items", event => {
  for (let [ id, blocks ] of Object.entries(PILES)) {
    event.add("kubejs:" + id + "_pile");
    for (let block of blocks) event.add(block);
  }

  event.add("minecraft:coarse_dirt");
});
