// priority: 10

onEvent("item.modification", event => {
  event.modify("*", item => { item.maxStackSize = 1; });
  event.modify("#kubejs:size/medium", item => { item.maxStackSize = 4; });
  event.modify("#kubejs:size/small", item => { item.maxStackSize = 8; });
  event.modify("#kubejs:size/tiny", item => { item.maxStackSize = 16; });
});
