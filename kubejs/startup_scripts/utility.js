// priority: 50

function idToName(id) {
  id = id[0].toUpperCase() + id.substr(1);
  for (var i = 0; i < id.length; i++)
    if (id[i] == '_')
      id = id.substr(0, i) + " " + id[i+1].toUpperCase() + id.substr(i+2);
  return id;
};

function isIdentifier(value) {
  return (typeof value == "string") && value.includes(":");
}

let MATCH_SILK_TOUCH = {
  condition: "minecraft:match_tool",
  predicate: { enchantments: [{ enchantment: "minecraft:silk_touch" }] }
};

function buildSilkTouchDrops(event, block, items) {
  if (!Array.isArray(items)) items = [ items ];
  event.addBlock(block, table => {
    table.addPool(pool => {
      pool.addCondition(MATCH_SILK_TOUCH);
      pool.addItem(block);
    });
    for (let item of items)
      table.addPool(pool => {
        pool.survivesExplosion();
        pool.addCondition({ condition: "minecraft:inverted", term: MATCH_SILK_TOUCH });
        pool.addItem(item);
      });
  });
}

// Not a true polyfill as they're supposed to return arrays, but this will work for us.
Object.values  = function*(obj) { for (let key in obj) yield obj[key]; },
Object.entries = function*(obj) { for (let key in obj) yield [key, obj[key]]; }
