// priority: 20

const STONE = {
  // OVERWORLD
  stone:     { cobble: "minecraft:cobblestone"       , smooth: "minecraft:stone"    , polished: "minecraft:smooth_stone" },
  granite:   { cobble: "create:granite_cobblestone"  , smooth: "minecraft:granite"  , polished: "minecraft:polished_granite" },
  diorite:   { cobble: "create:diorite_cobblestone"  , smooth: "minecraft:diorite"  , polished: "minecraft:polished_diorite" },
  andesite:  { cobble: "create:andesite_cobblestone" , smooth: "minecraft:andesite" , polished: "minecraft:polished_andesite" },
  deepslate: { cobble: "quark:cobbled_deepslate"     , smooth: "quark:deepslate"    , polished: "quark:polished_deepslate" },
  andesite:            { cobble: "create:andesite_cobblestone"            , smooth: "create:andesite"            , polished: "create:polished_andesite"            },
  limestone:           { cobble: "create:limestone_cobblestone"           , smooth: "create:limestone"           , polished: "create:polished_limestone"           },
  weathered_limestone: { cobble: "create:weathered_limestone_cobblestone" , smooth: "create:weathered_limestone" , polished: "create:polished_weathered_limestone" },
  dolomite:            { cobble: "create:dolomite_cobblestone"            , smooth: "create:dolomite"            , polished: "create:polished_dolomite"            },
  gabbro:              { cobble: "create:gabbro_cobblestone"              , smooth: "create:gabbro"              , polished: "create:polished_gabbro"              },
  scoria:              { cobble: "create:scoria_cobblestone"              , smooth: "create:scoria"              , polished: "create:polished_scoria"              },
  dark_scoria:         { cobble: "create:dark_scoria_cobblestone"         , smooth: "create:dark_scoria"         , polished: "create:polished_dark_scoria"         },
  marble: { smooth: "quark:marble" , polished: "quark:polished_marble" },
  jasper: { smooth: "quark:jasper" , polished: "quark:polished_jasper" },
  slate:  { smooth: "quark:slate"  , polished: "quark:polished_slate" },
  sandstone:      { cobble: "minecraft:sandstone"     , smooth: "minecraft:smooth_sandstone"     , polished: "minecraft:cut_sandstone" },
  red_sandstone:  { cobble: "minecraft:red_sandstone" , smooth: "minecraft:smooth_red_sandstone" , polished: "minecraft:cut_red_sandstone" },
  soul_sandstone: { cobble: "quark:soul_sandstone"    , smooth: "quark:smooth_soul_sandstone"    , polished: "quark:cut_soul_sandstone" },

  // NETHER
  netherrack: { cobble: "minecraft:netherrack" },
  basalt:     { cobble: "minecraft:basalt"        , polished: "minecraft:polished_basalt" },
  blackstone: { cobble: "minecraft:blackstone"    , polished: "minecraft:polished_blackstone" },
  quartz:     { smooth: "minecraft:smooth_quartz" , polished: "minecraft:quartz_block" },

  // END
  end_stone:  { cobble: "minecraft:end_stone" },
  biotite:    { smooth: "quark:smooth_biotite" , polished: "quark:biotite_block" },
  voidstone:  { smooth: "quark:voidstone"      , polished: "quark:polished_voidstone" },
  myalite:    { smooth: "quark:myalite"        , polished: "quark:polished_myalite" }
};

// Add all items in STONE to JEI, including ones added later.
onEvent("jei.add.items", event => {
  for (let data of Object.values(STONE))
    for (let id of Object.values(data))
      if (isIdentifier(id)) event.add(id);
});
