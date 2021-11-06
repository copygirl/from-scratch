// priority: 5

const TOOL_TYPES = {
  // Vanilla
  sword:   { durability: 2.0, options: { flint: false } },
  shovel:  { durability: 2.5, options: { flint: { name: "Primitive $$ Spade" } } },
  pickaxe: { durability: 2.0, options: { flint: false } },
  axe:     { durability: 1.5, options: { flint: { name: "Primitive $$ Hatchet" } } },
  hoe:     { durability: 1.5, options: { flint: false } },
  // Custom
  knife:  { durability: 3.0, options: { flint: { name: "Primitive $$ Knife" } } },
  saw:    { durability: 3.5, options: { flint: false, gold: false } },
  hammer: { durability: 4.0, options: { flint: false, gold: false } }
};

let existing_tools = {
  sword:   { minecraft:      [ "iron", "gold", "diamond", "netherite" ] },
  shovel:  { minecraft:      [ "iron", "gold", "diamond", "netherite" ] },
  pickaxe: { minecraft:      [ "iron", "gold", "diamond", "netherite" ] },
  axe:     { minecraft:      [ "iron", "gold", "diamond", "netherite" ] },
  hoe:     { minecraft:      [ "iron", "gold", "diamond", "netherite" ] },
  knife:   { farmersdelight: [ "flint", "iron", "gold", "diamond", "netherite" ] }
};

for (let [ tool_type_id, data ] of Object.entries(existing_tools))
  for (let [ mod, materials ] of Object.entries(data))
    for (let material_id of materials) {
      let tool_type = TOOL_TYPES[tool_type_id];
      let options   = tool_type.options || (tool_type.options = {  });
      let material  = options[material_id] || (options[material_id] = {  });
      material.mod = mod;
    }

onEvent("item.registry", event => {
  for (let [ tool_type_id, tool_type ] of Object.entries(TOOL_TYPES))
    for (let [ material_id, material ] of Object.entries(MATERIALS)) {
      let options = tool_type.options[material_id];
      if (options === false) continue; // Material is disabled for this tool type.
      if (!options) options = {  };
      if (options.mod) continue; // Tool is defined by a mod.

      let id = (material_id == "wood") ? `wooden_${tool_type_id}`
             : (material_id == "gold") ? `golden_${tool_type_id}`
                                       : `${material_id}_${tool_type_id}`;
      let name = options.name
        ? options.name.replace("$$", idToName(material_id))
        : `${idToName(material_id)} ${idToName(tool_type_id)}`;

      event.create(id).displayName(name).type(tool_type_id)
        .texture(`kubejs:item/tool/${tool_type_id}/${material_id}`)
        // FIXME: This currently produces an ambiguity error.
        // .tool(ToolType.create(tool_type_id, () => null), material.tier)
        .maxDamage(material.durability * tool_type.durability);

      tool_type.tools = tool_type.tools || [];
      tool_type.tools.push(`kubejs:${id}`);
    }
});

onEvent("item.modification", event => {
  for (let [ tool_type_id, tool_type ] of Object.entries(TOOL_TYPES))
    for (let [ material_id, material ] of Object.entries(MATERIALS)) {
      let options = tool_type.options[material_id];
      if (!options || !options.mod) continue;

      let id = (material_id == "wood") ? `${options.mod}:wooden_${tool_type_id}`
             : (material_id == "gold") ? `${options.mod}:golden_${tool_type_id}`
                                       : `${options.mod}:${material_id}_${tool_type_id}`;

      event.modify(id, item => {
        item.tier = tier => { tier.level = material.tier; };
        item.maxDamage = material.durability * tool_type.durability;
      });

      tool_type.tools = tool_type.tools || [];
      tool_type.tools.push(id);
    }
});

onEvent("item.tags", event => {
  for (let [ tool_type_id, { tools } ] of Object.entries(TOOL_TYPES))
    if (tools) for (let tool_id of tools) {
      event.add(`forge:tools`, tool_id);
      event.add(`forge:tools/${tool_type_id}`, tool_id);
      // TODO: Add tag for non-primitive tools only.
      event.add("plonk:placeable_on_side", tool_id);
    }
});

onEvent("jei.add.items", event => {
  for (let { tools } of Object.values(TOOL_TYPES))
    if (tools) for (let tool_id of tools)
      event.add(tool_id);
});
