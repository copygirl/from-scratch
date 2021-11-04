// Remove ALL items from showing up in JEI.
// Items are later added back in manually.
onEvent("jei.hide.items", event => event.hide("*"));

// Re-add crafting table (even if uncraftable) to be able to show
// 2x2 crafting recipes that can be made in the player inventory.
onEvent("jei.add.items", event => event.add("minecraft:crafting_table"));
